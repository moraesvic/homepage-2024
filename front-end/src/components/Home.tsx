import type { HomeProps, TextNode } from "../content/config";
import { Colors } from "./Colors";
import { EmailIcon } from "./EmailIcon";
import { GitHubIcon } from "./GitHubIcon";
import { LinkedInIcon } from "./LinkedInIcon";

import "./Home.css";

type BlockProps = {
  title: string;
  Content: () => JSX.Element;
};

type LinkProps = {
  text: string;
  url: string;
};

const Link = (props: LinkProps) => {
  return (
    <a href={props.url} className="text-indigo-300 font-semibold">
      {props.text}
    </a>
  );
};

const Block = (props: BlockProps) => {
  return (
    <div>
      <h2 className="uppercase tracking-wider text-lg mb-4 text-indigo-300 font-semibold">
        {props.title}
      </h2>
      <props.Content />
    </div>
  );
};

const TextRenderer = ({ nodes }: { nodes: TextNode[][] }) => {
  return (
    <div className="flex flex-col gap-4 font-light">
      {nodes.map((paragraph, idx) => (
        <p key={idx}>
          {paragraph.map((node, idx) => {
            if (node.type === "text") {
              return <span key={idx}>{node.text}</span>;
            }

            return <Link key={idx} url={node.url} text={node.text} />;
          })}
        </p>
      ))}
    </div>
  );
};

export const Home = (t: HomeProps) => {
  return (
    <div className="_grid min-h-screen bg-slate-950 bg-opacity-80 p-4 sm:p-8 rounded">
      <div className="flex flex-col gap-12 md:gap-24">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl">Victor Moraes</h1>
            <div className="text-xl tracking-wide">{t.jobTitle}</div>
          </div>
          <div className="text-lg font-light">{t["introduction.text"]}</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="text-xl font-semibold">
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
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <Block
            title={t["bio.title"]}
            Content={() => <TextRenderer nodes={t.bio} />}
          />
          <div className="pl-8 text-lg text-white font-bold">
            <a
              href={`/${t.lang}/cv`}
              className="inline-flex items-center gap-4"
            >
              <div>➵</div>
              <div>{t.fullCV}</div>
            </a>
          </div>
          <Block
            title={t["experience.title"]}
            Content={() => <TextRenderer nodes={t.bio} />}
          />
          <Block
            title={t["projects.title"]}
            Content={() => <TextRenderer nodes={t.bio} />}
          />
        </div>
        <div>
          <div className="px-16 py-8">
            <hr className="opacity-80" />
          </div>
          <TextRenderer
            nodes={[
              [
                ...t.builtWith[0],
                {
                  type: "text",
                  text: ` © Victor Moraes, ${new Date().getFullYear()}.`,
                },
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
