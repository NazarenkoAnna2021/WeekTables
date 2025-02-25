import { IData } from "../entities/IData";

export function findConflicts(currentScheduledEntries?: IData[], generatedScheduleEntries?: IData[]) {
    const conflicts: any[]= [];
    generatedScheduleEntries && generatedScheduleEntries.forEach((generatedEntry) => {
        currentScheduledEntries && currentScheduledEntries.forEach((currentEntry) => {
            const generatedStart = new Date(generatedEntry?.StartDateTime).getTime();
            const generatedEnd = generatedStart + generatedEntry?.Duration * 60000;
            const currentStart = new Date(currentEntry?.StartDateTime).getTime();
            const currentEnd = currentStart + currentEntry?.Duration * 60000;
            if (
                (generatedStart >= currentStart && generatedStart < currentEnd) ||
                (generatedEnd > currentStart && generatedEnd < currentEnd) ||
                (generatedStart <= currentStart && generatedEnd >= currentEnd)
            ) {
                conflicts.push(generatedEntry);
            }
        });
    });
    return conflicts;
}