import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import ws from "ws";
import * as schema from "@shared/schema";
import { log } from "./vite";

// For Neon Serverless, websockets are required
neonConfig.webSocketConstructor = ws;

// Check if the database URL is provided
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Better connection options that work well in cloud environments
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3, // Fewer connections to reduce connection overhead
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000, // Allow more time for connections
  allowExitOnIdle: true,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false }
    : undefined
});

// Create Drizzle ORM instance
export const db = drizzle(pool, { schema });

// Connection retry mechanism
const MAX_RETRIES = 5;
const INITIAL_BACKOFF = 1000; // Start with 1 second

// Function to test database connection with retries
export async function testConnection(retries = MAX_RETRIES, backoff = INITIAL_BACKOFF): Promise<boolean> {
  try {
    const client = await pool.connect();
    try {
      // Simple query to test connectivity
      const result = await client.query('SELECT NOW()');
      log(`Database connection successful: ${result.rows[0].now}`);
      return true;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(`Database connection error (attempt ${MAX_RETRIES - retries + 1}/${MAX_RETRIES}):`, error);
    
    if (retries <= 1) {
      log("All database connection attempts failed");
      return false;
    }
    
    // Exponential backoff with a bit of randomization
    const jitter = Math.floor(Math.random() * 100);
    const nextBackoff = backoff * 2 + jitter;
    log(`Retrying database connection in ${nextBackoff}ms...`);
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(testConnection(retries - 1, nextBackoff));
      }, backoff);
    });
  }
}

// Function to initialize schema if needed
export async function initializeSchema(): Promise<boolean> {
  try {
    // Create tables if they don't exist
    // This is a simple approach - for production apps, use migrations
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        image_src TEXT NOT NULL,
        tags TEXT[] NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS case_studies (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id),
        client TEXT NOT NULL,
        timeline TEXT NOT NULL,
        role TEXT NOT NULL,
        tools TEXT[] NOT NULL,
        overview TEXT NOT NULL,
        challenges JSONB NOT NULL,
        process JSONB NOT NULL,
        results JSONB NOT NULL,
        key_learnings JSONB NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    
    return true;
  } catch (error) {
    console.error("Error initializing schema:", error);
    return false;
  }
}