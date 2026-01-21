import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Pemasok = db.define('Pemasok', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    nama_supplier: {
        type: DataTypes.STRING,
        allowNull: false   
    },
    no_telp: {
        type: DataTypes.STRING 
    },
    alamat: {
        type: DataTypes.TEXT 
    },
    keterangan: {
        type: DataTypes.TEXT 
    }
}, {
    timestamps: false,
    fresseTableName: true,
});

export default Pemasok;