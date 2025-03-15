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
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth/use-auth";
import { useAuthStep } from "@/context/authStepProvider/use-authStep";
import { signinAPI } from "@/services/auth.api";
import { queryClient } from "@/services/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email({ message: "Email should be in proper format" }),
  password: z
    .string()
    .min(8, { message: "Password length should be min 8 chars" }),
});

const SignIn = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setAuthStep } = useAuthStep();
  const { login } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationKey: ["singIn"],
    mutationFn: async (payload: z.infer<typeof FormSchema>) => {
      const data = await signinAPI(payload.email, payload.password);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signIn"] });
      login(data?.token);
    },
    onError: (error) => {
      toast.error(error.message);
      form.setError("email", {
        type: "manual",
        message: error.message,
      });
      form.setError("password", {
        type: "manual",
        message: error.message,
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
    <BlurFade delay={0.25 * 0.05} className="space-y-2">
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
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
      <Separator />
      <p className="text-center">
        Dont have any account
        <Button
          className="text-foreground/75 bg-transparent shadow-none hover:bg-transparent cursor-pointer"
          onClick={useCallback(() => setAuthStep(1), [setAuthStep])}
        >
          SignUp
        </Button>
      </p>
    </BlurFade>
  );
};
export default SignIn;
