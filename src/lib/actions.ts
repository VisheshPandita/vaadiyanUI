"use server";

import { z } from "zod";
import { getSession, login, register, updateSession } from "./auth";
import { loginFormSchema, registerFormSchema } from "./zodSchema";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

/////// auth actions /////////
export async function loginAction(formData: z.infer<typeof loginFormSchema>) {
  await login(formData);
  redirect("/home");
}

export async function registerAction(
  formData: z.infer<typeof registerFormSchema>
) {
  await register(formData);
  redirect("/home");
}

/////// profile actions /////////

export async function editProfileAction(formData: any) {
  const session = await getSession();
  const profileReqData = {
    firstname: formData["firstname"],
    lastname: formData["lastname"],
    username: session.data.user.username,
    email: formData["email"],
  };
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/users/${session.data.user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify(profileReqData),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.log(error);
    console.error("Failed to edit profile");
  }
  revalidateTag("profile");
  redirect(`/home/profile/${session.data.user.username}`);
}

/////// book now actions /////////

export async function bookNowAction(formData: FormData) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/itinerary/book`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify({
          itineraryId: formData.get("itineraryId"),
        }),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.log(error);
    console.error("Failed to book itinerary");
  }
  revalidateTag("bookings");
  redirect(`/home/package/${formData.get("itineraryId")}/bookings`);
}

/////// location actions /////////

export async function addLocationAction(formData: any) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/location`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.log(error);
    console.error("Failed to add location");
  }
  revalidateTag("locations");
  redirect(`/home/admin/location`);
}

export async function editLocationAction(formData: any) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/location/${formData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.log(error);
    console.error("Failed to edit location");
  }
  revalidateTag("locations");
  redirect(`/home/admin/location`);
}

export async function deleteLocationAction(formData: FormData) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/location/${formData.get(
        "locationId"
      )}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.log(error);
    console.error("Failed to delete location");
  }
  revalidateTag("locations");
}

/////// itinerary actions /////////

export async function deleteItineraryAction(formData: FormData) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/itinerary/${formData.get(
        "itineraryId"
      )}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.log(error);
    console.error("Failed to delete itinerary");
  }
  revalidateTag("itineraries");
}

export async function addItineraryAction(formData: any) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/itinerary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.log(error);
    console.error("Failed to add itinerary");
  }
  revalidateTag("itineraries");
  redirect(`/home/admin/location/${formData.locationName}`);
}
