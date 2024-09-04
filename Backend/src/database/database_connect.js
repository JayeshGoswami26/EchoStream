import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const dataBaseConnect = async () => {
    try {
        const connectionDetails = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );
        console.log(
            `Database connected successfully :: Host Name :: ${connectionDetails.connection.host}`
        );
    } catch (error) {
        console.log(`Failed to connect to Database :: Error :: ${error}`);
        process.exit(1);
    }
};

export default dataBaseConnect;
