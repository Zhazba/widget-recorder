<script lang="ts" setup>
import TimeGroupedComponent from './TimeGroupedComponent.vue';

import { onMounted, ref, watch } from "vue";
import { Record } from "../types/Branch";
import { addMinutes } from "date-fns";
import { setDate } from "../appStore";
import { store } from "../appStore";
import { addToast } from './ToastComponent';
import { book, checkIsBooked } from '../utils';

const props = defineProps<{
    today: Date,
    workDays: any,
    employeeRecords: Record[]
}>();


const iterator = 30;

const toRender = ref<{
    morning: Date[];
    lunch: Date[];
    evening: Date[];
}>({
    morning: [],
    lunch: [],
    evening: []
});

const checkedDates = ref<number[]>([]);


watch(() => props.today, (first, _) => {
    updateTimeSlot(first);
});

watch(() => props.employeeRecords, (records, _) => {
    checkedDates.value = [];
    records.forEach(record => {
        book(record.record_start_datetime, record.record_end_datetime, checkedDates);
    })
})



function updateTimeSlot(date: Date) {
    toRender.value = {
        morning: [],
        lunch: [],
        evening: []
    };
    const start = new Date(date.getTime());
    const end = new Date(start.getTime());
    start.setHours(props.workDays[start.getDay()]['startHour'], 0, 0, 0);
    end.setHours(props.workDays[start.getDay()]['endHour'], 0, 0, 0);
    for (let i = start.getTime(); i <= end.getTime(); i += iterator * 60 * 1000) {
        const date = new Date(i);
        if (date.getTime() < new Date().getTime()) {
            continue
        }
        if (date.getHours() <= 12) {
            toRender.value.morning.push(date)
        }
        else if (date.getHours() > 12 && date.getHours() < 17) {
            toRender.value.lunch.push(date)
        }
        else {
            toRender.value.evening.push(date)
        }
    }

}


onMounted(() => {
    updateTimeSlot(props.today);
    props.employeeRecords.forEach(record => {
        book(record.record_start_datetime, record.record_end_datetime, checkedDates);
    })
})




const emit = defineEmits(['onselect']);


const checkDifference = (dateWithService: Date) => {
    console.log(dateWithService.getHours() + dateWithService.getMinutes() / 100, props.workDays[props.today.getDay()]['endHour'] + 1)
    if (dateWithService.getHours() + dateWithService.getMinutes() / 100 > props.workDays[props.today.getDay()]['endHour'] + 1) {
        return true;
    }
    return false;
}

const onSelect = (slot: Date) => {
    if (checkedDates.value.includes(slot.getTime())) {
        return;
    }
    if (checkDifference(addMinutes(slot, store.service?.duration!)) == true) {
        addToast({
            message: `Бронирование невозможно операция длится ${store.service?.duration} минут`,
            timeout: 5000
        })
        return;
    }
    if (checkIsBooked(slot, addMinutes(slot, store.service?.duration!), checkedDates) == true) {
        addToast({
            message: `Бронирование невозможно операция длится ${store.service?.duration} минут`,
            timeout: 5000
        })
        return;
    }
    setDate(slot);
}



</script>
<template>
    <div class="flex flex-col">
        <div v-if="workDays[today.getDay()]['work']">
            <TimeGroupedComponent @onSelect="onSelect" :checkedDates="checkedDates" title="Утро"
                :options="toRender.morning">
            </TimeGroupedComponent>
            <TimeGroupedComponent @onSelect="onSelect" :checkedDates="checkedDates" title="Обед"
                :options="toRender.lunch">
            </TimeGroupedComponent>
            <TimeGroupedComponent @onSelect="onSelect" :checkedDates="checkedDates" title="Вечер"
                :options="toRender.evening">
            </TimeGroupedComponent>
        </div>
        <div v-else>
            Эти дни не работает
        </div>
    </div>
</template>