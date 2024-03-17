<template>
    <div>
        <div class="flex flex-col gap-4">
            <div v-for="option in options" :key="option.id" @click="onSelect(option)"
                class="cursor-pointer border-[2px] border-white hover:bg-slate-50 flex gap-[15px] bg-white rounded-2xl p-4 items-center text-sm"
                :class="{
                '!border-primary': isActive(option)
            }">
                <div class="h-[45px] w-[45px] overflow-hidden rounded-[45px]">
                    <img class="w-full h-full" :src="option.image" />
                </div>
                <div>
                    <div class=" text-slate-500 text-xs font-light">Мастер</div>
                    <h2 class="text-sm">{{ option.first_name }}</h2>
                    <MasterNearestComponent :work-days="workDays" :records="option.records"></MasterNearestComponent>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Employee } from '../types';
import MasterNearestComponent from './MasterNearestComponent.vue';

const model = defineModel<Employee>();

const onSelect = (value: Employee) => {
    model.value = value;
}

const isActive = (value: Employee) => {
    return value.id == model.value?.id;
}

defineProps<{
    options: Employee[],
    workDays: any
}>()

</script>