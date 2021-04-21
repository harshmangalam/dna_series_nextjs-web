import VideoCard from "../components/Videos/VideoCard";
import useSWR from "swr";
import { useState } from "react";
import Head from "next/head";
export default function VideoFeatures() {
  const [pageIndex, setPageIndex] = useState(0);
  const { data: videos, error } = useSWR(`/videos?page=${pageIndex}&take=4`);
  return (
    <div className="bg-primary-1 text-white min-h-screen py-10">
      <Head>
        <title>Videos</title>
        <meta
          name="description"
          content="Collections of pubg gamming videos"
        ></meta>
      </Head>

      <div className="max-w-7xl grid lg:grid-cols-3 lg:gap-4 m-auto grid-cols-1 gap-7">
        {videos?.data?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <div className="flex justify-center space-x-3">
        {pageIndex !== 0 && (
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            className="bg-green-500 text-white px-4 py-2 rounded-full my-4"
          >
            Previous
          </button>
        )}
        {videos?.hasMore && (
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full my-4"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
