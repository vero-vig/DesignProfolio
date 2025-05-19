import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon to use WebSockets in serverless environments
neonConfig.webSocketConstructor = ws;

// Check if the database URL is set
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configure connection pool with additional options for better stability
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 5, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 10000, // How long to wait for a connection
  ssl: {
    rejectUnauthorized: false // Needed for some database providers
  }
});

// Add event handlers for the pool
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

// Create a Drizzle instance with the connection pool
export const db = drizzle(pool, { schema });

// Function to test database connection
export async function testConnection() {
  let client;
  try {
    // Try to get a client from the pool
    client = await pool.connect();
    // Test connectivity with a simple query
    const result = await client.query('SELECT NOW()');
    console.log('Database connection successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  } finally {
    // Always release the client back to the pool
    if (client) client.release();
  }
}