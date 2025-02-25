import { StyleSheet } from 'react-native';
import { IColors } from '../../../../../UIProvider/theme/IColors';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
    })
}  