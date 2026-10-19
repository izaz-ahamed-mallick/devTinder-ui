import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Globe,
  Mail,
  MapPin,
  Pencil,
  ShieldCheck,
  UserRound,
  Save,
  X,
  LockKeyhole,
  Plus,
  Trash2,
  Camera,
  Users,
  MessageCircle,
  ContactRound 
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import { useCurrentUser, useUpdateProfile } from "../hooks/useCurrentUser";
import DevTinderLoader from "../common/DevTinderLoader";
import CommonError from "../common/CommonError";
import LocationInput from "../common/LocationInput";
import { getChangedFields } from "../utils/getChangedFields";
// Import your profile-update mutation hook when it is ready.

const ProfilePage = () => {
  const { data: user, isPending, isError, refetch } = useCurrentUser();
  const { mutateAsync, isPending: isUpdatePending } = useUpdateProfile()

  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      gender: "",
      location: {
        city: "",
        state: "",
        country: "India",
      },
      about: "",
      githubUrl: "",
      linkedinUrl: "",
      portfolioUrl: "",
      photoUrl: "",
    },
  });

  const photoUrl = watch("photoUrl");

  useEffect(() => {
    if (!user) return;

    reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      emailId: user.emailId || "",
      gender: user.gender || "",
      location: user.location || "",
      about: user.about || user.bio || "",
      githubUrl: user.githubUrl || "",
      linkedinUrl: user.linkedinUrl || "",
      portfolioUrl: user.portfolioUrl || "",
      photoUrl: user.photoUrl || "",
    });

    setSkills(
      Array.isArray(user.skills)
        ? user.skills
          .map((skill) =>
            typeof skill === "string" ? skill : skill?.name
          )
          .filter(Boolean)
        : []
    );
  }, [user, reset]);

  if (isPending) {
    return <DevTinderLoader label="Loading your profile..." />;
  }

  if (isError || !user) {
    return (
      <CommonError
        title="Unable to load your profile"
        message="Something went wrong while fetching your profile. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    "Your Name";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (skills.some((item) => item.toLowerCase() === skill.toLowerCase())) {
      toast.info("This skill has already been added.");
      return;
    }

    setSkills((prev) => [...prev, skill]);
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleCancel = () => {
    reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      emailId: user.emailId || "",
      gender: user.gender || "",
      location: {
        city: user.location?.city ?? "",
        state: user.location?.state ?? "",
        country: user.location?.country ?? "India",
      },
      about: user.about || user.bio || "",
      githubUrl: user.githubUrl || "",
      linkedinUrl: user.linkedinUrl || "",
      portfolioUrl: user.portfolioUrl || "",
      photoUrl: user.photoUrl || "",
    });

    setSkills(
      Array.isArray(user.skills)
        ? user.skills
          .map((skill) =>
            typeof skill === "string" ? skill : skill?.name
          )
          .filter(Boolean)
        : []
    );

    setSkillInput("");
    setIsEditing(false);
  };

  const onSubmit = async (values) => {
    const originalData = {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      gender: user.gender ?? "",
      location: user.location ?? "",
      about: user.about ?? "",
      skills: user.skills ?? [],
      githubUrl: user.githubUrl ?? "",
      linkedinUrl: user.linkedinUrl ?? "",
      portfolioUrl: user.portfolioUrl ?? "",
      photoUrl: user.photoUrl ?? "",
    };

    const updatedData = {
      firstName: (values.firstName ?? "").trim(),
      lastName: (values.lastName ?? "").trim(),
      gender: values.gender ?? "",
      location: values.location ?? "",
      about: (values.about ?? "").trim(),
      skills,
      githubUrl: (values.githubUrl ?? "").trim(),
      linkedinUrl: (values.linkedinUrl ?? "").trim(),
      portfolioUrl: (values.portfolioUrl ?? "").trim(),
      photoUrl: (values.photoUrl ?? "").trim(),
    };

    try {
      const payload = getChangedFields(originalData, updatedData);


      if (Object.keys(payload).length === 0) {
        toast.info("No changes to save.");
        return;
      }

      await mutateAsync(payload);
    }
    catch (error) {
      console.log(error.message)
    } finally {
      setIsEditing(false)
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#2B3039] bg-[#0B0D10] px-4 py-3 text-sm text-[#F0F2F5] outline-none transition placeholder:text-[#555D6A] focus:border-[#A7B7CD]";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#B8C0CC]";

  const renderError = (name) =>
    errors[name] ? (
      <p className="mt-2 text-xs text-red-400" role="alert">
        {errors[name].message}
      </p>
    ) : null;

  const getExternalUrl = (value) => {
    if (!value) return null;

    const trimmed = value.trim();

    return /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
  };

  const socialLinks = [
    {
      name: "githubUrl",
      label: "GitHub",
      value: user.githubUrl,
      icon: FaGithub,
    },
    {
      name: "linkedinUrl",
      label: "LinkedIn",
      value: user.linkedinUrl,
      icon: FaLinkedin,
    },
    {
      name: "portfolioUrl",
      label: "Portfolio",
      value: user.portfolioUrl,
      icon: Globe,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0D10] px-4 py-6 text-[#F0F2F5] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Page heading */}
        <header className="mb-7 flex items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#8B929E]">
              <Users size={15} />
              YOUR DEVTINDER SPACE
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              My profile
            </h1>

            <p className="mt-1.5 text-sm text-[#8B929E]">
              The person behind the developer account.
            </p>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-[#343B47] bg-[#151920] px-3.5 py-2.5 text-sm font-medium transition hover:border-[#59677A] hover:bg-[#202936] sm:px-4"
            >
              <Pencil size={15} />
              <span className="hidden sm:inline">Edit profile</span>
              <span className="sm:hidden">Edit</span>
            </button>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#39485B] bg-[#182331] px-3 py-1.5 text-xs font-medium text-[#C4D0DF]">
              <span className="size-1.5 rounded-full bg-[#A7B7CD]" />
              Editing
            </span>
          )}
        </header>

        <form
          id="edit-profile-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Identity card */}
          <section className="overflow-hidden rounded-2xl border border-[#2B3039] bg-[#11151B]">
            <div className="flex items-center justify-between border-b border-[#252C36] px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-2 text-sm font-medium text-[#C4D0DF]">
                <UserRound size={16} className="text-[#A7B7CD]" />
                Your identity
              </div>

              <span className="text-xs text-[#737D8B]">
                Member profile
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[#3A4657] bg-[#202A38] text-xl font-semibold text-[#D9E3F0] sm:size-24 sm:text-2xl">
                  {isEditing ? (
                    photoUrl ? (
                      <img
                        src={photoUrl}
                        alt="Profile preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      initials
                    )
                  ) : user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={`${fullName}'s profile`}
                      className="size-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-1">
                  {!isEditing ? (
                    <>
                      <h2 className="break-words text-xl font-semibold tracking-tight sm:text-2xl">
                        {fullName}
                      </h2>

                      <p className="mt-1 break-all text-sm text-[#8B929E]">
                        {user.emailId || "Email not added"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#303B49] bg-[#171E27] px-2.5 py-1.5 text-xs text-[#C4D0DF]">
                          <MapPin size={13} />
                          {[
                            user.location?.city,
                            user.location?.state,
                          ]
                            .filter(Boolean)
                            .join(", ") || "Location not added"}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#303B49] bg-[#171E27] px-2.5 py-1.5 text-xs text-[#C4D0DF]">
                          <ShieldCheck size={13} />
                          DevTinder member
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-lg font-semibold">
                        Update your identity
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-[#8B929E]">
                        Let other developers know a little about you.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Photo editor */}
              {isEditing && (
                <div className="mt-6 border-t border-[#252C36] pt-5">
                  <label htmlFor="photoUrl" className={labelClass}>
                    <Camera size={14} className="mr-2 inline" />
                    Profile photo URL
                  </label>

                  <input
                    id="photoUrl"
                    {...register("photoUrl", {
                      pattern: {
                        value: /^(https?:\/\/.*)?$/i,
                        message: "Enter a valid HTTP or HTTPS URL.",
                      },
                    })}
                    placeholder="https://example.com/photo.jpg"
                    className={inputClass}
                  />

                  {renderError("photoUrl")}

                  <p className="mt-2 text-xs text-[#8B929E]">
                    Use a publicly accessible image URL.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* About / introduction */}
          <section className="rounded-2xl border border-[#2B3039] bg-[#11151B] p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#202A38] text-[#C4D0DF]">
                <MessageCircle size={17} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">A little about me</h3>
                <p className="mt-0.5 text-xs text-[#8B929E]">
                  Help other developers get to know you.
                </p>
              </div>
            </div>

            {isEditing ? (
              <>
                <label htmlFor="about" className={labelClass}>
                  Your introduction
                </label>

                <textarea
                  id="about"
                  rows={4}
                  maxLength={500}
                  {...register("about", {
                    maxLength: {
                      value: 500,
                      message: "Maximum 500 characters allowed.",
                    },
                  })}
                  placeholder="What are you interested in? What kind of developers would you like to connect with?"
                  className={`${inputClass} resize-y leading-6`}
                />

                {renderError("about")}

                <p className="mt-2 text-right text-xs text-[#737D8B]">
                  {watch("about")?.length ?? 0}/500
                </p>
              </>
            ) : (
              <p className="whitespace-pre-line text-sm leading-7 text-[#C0C7D1]">
                {user.about ||
                  user.bio ||
                  "Your introduction is empty. Add a few lines about your interests and the people you'd like to connect with."}
              </p>
            )}
          </section>

          {/* Personal details */}
          <section className="rounded-2xl border border-[#2B3039] bg-[#11151B] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#202A38] text-[#C4D0DF]">
                <ContactRound size={17} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">Personal details</h3>
                <p className="mt-0.5 text-xs text-[#8B929E]">
                  The basics of your account.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClass}>
                  First name
                </label>

                {isEditing ? (
                  <>
                    <input
                      id="firstName"
                      {...register("firstName", {
                        required: "First name is required.",
                        maxLength: {
                          value: 50,
                          message: "Maximum 50 characters allowed.",
                        },
                      })}
                      placeholder="First name"
                      className={inputClass}
                    />
                    {renderError("firstName")}
                  </>
                ) : (
                  <p className="text-sm">
                    {user.firstName || "Not added"}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className={labelClass}>
                  Last name
                </label>

                {isEditing ? (
                  <>
                    <input
                      id="lastName"
                      {...register("lastName", {
                        required: "Last name is required.",
                        maxLength: {
                          value: 50,
                          message: "Maximum 50 characters allowed.",
                        },
                      })}
                      placeholder="Last name"
                      className={inputClass}
                    />
                    {renderError("lastName")}
                  </>
                ) : (
                  <p className="text-sm">
                    {user.lastName || "Not added"}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="gender" className={labelClass}>
                  Gender
                </label>

                {isEditing ? (
                  <>
                    <select
                      id="gender"
                      {...register("gender", {
                        required: "Please select your gender.",
                      })}
                      className={inputClass}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {renderError("gender")}
                  </>
                ) : (
                  <p className="text-sm capitalize">
                    {user.gender || "Not added"}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="emailId" className={labelClass}>
                  <Mail size={14} className="mr-2 inline" />
                  Email address
                </label>

                <input
                  id="emailId"
                  type="email"
                  value={user.emailId || ""}
                  disabled
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-[#171B22] text-[#737C89] opacity-80`}
                />

                {isEditing && (
                  <p className="mt-2 text-xs text-[#8B929E]">
                    <LockKeyhole size={12} className="mr-1 inline" />
                    Email address cannot be changed.
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="location" className={labelClass}>
                  <MapPin size={14} className="mr-2 inline" />
                  Location
                </label>

                {isEditing ? (
                  <Controller
                    name="location"
                    control={control}
                    rules={{
                      validate: (value) => {
                        if (!value?.city && !value?.state) return true;

                        if (!value?.city || !value?.state) {
                          return "Please select a city from the suggestions.";
                        }

                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <LocationInput
                        value={
                          field.value?.city
                            ? `${field.value.city}, ${field.value.state || ""}`
                            : ""
                        }
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        inputClassName={inputClass}
                        error={errors.location?.message}
                      />
                    )}
                  />
                ) : (
                  <p className="text-sm">
                    {[
                      user.location?.city,
                      user.location?.state,
                      user.location?.country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Location not added"}
                  </p>
                )}

                {renderError("location")}
              </div>
            </div>
          </section>

          {/* Skills and shared interests */}
          <section className="rounded-2xl border border-[#2B3039] bg-[#11151B] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#202A38] text-[#C4D0DF]">
                <Code2 size={17} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">Skills & interests</h3>
                <p className="mt-0.5 text-xs text-[#8B929E]">
                  Find common ground with other developers.
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="mt-5 flex gap-2">
                <input
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Add a skill, e.g. React"
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={addSkill}
                  className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-[#202B3A] px-4 text-sm font-medium text-[#D9E3F0] transition hover:bg-[#2A394C]"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            )}

            {skills.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#303B49] bg-[#171E27] px-3 py-2 text-sm text-[#C4D0DF]"
                  >
                    {skill}

                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        aria-label={`Remove ${skill}`}
                        className="cursor-pointer text-[#8B929E] transition hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-xl border border-dashed border-[#343B47] px-4 py-6 text-center text-sm text-[#8B929E]">
                No skills added yet. Add some interests to help other developers connect with you.
              </p>
            )}
          </section>

          {/* Social connections */}
          <section className="rounded-2xl border border-[#2B3039] bg-[#11151B] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#202A38] text-[#C4D0DF]">
                <Users size={17} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">Find me elsewhere</h3>
                <p className="mt-0.5 text-xs text-[#8B929E]">
                  Share your developer and professional profiles.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {socialLinks
                .filter(({ name }) =>
                  ["githubUrl", "linkedinUrl"].includes(name)
                )
                .map(({ name, label, value, icon: Icon }) => (
                  <div key={name}>
                    {isEditing ? (
                      <>
                        <label htmlFor={name} className={labelClass}>
                          <Icon size={14} className="mr-2 inline" />
                          {label}
                        </label>
                        <input
                          id={name}
                          {...register(name)}
                          placeholder={`Enter your ${label} URL`}
                          className={inputClass}
                        />
                      </>
                    ) : value ? (
                      <a
                        href={getExternalUrl(value)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-[#303B49] bg-[#171E27] p-4 transition hover:border-[#59677A] hover:bg-[#202B3A]"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-[#354152] bg-[#202936] text-[#C4D0DF]">
                          <Icon size={19} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-[#E3E9F1]">
                            {label}
                          </span>
                          <span className="mt-1 block text-xs text-[#8B929E]">
                            Open profile
                          </span>
                        </span>

                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-[#8B929E] transition group-hover:text-[#E3E9F1]"
                        />
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#303B49] p-4">
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#171E27] text-[#8B929E]">
                          <Icon size={19} />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-[#B8C0CC]">
                            {label}
                          </p>
                          <p className="mt-1 text-xs text-[#737D8B]">
                            Not added yet
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>

          {/* Form actions */}
          {isEditing && (
            <div className="sticky bottom-3 z-20 flex flex-col-reverse gap-3 rounded-2xl border border-[#303B49] bg-[#11151B]/95 p-3 shadow-2xl backdrop-blur sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isUpdatePending}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#343B47] px-5 py-3 text-sm font-medium text-[#B8C0CC] transition hover:bg-[#202630] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={16} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUpdatePending || isSubmitting}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#A7B7CD] px-5 py-3 text-sm font-semibold text-[#0B0D10] transition hover:bg-[#C3D0E1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={16} />
                {isUpdatePending ? "Saving..." : "Save changes"}
              </button>
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-[#626B78]">
          Good connections start with getting to know each other.
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;
