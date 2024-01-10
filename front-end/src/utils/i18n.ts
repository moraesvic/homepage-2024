export const defaultLanguage = "en";
export const languages = [defaultLanguage, "pt"] as const;
export type Language = (typeof languages)[number];

export const getLangFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split("/");
  if ((languages as readonly string[]).includes(lang)) {
    return lang as Language;
  }
  return defaultLanguage;
};
