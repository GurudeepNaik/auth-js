"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { getUserByEmail, updatePasswordById } from "@/data/user";
import {
  getPasswordResetTokenByToken,
  deletePasswordResetTokenById,
} from "@/data/password-reset-token";
import { NewPasswordSchema } from "@/schemas";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string
) => {
  if (!token) {
    return { error: "Missing Token" };
  }

  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validateFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await updatePasswordById(existingUser.id, hashedPassword);

  await deletePasswordResetTokenById(existingToken.id);

  return { success: "Password updated!" };
};
