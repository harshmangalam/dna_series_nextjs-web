import Card from "./Card";

export default function Features() {
  return (
    <section className="bg-primary-3">
      <div
        className="lg:max-w-7xl m-auto grid lg:grid-cols-3 gap-5 items-center grid-cols-1"
        style={{
          minHeight: "35vh",
        }}
      >
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}
