import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../UIProvider/theme/IColors';
import { grid } from '../../../utils/gridSizing';
import { scaleFontSize } from '../../../../../Utils';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
        },
        sessionWrapper: {
            position: 'absolute',
            borderRadius: 5,
            backgroundColor:colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            width: grid.width,
            overflow: 'hidden',
        },
        text: {
            fontFamily: undefined,
            fontSize: scaleFontSize(9),
            fontWeight: '500',
            color: colors.text,
        },
    })
}  