import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";
import { renderField } from "../common/formField";
import { useForm } from "react-hook-form";
import { useSignUp } from "../hooks/useSignUp";

const signupSteps = [
  {
    id: 1,
    title: "Basic information",
    heading: "Create your account",
    description: "Start with your basic details.",
    fields: ["firstName", "lastName", "emailId", "password"],
  },
  {
    id: 2,
    title: "Developer profile",
    heading: "Tell us about yourself",
    description: "Help other developers get to know you.",
    fields: [
      "age",
      "gender",
      "about",
      "skills",
      "githubUrl",
      "linkedinUrl",
      "portfolioUrl",
    ],
  },
  {
    id: 3,
    title: "Profile picture",
    heading: "Complete your profile",
    description: "Add a photo to personalize your account.",
    fields: ["photoUrl"],
  },
];

const signupFields = [
  // Step 1: Account details
  {
    name: "firstName",
    label: "First name",
    type: "text",
    placeholder: "Enter your first name",
    autoComplete: "given-name",
    required: true,
    step: 1,
    halfWidth: true,
  },
  {
    name: "lastName",
    label: "Last name",
    type: "text",
    placeholder: "Enter your last name",
    autoComplete: "family-name",
    required: false,
    step: 1,
    halfWidth: true,
  },
  {
    name: "emailId",
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    required: true,
    step: 1,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Create a strong password",
    autoComplete: "new-password",
    required: true,
    step: 1,
    helperText: "Use at least 8 characters with a mix of letters, numbers, and symbols.",
  },

  // Step 2: Developer profile
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
    required: false,
    step: 2,
    halfWidth: true,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    placeholder: "Select gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    required: false,
    step: 2,
    halfWidth: true,
  },
  {
    name: "about",
    label: "About you",
    type: "textarea",
    placeholder:
      "Introduce yourself, your interests, and what you'd like to build...",
    required: false,
    step: 2,
    helperText: "A short introduction helps other developers get to know you.",
  },
  {
    name: "skills",
    label: "Technical skills",
    type: "text",
    placeholder: "React, Node.js, MongoDB",
    required: false,
    step: 2,
    helperText: "Separate skills with commas.",
  },
  {
    name: "githubUrl",
    label: "GitHub profile",
    type: "url",
    placeholder: "https://github.com/username",
    required: false,
    step: 2,
    helperText: "Share your GitHub repositories.",
  },
  {
    name: "linkedinUrl",
    label: "LinkedIn profile",
    type: "url",
    placeholder: "https://linkedin.com/in/username",
    required: false,
    step: 2,
    helperText: "Connect your professional profile.",
  },
  {
    name: "portfolioUrl",
    label: "Portfolio website",
    type: "url",
    placeholder: "https://yourportfolio.com",
    required: false,
    step: 2,
    helperText: "Showcase your projects and work.",
  },

  // Step 3: Profile photo
  {
    name: "photoUrl",
    label: "Profile photo",
    type: "file",
    accept: "image/png,image/jpeg,image/webp",
    required: false,
    step: 3,
    helperText: "Upload a JPG, PNG, or WebP image. Optional.",
  },
];

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { mutate, isPending } = useSignUp();
  const defaultValue = {
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    about: "",
    skills: "",
    githubUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
    photoUrl: "",
  }

  const
    { register,
      trigger,
      getValues,
      watch,
      handleSubmit,
      formState: { errors }, } = useForm({
        mode: "onTouched",
        shouldUnregister: false,
        defaultValues: defaultValue
      })
  const activeStep = signupSteps.find(
    (step) => step.id === currentStep
  );

  const visibleFields = signupFields.filter((field) =>
    activeStep.fields.includes(field.name)
  );

  const requiredFields = signupFields.filter(
    (field) => field.required
  );
  const watchedValues = watch();
  const completedRequiredFields = requiredFields.filter((field) =>
    String(watchedValues[field.name] ?? "").trim()
  );
  const progressPercentage = Math.round(
    (completedRequiredFields.length / requiredFields.length) * 100
  );

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === signupSteps.length;
  const handleNext = async () => {

    const currentFieldNames = visibleFields.map((field) => field.name);
    const isValid = await trigger(currentFieldNames);

    if (!isValid) return;

    if (currentStep < signupSteps.length) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((step) => step - 1);
    }
  };


  const onSubmit = (data) => {
    const signupData = {
      ...data,
      photoUrl: data.photoUrl?.[0] ?? null,
      age: data.age === "" ? undefined : Number(data.age),
      skills: data.skills
        ? data.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
        : [],
    };
    mutate(signupData);
  };
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#2B3039] bg-[#11151B] shadow-2xl lg:grid-cols-2">
        {/* Brand panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-[#2B3039] bg-[#0E1217] p-10 lg:flex">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-[#A7B7CD]/[0.06] blur-3xl" />

          <img
            src="/logo.png"
            alt="DevTinder"
            className="relative h-12 w-fit max-w-full object-contain object-left"
          />

          <div className="relative my-12">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#A7B7CD]">
              Your developer community
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#F0F2F5] xl:text-5xl">
              Great things
              <br />
              happen when
              <br />
              developers{" "}
              <span className="text-[#A7B7CD]">connect.</span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-[#8B929E]">
              Create your account and build your developer identity,
              one step at a time.
            </p>
          </div>

          <p className="relative text-xs text-[#68717E]">
            Built for developers, by developers.
          </p>
        </section>

        {/* Signup form */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-7 lg:hidden">
              <img
                src="/logo.png"
                alt="DevTinder"
                className="h-10 w-auto max-w-full object-contain object-left"
              />
            </div>

            {/* Step indicator */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#A7B7CD]">
                  Step {currentStep} of {signupSteps.length}
                </p>

                <p className="text-xs text-[#68717E]">
                  {progressPercentage}% complete
                </p>
              </div>

              {/* Progress bar */}
              <div
                className="mb-5 flex gap-2"
                role="progressbar"
                aria-label="Signup progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercentage}
              >
                {signupSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step.id <= currentStep
                      ? "bg-[#A7B7CD]"
                      : "bg-[#2B3039]"
                      }`}
                  />
                ))}
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-[#F0F2F5]">
                {activeStep.heading}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#8B929E]">
                {activeStep.description}
              </p>
            </div>

            {/* Dynamic fields and step navigation */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {visibleFields.map((field) =>
                  renderField(field, {
                    register,
                    errors,
                  })
                )}
              </div>

              <div className="flex gap-3 pt-2">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="btn h-12 min-h-12 flex-1 border-[#2B3039] bg-transparent text-[#F0F2F5] hover:border-[#A7B7CD] hover:bg-[#151920]"
                  >
                    <ArrowLeft size={18} />
                    Previous
                  </button>
                )}

                {isLastStep && (
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn h-12 min-h-12 flex-1 border-[#A7B7CD] bg-[#A7B7CD] text-[#10151D] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isPending ? "Creating account..." : "Create account"}
                    {!isPending && <Check size={18} />}
                  </button>
                )}
                {!isLastStep &&
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn h-12 min-h-12 flex-1 border-[#A7B7CD] bg-[#A7B7CD] text-[#10151D] hover:border-[#C5D0DF] hover:bg-[#C5D0DF]"
                  >
                    Continuess
                    <ArrowRight size={18} />
                  </button>
                }

              </div>
            </form>

            {/* Sign in */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#2B3039]" />
              <span className="text-xs text-[#68717E]">
                Already a member?
              </span>
              <div className="h-px flex-1 bg-[#2B3039]" />
            </div>

            <Link
              to="/login"
              className="flex h-12 items-center justify-center rounded-xl border border-[#2B3039] text-sm font-medium text-[#F0F2F5] transition hover:border-[#A7B7CD] hover:bg-[#151920]"
            >
              Sign in to your account
            </Link>

            <p className="mt-6 text-center text-xs leading-5 text-[#68717E]">
              By creating an account, you agree to our Terms of Service
              and Privacy Policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignupPage;
