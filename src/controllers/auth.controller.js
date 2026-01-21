import User from "../models/User.js";
import bcrypt from "bcrypt";

export default {
    loginForm(req, res) {
        res.render("auth/login", { title: "Login Page", layout: false});
    },

    async login(req, res) {
        console.log("REQ BODY:", req.body);
        console.log("EMAIL:", req.body.email);

        const { email, password } = req.body;
        const user = await User.findOne({ where: {email}});

        if (!user) {
            return res.render("auth/login", {
                title: "Login Page",
                error: "User not found"
            }); 
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render("auth/login", {
                title: "Login Page",
                error: `Invalid password`
            });
            console.log(`${password}`);
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };  
        res.redirect("/dashboard");
    },

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.redirect("/dashboard");
            }
            res.clearCookie("connect.sid");
            res.redirect("/auth/login");
        });
    }
    
}