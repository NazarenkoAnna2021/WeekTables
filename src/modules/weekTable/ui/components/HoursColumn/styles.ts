import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal } from '../../../../../Utils';
import { grid } from '../../../utils/gridSizing';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            overflow:'visible'
        },
        text: {
            fontFamily: undefined,
            fontSize: scaleFontSize(11),
            fontWeight: '400',
            textAlign: 'right',
            color: colors.text,
            width: grid.width,
            height: grid.height,
            paddingRight: scaleHorizontal(7),
            top: -7,
        },
    });
};