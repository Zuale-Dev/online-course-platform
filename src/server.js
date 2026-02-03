const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// 1. Ngarkimi i konfigurimeve
dotenv.config();

// 2. Lidhja me Databazën
connectDB();

// 3. Inicializimi i APP (DUHET TË JETË KËTU LART)
const app = express();

// 4. Middleware për leximin e JSON
app.use(express.json());

// 5. Lidhja e Rrugëve (Routes) - PAS inicializimit të app
app.use("/api/users", require("./routes/authRoutes"));

// 6. Home Route
app.get("/", (req, res) => {
    res.send("Online Course Platform API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});