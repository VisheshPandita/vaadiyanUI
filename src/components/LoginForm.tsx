"use client";

import { loginFormSchema, registerFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/lib/auth";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { loginAction } from "@/lib/actions";

export default function LoginForm() {
  const { toast } = useToast();
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = loginForm.handleSubmit(
    async (data: z.infer<typeof loginFormSchema>) => {
      try {
        await loginAction(data);
      } catch (error) {
        toast({
          description: "Wrong username or password. Please try again.",
        });
      }
    }
  );

  return (
    <div className="space-y-4">
      <Form {...loginForm}>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <FormField
              control={loginForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="lee123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="space-y-2 col-span-2 w-full" type="submit">
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
}
