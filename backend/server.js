const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/mongoose");
const connectCloudinary = require("./config/cloudinary");

const dotenv = require("dotenv");
dotenv.config();
const adminRouter = require("./routes/adminRoute");
const doctorRouter = require("./routes/doctorRoute");
const userRouter = require("./routes/userRoute");

const app = express();
const port = process.env.PORT;

connectToDb();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Api endpoints

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => res.json("Hello Server"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
