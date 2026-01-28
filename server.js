import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import db from './src/config/database.js';
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_default',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60}
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(express.static(path.join(__dirname, '../src/public')));

import pemasokRoutes from './src/routes/pemasok.route.js';
import barangRoutes from './src/routes/barang.route.js';
import transaksiRoutes from './src/routes/transaksi.route.js';
import StokRoutes from './src/routes/stok.route.js';
import UserRoutes from './src/routes/user.route.js';
import applyAssociations from './src/models/associations.js';
import authRouters from './src/routes/auth.route.js';
import dashboardRoute from './src/routes/dashboard.route.js';
import User from './src/models/User.js';

app.use('/auth', authRouters);
app.use("/dashboard", dashboardRoute);


app.use('/pemasok', pemasokRoutes);
app.use('/barang', barangRoutes);
app.use('/stok', StokRoutes);
app.use('/transaksi', transaksiRoutes);
app.use('/users', UserRoutes);

applyAssociations();

// db.sync().then(async () => {
//     console.log("Database synced...");
//     await User.seed()
// }).catch((err) => {
//     console.error("Sync error:", err);
// });

// app.listen(process.env.PORT || 3000, () => {
//     console.log(`Server dalam teng mriki ${process.env.PORT || 3000}`);
// });

export default app;