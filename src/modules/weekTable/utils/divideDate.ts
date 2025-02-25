export const divideDate = (StartDateTime?: string): [number, number, number] => {
    const date = StartDateTime?.split?.('T')?.[0];
    const dateParts = date?.split('-') || ['0', '0', '0'];
    return [Number(dateParts[0]), Number(dateParts[1]), Number(dateParts[2])];
};