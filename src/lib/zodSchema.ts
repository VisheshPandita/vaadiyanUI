import { z } from "zod";

/**
 * Zod schema for the registration form
 */
export const registerFormSchema = z
  .object({
    firstname: z.string().min(2).max(255),
    lastname: z.string().min(2).max(255),
    username: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

/**
 * Zod schema for the login form
 */
export const loginFormSchema = z.object({
  username: z.string().min(2).max(255),
  password: z.string().min(8).max(255),
});

/**
 * Zod schema for the profile edit form
 */
export const profileEditFormSchema: any = z.object({
  firstname: z.string().min(2).max(255),
  lastname: z.string().min(2).max(255),
  email: z.string().email(),
});

export const organizationFormSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
});

/**
 * Zod schema for the location form
 */
export const locationFormSchema = z.object({
  name: z.string().min(2),
  country: z.string().min(2).max(255),
  subHeading: z.string().min(2),
  description: z.string().min(2),
  imageUrl: z.string().min(2),
});

/**
 * Zod schema for the itinerary form
 */
export const itineraryFormSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  locationName: z.string().min(2),
  imageUrl: z.string().min(2),
  itineraryDays: z.array(
    z.object({
      name: z.string().min(2),
      description: z.string().min(2),
      imageUrl: z.string().min(2),
    })
  ),
});
