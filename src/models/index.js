import Barang from "./Barang.js";
import Pemasok from "./Pemasok.js";
import Penjualan from "./Penjualan.js";
import Stok from "./Stok.js";
import Transaksi from "./Transaksi.js";
import User from "./User.js";
import applyAssociations from "./associations.js";


applyAssociations();

export {
    Barang,
    Pemasok,
    Penjualan,
    Stok,
    Transaksi,
    User
};