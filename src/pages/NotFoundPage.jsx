
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4">
      <div className="text-center">
        <p className="text-sm font-medium tracking-widest text-[#A7B7CD]">
          ERROR 404
        </p>

        <h1 className="mt-3 text-4xl font-bold text-[#F0F2F5]">
          Page not found
        </h1>

        <p className="mt-3 text-[#8B929E]">
          The page you're looking for doesn't exist.
        </p>

        <Link to="/" className="btn btn-primary mt-6">
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
