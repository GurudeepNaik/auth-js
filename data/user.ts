import { db } from "@/lib/db";
import { User, VerificationToken } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const updateEmailVerifiedById = async (id: string) => {
  try {
    await db.user.update({
      where: { id },
      data: { emailVerified: new Date() },
    });
    return null;
  } catch (error) {
    return null;
  }
};

export const updateEmailVerifiedAndEmailById = async (
  id: string,
  email: string
) => {
  try {
    await db.user.update({
      where: { id },
      data: {
        emailVerified: new Date(),
        email,
      },
    });
    return null;
  } catch (error) {
    return null;
  }
};

export const createUser = async (
  email: string,
  name: string,
  hashedPassword: string
) => {
  try {
    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return null;
  }
};

export const updatePasswordById = async (id: string, password: string) => {
  try {
    await db.user.update({
      where: { id },
      data: { password },
    });
    return null;
  } catch (error) {
    return null;
  }
};
