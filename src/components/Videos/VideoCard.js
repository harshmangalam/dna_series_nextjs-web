import YouTube from "react-youtube";
export default function VideoCard({ video }) {
  return (
    <div className="flex flex-col space-y-4 shadow-md py-6 hover:bg-primary-3 cursor-pointer">
      <YouTube
        videoId={video.videoId}
        opts={{ width: 400, height: 400 }}
        className="w-full"
      />
      <h3 className="text-2xl lg:text-left text-center px-5">{video.title}</h3>
      <p className="text-justify px-5">{video.description}</p>
    </div>
  );
}
