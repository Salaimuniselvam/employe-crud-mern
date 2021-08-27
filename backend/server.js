const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
const url = `mongodb+srv://employee:salary@cluster0.uikfl.mongodb.net/employe-data?retryWrites=true&w=majority`;

app.use(express.json());
app.use(cors());

mongoose.connect(
  url,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(JSON.stringify(err));
    } else {
      console.log("database connnected successfully");
    }
  }
);

const Router = require("./router/Router");
app.get('/', (req, res) => res.send("welcome to the employee crud app"))
app.use("/employeedata", Router);

app.listen(process.env.PORT || 5000, () => console.log("connected successfully"));
