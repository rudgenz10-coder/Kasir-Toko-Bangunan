import Stok from '../models/Stok.js';
import Barang from '../models/Barang.js';
import Pemasok from '../models/Pemasok.js';

export default {
    async index(req, res) {
  const limit = 10; // jumlah stok per halaman
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const { count, rows: stok } = await Stok.findAndCountAll({
    include: [
      { model: Barang, as: 'barang' },
      { model: Pemasok, as: 'pemasok' }
    ],
    order: [['id', 'ASC']],
    limit,
    offset
  });

  const totalPage = Math.ceil(count / limit);

  res.render('stok/index', {
    title: 'Data Stok',
    stok,
    currentPage: page,
    totalPage
  });
}
,
    async create(req, res) {
        const barang = await Barang.findAll();
        const pemasok = await Pemasok.findAll();

        res.render('stok/form', {
            title: 'Tambah Stok',
            stok: {},
            barang, 
            pemasok,
            action: '/stok/store',
        });
    },

    async store(req, res) {
        const { kode_barang, jumlah_masuk } = req.body;
        await Stok.create(req.body);

        const barang = await Barang.findByPk(kode_barang);
        barang.stok = barang.stok + Number(jumlah_masuk);
        await barang.save();

        res.redirect('/stok');
    }
}