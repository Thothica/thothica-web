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
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Spinner from "@/components/spinner";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "This field can't be left empty.",
    })
    .max(255, {
      message: "Email ID is too long.",
    })
    .email("This is not a valid Email ID."),
});

export function LoginForm() {
  const { toast } = useToast();
  const [loading, setloading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setloading(true);
      await signIn("email", { email: data.email, callbackUrl: "/search" });
    } catch (error) {
      toast({
        title: "Sigups are disabled",
        description:
          "Signups are disabled for now, If you are interested in this product please send a mail to adnan@thothica.com",
      });
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Send Login Link
          </Button>
        </form>
      </Form>
      {loading && <Spinner />}
    </>
  );
}
