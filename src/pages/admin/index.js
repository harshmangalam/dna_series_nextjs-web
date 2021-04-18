import AdminCard from "../../components/Admin/AdminCard";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useAuthState } from "../../context/auth";
import { Fragment, useEffect } from "react";

export default function Admin() {
  const { authenticated, user } = useAuthState();

  const router = useRouter();

  useEffect(() => {
    if (!authenticated || user.role !== "ADMIN") {
      router.push("/");
    }
  }, []);
  const { data: posterCount, error: posterError } = useSWR(
    "/posters/posterCount"
  );
  const { data: videoCount, error: videoError } = useSWR("/videos/videoCount");
  const { data: userCount, error: userError } = useSWR("/users/userCount");
  return (
    <div className="bg-primary-3 text-white min-h-screen">
      {!user ? (
        <div className="flex flex-col justify-center items-center">
          <div class="h-4 bg-gray-900 rounded w-3/4"></div>
          <div class="h-32 bg-gray-800 rounded w-3/4"></div>
          <div class="h-4 bg-gray-900 rounded w-3/4"></div>
        </div>
      ) : (
        <div className="lg:max-w-7xl lg:m-auto py-10">
          <div className="grid lg:grid-cols-4 grid-cols-1 px-6 lg:gap-5 gap-3">
            <div>
              {videoCount ? (
                <Link href="/admin/videos">
                  <a>
                    <AdminCard title="Videos" data={videoCount} />
                  </a>
                </Link>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div>
              {posterCount ? (
                <Link href="/admin/posters">
                  <a>
                    <AdminCard title="Posters" data={posterCount} />
                  </a>
                </Link>
              ) : (
                <p>Loading...</p>
              )}
            </div>

            <div>
              {userCount ? (
                <Link href="/admin/users">
                  <a>
                    <AdminCard title="Users" data={userCount} />
                  </a>
                </Link>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 grid-cols-1 px-6 lg:gap-5 gap-3 my-6">
            <Link href="/admin/website">
              <a className="px-6 text-center hover:bg-green-300 hover:text-green-900 py-10 rounded-full bg-primary-2 text-2xl font-bold">
                Website Data
              </a>
            </Link>
            <Link href="/admin/contact">
              <a className="px-6 text-center hover:bg-green-300 hover:text-green-900 py-10 rounded-full bg-primary-2 text-2xl font-bold">
                Contact Data
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
