import { useMemo } from "react";
import { View } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../../../../UIProvider";
import { SharedValue } from "react-native-reanimated";
import { IData } from "../../../entities/IData";
import { findConflicts } from "../../../utils/findConflicts";
import { DataItem } from "../DataItem";

interface IProps<T> {
    contentHeight: number;
    data: T[],
    isEditable?: boolean;
    scrollY: SharedValue<number>;
    selectedItem?: T,
    onItemPress?: (value?: T) => void;
    onEdit?: (value: { day: number, time: number; }, session: T) => void;
    scrollOnDrag: (value: any) => void;
    onDelete?: (value: T) => void;
};

export const HourItem = <T extends IData,>({ contentHeight, data, isEditable, scrollY, selectedItem, onItemPress, onEdit, scrollOnDrag, onDelete }: IProps<T>) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    const overlappingIds = useMemo(() => {
        const formattedSessions: { [key: string]: Array<string | undefined>; } = {};
        data.forEach((session, _, array) => {
            const conflicts = findConflicts([session], array.filter(item => item.Uid !== session.Uid));
            const conflictsOfConflicts = conflicts.map(item => findConflicts([item], array.filter(item => item.Uid !== session.Uid))).flat();
            conflicts.push(...conflictsOfConflicts);
            if (conflicts.length) {
                const uniqConflicts = [...new Set(conflicts.map(item => item.Uid))];
                formattedSessions[`${session.Uid}`] = [session.Uid, ...uniqConflicts];
            };
        });
        return formattedSessions;
    }, [data]);

    const onPress = (value: T) => {
        onItemPress?.(value);
    };

    return (
        <View style={styles.container} pointerEvents='box-none'>
            {data?.map((item) => (
                <DataItem
                    contentHeight={contentHeight}
                    isEditable={isEditable}
                    scrollY={scrollY}
                    overlappingIds={overlappingIds[item.Uid] || []}
                    selectedStartDate={selectedItem?.StartDateTime}
                    key={item?.Uid}
                    item={item}
                    onPress={onPress}
                    scrollOnDrag={scrollOnDrag}
                    setNewTime={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </View>
    );
};