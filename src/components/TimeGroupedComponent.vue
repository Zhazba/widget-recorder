<template>
    <div class="w-full mt-6" v-if="options.length > 0">
        <h2 class="font-medium">{{ title }}</h2>
        <div class="grid mt-4 grid-cols-3 justify-between w-full gap-3">
            <div @click="emit('onSelect', slot)" :class="{
        'text-white !bg-primary': slot.getTime() == store.selectedDate?.getTime(),
        ' !text-slate-100 !bg-slate-200 !cursor-not-allowed': checkedDates.includes(slot.getTime())
    }" class="bg-white rounded-lg text-sm cursor-pointer py-[10px] text-center  " v-for="slot in options">
                {{ withZeroInteger(slot.getHours()) }}:{{ withZeroInteger(slot.getMinutes()) }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { withZeroInteger } from '../utils';
import { store } from '../appStore';

const emit = defineEmits(['onSelect']);
defineProps<
    {
        title: string,
        options: Date[],
        checkedDates: number[]
    }
>();
</script>