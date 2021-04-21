import PosterCard from "../components/Posters/PosterCard";
import useSWR from "swr";
import Head from "next/head";
import { useState } from "react";
export default function VideoFeatures() {
  const [pageIndex, setPageIndex] = useState(0);
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
          <PosterCard key={poster.id} poster={poster} />
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
        {posters?.hasMore && (
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
