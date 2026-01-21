
import Transaksi from "../models/Transaksi.js";
import Penjualan from "../models/Penjualan.js";
import Barang from "../models/Barang.js";

export default {
    async index(req, res) {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      const totalData = await Transaksi.count();

  const transaksi = await Transaksi.findAll({
    order: [["id", "ASC"]],
    limit,
    offset
  });

  const totalPage = Math.ceil(totalData / limit);

  res.render("transaksi/index", {
    title: "Data Transaksi Penjualan",
    transaksi,
    page,
    totalPage
  });
}, 

  async create(req, res) {
  const barang = await Barang.findAll();

  res.render("transaksi/form", {
    title: "Transaksi Penjualan",
    barang
  });
}, 

  async store(req, res) {
  try {
    const { total, bayar, kembalian } = req.body;

    // FORM MENGIRIM ARRAY BEGINI:
    const kode_barang = req.body.kode_barang;  // array
    const harga = req.body.harga;
    const jumlah = req.body.jumlah;
    const subtotal = req.body.subtotal;

    console.log("KODE:", kode_barang);
    console.log("HARGA:", harga);
    console.log("JUMLAH:", jumlah);
    console.log("SUBTOTAL:", subtotal);

    // Cek apakah ada item
    if (!kode_barang || !Array.isArray(kode_barang)) {
      return res.send("ERROR: Item tidak ditemukan!");
    }

    // Buat transaksi
    const trx = await Transaksi.create({
      tanggal: new Date(),
      total,
      bayar,
      kembalian
    });

    // Loop simpan item
    for (let i = 0; i < kode_barang.length; i++) {
      await Penjualan.create({
        id_transaksi: trx.id,
        kode_barang: kode_barang[i],
        jumlah: jumlah[i],
        harga: harga[i],
        subtotal: subtotal[i]
      });

      // Update stok
      const barang = await Barang.findByPk(kode_barang[i]);
      barang.stok = barang.stok - Number(jumlah[i]);
      await barang.save();
    }

    res.redirect(`/transaksi/detail/${trx.id}`);

  } catch (err) {
    console.log(err);
    res.send("Error: " + err.message);
  }
},
    async detail(req, res) {
  const trx = await Transaksi.findByPk(req.params.id, {
    include: [
      { model: Penjualan, as: "detail", include: [{ model: Barang, as: "barang" }] }
    ]
  });

  res.render("transaksi/detail", {
    title: "Detail Transaksi",
    trx
  });
},

}