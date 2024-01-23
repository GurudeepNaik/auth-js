import {
  createPasswordResetToken,
  getPasswordResetTokenByEmail,
  removeExistingPasswordResetToken,
} from "@/data/password-reset-token";
import {
  createVerificationToken,
  getVerificationTokenByEmail,
  removeExistingToken,
} from "@/data/verification-token";
import { v4 as uuid } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await removeExistingToken(existingToken);
  }

  const verificationToken = await createVerificationToken({
    email,
    token,
    expires,
  });

  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await removeExistingPasswordResetToken(existingToken);
  }

  const passwordResetToken = await createPasswordResetToken({
    email,
    token,
    expires,
  });

  return passwordResetToken;
};
