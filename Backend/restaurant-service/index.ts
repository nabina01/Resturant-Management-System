const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env"), override: true });

const router = require("./src/routes/route").default;

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:2000";
const PORT = Number(process.env.PORT || 3001);

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use("/api", router);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err?.statusCode || 500).json({
    message: err?.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Restaurant service running on port ${PORT}`);
});

export default app;
