import "dotenv/config";
import express from "express";
import cors from "cors";
import { enquiriesRouter } from "./routes/enquiries.js";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/enquiries", enquiriesRouter);

app.listen(port, () => {
  console.log(`Friction Charge backend listening on http://localhost:${port}`);
});
