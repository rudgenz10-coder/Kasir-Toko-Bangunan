import User from "../models/User.js";
import bcrypt from "bcrypt";

export default {
    async index(req, res) {
        const user = await User.findAll();
        res.render('users/index', {
            title: 'user page', 
            user
        })
    },

    async create(req, res) {
        res.render('users/form', {
            title: 'create user page',
            action: '/users/store',
            user: {}
        })
    },

    async store(req, res) {
        const { username, email, password } = req.body;

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.redirect('/users');
    },

    async edit(req, res) {
        const user = await User.findByPk(req.params.id);
        res.render('users/form', {
            title: 'edit user', 
            action: `/users/update/${req.params.id}`,
            user
        })
    },

    async update(req, res) {
        const { username, email, password } = req.body;

        // Jika password tidak diisi → jangan diganti
        if (!password || password.trim() === "") {
            await User.update(
                { username, email }, 
                { where: { id: req.params.id } }
            );
        } else {
            // Jika password diisi → hash baru
            const hashedPassword = await bcrypt.hash(password, 10);

            await User.update(
                { username, email, password: hashedPassword },
                { where: { id: req.params.id } }
            );
        }

        res.redirect('/users');
    },

    async delete(req, res) {
        await User.destroy({
            where: {id : req.params.id}
        });
        
        res.redirect('/users');
    }
}
