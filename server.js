const app = require('./app');
const mongoose = require('mongoose');

const { DB_HOST, PORT = 3000 } = process.env;

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT);
//     console.log(`Server running. Database connection successful Use our API on port: ${PORT} `);
//   })
//   .catch(error => {
//     console.log('Error connecting to database', error.message);
//     process.exit(1);
//   });

const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log(`Database connection successful`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
});
