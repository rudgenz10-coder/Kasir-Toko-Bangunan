// src/models/Penjualan.js
import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Penjualan = db.define("penjualan_barang", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_transaksi: DataTypes.INTEGER,
  kode_barang: DataTypes.STRING,
  jumlah: DataTypes.INTEGER,
  harga: DataTypes.INTEGER,
  subtotal: DataTypes.INTEGER
}, {
  timestamps: false
});

export default Penjualan;
