import Link from "next/link";
import { FiUpload } from "react-icons/fi";
import useSWR from "swr";
import classNames from "classnames";
import { useState } from "react";
import YouTube from "react-youtube";
import Dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Head from "next/head"

Dayjs.extend(relativeTime);

export default function Videos() {
  const [pageIndex, setPageIndex] = useState(0);

  const { data: videos, error: videoError, mutate } = useSWR(
    pageIndex >= 0 ? `/videos?page=${pageIndex}` : null
  );

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`/videos/delete?videoId=${id}`);
      mutate(`/videos?page=${pageIndex}`);
    } catch (error) {
      0;
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen h-full bg-primary-3 text-white py-10">
      <Head>
        <title>
          Videos | Admin
        </title>
      </Head>
      <div className="flex items-center justify-center">
        <Link href="/admin/videos/create">
          <a className="px-6 py-5 hover:bg-blue-800 rounded flex items-center space-x-4 bg-primary-2">
            <FiUpload size="30px" />
            <span> Upload Video</span>
          </a>
        </Link>
      </div>

      <div className="my-10 bg-primary-1">
        <div className="max-w-7xl overflow-x-scroll m-auto">
          <table className="table-auto w-full">
            <thead className="bg-green-500">
              <tr>
                <th className="py-6">Video</th>
                <th className="py-6">Title</th>
                <th className="py-6">Description</th>
                <th className="py-6">Created At</th>
                <th className="py-6">Updated At</th>
                <th className="py-6">Delete</th>
              </tr>
            </thead>
            <tbody>
              {videos?.data?.length ? (
                videos.data.map((video, i) => (
                  <tr
                    key={video.id}
                    className={classNames("", {
                      "bg-primary-4": i % 2 === 0,
                      "bg-primary-2": i % 2 !== 0,
                    })}
                  >
                    <td className="py-6 px-4">
                      <YouTube
                        videoId={video.videoId}
                        opts={{ width: 300, height: 200 }}
                      />
                    </td>
                    <td className="py-6 px-4">{video.title}</td>
                    <th className="py-6">
                      <p className=" max-w-lg hover:text-gray-500 text-justify cursor-pointer">
                        {video.description}
                      </p>
                    </th>
                    <td className="py-6 px-4">
                      {Dayjs(video.createdAt).fromNow()}
                    </td>
                    <td className="py-6 px-4">
                      {Dayjs(video.updatedAt).fromNow()}
                    </td>
                    <td className="py-6 px-4 ">
                      <div
                        className="px-3 py-3 rounded-full cursor-pointer bg-red-600 text-white"
                        onClick={() => deleteVideo(video.id)}
                      >
                        <MdDelete size="30px" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-6 px-4">No More Videos</td>
                </tr>
              )}
            </tbody>
          </table>
          {videos?.data && (
            <div className="px-4 w-full py-3 text-white flex items-center space-x-3 justify-end">
              {pageIndex > 0 && (
                <button
                  className="focus:outline-none hover:bg-pink-800 px-6 py-3 bg-pink-500 rounded-full "
                  onClick={() => setPageIndex(pageIndex - 1)}
                >
                  Prev
                </button>
              )}

              {videos.hasMore && (
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
