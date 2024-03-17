<template>
    <div class="relative">
        <div class="h-[186px]">
            <img class="h-full w-full object-cover" :src="detail.image" />
        </div>
        <div class="flex justify-center">
            <div class="max-w-[500px] absolute w-full -bottom-[30px]">
                <div class="bg-white gap-3 shadow rounded-2xl flex items-center p-6  mx-6">
                    <div class="w-[70px] h-[70px] rounded-[70px] overflow-hidden">
                        <img class="w-full h-full object-cover" :src="detail.logo" />
                    </div>
                    <div>
                        <h3 class="font-medium">{{ detail.name }}</h3>
                        <p class="text-sm font-light text-slate-500">{{ detail.address }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Branch } from '../types';

defineProps<{
    detail: Branch
}>();
</script>