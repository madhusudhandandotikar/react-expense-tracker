const mongoose = require('mongoose');

const db = async () => {
    try {
        // mongoose.set('StrictQuery', false)
        mongoose.set('strict', false);
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB Connected')
    } catch (error) {
        console.log('error');
    }
}


module.exports = {db}