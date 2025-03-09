import { TextInput } from "@/components/text-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "New password must be at least 8 characters.",
    }),
    reTypePassword: z.string().min(8, {
      message: "Retyped password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.reTypePassword, {
    message: "New password and Retyped password must match.",
    path: ["reTypePassword"],
  });

const Password = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      reTypePassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold md:text-lg text-base text-foreground/50">
                Current Password
              </FormLabel>
              <FormControl>
                <TextInput
                  type="password"
                  placeholder="Current Password"
                  {...field}
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold md:text-lg text-base text-foreground/50">
                New Password
              </FormLabel>
              <FormControl>
                <TextInput
                  type="password"
                  placeholder="New Password"
                  {...field}
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reTypePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold md:text-lg text-base text-foreground/50">
                Re-Type New Password
              </FormLabel>
              <FormControl>
                <TextInput
                  type="password"
                  placeholder="Re-Type New Password"
                  {...field}
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" className="h-12 md:text-lg text-base p-4">
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Password;
