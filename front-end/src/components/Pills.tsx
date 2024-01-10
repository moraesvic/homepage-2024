import clsx from "clsx";

const Pill = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={clsx("py-[1px] px-1 rounded-md text-xs", className)}
      {...rest}
    />
  );
};

const DotNet = () => <Pill className="bg-purple-700 text-white">.NET</Pill>;

const Postgres = () => <Pill className="bg-blue-900 text-white">Postgres</Pill>;

const React = () => <Pill className="bg-cyan-300 text-black">React</Pill>;

const Javascript = () => (
  <Pill className="bg-amber-400 text-black">Javascript</Pill>
);

const Typescript = () => (
  <Pill className="bg-sky-600 text-white">Typescript</Pill>
);

const Wordpress = () => (
  <Pill className="bg-sky-600 text-white">Wordpress</Pill>
);

const PHP = () => (
  <Pill className="bg-violet-300 text-black font-bold">PHP</Pill>
);

const Stripe = () => (
  <Pill className="bg-white text-violet-600 font-bold border-1 border-solid border-black">
    Stripe
  </Pill>
);

const Python = () => <Pill className="bg-sky-700 text-amber-200">Python</Pill>;

const Terraform = () => (
  <Pill className="bg-indigo-800 text-white">Terraform</Pill>
);

const AWS = () => <Pill className="bg-stone-800 text-white">AWS</Pill>;

const GCP = () => (
  <Pill className="bg-white text-black border-1 border-black border-solid font-bold tracking-wide">
    <span className="text-sky-600">G</span>
    <span className="text-red-600">C</span>
    <span className="text-amber-600">P</span>
  </Pill>
);

const Pills = {
  DotNet,
  Postgres,
  React,
  Javascript,
  Typescript,
  Python,
  Terraform,
  AWS,
  GCP,
  Wordpress,
  PHP,
  Stripe,
};

export default Pills;
