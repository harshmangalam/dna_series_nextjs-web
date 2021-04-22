export default function Footer() {
  return (
    <div className="bg-primary-1">
      <div className="max-w-7xl py-5 m-auto">
        <p className="text-lg text-center text-gray-300">
          Copyright © {new Date().getFullYear()} DNA Series
        </p>
      </div>
    </div>
  );
}
