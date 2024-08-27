"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

export default function UpdatePassword() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const calculatePasswordStrength = (password: string) => {
		let strength = 0;
		if (password.length >= 8) strength += 25;
		if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
		if (password.match(/\d/)) strength += 25;
		if (password.match(/[^a-zA-Z\d]/)) strength += 25;
		return strength;
	};

	const passwordStrength = calculatePasswordStrength(password);

	const getPasswordStrengthLabel = (strength: number) => {
		if (strength === 0) return "Very Weak";
		if (strength <= 25) return "Weak";
		if (strength <= 50) return "Fair";
		if (strength <= 75) return "Good";
		return "Strong";
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast({
				title: "Passwords do not match",
				description: "Please ensure your passwords match.",
				variant: "destructive",
			});
			return;
		}
		if (passwordStrength < 75) {
			toast({
				title: "Password is not strong enough",
				description: "Please choose a stronger password.",
				variant: "destructive",
			});
			return;
		}
		// Here you would typically send the new password to your backend
		toast({
			title: "Password reset successful",
			description: "Your password has been reset.",
		});
		setPassword("");
		setConfirmPassword("");
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
			<div className="space-y-2">
				<Label htmlFor="new-password">New Password</Label>
				<div className="relative">
					<Input
						id="new-password"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="pr-10"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute inset-y-0 right-0 flex items-center pr-3"
					>
						{showPassword ? (
							<EyeOff className="w-4 h-4 text-gray-500" />
						) : (
							<Eye className="w-4 h-4 text-gray-500" />
						)}
					</button>
				</div>
				<div className="space-y-1">
					<Progress value={passwordStrength} className="h-2" />
					<p className="text-sm text-gray-500">
						Password strength: {getPasswordStrengthLabel(passwordStrength)}
					</p>
				</div>
			</div>
			<div className="space-y-2">
				<Label htmlFor="confirm-password">Confirm Password</Label>
				<div className="relative">
					<Input
						id="confirm-password"
						type={showConfirmPassword ? "text" : "password"}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						className="pr-10"
					/>
					<button
						type="button"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className="absolute inset-y-0 right-0 flex items-center pr-3"
					>
						{showConfirmPassword ? (
							<EyeOff className="w-4 h-4 text-gray-500" />
						) : (
							<Eye className="w-4 h-4 text-gray-500" />
						)}
					</button>
				</div>
				{password && confirmPassword && password !== confirmPassword && (
					<p className="text-sm text-red-500">Passwords do not match</p>
				)}
			</div>
			<Button type="submit" className="w-full">
				Reset Password
			</Button>
		</form>
	);
}
