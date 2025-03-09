"use client";
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
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="space-y-4  ">
      <p className="text-foreground/50 text-justify">
        <span className="font-bold">Warning:</span> Deleting your account will
        permanently erase all your data and cannot be reversed. This includes
        your profile, conversations, comments, and any other info linked to your
        account. Are you sure you want to go ahead with deleting your account?
        Enter your password to confirm.
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
            <Button type="submit" className="h-12 md:text-lg text-base p-4">
              <Trash2 />
              <span>Delete Account</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DeleteAccount;
