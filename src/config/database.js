import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
    {
        host: process.env.DB_HOST,  
        dialect: "mysql",
    }
);

(async () => {
    try {
        await db.authenticate();
        console.log("Database connected...");
    } catch (error) {
        console.error("Connection error:", error); 
    }
})();

export default db;  