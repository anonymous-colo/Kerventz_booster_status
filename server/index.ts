import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Exemple de route test
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// TODO : importe et utilise ici tes vraies routes
// import myRoutes from "./routes";
// app.use("/api", myRoutes);

export default app;
