import { TranslateOptions } from "i18n-js";

export interface ILocalization {
    readonly locales: TLocales[];
    readonly locale: TLocales;
    t: (key: string, options?: TranslateOptions) => string;
    setTranslation: (translations: any) => void;
    setLocale: (value: TLocales) => void;
};

export type TLocales = 'en';