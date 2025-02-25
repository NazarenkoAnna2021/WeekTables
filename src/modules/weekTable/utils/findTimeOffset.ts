import moment from "moment";
import { Moment } from "moment";
import { ISession } from "../ui/weekTableView";

export const findTimeOffset = (dateStart: Moment) => (item: ISession) => {
    const start = moment(item.StartDateTime);
    const end = moment(item.StartDateTime).add(item.Duration);
    return dateStart.isSame(start) || dateStart.isBetween(start, end);
};