const Contact = require('../models/Model.contact.js')
const router = require("express").Router();
router.post("/", async (req, res) => {
    try {
        // Perform validation for the contact form data (not implemented here)

        // Create a new contact using the data from the request body
        const newContact = new Contact({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            message: req.body.message
        });

        // Save the new contact to the database
        await newContact.save();

        // Respond with success message
        res.status(201).send({ message: "Contact form submitted successfully" });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
