import { ImUpload } from "react-icons/im";
import InputField from "../../../components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
const initialValues = {
  url: "",
  title: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  url: Yup.string().required("Image link must be required"),
});

export default function CreatePosters() {
  const router = useRouter();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      try {
        setSubmitting(true);
        await axios.post("/posters/create", values);
        router.push("/admin/posters");
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-primary-3 text-white min-h-screen">
      <div className="lg:max-w-7xl lg:m-auto py-10">
        <div className="my-6">
          <form className="max-w-lg m-auto border p-4" onSubmit={handleSubmit}>
            <InputField
              placeholder="Poster Image link"
              value={values.url}
              error={errors.url}
              handleChange={handleChange}
              name="url"
            />
            <InputField
              placeholder="Poster Title"
              value={values.title}
              handleChange={handleChange}
              name="title"
            />
            <textarea
              placeholder="Poster Description"
              value={values.description}
              onChange={handleChange}
              name="description"
              className="text-black w-full focus:outline-none px-3"
              rows={8}
            />
            <button type="submit" className="w-full flex items-center justify-center space-x-3 focus:outline-none bg-primary-2 px-3 py-4">
              <ImUpload size="20px" />
              <span>Upload</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

