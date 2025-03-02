const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_CONN;

mongoose.connect(mongoURL)
    .then(()=>{
        console.log('MongoDB Connected........');
    })
    .catch(err => {
        console.log(err);
    })