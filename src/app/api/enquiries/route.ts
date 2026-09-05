import { NextRequest, NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";

type PlanValue = "FC-60" | "FC-120" | "Not sure";
const allowedPlans: PlanValue[] = ["FC-60", "FC-120", "Not sure"];

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ errors: { form: "Invalid request body." } }, { status: 400 });
  }

  // Honeypot — real users never fill this field. Fake success, no write, no
  // tell to the bot that anything was checked.
  if (str(body.website)) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const fullName = str(body.fullName);
  const phone = str(body.phone);
  const email = str(body.email);
  const city = str(body.city);
  const message = str(body.message);
  const plan: PlanValue = allowedPlans.includes(body.plan as PlanValue) ? (body.plan as PlanValue) : "Not sure";

  const errors: Record<string, string> = {};
  if (!fullName) errors.fullName = "Full name is required.";
  if (!phone) errors.phone = "Phone number is required.";
  else if (!/^[+0-9\s-]{7,15}$/.test(phone)) errors.phone = "Enter a valid phone number.";
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  try {
    const client = await getMongoClient();
    const collection = client.db("frictioncharge").collection("partnerEnquiries");

    await collection.insertOne({
      full_name: fullName,
      phone,
      email: email || null,
      city: city || null,
      interested_plan: plan,
      message: message || null,
      created_at: new Date(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Failed to save enquiry:", err);
    return NextResponse.json(
      { error: "Something went wrong while submitting your enquiry. Please try again." },
      { status: 500 }
    );
  }
}
