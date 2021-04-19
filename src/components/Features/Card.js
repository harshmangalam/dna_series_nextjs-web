export default function Card() {
  return (
    <div className="flex space-x-4 text-white items-center bg-primary-2  p-8">
      <div className="w-30 h-30 rounded-full">
        <img   alt="image" className="w-full h-full rounded-full" src="/home3.png" />
      </div>

      <div>
        <h2 className="text-4xl lg:text-5xl">1200+</h2>
        <p className="flex items-center space-x-2 px-2">
          <div className="w-4 h-4  bg-green-500 rounded-full"></div>
          <span className="lg:text-xl">Live Online</span>
        </p>
      </div>
    </div>
  );
}
