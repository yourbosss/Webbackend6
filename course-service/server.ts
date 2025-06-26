import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5002;
const MONGO_URL = process.env.MONGO_URL || '';

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Course-service connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Course-service running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
