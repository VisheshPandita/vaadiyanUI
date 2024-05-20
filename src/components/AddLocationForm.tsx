"use client";

import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { locationFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addLocationAction } from "@/lib/actions";

export default function AddLocationForm() {
  const router = useRouter();
  const { toast } = useToast();
  const locationForm = useForm<z.infer<typeof locationFormSchema>>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      name: "",
      country: "",
      subHeading: "",
      description: "",
      imageUrl: "",
    },
  });
  const onSubmit = locationForm.handleSubmit(
    async (data: z.infer<typeof locationFormSchema>) => {
      try {
        await addLocationAction(data);
      } catch (error) {
        toast({
          description: "Failed to add location. Please try again.",
        });
      }
    }
  );
  return (
    <div className="space-y-4">
      <Form {...locationForm}>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <FormField
              control={locationForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <FormField
              control={locationForm.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <FormField
              control={locationForm.control}
              name="subHeading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Heading</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <FormField
              control={locationForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <FormField
              control={locationForm.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="space-y-2 col-span-2 w-full" type="submit">
            Create Location
          </Button>
        </form>
      </Form>
    </div>
  );
}
