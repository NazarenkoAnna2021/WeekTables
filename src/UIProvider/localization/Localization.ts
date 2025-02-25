import { I18n, TranslateOptions } from 'i18n-js';
import { translations } from './Translations';
import { ILocalization, TLocales } from './ILocalization';
import { IRepository } from '../../repository/IRepository';
import { MobXRepository } from '../../repository/MobXRepository';
import { IStorage, storage } from '../../libs/storage';
import { getLocales } from "react-native-localize"

class Localization implements ILocalization {
    private i18n!: I18n

    constructor(private localizationStore: IRepository<TLocales>, private storage: IStorage) {
        this.i18n = new I18n();
        this.i18n.enableFallback = true;
        this.i18n.translations = translations;
        this.load();
    };

    private setLanguageByDeviceLocale(defaultLocale: TLocales = 'en') {
        try {
            if (!this.localizationStore.data) {
                const deviceLocale = getLocales()?.[0]?.languageCode || '';
                const isLanguageIncludes = Object.keys(translations).includes(deviceLocale);
                if (isLanguageIncludes && deviceLocale) {
                    this.setLocale(deviceLocale as TLocales);
                } else {
                    this.setLocale(defaultLocale);
                }
            }
        } catch (error) {
            console.warn('Localization -> setLanguageByDeviceLocale: ', error);
        }
    }

    private load = async () => {
        const language = await this.storage.get('LANGUAGE');
        if (language) {
            this.localizationStore.save(language);
        };
        // const translations = await this.storage.get('TRANSLATIONS');
        // if (translations) {
        //     this.i18n.translations = translations;
        // };
        this.setLanguageByDeviceLocale();
    };

    private persistLanguage = (data: string | null) => {
        if (data) {
            this.storage.set('LANGUAGE', data);
        } else {
            this.storage.remove('LANGUAGE');
        }
    }

    private persistTranslations = (data: object) => {
        if (data) {
            this.storage.set('TRANSLATIONS', data);
        }
    }

    get locales() {
        return Object.keys(this.i18n.translations) as TLocales[];
    }

    get locale() {
        return this.localizationStore.data || 'en';
    }

    setTranslation = (translations: any) => {
        if (typeof translations === 'object' && translations) {
            this.i18n.translations = translations;
            // this.persistTranslations(translations);
        }
    }

    t = (key: string, options?: TranslateOptions) => {
        const locale = this.localizationStore.data;
        return this.i18n.t(key, { locale, ...options });
    }

    setLocale = (locale: TLocales) => {
        this.localizationStore.save(locale);
        this.persistLanguage(locale);
    }

}

const localizationStore = new MobXRepository<TLocales>();
export const localization = new Localization(localizationStore, storage);
