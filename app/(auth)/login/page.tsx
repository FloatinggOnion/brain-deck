"use client";

import React, { useState } from "react";
import Link from "next/link";

import { login } from './actions'

export default function LoginPage() {

  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    await login(formData);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col p-8 justify-center lg:justify-between h-screen md:w-[75%] lg:h-[75vh] gap-12 lg:w-[45vw] mx-auto my-auto">
			<div>
				<h2 className="text-center text-xl">Log in to</h2>
				<h1
					className={`text-center text-4xl font-extrabold tracking-widest`}
				>
					BrainDeck
				</h1>
			</div>
			<div className="flex flex-col gap-6">
				<div>
					<label htmlFor="email" className="text-lg">
						E-mail
					</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border-2 border-neutral-700 rounded-xl h-14 w-full p-2"
						placeholder="Enter your email"
					/>
				</div>
				<div>
					<label htmlFor="password" className="text-lg">
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border-2 border-neutral-700 rounded-xl h-14 w-full p-2"
						placeholder="Enter your password"
					/>
				</div>
				<button
					onClick={handleLogin}
					className="px-4 py-2 text-white font-semibold bg-slate-800 w-[50%] rounded-md border-2 hover:border-slate-800 hover:bg-white hover:text-slate-800 hover:font-semibold transition-all duration-150"
					disabled={isLoading || !email || !password}
				>
					Login
				</button>
				<p>
					Don&apos;t have an account?{" "}
					<Link
						href={"/sign-up"}
						className="font-semibold underline underline-offset-2"
					>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
  )
}