import Link from "next/link";
import { FiUpload } from "react-icons/fi";
import useSWR from "swr";
import classNames from "classnames";
import { useState } from "react";
import Dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Head from "next/head"

Dayjs.extend(relativeTime);

export default function Posters() {
  const [pageIndex, setPageIndex] = useState(0);

  const { data: posters, error: posterError, mutate } = useSWR(
    pageIndex >= 0 ? `/posters?page=${pageIndex}` : null
  );

  const deletePoster = async (id) => {
    try {
      await axios.delete(`/posters/delete?posterId=${id}`);
      mutate(`/posters?page=${pageIndex}`);
    } catch (error) {
      0;
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen h-full bg-primary-3 text-white py-10">
      <Head>
        <title>
          Posters | Home
        </title>
      </Head>
      <div className="flex items-center justify-center">
        <Link href="/admin/posters/create">
          <a className="px-6 py-5 hover:bg-blue-800 rounded flex items-center space-x-4 bg-primary-2">
            <FiUpload size="30px" />
            <span> Upload Poster</span>
          </a>
        </Link>
      </div>

      <div className="my-10 bg-primary-1">
        <div className="max-w-7xl overflow-x-scroll m-auto">
          <table className="table-auto w-full">
            <thead className="bg-green-500">
              <tr>
                <th className="py-6">Poster</th>
                <th className="py-6">Title</th>
                <th className="py-6">Description</th>
                <th className="py-6">Created At</th>
                <th className="py-6">Updated At</th>
                <th className="py-6">Delete</th>
              </tr>
            </thead>
            <tbody>
              {posters?.data?.length ? (
                posters.data.map((poster, i) => (
                  <tr
                    key={poster.id}
                    className={classNames("", {
                      "bg-primary-4": i % 2 === 0,
                      "bg-primary-2": i % 2 !== 0,
                    })}
                  >
                    <td className="py-6 px-4">
                     <img src={poster.url} className="w-80 h-52"   alt="image" />
                    </td>
                    <td className="py-6 px-4">{poster.title}</td>
                    <th className="py-6">
                      <p className=" max-w-lg hover:text-gray-500 text-justify cursor-pointer">
                        {poster.description}
                      </p>
                    </th>
                    <td className="py-6 px-4">
                      {Dayjs(poster.createdAt).fromNow()}
                    </td>
                    <td className="py-6 px-4">
                      {Dayjs(poster.updatedAt).fromNow()}
                    </td>
                    <td className="py-6 px-4 ">
                      <div
                        className="px-3 py-3 rounded-full cursor-pointer bg-red-600 text-white"
                        onClick={() => deletePoster(poster.id)}
                      >
                        <MdDelete size="30px" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-6 px-4">No More Posters</td>
                </tr>
              )}
            </tbody>
          </table>
          {posters?.data && (
            <div className="px-4 w-full py-3 text-white flex items-center space-x-3 justify-end">
              {pageIndex > 0 && (
                <button
                  className="focus:outline-none hover:bg-pink-800 px-6 py-3 bg-pink-500 rounded-full "
                  onClick={() => setPageIndex(pageIndex - 1)}
                >
                  Prev
                </button>
              )}

              {posters.hasMore && (
                <button
                  className="focus:outline-none hover:bg-pink-800 px-6 py-3 bg-pink-500 rounded-full"
                  onClick={() => setPageIndex(pageIndex + 1)}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
