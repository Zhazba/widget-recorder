<template>
    <LoadingComponent :isLoading="isLoading"></LoadingComponent>
    <div v-if="store.branch != undefined">
        <BranchHeaderComponent :detail="store.branch"></BranchHeaderComponent>
        <main class="px-6 mt-[60px]">
            <h2 class="font-medium">Услуги</h2>
            <ServiceSelectComponent class="mt-5" v-model="selectedOption" :options="store.branch.services"></ServiceSelectComponent>
        </main>
        <ContinueComponent @click="navigateToMasters" :isOpen="isOpen" title="Выбрать барбера" :service="selectedOption"></ContinueComponent>
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