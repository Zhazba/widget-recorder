<template>
    <LoadingComponent :isLoading="isLoading"></LoadingComponent>
    <div v-if="store.branch != undefined">
        <BranchHeaderComponent :detail="store.branch"></BranchHeaderComponent>
        <main class="mt-[40px] flex flex-col gap-[30px]">
          <section class="px-6" v-for="(options, key) in groupedByCategoryOptions">
            <h2 class="font-medium bg-slate-100 sticky top-0 py-[15px]">{{ key }}</h2>
            <ServiceSelectComponent class="mt-3" v-model="selectedOption" :options="options"></ServiceSelectComponent>
          </section>
        </main>
        <div class="h-[100px]"></div>
        <ContinueComponent @click="navigateToMasters" :isOpen="isOpen" title="Выбрать Мастера" :service="selectedOption"></ContinueComponent>
    </div>
</template>
<script lang="ts" setup>
import BranchHeaderComponent from '../components/BranchHeaderComponent.vue';
import LoadingComponent from '../components/LoadingComponent.vue';
import { Service } from '../types';
import ServiceSelectComponent from '../components/ServiceSelectComponent.vue';
import ContinueComponent from '../components/ContinueComponent.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { instance } from '../api/server';
import { setBranch } from '../appStore';
import { store } from '../appStore';
import {groupBy} from "../utils";

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);



onMounted(()=>{
    document.title = "Выбрать услугу"
    isLoading.value = true;
    instance.get(`/api/branches/${route.params.id}/`).then(
        (res)=>setBranch(res.data)
    ).catch(
        (e)=>console.log(e)
    ).finally(
        ()=>isLoading.value = false
    )
});

const selectedOption = ref<Service | undefined>(undefined);

const isOpen = computed(()=>selectedOption.value != undefined);

const groupedByCategoryOptions = computed(()=>{
  if (store.branch != undefined) {
    return groupBy(store.branch.services, 'category_name')
  }
  return [];
})

const navigateToMasters = () => {
    router.push({
        name: 'masters-list',
        params: {
            id: route.params.id,
            serviceId: selectedOption.value!.id
        }
    });
}

</script>