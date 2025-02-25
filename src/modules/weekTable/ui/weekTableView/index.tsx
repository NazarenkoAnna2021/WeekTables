import { observer } from "mobx-react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScreenContainer } from "../../../../UIKit/screenContainer";
import { Table } from "../components/Table";
import { IData } from "../../entities/IData";
import { sortSessionsByWeeks } from "../../utils/sortSessionsByWeeks";
import { generateWeeks } from "../../utils/generatiWeeks";
import { FlatList } from "react-native";
import { grid } from "../../utils/gridSizing";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import moment from "moment";

export interface ISession extends IData {
    Status: string;
};

const sessionsMock: ISession[] = [
    {
        Status: 'none',
        Uid: '1',
        StartDateTime: '2025-02-25T10:30:00',
        Duration: 60,
        Name: 'Test'
    },
    {
        Status: 'none',
        Uid: '2',
        StartDateTime: '2025-02-24T10:30:00',
        Duration: 30,
        Name: 'Test'
    },
    {
        Status: 'none',
        Uid: '3',
        StartDateTime: '2025-02-24T13:10:00',
        Duration: 120,
        Name: 'Test'
    },
    {
        Status: 'none',
        Uid: '4',
        StartDateTime: '2025-02-24T13:00:00',
        Duration: 120,
        Name: 'Test1'
    },,
    {
        Status: 'none',
        Uid: '5',
        StartDateTime: '2025-02-24T22:00:00',
        Duration: 180,
        Name: 'Test1'
    },
]

export const WeekTableView: FC = observer(() => {
    const tableOffset = useRef({ x: 0, y: 8 * grid.height });
    const [weeks, setWeeks] = useState<string[][]>([]);
    const [sessions, setSessions] = useState<ISession[]>(sessionsMock);
    const [selectedSession, setSelectedSession] = useState<ISession>();
    const sessionsByWeeks = useMemo(() => sortSessionsByWeeks(sessions, weeks), [sessions, weeks]);
    const safeAreaInsets = useSafeAreaInsets();

    useEffect(() => {
        if (sessions?.[0]) {
            const result = generateWeeks(sessions[0].StartDateTime);
            setWeeks(result);
        };
    }, []);

    const onSlotPress = useCallback((slot: { day: number, time: number, date?: string }) => {
        const StartDateTime = moment(`${slot?.date?.split('T')[0]}${slot.time}:00`, 'YYYY-MM-DDTH:mm').day(slot.day).format('YYYY-MM-DDTHH:mm');
        setSessions(prev => ([...prev, { Uid: StartDateTime, Name: 'new session', StartDateTime, Duration: 60, Status: 'new' }]));
    }, []);

    const onDeleteSession = useCallback((session?: ISession) => {
        setSessions(sessions?.filter(item => item.Uid !== session?.Uid));
    }, [sessions]);

    const onSessionPress = useCallback((session?: ISession) => {
        setSelectedSession(session);
    }, [sessions]);

    const keyExtractor = useCallback((item: string[]) => (item?.[0] || ''), []);

    const renderItem = useCallback(({ item, index }: { item: string[], index: number; }) => (
        <Table<ISession>
            dates={item}
            data={sessionsByWeeks?.[index] || []}
            tableOffset={tableOffset}
            selectedItem={selectedSession}
            onSlotPress={onSlotPress}
            onItemPress={onDeleteSession}
        />
    ), [sessionsByWeeks, sessions, selectedSession, onSlotPress, onSessionPress, onDeleteSession]);

    return (
        <ScreenContainer>
            <FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={weeks}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                style={{ marginBottom: safeAreaInsets.bottom }}
            />
        </ScreenContainer>
    );
});