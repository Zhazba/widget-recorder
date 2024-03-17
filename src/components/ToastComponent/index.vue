<template>
    <div class="toast-group mx-3 gap-1 flex flex-col" >
      <ToastItem :message="toast.message" v-for="toast in toasts"></ToastItem>
    </div>
</template>

<script setup lang="ts">
import { toasts } from './index';
import ToastItem from './Item.vue';

</script>

<style>
.toast-group {
  position: fixed;
  top: 20px;
  z-index: 9999;
}
</style>