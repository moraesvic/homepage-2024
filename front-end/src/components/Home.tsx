import type { HomeProps } from "../content/config";
import { Colors } from "./Colors";
import { EmailIcon } from "./EmailIcon";
import { GitHubIcon } from "./GitHubIcon";
import { LinkedInIcon } from "./LinkedInIcon";

export const Home = (t: HomeProps) => {
  return (
    <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-x-12 min-h-screen bg-slate-950 bg-opacity-80 p-4 md:p-8 rounded">
      <div className="flex flex-col gap-12 md:justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl">Victor Moraes</h1>
            <div className="text-xl tracking-wide">{t.jobTitle}</div>
          </div>
          <div className="text-lg font-light">{t["introduction.text"]}</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="text-xl">
            <a href={`/${t.lang}/cv`}>{t.cv}</a>
          </div>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/victor-moraes/">
              <LinkedInIcon
                fill1={Colors.text}
                fill2={Colors.fill}
                bgColor={Colors.bg}
                size={24}
              />
            </a>
            <a href="https://github.com/moraesvic">
              <GitHubIcon fill={Colors.text} bgColor={Colors.bg} size={24} />
            </a>
            <a href="mailto:talkto@moraesvic.com">
              <EmailIcon fill={Colors.text} bgColor={Colors.bg} size={24} />
            </a>
          </div>
        </div>
      </div>
      <div>Actual content here</div>
    </div>
  );
};

export default Home;
