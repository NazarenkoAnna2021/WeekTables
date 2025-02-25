import moment from "moment";
import { useMemo } from "react";
import { grid } from "../utils/gridSizing";
import { IData } from "../entities/IData";

export const useTableItem = <T extends IData>(item: T) => {

    const top = useMemo(() => {
        const index = grid.hours.findIndex(time => moment(time === 'Noon' ? '12 pm' : time, 'hh:mm a').format('H') === moment(item.StartDateTime).format('H'));
        const minutesOffset = (moment(item.StartDateTime).get('minute') / 60) * grid.height;
        return (grid.height * index) + minutesOffset;
    }, [item]);

    const left = useMemo(() => grid.width * moment(item.StartDateTime).get('day'), [item]);

    const height = useMemo(() => {
        const percent = (item.Duration / 60) * 100;
        return (percent / 100) * grid.height;
    }, [item]);

    return { top, left, height };
};