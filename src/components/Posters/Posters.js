import PosterCard from "./PosterCard";
import Link from "next/link";
import useSWR from "swr";
export default function VideoFeatures() {
  const { data: posters, error: posterError } = useSWR(
    `/posters?page=0&take=3`
  );
  return (
    <div className="bg-primary-1 text-white flex flex-col space-y-10 py-10">
      <h1 className="text-center text-3xl font-bold my-4 ">
        Our Gamming Posters
      </h1>
      <div className="max-w-7xl grid lg:grid-cols-3 lg:gap-3 m-auto grid-cols-1 gap-7">
        {posters?.data ? (
          posters.data.length ? (
            posters.data.map((poster) => <PosterCard poster={poster} />)
          ) : null
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {posters?.data?.length ? (
        <div className="text-center">
          <Link href="/posters">
            <a className="text-lg rounded-full  font-bold py-3 px-4 bg-yellow-500 hover:bg-yellow-700">
              More Posters
            </a>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
