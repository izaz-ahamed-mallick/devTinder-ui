import { useMemo, useRef, useState, useEffect } from "react";
import { City } from "country-state-city";
import { MapPin, Search, Check } from "lucide-react";

export default function LocationInput({
  value = "",
  onChange,
  onBlur,
  inputClassName = "",
  id = "location",
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  const query =
    typeof value === "string"
      ? value
      : [value?.city, value?.state]
        .filter(Boolean)
        .join(", ");

  const suggestions = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (search.length < 2) return [];

    return City.getCitiesOfCountry("IN")
      .filter((city) => city.name.toLowerCase().includes(search))
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleSelect = (city) => {
    onChange({
      city: city.name,
      state: city.stateCode || "",
      country: "India",
    });

    setIsOpen(false);
  };
  const inputClasses = [
    "w-full rounded-xl border bg-[#171E27]",
    "py-3 pl-11 pr-4 text-sm text-[#F0F2F5]",
    "placeholder:text-[#7F8998]",
    "outline-none transition-all duration-200",
    "disabled:cursor-not-allowed disabled:opacity-60",
    error
      ? "border-red-500/70 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
      : "border-[#303B49] hover:border-[#465366] focus:border-[#718096] focus:ring-4 focus:ring-[#718096]/10",
    inputClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Input */}
      <div className="relative">
        <MapPin
          size={18}
          strokeWidth={1.8}
          className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${error
            ? "text-red-400"
            : isFocused
              ? "text-[#D2D9E3]"
              : "text-[#8994A4]"
            }`}
        />

        <input
          id={id}
          name={id}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen && query.trim().length >= 2}
          aria-controls={`${id}-suggestions`}
          aria-invalid={Boolean(error)}
          value={query}
          onChange={(event) => {
            onChange(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={onBlur}
          placeholder="Search your city..."
          autoComplete="off"
          maxLength={100}
          className={inputClasses}
        />
      </div>

      {/* Suggestions dropdown */}
      {isOpen && query.trim().length >= 2 && (
        <div
          id={`${id}-suggestions`}
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-[#303B49] bg-[#151B23] shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center justify-between border-b border-[#28313D] px-3.5 py-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8994A4]">
              Suggested locations
            </span>

            {suggestions.length > 0 && (
              <span className="rounded-md bg-[#252E3A] px-2 py-0.5 text-[10px] font-medium text-[#AEB9C8]">
                {suggestions.length} results
              </span>
            )}
          </div>

          {suggestions.length > 0 ? (
            <div className="max-h-64 overflow-y-auto p-1.5">
              {suggestions.map((city) => {
                const location = [city.name, city.stateCode, "India"]
                  .filter(Boolean)
                  .join(", ");

                const isSelected = query === location;

                return (
                  <button
                    key={`${city.name}-${city.stateCode}-${city.latitude}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelect(city)}
                    className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150 hover:bg-[#222C39] focus-visible:bg-[#222C39] focus-visible:outline-none"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#354152] bg-[#202936] text-[#B8C5D6] transition-colors group-hover:border-[#526176] group-hover:text-white">
                      <MapPin size={16} strokeWidth={1.8} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-[#E8EDF4]">
                        {city.name}
                      </span>

                      <span className="mt-0.5 block truncate text-xs text-[#8994A4]">
                        {[city.stateCode, "India"]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </span>

                    {isSelected && (
                      <Check
                        size={16}
                        className="shrink-0 text-[#B8C5D6]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-5 text-center">
              <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#222C39] text-[#AAB6C6]">
                <Search size={17} />
              </span>

              <p className="text-sm font-medium text-[#DCE3EC]">
                No cities found
              </p>

              <p className="mt-1 text-xs leading-relaxed text-[#8994A4]">
                Try another spelling or enter your location manually.
              </p>
            </div>
          )}

          <div className="border-t border-[#28313D] px-3.5 py-2">
            <p className="text-[11px] text-[#748092]">
              <MapPin size={12} className="mr-1 inline-block" />
              Locations in India
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
