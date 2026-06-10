const mongoose = require('mongoose');

const connectToDb = async () => {
  await mongoose
    .connect(process.env.URI )
    .then(() => console.log('Connection Successful'))
    .catch(() => console.log('Connection Unsuccessful'));
};

module.exports = connectToDb;
