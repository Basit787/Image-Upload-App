"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSignModeContext } from "@/context/SignMode.Context";

const FormSchema = z.object({
  email: z.string().email({ message: "Email should be in proper format" }),
  password: z
    .string()
    .min(8, { message: "Password length should be min 8 chars" }),
});

export function SignIn() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  const { change } = useSignModeContext();

  return (
    <div className="space-y-2">
      <h1 className="text-center py-4 text-xl font-semibold">SignIN</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Separator />
      <p className="text-center">
        Dont have any account
        <Button
          className="text-foreground/75 bg-transparent shadow-none hover:bg-transparent cursor-pointer"
          onClick={() => change(1)}
        >
          SignUp
        </Button>
      </p>
    </div>
  );
}
