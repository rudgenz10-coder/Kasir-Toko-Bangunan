import { Pemasok } from "../models/index.js"

export default {
    async index(req, res) {

        const limit = 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const {count, rows: pemasok} = await Pemasok.findAndCountAll({
            limit,
            offset,
            order: [['id', 'DESC']]
        });

        const totalPage = Math.ceil(count / limit);
        res.render('pemasok/index', {
            title: 'Data Pemasok',
            pemasok,
            page,
            totalPage
        });
    },

    async create(req, res) {
        res.render('pemasok/form', {
            title: 'Tambah Pemasok',
            pemasok: {},
            action: '/pemasok/store',
        })
    },

    async store(req, res) {
        await Pemasok.create(req.body);
        res.redirect('/pemasok');
    },

    async edit(req,res) {
        const pemasok = await Pemasok.findByPk(req.params.id);
        res.render('pemasok/form', {
            title: 'Edit Pemasok',
            pemasok,
            action: `/pemasok/update/${pemasok.id}`,
        });
    },

    async update(req, res) {
        await Pemasok.update(req.body, {
            where: {id: req.params.id},
        });
        res.redirect('/pemasok');
    },

    async delete(req, res ) {
        await Pemasok.destroy({where: {id: req.params.id}});
        res.redirect('/pemasok');
    }
};