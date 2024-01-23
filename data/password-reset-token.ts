import { db } from "@/lib/db";
import { PasswordResetToken } from "@prisma/client";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordToken = db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordToken;
  } catch (error) {
    return null;
  }
};

export const removeExistingPasswordResetToken = async (
  existingToken: PasswordResetToken
) => {
  try {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  } catch (error) {
    null;
  }
};

export const createPasswordResetToken = async ({
  email,
  token,
  expires,
}: {
  email: string;
  token: string;
  expires: Date;
}) => {
  try {
    const passwordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const deletePasswordResetTokenById = async (id: string) => {
  try {
    await db.passwordResetToken.delete({
      where: { id: id },
    });
  } catch (error) {
    return null;
  }
};
