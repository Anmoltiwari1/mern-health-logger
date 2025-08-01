const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes=require("./routes/auth");
const HealthRoutes=require("./routes/Healthroute");
const dashboard=require("./routes/dashboard");
const GoalRoutes=require("./routes/goalroutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Health logger is running");
});

app.use("/api/auth",authRoutes);
app.use("/api/Home",HealthRoutes);
app.use("/api/dashboard",dashboard);
app.use("/api/goal",GoalRoutes);



const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
