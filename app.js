import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';

// Routes
import pemasokRoutes from './src/routes/pemasok.route.js';
import barangRoutes from './src/routes/barang.route.js';
import transaksiRoutes from './src/routes/transaksi.route.js';
import stokRoutes from './src/routes/stok.route.js';
import userRoutes from './src/routes/user.route.js';
import authRoutes from './src/routes/auth.route.js';
import dashboardRoute from './src/routes/dashboard.route.js';

dotenv.config();

const app = express();


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_default',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// view engine ejs
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(expressLayouts);
app.set('layout', 'layouts/main');

//static file
app.use(express.static('./src/public'));

//routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoute);

app.use('/pemasok', pemasokRoutes);
app.use('/barang', barangRoutes);
app.use('/stok', stokRoutes);
app.use('/transaksi', transaksiRoutes);
app.use('/users', userRoutes);

export default app;
