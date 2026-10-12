
import { AlertCircle, RefreshCw } from "lucide-react";

const CommonError = ({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
  onRetry,
  retryLabel = "Try again",
}) => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#0B0D10] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#2B3039] bg-[#11151B] p-8 text-center">
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-xl bg-[#261B20] text-[#E7A0A0]">
          <AlertCircle size={24} />
        </div>

        <h2 className="text-lg font-semibold text-[#F0F2F5]">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#8B929E]">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#A7B7CD] px-5 py-2.5 text-sm font-semibold text-[#0B0D10] transition hover:bg-[#C0CDDF]"
          >
            <RefreshCw size={15} />
            {retryLabel}
          </button>
        )}
      </div>
    </main>
  );
};

export default CommonError;
