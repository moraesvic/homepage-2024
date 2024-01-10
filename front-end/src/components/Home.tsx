import type { HomeProps } from "../content/config";

export const Home = ({ jobTitle, cv, lang }: HomeProps) => {
  return (
    <div className="bg-black flex flex-col items-center">
      <h1 className="text-2xl mb-4">
        <a href={`/${lang}`}>moraesvic.com</a>
      </h1>
      <div>Victor Moraes</div>
      <div>{jobTitle}</div>
      <div className="my-4 text-2xl">
        <a href={`/${lang}/cv`}>{cv}</a>
      </div>
    </div>
  );
};

export default Home;
