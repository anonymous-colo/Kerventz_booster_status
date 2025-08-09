import express from "express";
import cors from "cors";
import serverless from "serverless-http";

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

export default serverless(app);

// Mode développement local
if (process.env.LOCAL_DEV === "true") {
  const port = parseInt(process.env.PORT || "5000", 10);
  app.listen(port, "0.0.0.0", () => {
    console.log(`Serveur local sur http://0.0.0.0:${port}`);
  });
}
