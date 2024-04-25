const router = require("express").Router();
const { User, validate } = require("../models/user");

const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        // Validate the request body
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "User with the given email already exists" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user with hashed password
        user = new User({ ...req.body, password: hashedPassword });
        await user.save();

        // Respond with success message
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});




module.exports = router;
