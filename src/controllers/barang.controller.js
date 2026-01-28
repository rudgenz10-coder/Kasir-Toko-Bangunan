import Barang from '../models/Barang.js';
import Pemasok from "../models/Pemasok.js"

export default {
    async index(req, res) {
        const barang = await Barang.findAll({ include: {
            model: Pemasok, 
            as: 'pemasok' 
        }, order: [['kode', 'ASC']] });
        res.render('barang/index', {
            title: 'data barang',
            barang
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