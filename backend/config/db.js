const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ShravaniAnilPatil:<password>@cluster0.tspoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully to Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
