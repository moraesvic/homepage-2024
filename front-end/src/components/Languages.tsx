import clsx from "clsx";
import { languages } from "../utils/i18n";

export type LanguagesProps = {
  languages: readonly string[];
  lang: string;
  endOfSlug: string;
};

const LanguagesInternal = ({ languages, lang, endOfSlug }: LanguagesProps) => {
  return (
    <div className="grid place-items-center">
      <ul className="flex gap-4 text-lg bg-slate-950 bg-opacity-90 px-4 py-2 rounded">
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
