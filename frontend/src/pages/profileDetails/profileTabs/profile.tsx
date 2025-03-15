import { BlurFade } from "@/components/blur-fade";
import { TextInput } from "@/components/text-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getValidName } from "@/helper/utils";
import { queryClient } from "@/services/client";
import { updateProfile } from "@/services/profile.api";
import { getUserDetails } from "@/services/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Invalid email address.",
    })
    .optional(),
});

const Profile = () => {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserDetails(),
  });

  const user = data?.result;

  const { mutate, isPending } = useMutation({
    mutationKey: ["profile"],
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      const result = await updateProfile(getValidName(data.username));
      console.log(result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast("User profile updated");
    },
    onError: () => {
      toast.error("Failed to update user profile");
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      mutate(data);
    },
    [mutate]
  );
  return (
    <BlurFade delay={0.25 * 0.05}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold md:text-lg text-base text-foreground/50">
                  User Name
                </FormLabel>
                <FormControl>
                  <TextInput
                    placeholder="User Name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold md:text-lg text-base text-foreground/50">
                  Email
                </FormLabel>
                <FormControl>
                  <TextInput
                    placeholder="Email"
                    {...field}
                    className="rounded-xl"
                    readOnly
                  />
                </FormControl>
                <FormDescription>
                  Note: You cant update your email
                </FormDescription>
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
              Update Info
            </Button>
          </div>
        </form>
      </Form>
    </BlurFade>
  );
};

export default Profile;
