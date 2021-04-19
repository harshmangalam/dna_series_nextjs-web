import VideoCard from "../components/Videos/VideoCard";
import useSWR from "swr";
import { useState } from "react";
import Head from "next/head"
export default function VideoFeatures() {
  const [pageIndex, setPageIndex] = useState(0);
  const { data: videos, error: posterError } = useSWR(
    `/videos?page=${pageIndex}&take=4`
  );
  return (
    <div className="bg-primary-1 text-white min-h-screen py-10">
        <Head>
        <title>Videos</title>
        <meta name="description" content="Collections of pubg gamming videos"></meta>
      </Head>
     
      <div className="max-w-7xl grid lg:grid-cols-3 lg:gap-4 m-auto grid-cols-1 gap-7">
        {videos?.data?.map((video) => (
          <VideoCard video={video} />
        ))}
      </div>
    </div>
  );
}
