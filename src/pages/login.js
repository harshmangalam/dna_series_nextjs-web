import InputField from "../components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthDispatch, useAuthState } from "../context/auth";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "../components/Footer";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const router = useRouter();
  const authDispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  if (authenticated) router.push("/");

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setErrors,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      setSubmitting(true);

      try {
        axios.defaults.headers["Authorization"] = "";
        localStorage.removeItem("token");
        const response = await axios.post("/auth/login", values);
        localStorage.setItem("token", response.data.data.token);
        authDispatch("LOGIN", response.data.data.user);
        setSubmitting(false);
        if (response.data.data.user.role === "ADMIN") {
          return router.push("/admin");
        }
        return router.push("/");
      } catch (error) {
        setErrors(error.response.data);
      }
    },
  });

  return (
    <div className="bg-primary-1 min-h-screen h-full flex flex-col items-center justify-center px-4">
      <div className=" max-w-xl border p-6 rounded-md">
        {errors.error && (
          <div className="text-red-500   p-2 my-4">{errors.error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <InputField
            placeholder="Email"
            value={values.email}
            name="email"
            handleChange={handleChange}
            error={errors.email}
          />
          <InputField
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            error={errors.password}
          />
          <button
            type="submit"
            className="focus:outline-none bg-purple-600 text-white text-lg w-full py-3 rounded-md my-4"
          >
            Login
          </button>
        </form>
        <div className="text-center text-white my-4 text-lg hover:text-yellow-400">
          <Link href="/register ">
            <a>Signup</a>
          </Link>
        </div>

        <p>
          <Footer />
        </p>
      </div>
    </div>
  );
}
