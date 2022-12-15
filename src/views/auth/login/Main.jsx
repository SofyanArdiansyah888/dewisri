import illustrationUrl from "@/assets/images/illustration.svg";
import logoUrl from "@/assets/images/logo.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { useAdmin } from "../../../hooks/useUser";
import { getUser } from "../../../services/database";
const schema = yup.object({
  id: yup.number().required(),
  password: yup.string().required(),
});

function Main() {
  const auth = useAuth();
  const { data: users } = useAdmin();
  
  const navigate = useNavigate();
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const user = getUser();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  useEffect(() => {
    
    if (auth?.error) {
      setError("id", { message: auth?.error });
    }

    if (auth?.error?.message) {
      setError("id", { message: auth?.error?.message });
    }

    if (auth?.error?.response) {
      setError("id", { message: auth?.error?.response?.data?.message });
    }

    if (user) {
      navigate(redirectPath, { replace: true });
    }
    return () => {};
  }, [user, auth.error]);

  const handleLogin = (data) => {
    auth.login(data);
  };

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  return (
    <>
      <div className="container sm:px-10">
        <div className="block xl:grid grid-cols-2 gap-4">
          {/* BEGIN: Login Info */}
          <div className="hidden xl:flex flex-col min-h-screen">
            <a href="" className="-intro-x flex items-center pt-5">
              <img
                alt="Midone Tailwind HTML Admin Template"
                className="w-6"
                src={logoUrl}
              />
              <span className="text-white text-lg ml-3"> CT POS </span>
            </a>
            <div className="my-auto">
              <img
                alt="Midone Tailwind HTML Admin Template"
                className="-intro-x w-1/2 -mt-16"
                src={illustrationUrl}
              />
              <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                A few more clicks to <br />
                sign in to your account.
              </div>
              <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                Manage all your pos accounts in one place
              </div>
            </div>
          </div>
          {/* END: Login Info */}
          {/* BEGIN: Login Form */}
          <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
            <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                Sign In
              </h2>

              <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                A few more clicks to sign in to your account. Manage all your
                e-commerce accounts in one place
              </div>

              <div className="intro-x mt-8">
                <form
                  className="validate-form"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <select
                    {...register("id")}
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 block capitalize"
                  >
                    <option>Pilih User</option>
                    {users
                      ? users?.map((user) => (
                          <option value={user.id} className="capitalize"> {user.name}</option>
                        ))
                      : ""}
                  </select>
                  {errors.id && (
                    <div className="text-danger mt-2">
                      {errors.id.message}
                    </div>
                  )}
                  <input
                    {...register("password")}
                    type="password"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <div className="text-danger mt-2">
                      {errors.password.message}
                    </div>
                  )}

                  <div className="flex items-center mr-auto mt-4">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="form-check-input border mr-2"
                    />
                    <label
                      className="cursor-pointer select-none"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label>
                  </div>

                  <button
                    className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top mt-4"
                    disabled={auth.isLoading}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* END: Login Form */}
        </div>
      </div>
    </>
  );
}

export default Main;
