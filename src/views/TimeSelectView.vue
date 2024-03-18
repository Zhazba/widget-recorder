<template>
    <LoadingComponent :is-loading="isLoading"></LoadingComponent>
    <div >
        <div class="bg-white rounded-bl-2xl rounded-br-2xl shadow">
            <AppHeaderComponent :backRoute="{
        name: 'masters-list',
        params: {
            id: route.params.id,
            serviceId: store.service!.id
        }
    }" :title="store.branch?.name ?? 'Домой'"></AppHeaderComponent>
            <div v-if="store.service" class="px-6 pb-5">
                <div class="flex justify-between">
                    <div>
                        <div class="text-sm text-slate-500">{{ store.service?.name }}</div>
                    </div>
                    <div>
                        <div class="text-sm text-slate-500">{{ store.service.duration }} минут</div>
                        <div class="text-sm text-slate-500">{{ store.service.price }}₸</div>
                    </div>
                </div>
                <div v-if="store.employee" class="cursor-pointer py-2 flex gap-[15px] bg-white rounded-2xl items-center text-sm">
                    <div class="h-[45px] w-[45px] overflow-hidden rounded-[45px]">
                        <img class="w-full h-full" :src="store.employee.image" />
                    </div>
                    <div>
                        <div class=" text-slate-500 text-xs font-light">Мастер</div>
                        <h2 class="text-sm">{{ store.employee.first_name }}</h2>
                    </div>
                </div>
                <div class="mt-1">
                    {{ formatDate(date, 'dd MMMM', { locale: ru }) }} <span v-if="store.selectedDate">{{
        withZeroInteger(store.selectedDate?.getHours()) }}:{{
        withZeroInteger(store.selectedDate?.getMinutes()) }}</span>
                </div>
                <div class="mt-[15px] w-full gap-2 overflow-scroll flex">
                    <div :class="{
        '!bg-primary text-white': date.getDate() == nearestDate.getDate()
    }" @click="onSelectDate(nearestDate)"
                        class="justify-center cursor-pointer p-[9px] bg-[#EAEAEA]  rounded-lg items-center flex flex-col"
                        v-for="nearestDate in nearestDates">
                        <div class="text-sm">{{ nearestDate.getDate() }}</div>
                        <p class="text-xs">{{ formatDate(date, 'MMMM', {locale: ru}) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <TimeSlotComponent v-if="store.employee" class="px-6 mt-6" :today="date" :employee-records="store.employee.records"
            :work-days="workDays"></TimeSlotComponent>
        <div class="h-[100px]"></div>
        <ContinueComponent @click="navigateToCreateRecord" :isOpen="isOpen" title="Перейти к бронированию"
            :service="store.service"></ContinueComponent>
    </div>

</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import TimeSlotComponent from '../components/TimeSlotComponent.vue';
import AppHeaderComponent from '../components/AppHeaderComponent.vue';
import ContinueComponent from '../components/ContinueComponent.vue';
import { computed, onMounted, ref } from 'vue';
import { addDays, formatDate } from "date-fns";
import { ru } from "date-fns/locale";
import { instance } from '../api/server';
import { setDate, setServiceWithEmployee, store, workDays } from '../appStore';
import { withZeroInteger } from '../utils';
import LoadingComponent from '../components/LoadingComponent.vue';

const route = useRoute();
const router = useRouter();
const date = ref<Date>(addDays(new Date(), 0));
const isLoading = ref<boolean>(false);
const nearestDates = ref<Date[]>([]);

onMounted(() => {
    document.title = "Выбрать время"
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
        dates.push(addDays(date.value, i));
    }
    nearestDates.value = dates;
    isLoading.value = true;
    instance.get(`/api/services/${route.params.serviceId}/`).then(
        (res) => setServiceWithEmployee(res.data, parseInt(route.params.masterId.toString()))
    ).catch(
        (e) => console.log(e)
    ).finally(
        () => isLoading.value = false
    )
});



const isOpen = computed(() => store.selectedDate != undefined);

const navigateToCreateRecord = () => {
    router.push({
        name: 'record',
        params: {
            id: route.params.id,
            serviceId: route.params.serviceId,
            masterId: route.params.masterId,
            selectedDate: store.selectedDate?.toISOString()
        }
    })
}

const onSelectDate = (value: Date) => {
    date.value = value;
    setDate(undefined);
}
</script>