import { IColors, TTheme } from "./IColors";
import { COLORS } from './Colors';
import { MobXRepository } from "../../repository/MobXRepository";
import { IRepository } from "../../repository/IRepository";
import { IColorTheme } from "./IColorTheme";
import { IStorage, storage } from "../../libs/storage";

class ColorTheme implements IColorTheme {
    constructor(
        private themeStore: IRepository<TTheme>,
        private allThemeColorsStore: IRepository<{ [key: string]: IColors; }>,
        private storage: IStorage) {
        this.load();
    }

    get theme() {
        return this.themeStore.data || 'light';
    }

    get colors() {
        return this.allThemeColorsStore.data?.[this.theme] || COLORS.light;
    }

    private load = () => {
        this.storage.get('COLOR_THEME')
            .then(data => { data && this.setTheme(data) })
            .catch(error => console.warn('COLOR_THEME -> load: ', error));
    }

    setTheme = (data: TTheme) => {
        if (this.allThemeColorsStore.data?.[data]) {
            this.themeStore.save(data);
            this.storage.set('COLOR_THEME', data);
        }
    }

}

const themeStore = new MobXRepository<TTheme>('light');
const allThemeColorsStore = new MobXRepository<{ [key: string]: IColors; }>(COLORS);
export const colorTheme = new ColorTheme(themeStore, allThemeColorsStore, storage);
