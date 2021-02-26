import useSWR from "swr";
import classNames from "classnames";
import { useState } from "react";
import Dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
Dayjs.extend(relativeTime);

export default function Videos() {
  const [pageIndex, setPageIndex] = useState(0);

  const { data: users, error: userError, mutate } = useSWR(
    pageIndex >= 0 ? `/users?page=${pageIndex}` : null
  );

  return (
    <div className="min-h-screen h-full bg-primary-3 text-white py-10">
      <div className="my-10 bg-primary-1">
        <div className="max-w-7xl overflow-x-scroll m-auto">
          <table className="table-auto w-full">
            <thead className="bg-green-500">
              <tr>
                <th className="py-6">Name</th>
                <th className="py-6">Email</th>
                <th className="py-6">Phone</th>
                <th className="py-6">Last Seen</th>
                <th className="py-6">Active</th>
                <th className="py-6">Created At</th>
                <th className="py-6">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.length ? (
                users.data.map((user, i) => (
                  <tr
                    key={user.id}
                    className={classNames("", {
                      "bg-primary-4": i % 2 === 0,
                      "bg-primary-2": i % 2 !== 0,
                    })}
                  >
                    <td className="text-center py-6 px-4">{user.name}</td>
                    <td className="text-center py-6 px-4">{user.email}</td>
                    <td className="text-center py-6">{user.phone}</td>
                    <td className="text-center py-6">
                      {user.isActive
                        ? "Active Now"
                        : Dayjs(user.lastSeen).fromNow()}
                    </td>
                    <td className=" py-6 flex justify-center items-center">
                      <div
                        className={classNames("w-4 h-4 rounded-full", {
                          "bg-green-400": user.isActive,
                          "bg-red-400": !user.isActive,
                        })}
                      ></div>
                    </td>
                    <td className="text-center py-6 px-4">
                      {Dayjs(user.createdAt).fromNow()}
                    </td>
                    <td className="text-center py-6 px-4">
                      {Dayjs(user.updatedAt).fromNow()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-6 px-4">No Users</td>
                </tr>
              )}
            </tbody>
          </table>
          {users?.data && (
            <div className="px-4 w-full py-3 text-white flex items-center space-x-3 justify-end">
              {pageIndex > 0 && (
                <button
                  className="focus:outline-none hover:bg-pink-800 px-6 py-3 bg-pink-500 rounded-full "
                  onClick={() => setPageIndex(pageIndex - 1)}
                >
                  Prev
                </button>
              )}

              {users.hasMore && (
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
