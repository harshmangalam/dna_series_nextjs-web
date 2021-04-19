import Card from "./Card";

export default function Feature2() {
  return (
    <section className="bg-primary-4">
      <div className="lg:max-w-7xl m-auto lg:flex lg:items-center lg:justify-between py-8">
        <div className="">
          <img alt="image" className="w-full h-full" src="/home2.jpg" />
        </div>

        <div className="flex flex-col space-y-5">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </section>
  );
}
