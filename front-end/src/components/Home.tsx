import type { Experience, HomeProps, TextNode } from "../content/config";
import { Colors } from "./Colors";
import { EmailIcon } from "./EmailIcon";
import { GitHubIcon } from "./GitHubIcon";
import { LinkedInIcon } from "./LinkedInIcon";

import "./Home.css";
import type React from "react";

type BlockProps = {
  title: string;
  children?: React.ReactNode;
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
      <div className="flex flex-col gap-4">{props.children}</div>
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

type ProjectProps = {
  title: string;
  link: string;
  pic: string;
  description: string;
  technologies: string[];
};

const Pill = (props: { children?: React.ReactNode }) => {
  return (
    <div className="text-xs px-2 py-1 bg-teal-500 text-black rounded-full">
      {props.children}
    </div>
  );
};

const Project = (props: ProjectProps) => {
  return (
    <div
      className="grid gap-x-4 items-center"
      style={{ gridTemplateColumns: "max-content 1fr" }}
    >
      <a href={props.pic} target="_blank" rel="noopener noreferrer">
        <img
          src={props.pic}
          alt={`Illustration of project "${props.title}"`}
          width={160}
          height={120}
        />
      </a>
      <div className="flex flex-col gap-4">
        <a href={props.link} className="text-indigo-300 font-semibold">
          {props.title}
        </a>
        <div className="font-light">{props.description}</div>
        <div className="flex gap-2 flex-wrap">
          {props.technologies.map((tech) => (
            <Pill key={tech}>{tech}</Pill>
          ))}
        </div>
      </div>
    </div>
  );
};

type ProjectPropsWithoutDescription = Omit<ProjectProps, "description">;

const homepage: ProjectPropsWithoutDescription = {
  title: "@moraesvic Homepage",
  link: "https://github.com/moraesvic/homepage-2024",
  pic: "/project-1.png",
  technologies: [
    "Typescript",
    "Astro",
    "React",
    "TailwindCSS",
    "Terraform",
    "AWS",
  ],
};

const flashcardFactory: ProjectPropsWithoutDescription = {
  title: "Flashcard Factory",
  link: "https://github.com/moraesvic/anki-flashcard-factory",
  pic: "/project-2.png",
  technologies: ["Go", "Docker", "FFMPEG", "AWS"],
};

const michelangelo: ProjectPropsWithoutDescription = {
  title: "Michelangelo",
  link: "https://github.com/moraesvic/michelangelo",
  pic: "/project-3.png",
  technologies: [
    "Python",
    "Flask",
    "Javascript",
    "React",
    "PostgreSQL",
    "Bash",
    "Vanilla CSS",
  ],
};

const neologismGenerator: ProjectPropsWithoutDescription = {
  title: "Neologism Generator",
  link: "https://github.com/moraesvic/neologism-generator",
  pic: "/project-4.png",
  technologies: ["C"],
};

const snowAnimation: ProjectPropsWithoutDescription = {
  title: "Snow Animation",
  link: "https://github.com/moraesvic/html-canvas-snow-animation",
  pic: "/project-5.png",
  technologies: ["Vanilla Javascript", "HTML Canvas", "Vanilla CSS"],
};

const Experience = (props: Experience) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="leading-tight">
        <div className="uppercase tracking-wider text-sm">
          {props.start}&mdash;{props.end}
        </div>
        <div>
          <a
            href={props.link}
            className="text-indigo-300 font-semibold text-lg"
          >
            {props.company}
          </a>
        </div>
        <div className="font-light text-sm text-indigo-200">{props.title}</div>
      </div>
      <div className="font-light">{props.description}</div>
    </div>
  );
};

const Experiences = (props: { experiences: Experience[] }) => {
  return (
    <div className="flex flex-col gap-8">
      {props.experiences.map((xp) => (
        <Experience key={xp.company + xp.title} {...xp} />
      ))}
    </div>
  );
};

export const Home = (t: HomeProps) => {
  return (
    <div className="_grid min-h-screen bg-slate-950 bg-opacity-90 p-4 sm:p-8 rounded">
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
          <Block title={t["bio.title"]}>
            <TextRenderer nodes={t.bio} />
          </Block>
          <div className="pl-8 text-lg text-white font-bold">
            <a
              href={`/${t.lang}/cv`}
              className="inline-flex items-center gap-4"
            >
              <div>➵</div>
              <div>{t.fullCV}</div>
            </a>
          </div>
          <Block title={t["experience.title"]}>
            <Experiences experiences={t.experiences} />
          </Block>
          <Block title={t["projects.title"]}>
            <p>
              <span className="font-semibold">{t["projects.caveat"]}: </span>
              <span className="font-light">{t["projects.intro"]}</span>
            </p>
            <Project
              {...{ ...homepage, description: t["projects.homepage"] }}
            />
            <Project
              {...{
                ...flashcardFactory,
                description: t["projects.flashcard-factory"],
              }}
            />
            <Project
              {...{
                ...michelangelo,
                description: t["projects.michelangelo"],
              }}
            />
            <Project
              {...{
                ...neologismGenerator,
                description: t["projects.neologism-generator"],
              }}
            />
            <Project
              {...{
                ...snowAnimation,
                description: t["projects.snow-animation"],
              }}
            />
          </Block>
        </div>
        <div>
          <div className="px-16 py-8">
            <hr className="opacity-90" />
          </div>
          <div className="text-center">
            &copy; Victor Moraes, {new Date().getFullYear()}.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
