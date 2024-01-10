import type { CVProps } from "../content/config";
import { Skills } from "./Skills";
import { programmingSkills } from "./programmingSkills";
import Pills from "./Pills";
import { GitHubIcon } from "./GitHubIcon";
import clsx from "clsx";
import { LinkedInIcon } from "./LinkedInIcon";
import { EmailIcon } from "./EmailIcon";

const H2 = (
  props: Omit<React.HTMLAttributes<HTMLHeadingElement>, "className">
) => <h2 className="bg-gray-300 font-bold text-lg p-2" {...props} />;

const H3 = (
  props: Omit<React.HTMLAttributes<HTMLHeadingElement>, "className">
) => <h3 className="font-bold text-base my-2" {...props} />;

const Company = (
  props: Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
) => {
  return <div className="my-5" {...props} />;
};

const CompanyHeader = ({
  title,
  name,
  location,
  period,
}: {
  title: string;
  name: string;
  location: string;
  period: string;
}) => {
  return (
    <div className="mb-2">
      <p className="text-base font-bold mr-1 tracking-tight">
        {title} @ {name}
      </p>
      <p className="text-sm">
        {location} | {period}
      </p>
    </div>
  );
};

const ProjectDescription = ({
  title,
  description,
  Technologies,
}: {
  title: string;
  description: string;
  Technologies: Array<() => JSX.Element>;
}) => {
  return (
    <p className="text-sm mb-1">
      <span className="mr-1">
        <strong>{title}</strong> {description}
      </span>
      <span>
        {Technologies.map((Tech, idx) => (
          <span key={idx}>
            <Tech />{" "}
          </span>
        ))}
      </span>
    </p>
  );
};

const Column = ({
  className,
  ...rest
}: Omit<React.HTMLAttributes<HTMLDivElement>, "style">) => {
  return (
    <div
      className={clsx("bg-white text-black md:h-full md:mb-2", className)}
      {...rest}
    />
  );
};

const Box = (
  props: Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
) => {
  return <div className="bg-white m-2" {...props} />;
};

// bg-slate-950
const bgColor = "rgba(2 6 23)";

// text-slate-100
const textColor = "rgb(241 245 249)";

