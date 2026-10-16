import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Settings,
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  ChevronRight,
} from "lucide-react";
import { useUpdatePassword } from "../hooks/useAuth";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const SettingPage = () => {
  const [showPasswords, setShowPasswords] = useState({});
  const { mutate, isPending } = useUpdatePassword()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
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
      label: "Current Password",
      autoComplete: "current-password",
      rules: {
        required: "Current password is required.",
      },
    },
    {
      name: "newPassword",
      label: "New Password",
      autoComplete: "new-password",
      rules: {
        required: "New password is required.",
        pattern: {
          value: passwordRegex,
          message:
            "Use at least 8 characters with uppercase, lowercase, a number, and a special character.",
        },
        validate: (value) =>
          value !== currentPassword ||
          "New password must differ from your current password.",
      },
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      autoComplete: "new-password",
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

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#0B0D10] px-4 py-8 text-[#F0F2F5] sm:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <Settings size={25} className="text-[#A7B7CD]" />
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Settings
            </h1>
          </div>

          <p className="text-sm text-[#8B929E]">
            Manage your account preferences and security.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-[#2B3039] bg-[#11151B] p-2">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl bg-[#202B3A] px-4 py-3 text-left text-sm text-[#F0F2F5]"
            >
              <ShieldCheck size={18} />
              Security
              <ChevronRight size={16} className="ml-auto" />
            </button>
          </aside>

          <section className="min-w-0 rounded-2xl border border-[#2B3039] bg-[#11151B] p-5 sm:p-8">
            <div className="mb-7 flex items-start gap-4 border-b border-[#2B3039] pb-6">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#202B3A] text-[#A7B7CD]">
                <LockKeyhole size={21} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Change Password
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#8B929E]">
                  Update your password to keep your DevTinder
                  account secure.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="max-w-xl space-y-5"
            >
              {passwordFields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-medium text-[#B8C0CC]"
                  >
                    {field.label}
                  </label>

                  <div className="relative">
                    <input
                      id={field.name}
                      type={
                        showPasswords[field.name]
                          ? "text"
                          : "password"
                      }
                      autoComplete={field.autoComplete}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      aria-invalid={Boolean(errors[field.name])}
                      aria-describedby={
                        errors[field.name]
                          ? `${field.name}-error`
                          : undefined
                      }
                      {...register(field.name, field.rules)}
                      className="w-full rounded-xl border border-[#2B3039] bg-[#0B0D10] px-4 py-3 pr-12 text-sm text-[#F0F2F5] outline-none transition placeholder:text-[#555D6A] focus:border-[#A7B7CD]"
                    />

                    <button
                      type="button"
                      onClick={() => togglePassword(field.name)}
                      aria-label={
                        showPasswords[field.name]
                          ? `Hide ${field.label}`
                          : `Show ${field.label}`
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B929E] transition hover:text-[#F0F2F5]"
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
                      className="mt-2 text-xs text-red-400"
                    >
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}

              <p className="text-xs leading-5 text-[#8B929E]">
                Use at least 8 characters, including uppercase
                and lowercase letters, a number, and a special
                character.
              </p>

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="rounded-xl border border-[#2B3039] px-5 py-3 text-sm font-medium text-[#B8C0CC] transition hover:bg-[#1B222C] hover:text-[#F0F2F5]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-[#A7B7CD] px-5 py-3 text-sm font-semibold text-[#0B0D10] transition hover:bg-[#C3D0E1] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending
                    ? "Updating Password..."
                    : "Update Password"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default SettingPage;
