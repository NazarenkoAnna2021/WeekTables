import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../UIProvider/theme/IColors';
import { grid } from '../../../utils/gridSizing';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            borderColor: colors.grid,
            borderLeftWidth: 1,
        },
        cell: {
            width: grid.width,
            height: grid.height,
            borderColor: colors.grid,
            borderRightWidth: 1,
            borderTopWidth: 1,
        },
    });
};