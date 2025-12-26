const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erreur de connexion à la BDD : ${error.message}`);
        // 0 => "OK"
        // 1 => "Erreur"
        process.exit(1);
    }
};

module.exports = connectDB;