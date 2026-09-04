import { Router } from "express";
import { pool } from "../db.js";
import { validateEnquiry } from "../validate.js";

export const enquiriesRouter = Router();

enquiriesRouter.post("/", async (req, res) => {
  const result = validateEnquiry(req.body);
  if (!result.ok) {
    res.status(400).json({ errors: result.errors });
    return;
  }

  const { fullName, phone, email, city, plan, message } = result.value;

  try {
    const { rows } = await pool.query<{ id: number }>(
      `insert into enquiries (full_name, phone, email, city, plan, message)
       values ($1, $2, $3, $4, $5, $6)
       returning id`,
      [fullName, phone, email || null, city || null, plan, message || null]
    );
    res.status(201).json({ id: rows[0].id });
  } catch (error) {
    console.error("Failed to save enquiry:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});
