require("dotenv").config();
const mongoose = require ("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("Connected");
    } catch (error) {
        console.log(error);
    }
}
connection();