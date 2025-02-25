import { RefObject, useCallback, useMemo, useRef } from "react";
import { getStyles } from "./styles";
import { ScrollView, View } from "react-native";
import { useUiContext } from "../../../../../UIProvider";
import { HoursColumn } from "../HoursColumn";
import { TableGrid } from "../TableGrid";
import { TableHeader } from "../TableHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useLayout } from "@react-native-community/hooks";
import { IData } from "../../../entities/IData";
import { grid } from "../../../utils/gridSizing";
import { HourItem } from "../HourItem";

interface IProps<T> {
    data: T[];
    dates?: string[];
    tableOffset: RefObject<{ x: number; y: number; }>;
    selectedWeekDays?: { DaysOfWeek: number, color: string }[];
    selectedItem?: T;
    isEditable?: boolean;
    onItemPress?: (value?: T) => void;
    onSlotPress?: (value: { day: number, time: number, date?: string }) => void;
    onEdit?: (value: { day: number, time: number; }, session: T) => void;
    onDelete?: (value: T) => void;
};

export const Table = <T extends IData,>({ data, dates, tableOffset, selectedWeekDays, selectedItem, isEditable = false, onItemPress, onSlotPress, onEdit, onDelete, }: IProps<T>) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { height, onLayout } = useLayout();
    const scrollRef = useRef<ScrollView>(null);
    const scrollY = useSharedValue(0);

    const scrollHandler = useCallback(useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    }), []);

    const scrollOnDrag = useCallback((destination: number) => {
        scrollRef.current?.scrollTo({ y: destination, animated: true });
        tableOffset.current = { x: 0, y: destination };
    }, []);

    const onMomentumScrollEnd = useCallback(() => {
        tableOffset.current = { x: 0, y: scrollY.value };
    }, []);

    return (
        <View style={styles.container}>
            <TableHeader selectedWeekDays={selectedWeekDays} dates={dates} />
            <View style={styles.tableScrollWrapper} onLayout={onLayout}>
                <Animated.ScrollView
                    onScroll={scrollHandler}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    contentOffset={{ x: tableOffset.current.x || 0, y: tableOffset.current.y || 0 }}
                    // @ts-ignore
                    ref={ref => scrollRef.current = ref}
                    showsVerticalScrollIndicator={false}
                >
                    <GestureHandlerRootView>
                        <View style={styles.tableWrapper}>
                            <HoursColumn />
                            <View style={styles.tableInnerWrapper}>
                                <TableGrid onSlotPress={onSlotPress} dates={dates} />
                                {!!selectedWeekDays && selectedWeekDays.map(item =>
                                    <View key={item.DaysOfWeek} style={[styles.selectedRow, { marginLeft: grid.width * item.DaysOfWeek, backgroundColor: item.color }]} pointerEvents={'none'} />
                                )}
                                <HourItem<T>
                                    contentHeight={height}
                                    scrollY={scrollY}
                                    isEditable={isEditable}
                                    data={data}
                                    selectedItem={selectedItem}
                                    scrollOnDrag={scrollOnDrag}
                                    onItemPress={onItemPress}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            </View>
                        </View>
                    </GestureHandlerRootView>
                </Animated.ScrollView>
            </View>
        </View>
    );
};