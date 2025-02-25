import { StyleSheet } from 'react-native';
import { IColors } from '../../UIProvider/theme/IColors';
import { scaleVertical, size } from '../../Utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            overflow: 'hidden',
        },
        contentContainerStyle: {
            flexGrow: 1
        },
        outerBackgroundImage: {
            zIndex: -1,
            position: 'absolute',
            width: size.width,
            height: size.height + scaleVertical(100),
        },
        innerBackgroundImage: {
            zIndex: -1,
            position: 'absolute',
            width: size.width,
            height: size.height + scaleVertical(100),
        },
    });
    return styles;
}
