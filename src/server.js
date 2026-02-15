const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config({ path: path.resolve(__dirname, "../.env") }); 
connectDB();

const app = express();

app.use(express.json());

// ROUTES
app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));
app.use("/api/lessons", require("./routes/lessonRoutes"));

app.get("/", (req, res) => {
  res.send("Online Course Platform API is running...");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));