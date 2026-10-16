const inputClassName =
  "input h-12 w-full border-[#2B3039] bg-[#0B0D10] text-[#F0F2F5] placeholder:text-[#68717E] focus:border-[#A7B7CD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7B7CD]/20";

const textareaClassName =
  "textarea min-h-28 w-full border-[#2B3039] bg-[#0B0D10] text-[#F0F2F5] placeholder:text-[#68717E] focus:border-[#A7B7CD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7B7CD]/20";

export const renderField = (field, { register, errors = {} } = {}) => {
  const error = errors[field.name];

  const validationRules = {
    required: field.required
      ? `${field.label} is required.`
      : false,

    ...(field.minLength != null && {
      minLength: {
        value: field.minLength,
        message: `Minimum ${field.minLength} characters required.`,
      },
    }),

    ...(field.maxLength != null && {
      maxLength: {
        value: field.maxLength,
        message: `Maximum ${field.maxLength} characters allowed.`,
      },
    }),

    ...(field.type === "password" && {
      validate: (value) => {
        const isStrongPassword =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        return (
          isStrongPassword.test(value) ||
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
        );
      },
    }),

    ...(field.type === "email" && {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address.",
      },
    }),

    ...(field.type === "number" && field.min != null && {
      min: {
        value: field.min,
        message: `Minimum age is ${field.min}.`,
      },
    }),

    ...(field.type === "number" && field.max != null && {
      max: {
        value: field.max,
        message: `Maximum age is ${field.max}.`,
      },
    }),
  };

  const registration = register
    ? register(field.name, validationRules)
    : {};

  const commonProps = {
    id: field.name,
    ...registration,
    required: field.required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${field.name}-error` : undefined,
  };

  let input;

  if (field.type === "textarea") {
    input = (
      <textarea
        {...commonProps}
        placeholder={field.placeholder}
        rows={4}
        minLength={field.minLength}
        maxLength={field.maxLength}
        autoComplete={field.autoComplete}
        className={textareaClassName}
      />
    );
  } else if (field.type === "select") {
    input = (
      <select
        {...commonProps}
        defaultValue=""
        className={`${inputClassName} ${field.required ? "" : "text-[#8B929E]"
          }`}
      >
        <option value="" disabled>
          {field.placeholder}
        </option>

        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    input = (
      <input
        {...commonProps}
        type={field.type}
        placeholder={field.type === "file" ? undefined : field.placeholder}
        accept={field.accept}
        autoComplete={field.autoComplete}
        min={field.min}
        max={field.max}
        minLength={field.minLength}
        maxLength={field.maxLength}
        className={
          field.type === "file"
            ? "file-input file-input-bordered h-12 w-full border-[#2B3039] bg-[#0B0D10] text-[#F0F2F5] file:mr-4 file:h-full file:border-0 file:bg-[#1A2029] file:px-3 file:text-sm file:font-medium file:text-[#A7B7CD]"
            : inputClassName
        }
      />
    );
  }

  return (
    <div className={field.halfWidth ? "" : "sm:col-span-2"}>
      <label
        htmlFor={field.name}
        className="mb-2 block text-sm font-medium text-[#D5D9E0]"
      >
        {field.label}
        {!field.required && (
          <span className="ml-1 text-[#68717E]">(optional)</span>
        )}
      </label>

      {input}

      {field.helperText && (
        <p className="mt-2 text-xs leading-5 text-[#68717E]">
          {field.helperText}
        </p>
      )}

      {error && (
        <p
          id={`${field.name}-error`}
          role="alert"
          className="mt-2 text-xs text-red-400"
        >
          {error.message}
        </p>
      )}
    </div>
  );
};
