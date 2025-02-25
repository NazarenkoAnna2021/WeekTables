import { FC, useCallback, useMemo, useState } from "react";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../../../../UIProvider";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { grid } from "../../../utils/gridSizing";
import { CancelIcon } from "../../../../../assets/icons/CancelIcon";
import { IData } from "../../../entities/IData";
import { useTableItem } from "../../../presenters/useTableItem";

interface IProps {
    isEditable?: boolean;
    contentHeight: number;
    overlappingIds: Array<string | undefined>;
    scrollY: SharedValue<number>;
    item: IData & { isStart?: boolean; isEnd?: boolean };
    selectedStartDate?: string;
    scrollOnDrag: (value: any) => void;
    onPress?: (value: any) => void;
    setNewTime?: (value: { day: number, time: number }, session: any) => void;
    onDelete?: (value: any) => void;
};

export const DataItem: FC<IProps> = ({ isEditable, item, selectedStartDate, overlappingIds, scrollY, contentHeight, scrollOnDrag = () => { }, onPress, setNewTime, onDelete }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const isSelected = useMemo(() => selectedStartDate === item.StartDateTime, [selectedStartDate, item]);
    const [isDelete, setIsDelete] = useState(false);
    const { top, left, height } = useTableItem(item);
    const offset = useSharedValue({ x: left, y: top });
    const animationY = useSharedValue(0);
    const inProgress = useSharedValue(0);
    const width = grid.width / (overlappingIds.length || 1);

    const additionalOffset = useMemo(() => {
        const prev: string[] = [];
        overlappingIds.forEach(session => {
            if (session && item?.Uid) {
                if (session < item.Uid) {
                    prev.push(session);
                };
            };
        })
        return width * prev.length;
    }, [item, overlappingIds]);

    const animatedStyles = useAnimatedStyle(() => {
        let valueX = offset.value.x;
        if (offset.value.x < 0) {
            valueX = 0;
        } else if (offset.value.x > width * 6) {
            valueX = width * 6;
        }
        return {
            transform: [
                { translateX: valueX },
                { translateY: offset.value.y },
            ],
        };
    });

    const handleScroll = (itemY: number) => {
        const difference = itemY - scrollY.value;
        if (difference < 15 && !inProgress.value && itemY) {
            inProgress.value = 1;
            scrollOnDrag(scrollY.value - 100);
            const destination = (itemY - 100) > 0 ? animationY.value - 100 : animationY.value - itemY;
            animationY.value = withTiming(destination, { duration: 250 });
            setTimeout(() => {
                inProgress.value = 0
            }, 500);
        };

        const isNeedScrollDown = (scrollY.value + contentHeight) - (itemY + height) < 40;
        if (isNeedScrollDown && !inProgress.value) {
            inProgress.value = 1;
            scrollOnDrag(scrollY.value + 100);
            const destination = (grid.height * 24) - (itemY + height + 100) < 0 ? animationY.value + (grid.height * 24) - (itemY + height) : animationY.value + 100;
            animationY.value = withTiming(destination, { duration: 250 });
            setTimeout(() => {
                inProgress.value = 0;
            }, 700);
        };
    };

    const handleOnPress = useCallback(() => {
        onPress?.(item);
    }, [onPress, item]);

    const handleOnDelete = useCallback(() => {
        onDelete?.(item);
    }, [onDelete, item]);

    const onEnd = () => {
        if (isDelete) {
            offset.value = { x: left, y: top };
            return;
        };
        const time = Math.floor(offset.value.y / grid.height);
        const day = Math.floor(offset.value.x / grid.width);
        setNewTime?.({ time: time < 0 ? 0 : time, day: day < 0 ? 0 : day }, item);
        offset.value = { x: left, y: top };
    };

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            offset.value = {
                x: event.translationX + left,
                y: (event.translationY + top + animationY.value) < 0 ? 0 : event.translationY + top + animationY.value,
            };
            runOnJS(handleScroll)(offset.value.y);
        })
        .onEnd(() => {
            offset.value = {
                x: offset.value.x,
                y: offset.value.y,
            };
        })
        .onFinalize(() => {
            animationY.value = 0;
            runOnJS(onEnd)();
        });

    return (isEditable && isSelected
        ? <GestureDetector gesture={gesture}>
            <Animated.View style={[{ width: grid.width }, animatedStyles]}>
                <View style={[styles.container]}>
                    <View
                        style={[styles.sessionWrapper, { height }]}
                    >
                        <Text style={styles.text}>{item.Name}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ position: 'absolute', top: -4, right: -4 }} onPressIn={() => setIsDelete(true)} onPressOut={() => setIsDelete(false)} onPress={handleOnDelete}>
                    <CancelIcon />
                </TouchableOpacity>
            </Animated.View>
        </GestureDetector>
        : <TouchableHighlight underlayColor={colors.grid} style={[styles.container, { top, left: left + additionalOffset }]} onPress={handleOnPress}>
            <View
                style={[styles.sessionWrapper, {
                    width, height,
                    borderBottomStartRadius: item?.isStart ? 0 : 5, borderBottomEndRadius: item?.isStart ? 0 : 5,
                    borderTopStartRadius: item?.isEnd ? 0 : 5, borderTopEndRadius: item?.isEnd ? 0 : 5,
                }]}
            >
                <Text style={styles.text}>{item.Name}</Text>
            </View>
        </TouchableHighlight>
    );
}; 