const CV = (t: CVProps) => {
  return (
    <div className="w-full rounded relative">
      <div className="absolute -z-10 bg-slate-950 opacity-80 top-0 bottom-0 right-0 left-0 rounded shadow-lg" />
      <div className="p-2 md:p-4 text-slate-100 grid place-items-center ">
        <div
          className="grid gap-x-2 md:gap-x-4"
          style={{ gridTemplateColumns: "minmax(0, 45fr) minmax(0, 55fr)" }}
        >
          <div className="text-2xl font-semibold">
            <a href={`/${t.lang}`}>Victor Moraes</a>
          </div>
          <div className="row-span-2 flex items-center justify-start gap-2 md:justify-between md:gap-0 flex-wrap">
            <a
              title="LinkedIn profile"
              href="https://www.linkedin.com/in/victor-moraes/"
              className="text-2xs md:text-xs tracking-tight leading-none"
            >
              <div className="flex gap-2 items-center text-center mb-2">
                <LinkedInIcon
                  fill1={textColor}
                  fill2={bgColor}
                  bgColor={bgColor}
                  size={26}
                />
                <div>@victor-moraes</div>
              </div>
            </a>
            <a
              title="GitHub profile"
              href="https://github.com/moraesvic"
              className="text-2xs md:text-xs tracking-tight leading-none"
            >
              <div className="flex gap-2 items-center text-center mb-2">
                <GitHubIcon fill={textColor} bgColor={bgColor} size={26} />
                <div>@moraesvic</div>
              </div>
            </a>
            <a
              title="Email"
              href="mailto:talkto@moraesvic.com"
              className="text-2xs md:text-xs tracking-tight leading-none"
            >
              <div className="flex gap-2 items-center text-center mb-2">
                <EmailIcon
                  // text-slate-100
                  fill="rgb(241 245 249)"
                  // bg-slate-900
                  bgColor="rgb(15 23 42)"
                  size={26}
                />
                <div>talkto@moraesvic.com</div>
              </div>
            </a>
          </div>
          <div className="text-base mb-1">{t.jobTitle}</div>

          <div className="flex col-span-2 flex-wrap sm:contents">
            <Column>
              <H2>{t["introduction.title"]}</H2>
              <Box>
                <p className="text-sm">{t["introduction.text"]}</p>
                <H3>{t["techStack.title"]}</H3>
                <Skills skills={programmingSkills} />
                <H3>{t["techStack.other.title"]}</H3>
                <p className="text-xs">{t["techStack.other.text"]}</p>
              </Box>
              <H2>{t["languages.title"]}</H2>
              <Box>
                <Skills
                  skills={[
                    { name: t.portuguese, percentage: 100 },
                    { name: t.english, percentage: 100 },
                    { name: t.german, percentage: 90 },
                    { name: t.spanish, percentage: 90 },
                  ]}
                />
              </Box>
              <H2>{t["visaStatus.title"]}</H2>
              <Box>
                <p className="text-sm">{t["visaStatus.text"]}</p>
              </Box>
            </Column>

            <Column>
              <H2>{t["education"]}</H2>
              <Box>
                <H3>{t["bachLinguistics.title"]}</H3>
                <p className="text-sm">{t["bachLinguistics.description"]}</p>
                <H3>{t["exchangeProgram.title"]}</H3>
                <p className="text-sm">{t["exchangeProgram.description"]}</p>
                <H3>{t["bachCivilEngineering.title"]}</H3>
                <p className="text-sm">
                  {t["bachInCivilEngineering.description"]}
                </p>
              </Box>
              <H2>{t["experience"]}</H2>
              <Box>
                <Company>
                  <CompanyHeader
                    title={t["brickAbode.title"]}
                    name={t["brickAbode.companyName"]}
                    location={t["brickAbode.location"]}
                    period={t["brickAbode.period"]}
                  />{" "}
                  <ProjectDescription
                    title={t["brickAbode.items.0.title"]}
                    description={t["brickAbode.items.0.description"]}
                    Technologies={[
                      Pills.DotNet,
                      Pills.Postgres,
                      Pills.AWS,
                      Pills.React,
                      Pills.Typescript,
                    ]}
                  />{" "}
                  <ProjectDescription
                    title={t["brickAbode.items.1.title"]}
                    description={t["brickAbode.items.1.description"]}
                    Technologies={[
                      Pills.Javascript,
                      Pills.Typescript,
                      Pills.React,
                    ]}
                  />
                </Company>
                <Company>
                  <CompanyHeader
                    title={t["bcg.title"]}
                    name={t["bcg.companyName"]}
                    location={t["bcg.location"]}
                    period={t["bcg.period"]}
                  />{" "}
                  <ProjectDescription
                    title={t["bcg.items.0.title"]}
                    description={t["bcg.items.0.description"]}
                    Technologies={[
                      Pills.React,
                      Pills.Javascript,
                      Pills.Python,
                      Pills.Postgres,
                      Pills.GCP,
                      Pills.Terraform,
                    ]}
                  />
                </Company>
                <Company>
                  <CompanyHeader
                    title={t["labic.title"]}
                    name={t["labic.companyName"]}
                    location={t["labic.location"]}
                    period={t["labic.period"]}
                  />{" "}
                  <ProjectDescription
                    title={t["labic.items.0.title"]}
                    description={t["labic.items.0.description"]}
                    Technologies={[
                      Pills.Wordpress,
                      Pills.PHP,
                      Pills.Stripe,
                      Pills.Javascript,
                    ]}
                  />
                </Company>
              </Box>
            </Column>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
