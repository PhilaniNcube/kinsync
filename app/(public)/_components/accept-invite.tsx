"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { signInWithMagicLinkAction } from "@/utils/server-actions/auth/sign-in-action";
import SubmitButton from "@/components/submit-button";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";

export default function AcceptInvite() {

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [state, formAction] = useFormState(signInWithMagicLinkAction, null);



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Accept Invitation</CardTitle>
          <CardDescription>
            Enter your email to receive a magic link and join the app.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent>
            <div className="grid items-center w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  defaultValue={email || ""}
                  type="email"
                  name="email"
                  required
                />
              </div>
            </div>
            {state?.error && (
              <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle />
                <span>{state.error}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <SubmitButton className="w-full">Sending Magic Link</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
