<template>
  <div class="rounded-2xl overflow-hidden text-sm gap-5 w-full bg-slate-600" v-if="show">
    <div class="h-[5px] bg-slate-900" :style="{
        width: percent + '%'
      }">
      </div>
    <div class="text-white p-3 bg-primary gap-5 flex justify-between" @mouseover="stopInterval" @mouseleave="startInterval">
      <div>{{ message }}</div> <div @click="show = false"><XCircleIcon class="w-6 cursor-pointer h-6"></XCircleIcon></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { XCircleIcon } from '@heroicons/vue/24/outline';

defineProps<{
  message: any
}>();

const timeout = ref(5000);
const show = ref(true);
const interval = ref<number | null>(null);

const percent = computed(()=>{
  return 100 * timeout.value / 5000;
});



const startInterval = () => {
  interval.value = setInterval(()=>{
    timeout.value -= 10;
    if (timeout.value <= 0) {
      show.value = false;
      clearInterval(interval.value!);
    }
  }, 10);
}

const stopInterval = () => {
  if (interval.value != null) {
    clearInterval(interval.value);
  }
}

onMounted(() => {
  startInterval();
});

onUnmounted(()=>{
  stopInterval();
})


</script>

<style>

</style>