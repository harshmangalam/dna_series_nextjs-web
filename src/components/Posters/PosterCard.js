export default function PosterCard({ poster }) {
  return (
    <div
      className="bg-primary-2 p-6 text-white flex flex-col items-center space-y-6 hover:bg-primary-3 cursor-pointer"
      style={{ minHeight: "600px" }}
    >
      <h2 className="text-lg font-semibold uppercase">{poster.title}</h2>
      <div className="w-full h-72">
        <img className="w-full h-full" src={poster.url} />
      </div>
      <div>
        <p className="text-justify">{poster.description}</p>
      </div>
    </div>
  );
}
