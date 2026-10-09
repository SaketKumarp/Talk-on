"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  MessageSquareHeart,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ---------------------------------------------
// 1. Cute animated avatar
// ---------------------------------------------

function CuteAvatar({
  color,
  eyes,
  accent,
  delay = 0,
  size = "large",
}: {
  color: string;
  eyes: string;
  accent: string;
  delay?: number;
  size?: "large" | "small";
}) {
  const large = size === "large";

  return (
    <motion.div
      className={`relative flex shrink-0 items-center justify-center ${
        large ? "h-36 w-36" : "h-12 w-12"
      }`}
      animate={{
        y: [0, -9, 0, -3, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={{
        duration: 3.5,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.08 }}
    >
      <motion.div
        className={`relative flex h-full w-full items-center justify-center rounded-[42%] ${color} shadow-lg`}
        animate={{ scale: [1, 1.025, 1] }}
        transition={{
          duration: 2.5,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Blinking eyes */}
        <div
          className={`absolute flex ${
            large ? "top-[37%] gap-8" : "top-[37%] gap-3"
          }`}
        >
          {[0, 1].map((eye) => (
            <motion.span
              key={eye}
              className={`block rounded-full ${eyes} ${
                large ? "h-3 w-3" : "h-1.5 w-1.5"
              }`}
              animate={{ scaleY: [1, 1, 0.12, 1, 1] }}
              transition={{
                duration: 3.6,
                delay: delay + 1.1,
                repeat: Infinity,
                repeatDelay: 1.8,
                times: [0, 0.76, 0.8, 0.84, 1],
              }}
            />
          ))}
        </div>

        {/* Cheeks */}
        <div
          className={`absolute flex w-full justify-between ${
            large ? "top-[54%] px-3" : "top-[54%] px-1"
          }`}
        >
          <span
            className={`rounded-full opacity-70 ${accent} ${
              large ? "h-3 w-5" : "h-1.5 w-2"
            }`}
          />
          <span
            className={`rounded-full opacity-70 ${accent} ${
              large ? "h-3 w-5" : "h-1.5 w-2"
            }`}
          />
        </div>

        {/* Smile */}
        <div
          className={`absolute rounded-b-full border-b-[2.5px] ${eyes} ${
            large ? "top-[49%] h-3 w-5" : "top-[49%] h-1.5 w-2.5"
          }`}
        />
      </motion.div>

      {large && (
        <motion.span
          className="absolute -right-3 top-1 text-2xl text-rose-400"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, delay, repeat: Infinity }}
        >
          ✦
        </motion.span>
      )}
    </motion.div>
  );
}

// ---------------------------------------------
// 2. Reusable form field
// ---------------------------------------------

function FormField({
  id,
  label,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  icon: typeof User;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-xs font-bold uppercase tracking-wider text-slate-600"
      >
        {label}
      </Label>

      <div className="relative">
        <Icon className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------
// 3. Login / Sign Up toggle
// ---------------------------------------------

function AuthToggle({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}) {
  return (
    <div className="mb-8 flex rounded-2xl bg-slate-100 p-1.5">
      <button
        type="button"
        onClick={() => setIsLogin(true)}
        className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
          isLogin
            ? "bg-white text-teal-600 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Login
      </button>

      <button
        type="button"
        onClick={() => setIsLogin(false)}
        className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
          !isLogin
            ? "bg-white text-teal-600 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
}

// ---------------------------------------------
// 4. Reusable submit button
// ---------------------------------------------

function SignupButton({ isLogin }: { isLogin: boolean }) {
  return (
    <Button
      type="submit"
      className="h-12 w-full rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5 hover:from-teal-500 hover:to-cyan-600"
    >
      {isLogin ? "Login to your account" : "Create my account"}
      <Sparkles className="ml-2 h-4 w-4" />
      <ArrowRight className="ml-1 h-4 w-4" />
    </Button>
  );
}

// ---------------------------------------------
// 5. Signup / Login form
// ---------------------------------------------

function SignupForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Connect your authentication provider here.
    // This UI alone does not create accounts or log users in.
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({
      mode: isLogin ? "login" : "signup",
      name,
      email,
      password,
    });
  }

  return (
    <section className="flex flex-col justify-center bg-white p-7 sm:p-12">
      <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />

      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-teal-600">
          {isLogin ? "WELCOME BACK ✨" : "YOUR NEW ADVENTURE ✨"}
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
          {isLogin ? "Welcome back!" : "Create account"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {isLogin
            ? "Log in to continue chatting."
            : "Let's get you connected."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Display name: sign-up only */}
        {!isLogin && (
          <FormField id="name" label="Display name" icon={User}>
            <Input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
              className="h-12 rounded-2xl border-slate-200 bg-slate-50/70 pl-12 focus-visible:ring-teal-400"
            />
          </FormField>
        )}

        {/* Email */}
        <FormField id="email" label="Email address" icon={Mail}>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 rounded-2xl border-slate-200 bg-slate-50/70 pl-12 focus-visible:ring-teal-400"
          />
        </FormField>

        {/* Password */}
        <FormField
          id="password"
          label={isLogin ? "Password" : "Create password"}
          icon={Lock}
        >
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={isLogin ? undefined : 6}
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder={
              isLogin ? "Enter your password" : "At least 6 characters"
            }
            className="h-12 rounded-2xl border-slate-200 bg-slate-50/70 pl-12 pr-12 focus-visible:ring-teal-400"
          />

          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </FormField>

        {isLogin && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => alert("Connect your password reset flow here.")}
              className="text-sm font-semibold text-teal-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        <SignupButton isLogin={isLogin} />
      </form>

      {/* Divider and social login placeholders */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-xs text-slate-400">
          Your friendly space awaits
        </span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      <p className="text-center text-sm text-slate-500">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="font-bold text-teal-600 hover:text-teal-700 hover:underline"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>

      {!isLogin && (
        <p className="mt-5 text-center text-xs leading-relaxed text-slate-400">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      )}
    </section>
  );
}

// ---------------------------------------------
// 6. Main signup card
// ---------------------------------------------

function SignupCard() {
  return (
    <div className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-2xl shadow-teal-900/10 backdrop-blur-xl lg:grid-cols-2">
      {/* Left panel: avatars stay here */}
      <section className="flex flex-col items-center justify-between border-b border-slate-100 bg-gradient-to-br from-teal-50/80 via-cyan-50/60 to-pink-50/80 p-8 text-center sm:p-12 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-teal-600">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-lg shadow-teal-500/20">
            <MessageSquareHeart className="h-5 w-5" />
          </div>
          Chatty<span className="-ml-2 text-rose-400">.</span>
        </div>

        {/* Animated avatars: no avatars above the form */}
        <div className="my-8 flex h-52 w-full items-center justify-center gap-3">
          <CuteAvatar
            color="bg-pink-300"
            eyes="bg-pink-950"
            accent="bg-rose-400"
            delay={0.5}
            size="small"
          />

          <CuteAvatar
            color="bg-teal-300"
            eyes="bg-teal-900"
            accent="bg-rose-300"
            delay={0}
          />

          <CuteAvatar
            color="bg-amber-300"
            eyes="bg-amber-950"
            accent="bg-orange-300"
            delay={1}
            size="small"
          />
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-extrabold text-slate-800">
            Your people, your space!
          </h2>

          <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-500">
            Create your account and start sharing smiles, stickers, and little
            moments with your favorite people.
          </p>

          <div className="mt-6 flex justify-center gap-2">
            <span className="h-2 w-6 rounded-full bg-teal-500" />
            <span className="h-2 w-2 rounded-full bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-slate-200" />
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Made with ♡ for better conversations
        </p>
      </section>

      {/* Right panel: login and signup */}
      <SignupForm />
    </div>
  );
}

// ---------------------------------------------
// 7. Page
// ---------------------------------------------

export default function SignUpPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-pink-50 to-purple-100 p-4 sm:p-8">
      {/* Floating decorations */}
      <motion.div
        className="pointer-events-none absolute left-[12%] top-16 text-3xl text-teal-400"
        animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ✦
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-[15%] top-24 text-3xl text-rose-400"
        animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        ✳
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-20 left-[20%] text-2xl text-amber-400"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ○
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-1/3 right-[9%] text-3xl text-pink-300"
        animate={{ y: [0, 10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity }}
      >
        ○
      </motion.div>

      <SignupCard />
    </main>
  );
}
