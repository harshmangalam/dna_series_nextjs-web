import useSWR from "swr";
import classNames from "classnames";
import Dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import Head from "next/head"

Dayjs.extend(relativeTime);

export default function Videos() {
  const { data: website, error: websiteError } = useSWR(`/website`);

  return (
    <div className="min-h-screen h-full bg-primary-3 text-white py-10">
      <Head>
        <title>
          Website | Admin
        </title>
      </Head>
      <div className="flex items-center justify-center">
        <Link href="/admin/website/create">
          <a className="px-6 py-5 hover:bg-blue-800 rounded flex items-center space-x-4 bg-primary-2">
            <span> Update Website Data</span>
          </a>
        </Link>
      </div>

      <div className="my-10 bg-primary-1">
        <div className="max-w-7xl overflow-x-scroll m-auto">
          <table className="w-full">
            <thead className="bg-green-500">
              <tr>
                <th className="py-6">Website Title</th>
                <th className="py-6">Home Page Title</th>
                <th className="py-6">Home page Paragraph</th>
                <th className="py-6">Home page Image</th>
                <th className="py-6">About Page</th>
                <th className="py-6">Created At</th>
                <th className="py-6">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {website?.data ? (
                <tr>
                  <td className="py-6 px-6">{website.data.title}</td>
                  <td className="py-6  px-6">
                    <p className=" max-w-lg hover:text-gray-500 text-justify cursor-pointer">
                      {website.data.headerTitle}
                    </p>
                  </td>
                  <td className="py-6 px-6">
                    <p className=" max-w-lg hover:text-gray-500 text-justify cursor-pointer">
                      {website.data.headerPara}
                    </p>
                  </td>
                  <td className="py-6 px-6">
                    <img src={website.data.headerImg} className="w-32 h-32 rounded-full" />
                  </td>
                  <td className="py-6 px-6">
                    <p style={{maxHeight:'300px',overflowY:'scroll'}} className="px-6 max-w-lg hover:text-gray-500 text-justify cursor-pointer">
                      {website.data.aboutPage}
                    </p>
                  </td>

                  <td className="py-6 px-4">
                    {Dayjs(website.data.createdAt).fromNow()}
                  </td>
                  <td className="py-6 px-4">
                    {Dayjs(website.data.updatedAt).fromNow()}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="py-6 px-4">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
