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
import { Separator } from "@/components/ui/separator";
import { useAuthStep } from "@/context/authStep/useAuthStep";
import { useAuth } from "@/context/auth/useAuth";
import { getValidName } from "@/helper/utils";
import { signupAPI } from "@/services/auth.api";
import { queryClient } from "@/services/client";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";
import { BlurFade } from "@/components/blur-fade";

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

const SignUp = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { setAuthStep } = useAuthStep();
  const { login } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (payload: z.infer<typeof FormSchema>) => {
      return await signupAPI(
        getValidName(payload.name),
        payload.email,
        payload.password
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signUp"] });
      login(data?.token);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      mutate(data);
    },
    [mutate]
  );

  return (
    <BlurFade delay={0.25 * 0.05} className="space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <TextInput placeholder="Enter your Name" {...field} />
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
                  <TextInput placeholder="Enter your email" {...field} />
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
          onClick={useCallback(() => setAuthStep(0), [setAuthStep])}
        >
          SignIn
        </Button>
      </p>
    </BlurFade>
  );
};

export default SignUp;
