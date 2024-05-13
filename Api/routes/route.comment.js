const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Model.comment.js')
const mongoose = require('mongoose')

// GET all testimonials
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new testimonial
// POST a new testimonial
router.post('/testimonials', async (req, res) => {
    try {
       
        const testimonial = new Testimonial({
            username: req.body.username,
            email: req.body.email,
            comment: req.body.comment,
            rating: req.body.rating
        });

       
        if (filter.isProfane(testimonial.comment)) {
            return res.status(400).json({ message: 'Your testimonial contains inappropriate language.' });
        }

        
        const newTestimonial = await testimonial.save();

        
        res.status(201).json(newTestimonial);
    } catch (err) {
      
        res.status(400).json({ message: err.message });
    }
});

// DELETE a testimonial
router.delete('/testimonials/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid testimonial ID' });
        }

        // Find the testimonial by ID and delete it
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        // Check if the testimonial exists
        if (!deletedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        // Return a success message
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
        console.error('Error deleting testimonial:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});





module.exports = router;
