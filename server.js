import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoute from './routes/userRoute.js';
import reviewRoutes from './routes/reviewRoutes.js'; // Import review routes

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route middlewares
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoutes); // Add review routes

// Default route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Resellify</h1>");
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT} `.bgCyan.white);
});
