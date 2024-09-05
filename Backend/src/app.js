import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// this app.use(cors()) will add cors configuration and allow this CORS_ORIGIN url environment variable to allow the users to access backend services  
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    Credential :true,
}))

// this app.use(express.json()) will add limit to 20kb of json file accepted by the server 
app.use(express.json({
    limit : '20kb'
}))

// this app.use(express.urlencoded()) will make the configuration in server for the url pattern to match , the special characters will replaced with the url pattern
app.use(express.urlencoded({extended : true}))

// this app.use(express.static()) will allow the server to perform CURD operations on the public folder
app.use(express.static("public"))

// this app.use(cookieParser()) will parse the cookies sent by the client
app.use(cookieParser())

export { app };