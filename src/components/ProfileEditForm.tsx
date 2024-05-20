"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { profileEditFormSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editProfileAction } from "@/lib/actions";

export default function ProfileEditForm(props: { profile: any }) {
  const profileEditForm = useForm<z.infer<typeof profileEditFormSchema>>({
    resolver: zodResolver(profileEditFormSchema),
    defaultValues: {
      firstname: props.profile.firstname,
      lastname: props.profile.lastname,
      email: props.profile.email,
    },
  });
  const onSubmit = async (data: any) => {
    try {
      await editProfileAction(data);
    } catch (error) {
      console.error("Failed to edit profile");
    }
  };
  return (
    <div className="space-y-4">
      <Form {...profileEditForm}>
        <form onSubmit={profileEditForm.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormField
                control={profileEditForm.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={profileEditForm.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <FormField
              control={profileEditForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="my-3 w-full" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
