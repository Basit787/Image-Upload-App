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
import { queryClient } from "@/services/client";
import { updatePassword } from "@/services/profile.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

  const { mutate, isPending } = useMutation({
    mutationKey: ["password"],
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      const result = await updatePassword(
        data.currentPassword,
        data.newPassword
      );
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["password"] });
      toast("Password updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      form.setError("currentPassword", {
        type: "manual",
        message: "Invalid current password",
      });
    },
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      mutate(data);
    },
    [mutate]
  );

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
          <Button
            type="submit"
            className="h-12 md:text-lg text-base p-4"
            disabled={isPending}
          >
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Password;
