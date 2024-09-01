"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeFormSubmit } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

import { ToastAction } from "@/components/ui/toast";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscribeFormSubmit(email);
    toast({
      title: "Subscribed successfully",
      description: "Thank you for subscribing to our newsletter!",
    });
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button variant="secondary" type="submit">
        Subscribe
      </Button>
    </form>
  );
}
