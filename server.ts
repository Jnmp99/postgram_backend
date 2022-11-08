require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/", require("./routes/users"));

app.use((err: any, req: any, res: any, next: any) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went wrong",
  });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running in PORT ${PORT}`));
