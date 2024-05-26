import { reactive } from "vue";
import { Branch, Employee, Service } from "./types";
import { parseISO } from "date-fns";

export const store = reactive<
    {
        branch: Branch | undefined,
        employee: Employee | undefined
        service: Service | undefined,
        selectedDate: Date | undefined
    }
>({
    branch: undefined,
    service: undefined,
    employee: undefined,
    selectedDate: undefined
});

export function clearStore() {
    store.selectedDate = undefined;
    store.employee = undefined;
    store.service = undefined;
}

export function setBranch(branch: Branch) {
    store.branch = branch;
}

export function setService(service: Service) {
    store.service = service;
    if (service.branch != undefined) {
        store.branch = service.branch;
    }
}

export function setServiceWithEmployee(service: Service, id: number) {
    store.service = service;
    if (service.branch != undefined) {
        store.branch = service.branch;
    }
    const findedEmployee = service.employees.find(item=>item.id==id);
    if (findedEmployee != undefined) {
        store.employee = findedEmployee;
    }
}

export function setServiceWithEmployeeAndDate(service: Service, id: number, date?: string) {
    store.service = service;
    if (service.branch != undefined) {
        store.branch = service.branch;
    }
    const findedEmployee = service.employees.find(item=>item.id==id);
    if (findedEmployee != undefined) {
        store.employee = findedEmployee;
    }
    if (date!=undefined) {
        store.selectedDate = parseISO(date);
    }
}

export function setDate(date?: Date) {
    store.selectedDate = date;
}

export const workDays = {
    0: {
        work: true,
        startHour: 9,
        endHour: 20
    },
    1: {
        work: true,
        startHour: 9,
        endHour: 20
    },
    2: {
        work: true,
        startHour: 9,
        endHour: 20
    },
    3: {
        work: true,
        startHour: 9,
        endHour: 20
    },
    4: {
        work: true,
        startHour: 9,
        endHour: 20
    },
    5: {
        work: true,
        startHour: 9,
        endHour: 20
    },
    6: {
        work: true,
        startHour: 9,
        endHour: 20
    }
}