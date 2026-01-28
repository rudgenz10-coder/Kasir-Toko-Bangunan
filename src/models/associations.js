import Barang from '../models/Barang.js';
import Pemasok from '../models/Pemasok.js'; 
import Stok from '../models/Stok.js'
import Transaksi from '../models/Transaksi.js';
import Penjualan from '../models/Penjualan.js';

export default function applyAssociations() {
    Pemasok.hasMany(Barang, { 
        foreignKey: 'id_pemasok', 
        as: 'barang' 
    });

    Barang.belongsTo(Pemasok, { 
        foreignKey: 'id_pemasok', 
        as: 'pemasok' 
    });

    Barang.hasMany(Stok, {
        foreignKey: 'kode_barang',
        sourceKey: 'kode',
        as: 'detail_pemasok'
    });

    Stok.belongsTo(Barang, {
        foreignKey: 'kode_barang',
        targetKey: 'kode',
        as: 'barang'
    });

    Pemasok.hasMany(Stok, {
        foreignKey: 'id_pemasok',
        as: 'stok_pemasok'
    });

    Stok.belongsTo(Pemasok, {
        foreignKey: 'id_pemasok',
        as: 'pemasok'
    });

    // Transaksi -> Penjualan
    Transaksi.hasMany(Penjualan, {  
        foreignKey: "id_transaksi",
        as: "detail"
    });

    Penjualan.belongsTo(Transaksi, {    
        foreignKey: "id_transaksi",
        as: "transaksi"
    });

    // Barang -> Penjualan
    Barang.hasMany(Penjualan, { 
        foreignKey: "kode_barang",
        sourceKey: "kode",
        as: "penjualan"
    });

    Penjualan.belongsTo(Barang, {
        foreignKey: "kode_barang",
        targetKey: "kode",
        as: "barang"
    });


    console.log("Associations applied between Pemasok and Barang models.");
}

