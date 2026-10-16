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

    setSkillInput("");
    setIsEditing(false);
  };

  const onSubmit =async (values) => {
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
    <main className="min-h-screen bg-[#0B0D10] px-4 py-8 text-[#F0F2F5] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#8B929E]">
              <UserRound size={14} />
              Your account
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#8B929E] sm:text-base">
              Your developer identity, all in one place.
            </p>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#343B47] bg-[#151920] px-4 py-2.5 text-sm font-medium transition hover:border-[#59677A] hover:bg-[#1A2029]"
            >
              <Pencil size={15} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-xl border border-[#343B47] px-4 py-2.5 text-sm text-[#B8C0CC] hover:bg-[#151920]"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>

        <form
          id="edit-profile-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <section className="overflow-hidden rounded-2xl border border-[#2B3039] bg-[#11151B]">
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-[#202A38] via-[#151B24] to-[#0E1217] sm:h-44">
              <div className="absolute -right-10 -top-24 size-64 rounded-full border border-white/[0.05]" />
              <div className="absolute -right-1 -top-16 size-48 rounded-full border border-white/[0.06]" />
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#64758B]/40 to-transparent" />
            </div>

            <div className="relative z-10 px-5 pb-6 sm:px-8 sm:pb-8">
              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end">
                <div className="flex items-end gap-4">
                  <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-2xl border-4 border-[#11151B] bg-[#202A38] text-2xl font-semibold text-[#D9E3F0] sm:size-28">
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

                  <div className="min-w-0 pb-1">
                    {!isEditing ? (
                      <>
                        <h2 className="break-words text-xl font-semibold sm:text-2xl">
                          {fullName}
                        </h2>
                        <p className="mt-1 break-all text-sm text-[#8B929E]">
                          {user.emailId || "No email"}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-[#8B929E]">
                        Update your developer profile
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-full border border-[#303B49] bg-[#18202A] px-3 py-1.5 text-xs font-medium text-[#C1D0E2] sm:ml-auto">
                  <ShieldCheck size={14} />
                  My Account
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 max-w-xl">
                  <label htmlFor="photoUrl" className={labelClass}>
                    <Camera size={14} className="mr-2 inline" />
                    Profile Photo URL
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
                    This field accepts an image URL. File uploads can be added later.
                  </p>
                </div>
              )}

              <div className="mt-7 border-t border-[#2B3039] pt-6">
                <div className="mb-5 flex items-center gap-2 text-sm font-medium text-[#A7B7CD]">
                  <UserRound size={16} />
                  Personal information
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>
                      First Name
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
                          className={inputClass}
                          placeholder="First name"
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
                      Last Name
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
                          className={inputClass}
                          placeholder="Last name"
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
                      Email Address
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
                                : typeof field.value === "string"
                                  ? field.value
                                  : ""
                            }
                            onChange={field.onChange}
                            inputClass={inputClass}
                          />
                        )}
                      />
                    ) : (
                      <p className="text-sm">
                        {typeof user.location === "object" && user.location !== null
                          ? [
                            user.location.city,
                            user.location.state,
                            user.location.country,
                          ]
                            .filter(Boolean)
                            .join(", ") || "Add your location"
                          : user.location || "Add your location"}
                      </p>
                    )}

                    {renderError("location")}

                    {renderError("location")}
                  </div>
                </div>
              </div>

              <div className="mt-7 border-t border-[#2B3039] pt-6">
                <div className="flex items-center gap-2 text-sm font-medium text-[#A7B7CD]">
                  <BriefcaseBusiness size={16} />
                  Developer overview
                </div>

                {isEditing ? (
                  <div className="mt-4">
                    <label htmlFor="about" className={labelClass}>
                      About you
                    </label>
                    <textarea
                      id="about"
                      rows={5}
                      {...register("about", {
                        maxLength: {
                          value: 500,
                          message: "Maximum 500 characters allowed.",
                        },
                      })}
                      placeholder="Tell other developers about yourself, your interests, and what you're building..."
                      className={`${inputClass} resize-y leading-6`}
                    />
                    {renderError("about")}
                  </div>
                ) : (
                  <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-[#B1B7C1]">
                    {user.about ||
                      user.bio ||
                      "Your profile is your introduction to the DevTinder community. Add a bio to tell other developers about yourself, your interests, and what you're building."}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-[#2B3039] bg-[#11151B] p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#1A2029] text-[#A7B7CD]">
                <Code2 size={19} />
              </div>
              <div>
                <h3 className="font-semibold">Technical Skills</h3>
                <p className="mt-1 text-xs text-[#8B929E]">
                  Technologies and tools you work with
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
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#202B3A] px-4 text-sm font-medium text-[#D9E3F0] hover:bg-[#2A394C]"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            )}

            {skills.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#303B49] bg-[#171E27] px-3 py-2 text-sm font-medium text-[#C4D0DF]"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        aria-label={`Remove ${skill}`}
                        className="text-[#8B929E] hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-[#343B47] px-4 py-6 text-center">
                <p className="text-sm text-[#B1B7C1]">
                  No skills added yet.
                </p>
              </div>
            )}
          </section>

          <section className="mt-6 rounded-2xl border border-[#2B3039] bg-[#11151B] p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#1A2029] text-[#A7B7CD]">
                <Globe size={19} />
              </div>
              <div>
                <h3 className="font-semibold">Developer Links</h3>
                <p className="mt-1 text-xs text-[#8B929E]">
                  Your work and professional presence
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks
                .filter(({ name }) =>
                  ["githubUrl", "linkedinUrl"].includes(name)
                )
                .map(({ name, label, value, icon: Icon }) => (
                  <div key={name}>
                    {isEditing ? (
                      <input
                        id={name}
                        {...register(name)}
                        className={inputClass}
                        placeholder={`Enter your ${label} URL`}
                      />
                    ) : value ? (
                      <a
                        href={getExternalUrl(value)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="inline-flex items-center gap-2 rounded-xl border border-[#303B49] bg-[#171E27] px-4 py-3 text-sm font-medium text-[#C4D0DF] transition hover:border-[#59677A] hover:bg-[#202B3A]"
                      >
                        <Icon size={18} />
                        {label}
                        <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-xl border border-[#303B49] px-4 py-3 text-sm text-[#8B929E]">
                        <Icon size={18} />
                        {label}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </section>

          {isEditing && (
            <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border border-[#343B47] px-5 py-3 text-sm font-medium text-[#B8C0CC] hover:bg-[#151920]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUpdatePending}
                className="pointer inline-flex items-center justify-center gap-2 rounded-xl bg-[#A7B7CD] px-5 py-3 text-sm font-semibold text-[#0B0D10] hover:bg-[#C3D0E1] disabled:opacity-50"
              >
                <Save size={16} />
                {isUpdatePending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-xs leading-5 text-[#626B78]">
          Your developer journey starts with a great introduction.
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;
