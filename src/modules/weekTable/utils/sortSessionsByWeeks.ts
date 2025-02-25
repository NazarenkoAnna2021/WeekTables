import moment from "moment";
import { ISession } from "../ui/weekTableView";

const divideSessions = (sessions: ISession[]) => {
    return sessions.map(session => {
        const [dateStart, timeStart] = session.StartDateTime.split('T') as [string, string];
        const dateEnd = moment(session.StartDateTime).add(session.Duration - 1, 'minute').format('YYYY-MM-DDTHH:mm').split('T')[0];
        if (dateStart !== dateEnd) {
            const [hour, minute] = timeStart.split(':').map(item => Number(item)) as [number, number];
            const minuteDuration = (hour * 60) + minute;
            const nextDayDuration = 1440 - minuteDuration;
            if (nextDayDuration) {
                return [
                    {
                        Uid: session?.Uid,
                        StartDateTime: session.StartDateTime,
                        Status: session.Status,
                        Name: session.Name,
                        Duration: nextDayDuration,
                        fullSession: session,
                        isStart: true,
                    },
                    {
                        Uid: session?.Uid,
                        StartDateTime: dateEnd + 'T00:00',
                        Status: session.Status,
                        Name: session.Name,
                        SessionEndId: session?.Uid ? '-' + session?.Uid : undefined,
                        Duration: session.Duration - nextDayDuration,
                        fullSession: session,
                        isEnd: true,
                    }
                ]
            };
        };
        return session;
    }).flat();
}

export const sortSessionsByWeeks = (sessions: ISession[] = [], weeks: string[][]): ISession[][] => {
    const dividedSessions = divideSessions(sessions);
    return weeks?.map(week => dividedSessions?.filter(session => week.includes(session.StartDateTime.split('T')?.[0] || '')));
};