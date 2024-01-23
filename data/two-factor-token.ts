import { db } from "@/lib/db";
import { TwoFactorToken } from "@prisma/client";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const removeExistingTwoFactorToken = async (id: string) => {
  try {
    await db.twoFactorToken.delete({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};

export const createTwoFactorToken = async ({
  email,
  token,
  expires,
}: {
  email: string;
  token: string;
  expires: Date;
}) => {
  try {
    const twoFactorToken = await db.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};

export const deleteTwoFactorTokenById = async (id: string) => {
  try {
    await db.twoFactorToken.delete({
      where: { id: id },
    });
  } catch (error) {
    return null;
  }
};
