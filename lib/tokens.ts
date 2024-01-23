import { v4 as uuid } from "uuid";
import crypto from "crypto";

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
import {
  createTwoFactorToken,
  getTwoFactorTokenByEmail,
  removeExistingTwoFactorToken,
} from "@/data/two-factor-token";

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

export const generatePasswordResetToken = async (email: string) => {
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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await removeExistingTwoFactorToken(existingToken.id);
  }

  const passwordResetToken = await createTwoFactorToken({
    email,
    token,
    expires,
  });

  return passwordResetToken;
};
