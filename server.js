import app from './app.js';
import db from './src/config/database.js';

const PORT = process.env.PORT || 3000;

db.sync()
    .then(() => {
        console.log('Database synced...');
    })
    .catch((err) => {
        console.error('Sync error:', err);
    });

//server
app.listen(PORT, () => {
    console.log(`Server dalam teng mriki ${PORT}`);
});
