import { observer } from 'mobx-react';
import React, { createContext, FC, useContext } from 'react';
import { ILocalization } from './localization/ILocalization';
import { localization } from './localization/Localization';
import { colorTheme } from './theme/ColorTheme';
import { IColorTheme } from './theme/IColorTheme';

export const UIContext = createContext<IColorTheme & ILocalization>({} as any);

export const useUiContext = () => { return useContext(UIContext) };

interface IProps {
    children: React.ReactNode | React.ReactNode[];
}

export const UIProvider: FC<IProps> = observer(({ children }) => {
    const value = {
        colors: colorTheme.colors,
        setTheme: colorTheme.setTheme,
        theme: colorTheme.theme,
        locales: localization.locales,
        locale: localization.locale,
        setLocale: localization.setLocale,
        setTranslation: localization.setTranslation,
        t: localization.t,
    };

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    );
});