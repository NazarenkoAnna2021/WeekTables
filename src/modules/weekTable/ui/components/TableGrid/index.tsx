import { FC, memo, useCallback, useMemo } from "react";
import { getStyles } from "./styles";
import { useUiContext } from "../../../../../UIProvider";
import { TableGridRow } from "../TableGridRow";
import { View } from "react-native";
import moment from "moment";
import { grid } from "../../../utils/gridSizing";

interface IProps {
    onSlotPress?: (value: { day: number, time: number, date?: string }) => void;
    dates?: string[];
};

export const TableGrid: FC<IProps> = memo(({ onSlotPress, dates }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    const handleOnSlotPress = (value: { day: number, time: number }) => {
        const date = moment(dates?.[0]).set('day', value.day).set('hour', value.time);
        onSlotPress?.({ ...value, date: date.toISOString() });
    };

    const renderItem = useCallback((item: string, index: number, array: string[]) => (
        <TableGridRow key={item} item={item} isLast={index === array.length - 1} onSlotPress={handleOnSlotPress} />
    ), [handleOnSlotPress]);

    return (
        <View style={styles.container}>
            {grid.hours.map(renderItem)}
        </View>
    );
}); 