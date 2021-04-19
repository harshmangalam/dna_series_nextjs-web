import PosterCard from "../components/Posters/PosterCard";
import Link from "next/link";
import useSWR from "swr";
import Head from "next/head"
import { useState } from "react";
export default function VideoFeatures() {
  const [pageIndex,setPageIndex] = useState(0);
  const { data: posters, error: posterError } = useSWR(
    `/posters?page=${pageIndex}&take=4`
  );
  return (
    <div className="bg-primary-1 text-white min-h-screen py-10">
       <Head>
        <title>Posters</title>
        <meta name="description" content="Watch my gamming posters"></meta>
      </Head>
      <div className="max-w-7xl grid lg:grid-cols-3 lg:gap-4 m-auto grid-cols-1 gap-7">
        {posters?.data?.map((poster) => (
          <PosterCard poster={poster} />
        ))}
      </div>
    </div>
  );
}
