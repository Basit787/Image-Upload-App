"use client";
import { BlurFade } from "@/components/blur-fade";
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
import { deleteAccount } from "@/services/profile.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
const DeleteAccount = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      const result = await deleteAccount(data.password);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteAccount"] });
      Cookies.remove("token");
      toast("Account deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete account");  
      form.setError("password", {
        type: "manual",
        message: "Invalid password",
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
    <BlurFade delay={0.25 * 0.05} className="space-y-4  ">
      <p className="text-foreground/50 text-justify">
        <span className="font-bold">Warning:</span> Deleting your account will
        permanently erase all your data and cannot be reversed. Are you sure you
        want to go ahead with deleting your account? Enter your password to
        confirm.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold md:text-lg text-base text-foreground/50">
                  Your Password
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

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="h-12 md:text-lg text-base p-4"
              disabled={isPending}
            >
              <Trash2 />
              <span>Delete Account</span>
            </Button>
          </div>
        </form>
      </Form>
    </BlurFade>
  );
};

export default DeleteAccount;
