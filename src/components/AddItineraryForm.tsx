"use client";

import { useToast } from "./ui/use-toast";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { itineraryFormSchema, locationFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { addItineraryAction } from "@/lib/actions";

/**
 * Add Itinerary Form
 * @param props
 * @returns JSX.Element
 */
export default function AddItineraryForm(props: { location: string }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof itineraryFormSchema>>({
    resolver: zodResolver(itineraryFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itineraryDays",
  });

  const onSubmit: SubmitHandler<z.infer<typeof itineraryFormSchema>> = async (
    data
  ) => {
    try {
      await addItineraryAction(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="space-y-2 col-span-2">
          <Label>Itinerary Name</Label>
          <Input {...register("name")} placeholder="Name" />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="space-y-2 col-span-2">
          <Label>Itinerary Description</Label>
          <Input {...register("description")} placeholder="Description" />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="space-y-2 col-span-2">
          <Label>Location Name</Label>
          <Input {...register("locationName")} value={props.location} />
          {errors.locationName && <p>{errors.locationName.message}</p>}
        </div>
        <div className="space-y-2 col-span-2">
          <Label>Image URL</Label>
          <Input {...register("imageUrl")} placeholder="Image URL" />
          {errors.imageUrl && <p>{errors.imageUrl.message}</p>}
        </div>
        <div className="space-y-2 col-span-2">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Day {index + 1} name</Label>
                <Input
                  {...register(`itineraryDays.${index}.name`)}
                  placeholder="Day Name"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Day {index + 1} description</Label>
                <Input
                  {...register(`itineraryDays.${index}.description`)}
                  placeholder="Day Description"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Day {index + 1} image URL</Label>
                <Input
                  {...register(`itineraryDays.${index}.imageUrl`)}
                  placeholder="Day Image URL"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Button type="button" onClick={() => remove(index)}>
                  Remove Day
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          onClick={() => append({ name: "", description: "", imageUrl: "" })}
        >
          Add Day
        </Button>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
