"use server";

import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  //TODO: Generate Token and Send Email

  return { success: "Reset email sent!" };
};
