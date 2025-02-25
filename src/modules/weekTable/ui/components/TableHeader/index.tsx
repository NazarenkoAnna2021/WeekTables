import { FC, memo, useMemo } from "react";
import { getStyles } from "./styles";
import { weekdays } from "moment";
import { useUiContext } from "../../../../../UIProvider";
import { Text, View } from "react-native";
import moment from "moment";


interface IProps {
    dates?: string[];
    selectedWeekDays?: { DaysOfWeek: number, color: string }[];
};

export const TableHeader: FC<IProps> = memo(({ dates, selectedWeekDays }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const today = moment().format('YYYY-MM-DD');

    const getColor = (index: number, date?: string) => {
        const selected = selectedWeekDays?.find(item => item.DaysOfWeek === index);
        if(date && today.includes(date)){
            return colors.primary
        };
        if (selected) {
            return selected.color;
        };
        return colors.card;
    };

    const renderItem = (item: string, index: number) => (
        <View key={item} style={styles.gridItem}>
            <View style={[styles.textWrapper, { backgroundColor: getColor(index, dates?.[index]) }]} >
                <Text style={[styles.dayText]}>{item.slice(0, 3)}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {weekdays()?.map?.(renderItem)}
        </View>
    );
}
); 