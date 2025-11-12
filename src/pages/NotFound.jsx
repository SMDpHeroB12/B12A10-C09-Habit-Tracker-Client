// import NotFoundImg from "../assets/404.jpg";
import errorImg from "../assets/error-404.gif";
import { Link, useRouteError } from "react-router";

const NotFound = () => {
  const error = useRouteError();
  return (
    <div className="h-screen">
      <h1>{error.message}</h1>
      <main className="grid min-h-full place-items-center  px-6 py-10 sm:py-32 lg:px-8">
        <div className="flex flex-col justify-center items-center ">
          <img className="w-60 " src={errorImg} alt="" />
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              className="rounded-md bg-[#9651ec] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
      {/* <img className="h-screen mx-auto" src={NotFoundImg} alt="" /> */}
    </div>
  );
};

export default NotFound;
