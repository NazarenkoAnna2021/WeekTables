import React, { FC, useMemo } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ViewStyle } from 'react-native';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUiContext } from '../../UIProvider';
import { getStyle } from './styles';
import { ScrollView } from 'react-native';

interface IProps {
    scrollViewRef?: any;
    edges?: Edge[];
    children?: React.ReactNode;
    scrollEnabled?: boolean;
    keyboardShouldPersistTaps?: boolean;
    containerStyle?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    headerComponent?: React.ReactNode;
    isKeyboardAvoiding?: boolean;
}

export const ScreenContainer: FC<IProps> = ({ scrollViewRef, isKeyboardAvoiding, headerComponent, edges, children, scrollEnabled = false, keyboardShouldPersistTaps = true, containerStyle, contentContainerStyle }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const safeAreaInsets = useSafeAreaInsets();

    const avoidingBehavior: 'padding' | undefined = Platform.select({ ios: 'padding', android: undefined }) || undefined;

    const edgesStyle = useMemo(() => {
        const result: any = {};
        if (!edges) {
            return { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom, };
        }
        if (edges?.includes('top')) {
            result.paddingTop = safeAreaInsets.top;
        }
        if (edges?.includes('bottom')) {
            result.paddingBottom = safeAreaInsets.bottom;
        }
        if (edges?.includes('left')) {
            result.paddingLeft = safeAreaInsets.left;
        }
        if (edges?.includes('right')) {
            result.paddingRight = safeAreaInsets.right;
        }
        return result;
    }, [edges]);

    return (
        <KeyboardAvoidingView enabled={isKeyboardAvoiding} style={[styles.container, containerStyle, edgesStyle]} behavior={avoidingBehavior} onStartShouldSetResponder={keyboardShouldPersistTaps ? Keyboard.dismiss : undefined as any}>
            {headerComponent}
            {scrollEnabled
                ? <ScrollView
                    bounces={false}
                    ref={scrollViewRef}
                    scrollEnabled={scrollEnabled}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[styles.contentContainerStyle, contentContainerStyle]}
                    style={styles.contentContainerStyle}
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps={'handled'}
                >
                    {children}
                </ScrollView>
                : children
            }
        </KeyboardAvoidingView>
    );
};
