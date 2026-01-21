import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Stok = db.define('Stok', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    }, 
    kode_barang: DataTypes.STRING,
    id_pemasok: DataTypes.INTEGER,
    tanggal_masuk: DataTypes.DATEONLY,
    harga_beli: DataTypes.INTEGER,
    jumlah_masuk: DataTypes.INTEGER,
}, {
    timestamps: false,
    freezeTableName: true,
})

export default Stok;