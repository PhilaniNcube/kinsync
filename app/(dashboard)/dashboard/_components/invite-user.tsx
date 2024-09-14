"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { UserPlus } from "lucide-react";
import SubmitButton from "@/components/submit-button";
import { useFormState } from "react-dom";
import { inviteUserAction } from "@/utils/server-actions/auth/invite";


export default function InviteUser({ group_id }: { group_id: string }) {


	const [state, formAction] = useFormState(inviteUserAction, null);

	return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus className="w-6 h-6" />
          <span>Invite a user</span>
        </CardTitle>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="space-y-4 @container">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  type="text"
                  name="first_name"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  type="text"
                  name="last_name"
                  placeholder="John"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="user@example.com"
                required
              />
              <Input
                defaultValue={group_id}
                value={group_id}
                type="hidden"
                name="group_id"
                placeholder=""
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton className="w-full">Invite User</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
