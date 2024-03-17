<template>
    <div class="px-6 flex py-5 w-full bg-white fixed gap-2">
        <RouterLink v-if="homeRoute" :to="homeRoute"><HomeIcon class="w-6 h-6"></HomeIcon></RouterLink>
        <RouterLink v-if="backRoute" :to="backRoute"><ArrowLongLeftIcon class="w-6 h-6"></ArrowLongLeftIcon></RouterLink>
        <p>{{ title }}</p>
    </div>
    <div class="h-[70px]"></div>
</template>
<script lang="ts" setup>
import { ArrowLongLeftIcon, HomeIcon } from '@heroicons/vue/24/outline';
defineProps<{
    title: string,
    backRoute?: any
    homeRoute?: any
}>()
</script>