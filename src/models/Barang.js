import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Barang = db.define('Barang', {
    kode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nama_barang: DataTypes.STRING,
    jenis_barang: DataTypes.STRING,
    satuan_barang: DataTypes.STRING,
    harga_barang: DataTypes.INTEGER,
    id_pemasok: DataTypes.INTEGER,
}, {
    timestamps: false,
    freezeTableName: true,
})

export default Barang;