import dataBaseConnect from "./database/database_connect.js";
import dotenv from 'dotenv';

// Connect to the database
dataBaseConnect()

// Load environment variables from .env file
dotenv.config({
    path: './env'
})
