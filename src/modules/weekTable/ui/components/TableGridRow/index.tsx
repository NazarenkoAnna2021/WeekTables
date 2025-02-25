import { FC, memo, useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../../../../UIProvider";
import moment from "moment";

const WEEK = [0, 1, 2, 3, 4, 5, 6];

interface IProps {
    item: string;
    isLast: boolean;
    onSlotPress?: (value: { day: number, time: number }) => void;
};

interface IGridItem {
    item: number;
    isLast: boolean;
    disabled: boolean;
    onPress: (value: number) => void;
};

export const TableGridRow: FC<IProps> = memo(({ item, isLast, onSlotPress }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    const onPress = useCallback((day: number) => {
        const time = Number(moment(item === 'Noon' ? '12 pm' : item, 'H a').format('H'));
        onSlotPress?.({ day, time });
    }, [item, onSlotPress]);

    return (
        <View style={styles.container}>
            {WEEK.map(item =>
                <GridItem key={item} item={item} disabled={!onSlotPress} isLast={isLast} onPress={onPress} />
            )}
        </View>
    );
});

const GridItem: FC<IGridItem> = ({ item, isLast, disabled, onPress }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    const handleOnPress = () => {
        onPress(item);
    };

    return (
        <Pressable
            disabled={disabled}
            style={({ pressed }: { pressed: boolean }) => ([styles.cell, { borderBottomWidth: isLast ? 1 : 0, backgroundColor: pressed ? colors.grid : undefined }])}
            onPress={handleOnPress}
        />
    );
}; 