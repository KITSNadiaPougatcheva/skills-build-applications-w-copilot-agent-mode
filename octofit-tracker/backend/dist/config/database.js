import mongoose from 'mongoose';
export const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const db = mongoose.connection;
export async function connectToDatabase(uri = connectionString) {
    if (db.readyState === 1) {
        return db;
    }
    try {
        await mongoose.connect(uri);
        console.log('Connected to octofit_db');
        return db;
    }
    catch (error) {
        console.error('Error connecting to octofit_db:', error);
        throw error;
    }
}
db.on('error', console.error.bind(console, 'connection error:'));
export default db;
