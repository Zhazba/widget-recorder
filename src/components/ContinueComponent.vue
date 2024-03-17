<template>
    <Transition name="fade">
    <BottomSheatComponent v-if="isOpen">
        <div class="flex justify-between cursor-pointer">
            <div>
                <div class="flex text-sm gap-1 font-light text-slate-200" v-if="service != undefined">
                    <h2>{{ service.name }}</h2>
                    <p>{{ service.price }}₸</p>
                </div>
                <h2>{{ title }}</h2>
            </div>
            <ArrowLongRightIcon class="w-6 h6"></ArrowLongRightIcon>
        </div>
    </BottomSheatComponent>
</Transition>
</template>
<script lang="ts" setup>
import { Transition } from 'vue';
import { Service } from '../types';
import BottomSheatComponent from './BottomSheatComponent.vue';
import { ArrowLongRightIcon } from '@heroicons/vue/24/outline';



defineProps<{
    isOpen: boolean,
    service?: Service,
    title: string
}>();
</script>