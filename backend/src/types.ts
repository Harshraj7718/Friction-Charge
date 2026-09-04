export type PlanValue = "FC-60" | "FC-120" | "Not sure";

export type EnquiryInput = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  plan: PlanValue;
  message: string;
};

export type EnquiryRow = {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  plan: PlanValue;
  message: string | null;
  created_at: string;
};
