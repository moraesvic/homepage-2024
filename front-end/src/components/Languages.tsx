import clsx from "clsx";
import { languages } from "../utils/i18n";

export type LanguagesProps = {
  languages: readonly string[];
  lang: string;
  endOfSlug: string;
};

const LanguagesInternal = ({ languages, lang, endOfSlug }: LanguagesProps) => {
  return (
    <div className="w-full flex justify-center bg-fuchsia-400">
      <ul className="flex gap-4 text-lg">
        {languages.map((a) => (
          <li key={a} className={clsx("uppercase", a === lang && "font-bold")}>
            <a href={`/${a}${endOfSlug}`}>{a}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Languages = ({ lang, endOfSlug }: Omit<LanguagesProps, "languages">) => {
  return (
    <LanguagesInternal
      languages={languages}
      lang={lang}
      endOfSlug={endOfSlug}
    />
  );
};

export default Languages;
