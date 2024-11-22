import express from 'express';
import Review from '../models/reviewModel.js';

const router = express.Router();

// Add a review
router.post('/add', async (req, res) => {
    const { productId, title, text, rating } = req.body;
    if (!productId || !title || !text || !rating) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const review = new Review({ productId, title, text, rating });
        await review.save();
        res.status(201).json({ success: true, message: "Review added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Get reviews for a specific product
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ productId });
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;
