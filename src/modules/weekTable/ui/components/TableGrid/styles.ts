import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../UIProvider/theme/IColors';
import { grid } from '../../../utils/gridSizing';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
        },
        gridImage: {
            width: grid.width * 7,
            height: grid.height * 24
        },
    })
}  