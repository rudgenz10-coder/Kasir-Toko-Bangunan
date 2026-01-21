import { Sequelize } from "sequelize";
import { Barang, Pemasok, Stok, Transaksi, User} from "../models/index.js"

export default {
  async index(req, res) {

    const totalBarang = await Barang.count();
    const totalPemasok = await Pemasok.count();
    const totalStok = await Stok.count();
    const totalTransaksi = await Transaksi.count();
    const totalUser = await User.count();

    // === DATA UNTUK CHART (TRANSAKSI PER BULAN) ===
    const dataBulanan = await Transaksi.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("tanggal")), "bulan"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"]
      ],
      group: ["bulan"],
      order: [["bulan", "ASC"]]
    });

    // Format agar bisa dipakai di Chart.js
    const bulan = dataBulanan.map(t => t.dataValues.bulan);
    const jumlah = dataBulanan.map(t => t.dataValues.jumlah);


    const trxHarian = await Transaksi.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("tanggal")), "tanggal"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "jumlah"]
      ],
      group: ["tanggal"],
      order: [["tanggal", "ASC"]]
    });

    const tglHarian = trxHarian.map(t => t.dataValues.tanggal);
    const jumlahHarian = trxHarian.map(t => t.dataValues.jumlah);

    res.render("dashboard/index", {
      title: "Dashboard",
      totalBarang,
      totalPemasok,
      totalStok,
      totalTransaksi,
      totalUser,
      chartBulan: bulan,
      chartJumlah: jumlah,
      tglHarian,
      jumlahHarian,
      user: req.session.user
    });
  }
};
