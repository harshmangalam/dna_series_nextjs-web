import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head"
export default function About({ contacts }) {
  const router = useRouter();

  return (
    <div className="min-h-screen py-6  bg-primary-1 text-white">
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact detail find me on social media and youtube"></meta>
      </Head>
      <h3 className="my-5 text-4xl text-center">Contact Us</h3>
      <div className="my-10">
        <div className="max-w-2xl px-6  m-auto ">
          <ul className="bg-primary-2">
            {contacts?.map((contact) => (
              <li
                key={contact.id}
                className="px-4 py-6 flex items-center justify-between cursor-pointer hover:bg-blue-500"
              >
                <div>
                  <div className="text-2xl font-semibold">{contact.name}</div>
                  <div className="text-xl text-gray-300">{contact.value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ _, res }) => {
  try {
    const res = await axios.get("/website/contact");

    return {
      props: {
        contacts: res.data.data,
      },
    };
  } catch (err) {
    res.writeHead(307, { Location: "/" }).end();
  }
};
