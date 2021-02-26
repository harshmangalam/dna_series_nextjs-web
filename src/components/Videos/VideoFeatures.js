import VideoCard from "./VideoCard";
import Link from "next/link";
import useSWR from "swr";

export default function VideoFeatures() {
  const { data: videos, error: videoError } = useSWR(
    `/videos?page=0&take=2`
  );
  return (
    <div className="bg-primary-1 text-white flex flex-col space-y-10 py-10">
      <h1 className="text-center text-3xl font-bold my-4 ">
        Our Youtube Videos
      </h1>
      <div className="max-w-7xl grid lg:grid-cols-2 lg:gap-6 m-auto grid-cols-1 gap-7">
        {videos?.data ? (
          videos.data.length ? (
            videos.data.map((video) => <VideoCard video={video} />)
          ) : null
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {videos?.data?.length ? (
        <div className="text-center">
          <Link href="/videos">
            <a className="text-lg rounded-full  font-bold py-3 px-4 bg-yellow-500 hover:bg-yellow-700">
              More Videos
            </a>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
