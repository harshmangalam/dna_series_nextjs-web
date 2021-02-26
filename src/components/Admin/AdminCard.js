export default function AdminCard({ title, data }) {
  return (
    <div className="border p-6 text-center flex flex-col space-y-6 shadow-lg group hover:bg-primary-2 w-full">
      <h3 className="text-4xl">{title}</h3>
      <p  className="text-2xl font-bold">
       {data.data}
      </p>
    </div>
  );
}
