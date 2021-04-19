import InputField from "../../../components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head"

const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  value: Yup.string().required("value is required"),
});

export default function CreateVideos() {
  const router = useRouter();
  const initialValues = {
    name: "",
    value: "",
  };

  const { values, handleChange, handleSubmit, setSubmitting } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      try {
        setSubmitting(true);
        await axios.post("/contact/create", values);
        router.push("/admin/contact");
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-primary-3 text-white min-h-screen">
      <Head>
        <title>Create-Contacts  | Admin</title>
      </Head>
      <div className="lg:max-w-7xl lg:m-auto py-10">
        <div className="my-6">
          <form className="max-w-lg m-auto border p-4" onSubmit={handleSubmit}>
            <InputField
              placeholder="i.e Facebook"
              value={values.name}
              handleChange={handleChange}
              name="name"
            />
            <InputField
              placeholder="i.e facebook profile url"
              value={values.value}
              handleChange={handleChange}
              name="value"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-3 focus:outline-none bg-primary-2 px-3 py-4"
            >
              <span>Add</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
