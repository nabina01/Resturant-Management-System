const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
import router from "./src/routes/route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;