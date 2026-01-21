import Barang from '../models/Barang.js';
import Pemasok from "../models/Pemasok.js"

export default {
    async index(req, res) {
  const limit = 10; // jumlah barang per halaman
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const { count, rows: barang } = await Barang.findAndCountAll({
    include: {
      model: Pemasok,
      as: 'pemasok'
    },
    order: [['kode', 'ASC']],
    limit,
    offset
  });

  const totalPage = Math.ceil(count / limit);

  res.render('barang/index', {
    title: 'Data Barang',
    barang,
    currentPage: page,
    totalPage
  });
},

    async create(req, res) {
        const pemasok =await Pemasok.findAll();
        res.render('barang/form', {
            title: 'Tambah Barang',
            barang: {},
            pemasok,
            action: '/barang/store',
        })
    },

    async store(req, res) {
        await Barang.create(req.body);
        res.redirect('/barang');
    }, 

    async edit(req, res) {
        const barang = await Barang.findByPk(req.params.kode);
        const pemasok = await Pemasok.findAll();
        res.render('barang/form', {
            title: 'Edit Barang',
            barang,
            pemasok,
            action: `/barang/update/${barang.kode}`,
        });
    },

    async update(req, res ) {
        await Barang.update(req.body, {
            where: {kode: req.params.kode},
        });
        res.redirect('/barang');
    },

    async delete(req, res) {
        await Barang.destroy({where: {kode: req.params.kode}});
        res.redirect('/barang');
    }


}