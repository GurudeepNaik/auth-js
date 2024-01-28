"use server";

import { signIn } from "@/auth";
import {
  createTwoFactorConfirmation,
  deleteTwoFactorConfirmationById,
  getTwoFactorConfirmationByUserId,
} from "@/data/two-factor-confirmation";
import {
  getTwoFactorTokenByEmail,
  removeExistingTwoFactorToken,
} from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import * as z from "zod";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken?.email || "",
      verificationToken?.token || ""
    );
    return { success: "Confirmation email sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await removeExistingTwoFactorToken(twoFactorToken.id);

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await deleteTwoFactorConfirmationById(existingConfirmation.id);
      }

      await createTwoFactorConfirmation(existingUser.id);
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorEmail(
        twoFactorToken?.email || "",
        twoFactorToken?.token || ""
      );

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (callbackUrl) {
      redirect(callbackUrl);
    } else {
      redirect(DEFAULT_LOGIN_REDIRECT);
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
  return { success: "Email sent!" };
};
