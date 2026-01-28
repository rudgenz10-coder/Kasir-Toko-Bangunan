import { DataTypes } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcrypt";

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    timestamps: false,
    freezeTableName: true,
});

User.seed = async () => {
    try {
        const count = await User.count();
        if (count === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                username: 'admin',
                email: 'admin@mail.com',
                password: hashedPassword
            });
            console.log("✅ Seed User Berhasil!");
        }
    } catch (error) {
        console.error("❌ Seed Gagal:", error);
    }
};

export default User;