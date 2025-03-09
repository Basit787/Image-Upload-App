"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthStep } from "@/context/AuthStepProvider";
import { signupAPI } from "@/services/auth.api";
import { queryClient } from "@/services/client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const FormSchema = z
  .object({
    name: z.string().min(2, { message: "Min 2 char required" }),
    email: z.string().email({ message: "Email should be in proper format" }),
    password: z
      .string()
      .min(8, { message: "Password length should be min 8 chars" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function SignUp() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (payload: z.infer<typeof FormSchema>) => {
      return await signupAPI(payload.name, payload.email, payload.password);
      navigate("/");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signUp"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  const { setAuthStep } = useAuthStep();
  return (
    <div className="space-y-2">
      <h1 className="text-center py-4 text-xl font-semibold">SignUp</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Name" {...field} />
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
                  <TextInput
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <TextInput
                    type="password"
                    placeholder="Enter your password again"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
      <Separator />
      <p className="text-center">
        Already had an account
        <Button
          className="text-foreground/75 bg-transparent shadow-none hover:bg-transparent cursor-pointer"
          onClick={() => setAuthStep(0)}
        >
          SignIn
        </Button>
      </p>
    </div>
  );
}
