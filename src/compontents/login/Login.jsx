import { useEffect, useState } from "react";
import Error from "../ui/Error";
import { useLoginMutation } from "../../features/api/auth/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  //login submit handle @function
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: loginInputs.email, password: loginInputs.password });
  };

  useEffect(() => {
    if (data?.accessToken && data?.user) {
      navigate('/inbox')
    }
    if (responseError?.data) {
      setError(responseError.data)
    }
  }, [data, responseError, navigate])
  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="./assets/lws-logo-light.svg"
              alt="Learn with sumit"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={(e) =>
                    setLoginInputs({ ...loginInputs, email: e.target.value })
                  }
                  value={loginInputs.email}
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setLoginInputs({ ...loginInputs, password: e.target.value })
                  }
                  value={loginInputs.password}
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
              disabled={isLoading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <Error message={error} />
        </div>
      </div>
    </div>
  );
};

export default Login;
