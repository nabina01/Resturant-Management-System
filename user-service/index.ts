const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

dotenv.config({ path: path.resolve(__dirname, ".env"), override: true, silent: true });

const router = require("./src/routes/route").default;
const swaggerSpec = require("./src/config/swagger").default;

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:2000";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

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