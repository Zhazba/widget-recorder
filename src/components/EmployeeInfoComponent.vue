<template>
    <div v-if="store.employee">
        <div class="flex gap-3 items-center">
            <div class="h-[30px] flex-shrink-0 w-[30px] overflow-hidden rounded-[30px]">
                        <img class="w-full h-full" :src="store.employee.image" />
                    </div>
            <div class="flex justify-between items-center">
                <div>
                    <div>Мастер</div>
                    <div class="flex gap-2">
                        <div class="text-sm text-slate-500">{{ store.employee.first_name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { store } from '../appStore.ts';
</script>