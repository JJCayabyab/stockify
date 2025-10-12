import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

//creates a connection to the database using the environment variables
export const sql = neon(process.env.PG_CONNECTION_STRING);
