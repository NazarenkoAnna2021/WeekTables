import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../UIProvider/theme/IColors';
import { scaleVertical, size } from '../../../../../Utils';
import { grid } from '../../../utils/gridSizing';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            width:size.width,
            alignItems: 'center',
        },
        tableScrollWrapper: {
            flex: 1,
        },
        tableWrapper: {
            flexDirection: 'row',
            marginTop: 7
        },
        tableInnerWrapper: {
            overflow: 'hidden',
            marginBottom: 10,
        },
        scroll: {
            paddingBottom: scaleVertical(10)
        },
        currentRow: {
            height: '100%',
            width: grid.width,
            // backgroundColor: colors.activeRow,
            position: 'absolute'
        },
        selectedRow: {
            height: '100%',
            width: grid.width,
            backgroundColor: colors.primary,
            opacity: 0.5,
            position: 'absolute'
        },
    })
}  