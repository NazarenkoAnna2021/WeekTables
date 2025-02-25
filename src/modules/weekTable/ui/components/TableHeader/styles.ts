import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../UIProvider/theme/IColors';
import { grid } from '../../../utils/gridSizing';
import { scaleFontSize, scaleHorizontal, scaleVertical } from '../../../../../Utils';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            zIndex:1,
            flexDirection: 'row',
            paddingLeft: grid.width,
            paddingBottom: scaleVertical(6),
            backgroundColor:colors.background,
        },
        gridItem: {
            width: grid.width,
            height: grid.height,
            paddingHorizontal: scaleHorizontal(3)
        },
        textWrapper: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
        },
        dayText: {
            fontSize: scaleFontSize(11),
            fontWeight: '500',
        },
        dateText: {
            fontSize: scaleFontSize(15),
            fontWeight: '600',
        },
    })
}  