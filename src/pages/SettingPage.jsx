
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Fingerprint,
  ChevronRight,
} from "lucide-react";
import { useUpdatePassword } from "../hooks/useAuth";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const passwordRequirements = [
  "At least 8 characters",
  "One uppercase and one lowercase letter",
  "One number and one special character",
];

const SettingPage = () => {
  const [showPasswords, setShowPasswords] = useState({});
  const { mutate, isPending } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const passwordFields = [
    {
      name: "currentPassword",
      label: "Current password",
      autoComplete: "current-password",
      placeholder: "Enter your current password",
      rules: {
        required: "Current password is required.",
      },
    },
    {
      name: "newPassword",
      label: "New password",
      autoComplete: "new-password",
      placeholder: "Create a strong password",
      rules: {
        required: "New password is required.",
        pattern: {
          value: passwordRegex,
          message:
            "Use 8+ characters with uppercase, lowercase, a number, and a special character.",
        },
        validate: (value) =>
          value !== currentPassword ||
          "Your new password must differ from your current password.",
      },
    },
    {
      name: "confirmPassword",
      label: "Confirm new password",
      autoComplete: "new-password",
      placeholder: "Enter your new password again",
      rules: {
        required: "Please confirm your new password.",
        validate: (value) =>
          value === newPassword || "Passwords do not match.",
      },
    },
  ];

  const onSubmit = (values) => {
    mutate(
      {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          reset();
          setShowPasswords({});
        },
      }
    );
  };

  const handleCancel = () => {
    reset();
    setShowPasswords({});
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border ${
      hasError
        ? "border-red-500/70 focus:border-red-400"
        : "border-[#292F39] focus:border-[#A7B7CD]"
    } bg-[#0B0D10] px-4 py-3.5 pr-12 text-sm text-[#F0F2F5] outline-none transition placeholder:text-[#626B79]`;

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#0B0D10] px-4 py-8 text-[#F0F2F5] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <header className="mb-8">
          <div className="mb-5 flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-[#7F8A9A]">
            <span className="size-2 rounded-full bg-[#A7B7CD]" />
            YOUR DEVTINDER SPACE
          </div>

          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#303744] bg-[#151A22] text-[#C4D0E0]">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Account settings
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-6 text-[#929BA9]">
                Your account, your rules. Keep your developer identity
                secure and in your control.
              </p>
            </div>
          </div>
        </header>

        {/* Settings layout */}
        <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-[#262C35] bg-[#11151B] p-3">
            <p className="px-3 pb-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#697383]">
              Account
            </p>

            <div className="flex items-center gap-3 rounded-xl border border-[#343D4A] bg-[#1B222D] px-3 py-3.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#293443] text-[#D5DFEC]">
                <LockKeyhole size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#F0F2F5]">
                  Security
                </p>
                <p className="mt-0.5 text-xs text-[#929BA9]">
                  Password and access
                </p>
              </div>

              <CheckCircle2 size={16} className="text-[#A7B7CD]" />
            </div>

            <div className="mt-4 rounded-xl border border-dashed border-[#2B3039] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#A7B7CD]">
                <Fingerprint size={17} />
                <span className="text-xs font-medium">Stay protected</span>
              </div>
              <p className="text-xs leading-5 text-[#858E9D]">
                Use a unique password that you don't share with other
                accounts.
              </p>
            </div>
          </aside>

          {/* Main content */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-[#292F39] bg-[#11151B]">
            <div className="border-b border-[#292F39] px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#202B3A] text-[#C4D0E0]">
                  <KeyRound size={19} />
                </div>

                <div>
                  <h2 className="text-base font-semibold sm:text-lg">
                    Change your password
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-[#929BA9]">
                    Update your password to help keep your account safe.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-6 px-5 py-6 sm:px-7 sm:py-7">
                {passwordFields.map((field, index) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="mb-2.5 block text-sm font-medium text-[#D4DAE3]"
                    >
                      <span className="mr-2 text-xs text-[#707B8B]">
                        0{index + 1}
                      </span>
                      {field.label}
                    </label>

                    <div className="relative">
                      <input
                        id={field.name}
                        type={
                          showPasswords[field.name] ? "text" : "password"
                        }
                        autoComplete={field.autoComplete}
                        placeholder={field.placeholder}
                        aria-invalid={Boolean(errors[field.name])}
                        aria-describedby={
                          errors[field.name]
                            ? `${field.name}-error`
                            : undefined
                        }
                        {...register(field.name, field.rules)}
                        className={inputClass(Boolean(errors[field.name]))}
                      />

                      <button
                        type="button"
                        onClick={() => togglePassword(field.name)}
                        aria-label={
                          showPasswords[field.name]
                            ? `Hide ${field.label}`
                            : `Show ${field.label}`
                        }
                        className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#858E9D] transition hover:bg-[#202630] hover:text-white"
                      >
                        {showPasswords[field.name] ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {errors[field.name] && (
                      <p
                        id={`${field.name}-error`}
                        role="alert"
                        className="mt-2 text-xs leading-5 text-red-400"
                      >
                        {errors[field.name].message}
                      </p>
                    )}
                  </div>
                ))}

                {/* Password guidance */}
                <div className="rounded-xl border border-[#292F39] bg-[#0D1015] p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <ShieldCheck size={17} className="text-[#A7B7CD]" />
                    <p className="text-sm font-medium text-[#D4DAE3]">
                      Strong password checklist
                    </p>
                  </div>

                  <div className="space-y-2">
                    {passwordRequirements.map((requirement) => (
                      <div
                        key={requirement}
                        className="flex items-start gap-2.5 text-xs leading-5 text-[#929BA9]"
                      >
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 shrink-0 text-[#A7B7CD]"
                        />
                        {requirement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#292F39] bg-[#0E1116] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <p className="text-xs leading-5 text-[#788292]">
                  Your password is never displayed publicly.
                </p>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isPending || !isDirty}
                    className="rounded-xl border border-[#303744] px-5 py-3 text-sm font-medium text-[#C0C8D4] transition hover:bg-[#1A2029] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isPending || !isDirty}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C4D0E0] px-5 py-3 text-sm font-semibold text-[#0B0D10] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-[#0B0D10]/30 border-t-[#0B0D10]" />
                        Updating...
                      </>
                    ) : (
                      <>
                        Update password
                        <ChevronRight size={17} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>

        <p className="mt-6 text-center text-xs text-[#626B79]">
          Built for developers. Designed for connection.
        </p>
      </div>
    </main>
  );
};

export default SettingPage;
