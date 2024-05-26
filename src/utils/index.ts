import { Ref } from "vue";
import { getDayInNanoSeconds } from "./getDayInNanoSeconds";
import { parseISO } from "date-fns";


export function withZeroInteger(item: number) {
    if (item.toString().length == 1) {
        return "0" + item.toString();
    }
    return item.toString();

}

export const checkIsBooked = (start: Date, end: Date, checkedDates: Ref) => {
    for (let i = start.getTime(); i <= end.getTime() - 1; i += 60 * 1000) {
        if (checkedDates.value.includes(i)) {
            return true;
        }
    }
    return false
}

export const book = async (startD: string, endD: string, checkedDates: Ref) => {
    const start = parseISO(startD);
    const end = parseISO(endD);

    const checkIdBooked = checkIsBooked(start, end, checkedDates);
    if (checkIdBooked) {
        return;
    }

    for (let i = start.getTime(); i <= end.getTime() - 1; i += 60 * 1000) {
        checkedDates.value.push(i);
    }
}
export {getDayInNanoSeconds};

export function groupBy(array: any, key: string) {
    //@ts-ignore
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
}