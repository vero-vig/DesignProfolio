import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage, DatabaseStorage } from "./storage";
import { db, testConnection } from "./db";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Test database connection with retries
  try {
    const isConnected = await testConnection();
    
    if (!isConnected) {
      log("Database connection unavailable - site will use fallback data.");
    } else {
      log("Database connection established successfully.");
      
      // Initialize schema if connected
      try {
        const { initializeSchema } = await import('./db');
        await initializeSchema();
        log("Database schema initialized.");
      } catch (schemaError) {
        console.error("Schema initialization error:", schemaError);
        log("Failed to initialize database schema, but will continue.");
      }
    }
  } catch (error) {
    console.error("Database connection test error:", error);
    log("Database connection test failed, but will continue with application startup.");
  }
  
  // Initialize database with sample data if it's empty
  if (storage instanceof DatabaseStorage) {
    try {
      await storage.initializeDataIfEmpty();
      log("Database initialized with sample data if needed.");
    } catch (error) {
      console.error("Error initializing database:", error);
      log("Failed to initialize database with sample data. The application will continue with fallback data.");
    }
  }
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
