import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
  } catch (error) {
    return null;
  }
};

export const createTwoFactorConfirmation = async (userId: string) => {
  try {
    return await db.twoFactorConfirmation.create({
      data: { userId },
    });
  } catch (error) {
    return null;
  }
};

export const deleteTwoFactorConfirmationById = async (id: string) => {
  try {
    return await db.twoFactorConfirmation.delete({
      where: { id: id },
    });
  } catch (error) {
    return null;
  }
};
