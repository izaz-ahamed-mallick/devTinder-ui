import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending, isError, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      emailId: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    mutate(data);

    // Connect your backend login API here.
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#2B3039] bg-[#11151B] shadow-2xl lg:grid-cols-2">
        {/* Left: Brand panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-[#2B3039] bg-[#0E1217] p-10 lg:flex">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-[#A7B7CD]/[0.06] blur-3xl" />

          <div className="relative">
            <img
              src="/logo.png"
              alt="DevTinder"
              className="h-10 w-auto max-w-full object-contain sm:h-12"
            />
          </div>

          <div className="relative my-12">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#A7B7CD]">
              Your developer community
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#F0F2F5] xl:text-5xl">
              Great things
              <br />
              happen when
              <br />
              developers <span className="text-[#A7B7CD]">connect.</span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-[#8B929E]">
              Meet developers, share ideas, and find people to build something
              meaningful with.
            </p>
          </div>

          <p className="relative text-xs text-[#68717E]">
            Built for developers, by developers.
          </p>
        </section>

        {/* Right: Login form */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-8 lg:hidden">
              <img
                src="/logo.png"
                alt="DevTinder"
                className="h-10 w-auto max-w-full object-contain object-left"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tight text-[#F0F2F5]">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#8B929E]">
                Sign in to continue connecting with developers.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="emailId"
                  className="mb-2 block text-sm font-medium text-[#D5D9E0]"
                >
                  Email address
                </label>

                <input
                  id="emailId"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.emailId)}
                  aria-describedby={
                    errors.emailId ? "emailId-error" : undefined
                  }
                  className="input h-12 w-full border-[#2B3039] bg-[#0B0D10] text-[#F0F2F5] placeholder:text-[#68717E] focus:border-[#A7B7CD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7B7CD]/20"
                  {...register("emailId", {
                    required: "Email address is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />

                {errors.emailId && (
                  <p
                    id="emailId-error"
                    role="alert"
                    className="mt-2 text-xs text-red-400"
                  >
                    {errors.emailId.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[#D5D9E0]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      // Add your forgot-password flow here.
                    }}
                    className="cursor-pointer text-xs text-[#A7B7CD] transition hover:text-[#C5D0DF]"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    className="input h-12 w-full border-[#2B3039] bg-[#0B0D10] pr-12 text-[#F0F2F5] placeholder:text-[#68717E] focus:border-[#A7B7CD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7B7CD]/20"
                    {...register("password", {
                      required: "Password is required.",
                    })}
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B929E] transition hover:text-[#F0F2F5]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="mt-2 text-xs text-red-400"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="btn h-12 min-h-12 w-full border-[#A7B7CD] bg-[#A7B7CD] text-[#10151D] hover:border-[#C5D0DF] hover:bg-[#C5D0DF] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Signing in..." : "Sign in"}
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#8B929E]">
              New to DevTinder?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#A7B7CD] transition hover:text-[#C5D0DF]"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-[#68717E]">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
