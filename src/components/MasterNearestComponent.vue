<template>
     <div v-if="toRender.length > 0" >
        <div class="text-xs text-slate-500 font-light mt-2">Ближайшие время для записи</div>
    <div class="flex gap-2 mt-2">
        <div v-for="option in toRender" class="rounded bg-primary px-2 py-1 text-white">{{ withZeroInteger(option.getHours()) }}:{{ withZeroInteger(option.getMinutes()) }}</div>
    </div>
     </div>
    <div v-else>
        <div class="text-xs text-slate-500 font-light mt-2">На сегодня нету</div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Record } from '../types/Branch';
import { book, withZeroInteger } from '../utils';

const props = defineProps<{
    records: Record[],
    workDays: any
}>();

const toRender = ref<Date[]>([]);
const checkedDates = ref<number[]>([]);

function getNearest() {
    props.records.forEach(record=>{
        book(record.record_start_datetime, record.record_end_datetime,checkedDates);
    });
    const start = new Date();
    const end = new Date();
    start.setHours(props.workDays[start.getDay()]['startHour'], 0, 0, 0);
    end.setHours(props.workDays[start.getDay()]['endHour'], 0, 0, 0);
    for (let i = start.getTime(); i <= end.getTime(); i += 30 * 60 * 1000) {
        const date = new Date(i);
        if (toRender.value.length > 2) {
            return;
        }
       
        if (date.getTime() < new Date().getTime() || checkedDates.value.includes(date.getTime())) {
            continue
        }
        toRender.value.push(date);
    }
}

onMounted(()=>{
    getNearest();
});


</script>