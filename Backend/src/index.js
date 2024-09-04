import dataBaseConnect from "./database/database_connect.js";
import dotenv from 'dotenv';
import { app } from './app.js' 

// Connect to the database
dataBaseConnect()
.then(() => {
    app.listen(process.env.PORT || 8000 ,() => {
      console.log(`Server is running on port :: ${process.env.PORT || 8000}`);
    })
    app.on('error', (error) => {
      console.log(`Server error :: ${error}`)
      throw error;
    })
})
.catch((error) => {
    console.log(`Failed to connect to database :: ${error}`);
    
})

// Load environment variables from .env file
dotenv.config({
    path: './env'
})
