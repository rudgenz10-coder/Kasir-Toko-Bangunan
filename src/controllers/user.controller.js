
import User from "../models/User.js";

export default {
  // LIST USER + PAGINATION
  async index(req, res) {
      const limit = 10; // jumlah user per halaman
      const page = parseInt(req.query.page) || 1;
      const offset = (page - 1) * limit;

      const { count, rows: users } = await User.findAndCountAll({
        limit,
        offset,
        order: [["id", "DESC"]],
        attributes: { exclude: ["password"] } // jangan tampilkan password
      });

      const totalPage = Math.ceil(count / limit);

      res.render("users/index", {
        title: "User Page",
        users,
        currentPage: page,
        totalPage
      });
  },

  // FORM CREATE USER
  async create(req, res) {
      res.render("users/form", {
        title: "Create User Page",
        action: "/users/store",
        user: {}
      });
  },

  // STORE USER
  async store(req, res) {
    try {
      const { username, email, password } = req.body;

      await User.create({
        username,
        email,
        password // akan otomatis ke-hash oleh hook model
      });

      res.redirect("/users");
    } catch (err) {
      console.error(err);
      res.render("users/form", {
        title: "Create User Page",
        action: "/users/store",
        user: req.body,
        error: err.message
      });
    }
  },

  // FORM EDIT USER
  async edit(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] }
      });

      if (!user) return res.redirect("/users");

      res.render("users/form", {
        title: "Edit User",
        action: `/users/update/${req.params.id}`,
        user
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Terjadi kesalahan saat menampilkan form edit.");
    }
  },

  // UPDATE USER (FIX HASH PASSWORD)
async update(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) return res.redirect("/users");

    user.username = username;
    user.email = email;

    if (password && password.trim() !== "") {
      user.password = password; // AKAN DI-HASH oleh beforeUpdate
    }

    await user.save(); // 🔥 trigger hook

    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan saat update user.");
  }
},

  // DELETE USER
  async delete(req, res) {
    try {
      await User.destroy({ where: { id: req.params.id } });
      res.redirect("/users");
    } catch (err) {
      console.error(err);
      res.status(500).send("Terjadi kesalahan saat menghapus user.");
    }
  }
};