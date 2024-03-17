<template>
    <div>
        <div class="flex flex-col gap-4">
            <div v-for="option in options" :key="option.id" @click="onSelect(option)"
          
            class="cursor-pointer border-[2px] border-white hover:bg-slate-50 flex justify-between bg-white rounded-2xl p-4 items-center text-sm"
            :class="{
                '!border-primary': isActive(option)
            }"
            >
            <div class="flex gap-4 items-center">
                <div class="w-[20px] justify-center items-center flex rounded-[20px] h-[20px] border-[2px] border-primary"
                     :class="
                     {'border-primary': isActive(option)}">
                    <div v-if="isActive(option)" class="w-[10px] h-[10px] rounded-[10px] bg-primary"></div>
                </div>
                <div>
                    <div>{{ option.name }}</div>
                    <div class="text-[12px] text-slate-500">{{ option.duration }} минут</div>
                </div>
            </div>
            <div>
                {{ option.price}}₸
            </div>
        </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Service } from '../types';

const model = defineModel<Service>();

const onSelect = (value: Service) => {
    model.value = value;
}

const isActive = (value: Service) => {
    return value.id == model.value?.id;
}

defineProps<{
    options?: Service[]
}>()

</script>