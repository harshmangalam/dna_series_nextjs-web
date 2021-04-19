import InputField from "../../../components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import Head from "next/head"

const validationSchema = Yup.object().shape({
  title: Yup.string(),
  headerTitle: Yup.string(),
  headerPara: Yup.string(),
  headerImg: Yup.string(),
  aboutPage: Yup.string(),
});

export default function CreateVideos() {
  const router = useRouter();

  const { data: website, error: websiteError } = useSWR("/website");
  const initialValues = {
    title: website?.data?.title || "",
    headerTitle: website?.data?.headerTitle || "",
    headerPara: website?.data?.headerPara || "",
    headerImg: website?.data?.headerImg || "",
    aboutPage: website?.data?.aboutPage || "",
  };

  const { values, handleChange, handleSubmit, setSubmitting } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      try {
        setSubmitting(true);
        await axios.post("/website/create", values);
        router.push("/admin/website");
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
        <title>Website-Create | Admin</title>
      </Head>
      <div className="lg:max-w-7xl lg:m-auto py-10">
        <div className="my-6">
          <form className="max-w-lg m-auto border p-4" onSubmit={handleSubmit}>
            <InputField
              placeholder="Website Title"
              value={values.title}
              handleChange={handleChange}
              name="title"
            />
            <InputField
              placeholder="Home Page Heading"
              value={values.headerTitle}
              handleChange={handleChange}
              name="headerTitle"
            />
             <InputField
              placeholder="Home Page Image URL"
              value={values.headerImg}
              handleChange={handleChange}
              name="headerImg"
            />
            <textarea
              placeholder="Home Page Paragraph"
              value={values.headerPara}
              onChange={handleChange}
              name="headerPara"
              className="text-black w-full focus:outline-none px-3"
              rows={8}
            />
            <textarea
              placeholder="Whatever you will write here display on about section"
              value={values.aboutPage}
              onChange={handleChange}
              name="aboutPage"
              className="text-black w-full focus:outline-none px-3"
              rows={8}
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-3 focus:outline-none bg-primary-2 px-3 py-4"
            >
              <span>Update</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
