import { defineCollection, z } from "astro:content";
import type { Language } from "../utils/i18n";

type Lang = {
  lang: Language;
};

const HomeSchema = z.object({
  jobTitle: z.string(),
  cv: z.string(),
});

const homeCollection = defineCollection({
  schema: HomeSchema,
});

export type HomeProps = z.infer<typeof HomeSchema> & Lang;

const CVSchema = z.object({
  "head.title": z.string(),
  jobTitle: z.string(),
  "introduction.title": z.string(),
  "introduction.text": z.string(),
  "techStack.title": z.string(),
  "techStack.other.title": z.string(),
  "techStack.other.text": z.string(),
  "languages.title": z.string(),
  english: z.string(),
  portuguese: z.string(),
  spanish: z.string(),
  german: z.string(),
  "visaStatus.title": z.string(),
  "visaStatus.text": z.string(),
  education: z.string(),
  "bachLinguistics.title": z.string(),
  "bachLinguistics.description": z.string(),
  "exchangeProgram.title": z.string(),
  "exchangeProgram.description": z.string(),
  "bachCivilEngineering.title": z.string(),
  "bachInCivilEngineering.description": z.string(),
  experience: z.string(),
  "brickAbode.title": z.string(),
  "brickAbode.companyName": z.string(),
  "brickAbode.location": z.string(),
  "brickAbode.period": z.string(),
  "brickAbode.items.0.title": z.string(),
  "brickAbode.items.0.description": z.string(),
  "brickAbode.items.1.title": z.string(),
  "brickAbode.items.1.description": z.string(),
  "bcg.title": z.string(),
  "bcg.companyName": z.string(),
  "bcg.location": z.string(),
  "bcg.period": z.string(),
  "bcg.items.0.title": z.string(),
  "bcg.items.0.description": z.string(),
  "labic.title": z.string(),
  "labic.companyName": z.string(),
  "labic.location": z.string(),
  "labic.period": z.string(),
  "labic.items.0.title": z.string(),
  "labic.items.0.description": z.string(),
});

const cvCollection = defineCollection({
  schema: CVSchema,
});

export type CVProps = z.infer<typeof CVSchema> & Lang;

export const collections = {
  home: homeCollection,
  cv: cvCollection,
};