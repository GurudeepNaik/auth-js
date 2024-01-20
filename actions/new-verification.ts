"use server";

import { getUserByEmail, updateEmailVerifiedAndEmailById } from "@/data/user";
import {
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  await updateEmailVerifiedAndEmailById(existingUser.id, existingToken.email);

  await deleteVerificationTokenById(existingToken.id);

  return { success: "Email verified!" };
};
