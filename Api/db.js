const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB + "/epics", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1);
    }
};
