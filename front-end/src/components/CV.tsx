import type { CVProps } from "../content/config";
import { Skills } from "./Skills";
import { programmingSkills } from "./programmingSkills";
import Pills from "./Pills";
import { GitHubIcon } from "./GitHubIcon";
import clsx from "clsx";
import { LinkedInIcon } from "./LinkedInIcon";
import { EmailIcon } from "./EmailIcon";
import { Colors } from "./Colors";

import { FaSave } from "react-icons/fa";

import "./CV.css";
import { getLanguageSkills } from "./languageSkills";

const H2 = (
  props: Omit<React.HTMLAttributes<HTMLHeadingElement>, "className">
) => <h2 className="bg-gray-300 font-bold text-lg p-2" {...props} />;

const H3 = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={clsx("font-bold text-base my-2", className)} {...rest} />
);

const Company = (
  props: Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
) => {
  return <div className="mb-8" {...props} />;
};

const CompanyHeader = ({
  title,
  name,
  location,
  period,
  url,
}: {
  title: string;
  name: string;
  location: string;
  period: string;
  url: string;
}) => {
  return (
    <div className="my-2">
      <a href={url}>
        <p className="text-base font-bold mr-1 tracking-tight">
          {title} @ {name}
        </p>
        <p className="text-sm">
          {location} | {period}
        </p>
      </a>
    </div>
  );
};

const ProjectDescription = ({
  title,
  description,
  Technologies,
  url,
}: {
  title: string;
  description: string;
  Technologies: Array<() => JSX.Element>;
  url?: string;
}) => {
  return (
    <p className="text-sm my-2">
      <span className="mr-1">
        {url !== undefined ? (
          <a href={url}>
            <strong>{title}</strong>
          </a>
        ) : (
          <strong>{title}</strong>
        )}
        &nbsp;<span>{description}</span>
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
      className={clsx("bg-white text-black lg:h-full lg:mb-2", className)}
      {...rest}
    />
  );
};

const Box = (
  props: Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style">
) => {
  return <div className="bg-white m-2" {...props} />;
};

const BCG = (t: CVProps) => {
  return (
    <Company>
      <CompanyHeader
        title={t["bcg.title"]}
        name={t["bcg.companyName"]}
        location={t["bcg.location"]}
        period={t["bcg.period"]}
        url="https://www.bcg.com"
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
      <ProjectDescription
        title={t["bcg.items.1.title"]}
        description={t["bcg.items.1.description"]}
        Technologies={[
          Pills.Terraform,
          Pills.AWS,
          Pills.Python,
          Pills.Postgres,
        ]}
      />
    </Company>
  );
};

// Currently out of use
const Labic = (t: CVProps) => {
  return (
    <Company>
      <CompanyHeader
        title={t["labic.title"]}
        name={t["labic.companyName"]}
        location={t["labic.location"]}
        period={t["labic.period"]}
        url="https://www.innovacionciudadana.org/en/"
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
  );
};

