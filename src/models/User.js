import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/database.js";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,

    hooks: {
      // HASH SAAT CREATE
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },

      // HASH SAAT UPDATE PASSWORD
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

// export const seedAdmin = async () => {
//   await User.findOrCreate({
//     where: { email: "admin.dmail.com" },
//     defaults: {
//       username: "admin",
//       email: "admin.com",
//       password: "admin123", // auto hash dari hook
//     },
//   });
// };

export default User;