const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Define validation schema
const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
});

router.post("/", async (req, res) => {
    try {
        // Validate request body
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        // Compare passwords
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        // Generate authentication token
        const token = user.generateAuthToken();
        const name=user.email.split('@')[0];
        const email=user.email;
        console.log(email);
        
        res.status(200).send({ data: token, message: "Logged in successfully" ,name:name,email:email});
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
