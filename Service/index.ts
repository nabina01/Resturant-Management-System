import express from "express";
import dotenv from "dotenv";
import router from "./routes/route";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", router);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});