// src/models/Transaksi.js
import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Transaksi = db.define("transaksi", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tanggal: DataTypes.DATE,
  total: DataTypes.INTEGER,
  bayar: DataTypes.INTEGER,
  kembalian: DataTypes.INTEGER
}, {
  timestamps: false
});

export default Transaksi;
