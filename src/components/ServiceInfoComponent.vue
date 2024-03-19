<template>
    <div v-if="store.service">
        <div class="flex gap-3 items-center">
            <div>
                <ScissorsIcon class="w-[30px] h-[30px]"></ScissorsIcon>
            </div>
            <div class="flex justify-between items-center">
                <div>
                    <div>{{ store.service?.name }}</div>
                    <div class="flex gap-2">
                        <div class="text-sm text-slate-500">{{ store.service.duration }} минут</div>
                        <div class="text-sm">-</div>
                        <div class="text-sm text-slate-500">{{ store.service.price }}₸</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { store } from '../appStore.ts';
import { ScissorsIcon } from '@heroicons/vue/24/outline';
</script>