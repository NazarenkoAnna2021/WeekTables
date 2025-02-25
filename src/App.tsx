import React, { FC } from 'react';
import { UIProvider } from './UIProvider';
import { WeekTableView } from './modules/weekTable/ui/weekTableView';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const App: FC = () => {

    return (
        <UIProvider>
            <SafeAreaProvider>
                <WeekTableView />
            </SafeAreaProvider>
        </UIProvider>
    );
}