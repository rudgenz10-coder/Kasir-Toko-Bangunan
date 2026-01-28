import Stok from '../models/Stok.js';
import Barang from '../models/Barang.js';
import Pemasok from '../models/Pemasok.js';

export default {
    async index(req, res) {
         const stok = await Stok.findAll({
            include: [
                {
                    model: Barang, as: 'barang'
                },
                {
                    model: Pemasok, as: 'pemasok'
                }
            ],
            order: [['id', 'ASC']]
         });

         res.render('stok/index', {
            title: 'Data Stok',
            stok
         });
    },
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