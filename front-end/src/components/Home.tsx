import type { HomeProps } from "../content/config";
import { Colors } from "./Colors";
import { EmailIcon } from "./EmailIcon";
import { GitHubIcon } from "./GitHubIcon";
import { LinkedInIcon } from "./LinkedInIcon";

export const Home = ({ jobTitle, cv, lang }: HomeProps) => {
  return (
    <div className="bg-slate-950 bg-opacity-80 p-4 rounded flex flex-col items-center gap-8">
      <h1 className="text-2xl">
        <a href={`/${lang}`}>moraesvic.com</a>
      </h1>
      <div className="flex flex-col items-center">
        <div>Victor Moraes</div>
        <div>{jobTitle}</div>
      </div>
      <div className="text-2xl">
        <a href={`/${lang}/cv`}>{cv}</a>
      </div>
      <div className="flex gap-4">
        <LinkedInIcon
          fill1={Colors.text}
          fill2={Colors.bg}
          bgColor={Colors.bg}
          size={24}
        />
        <GitHubIcon fill={Colors.text} bgColor={Colors.bg} size={24} />
        <EmailIcon fill={Colors.text} bgColor={Colors.bg} size={24} />
      </div>
    </div>
  );
};

export default Home;
