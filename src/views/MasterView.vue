<template>
     <LoadingComponent :isLoading="isLoading"></LoadingComponent>
    <div v-if="store.service">
        <div class="bg-white rounded-bl-2xl rounded-br-2xl shadow">
            <AppHeaderComponent :backRoute="{
        name: 'detail-branch',
        params: {
            id: route.params.id
        }
    }" :title="store.branch!.name"></AppHeaderComponent>
            <div class="px-6 pb-5">
                <div class="flex justify-between items-center">
                    <div>
                        <div>{{ store.service?.name }}</div>
                        <div class="flex gap-2">
                            <div class="text-sm text-slate-500">{{ store.service.duration }} минут</div>
                            <div class="text-sm text-slate-500">{{ store.service.price }}₸</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-6 mt-4">
            <h2 class="font-medium">Мастеры</h2>
            <div class="flex flex-col gap-[10px] mt-[15px]">
                <MasterSelectComponent :work-days="workDays" v-model="master" :options="store.service?.employees"></MasterSelectComponent>
            </div>
        </div>
        <div class="h-[100px]"></div>
        <ContinueComponent @click="navigateToTimeSelect" :isOpen="isOpen" title="Выбрать время для записи"
            :service="store.service"></ContinueComponent>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import AppHeaderComponent from '../components/AppHeaderComponent.vue';
import LoadingComponent from '../components/LoadingComponent.vue';
import { Employee } from '../types';
import MasterSelectComponent from '../components/MasterSelectComponent.vue';
import ContinueComponent from '../components/ContinueComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import { instance } from '../api/server';
import { setService } from '../appStore';
import { store, workDays } from '../appStore';



const isOpen = computed(() => master.value != undefined);
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

onMounted(() => {
    document.title = "Выбрать мастера"
    isLoading.value = true;
    instance.get(`/api/services/${route.params.serviceId}/`).then(
        (res) => setService(res.data)
    ).catch(
        (e) => console.log(e)
    ).finally(
        () => isLoading.value = false
    )
});


const master = ref<Employee | undefined>(undefined);


const navigateToTimeSelect = () => {
    router.push({
        name: "time",
        params: {
            id: route.params.id,
            serviceId: route.params.serviceId,
            masterId: master.value!.id
        }
    });
}
</script>