const CV = (t: CVProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full rounded p-2 md:px-12 md:pt-8 md:pb-4 bg-slate-950 bg-opacity-90 text-slate-100 grid place-items-center">
        <div
          className="grid gap-x-2 gap-y-4 lg:gap-x-8"
          style={{ gridTemplateColumns: "minmax(0, 45fr) minmax(0, 55fr)" }}
        >
          <div>
            <div className="text-2xl font-semibold">
              <a href={`/${t.lang}`}>Victor Moraes</a>
            </div>
            <div className="text-base mb-1">{t.jobTitle}</div>
          </div>

          <div className="flex items-center justify-start gap-2 lg:justify-between lg:gap-0 flex-wrap">
            <a
              title="LinkedIn profile"
              href="https://www.linkedin.com/in/victor-moraes/"
              className="text-2xs lg:text-xs tracking-tight leading-none"
            >
              <div className="flex gap-2 items-center text-center mb-2">
                <LinkedInIcon
                  fill1={Colors.text}
                  fill2={Colors.fill}
                  bgColor={Colors.bg}
                  size={26}
                />
                <div>@victor-moraes</div>
              </div>
            </a>
            <a
              title="GitHub profile"
              href="https://github.com/moraesvic"
              className="text-2xs lg:text-xs tracking-tight leading-none"
            >
              <div className="flex gap-2 items-center text-center mb-2">
                <GitHubIcon fill={Colors.text} bgColor={Colors.bg} size={26} />
                <div>@moraesvic</div>
              </div>
            </a>
            <a
              title="Email"
              href="mailto:talkto@moraesvic.com"
              className="text-2xs lg:text-xs tracking-tight leading-none"
            >
              <div className="flex gap-2 items-center text-center mb-2">
                <EmailIcon fill={Colors.text} bgColor={Colors.bg} size={26} />
                <div>talkto@moraesvic.com</div>
              </div>
            </a>
          </div>

          <div id="_columns" className="flex col-span-2 flex-wrap">
            <Column>
              <H2>{t["introduction.title"]}</H2>
              <Box>
                <p className="text-sm">{t["introduction.text"]}</p>
                <a href="https://www.credly.com/badges/33bf2e2f-383f-4ade-878d-2f5d716bb7b5">
                  <div
                    className="my-4 grid gap-x-4 items-center"
                    style={{ gridTemplateColumns: "max-content 1fr" }}
                  >
                    <img
                      src="/aws-certified-solutions-architect-associate.png"
                      width={60}
                      alt={t["aws.alt"]}
                    />
                    <p className="text-sm">{t["aws.title"]}</p>
                  </div>
                </a>

                <H3>{t["techStack.title"]}</H3>
                <Skills skills={programmingSkills} />
                <details className="print:hidden">
                  <summary className="cursor-pointer">
                    <H3 className="inline">{t["techStack.other.title"]}</H3>
                  </summary>
                  <p className="text-xs">{t["techStack.other.text"]}</p>
                </details>
                <div className="hidden print:block">
                  <H3>{t["techStack.other.title"]}</H3>
                  <p className="text-xs">{t["techStack.other.text"]}</p>
                </div>
              </Box>
              <H2>{t["languages.title"]}</H2>
              <Box>
                <Skills skills={getLanguageSkills(t)} />
              </Box>
              <H2>{t["visaStatus.title"]}</H2>
              <Box>
                <p className="text-sm">{t["visaStatus.text"]}</p>
              </Box>
            </Column>

            <Column>
              <H2>{t["experience"]}</H2>
              <Box>
                <BCG {...t} />
                <Company>
                  <CompanyHeader
                    title={t["brickAbode.title"]}
                    name={t["brickAbode.companyName"]}
                    location={t["brickAbode.location"]}
                    period={t["brickAbode.period"]}
                    url="https://www.brickabode.com/"
                  />{" "}
                  <ProjectDescription
                    title={t["brickAbode.items.0.title"]}
                    description={t["brickAbode.items.0.description"]}
                    url="https://github.com/Jellyfish-Insights"
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
                    url="https://www.linkedin.com/company/sericin-limited/about/"
                    Technologies={[
                      Pills.Javascript,
                      Pills.Typescript,
                      Pills.React,
                    ]}
                  />
                </Company>
              </Box>

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
            </Column>
          </div>

          <div className="flex justify-center col-span-2 print:hidden">
            <a
              className="px-4 py-1 rounded-lg border-1 border-solid border-white tracking-wider text-lg flex flex-col gap-2 items-center"
              href={`/cv-${t.lang}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSave size={20} />
              <span>{t.downloadCV}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="grid place-items-center bg-slate-950 bg-opacity-90 px-2 py-1 print:hidden">
        <a href={`/${t.lang}`}>{t["footer.backToMainPage"]}</a>
      </div>
    </div>
  );
};

export default CV;
