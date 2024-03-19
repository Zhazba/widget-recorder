<template>
    <LoadingComponent :isLoading="isLoading"></LoadingComponent>
    <div v-if="record" class="bg-white rounded-bl-2xl rounded-br-2xl shadow">
        <AppHeaderComponent v-if="record.branch" :homeRoute="{
        name: 'detail-branch',
        params: {
            id: record.branch.slug,
        }
    }" :title="record.branch?.name"></AppHeaderComponent>
        <div class="px-6 pb-5">
            <div class="text-lg font-medium">😊 Успешное подтверждение бронирования</div>
            <div class="text-sm font-light mt-2">
                Мы с радостью подтверждаем ваше бронирование услуги {{ record?.services[0].name }} в нашем уютном
                барбершопе {{ record?.branch.name }}.
            </div>
            <div class="mt-4">
                <div class="text-sm font-light text-slate-500">Время</div>
                <div>{{ format(record.record_start_datetime, 'dd MMMM HH:mm', { locale: ru }) }}</div>
            </div>
            <div class="mt-2">
                <div class="text-sm font-light text-slate-500">Мастер</div>
                <div>{{ record.employee.username }}</div>
            </div>
            <div class=" mt-2 text-sm font-light text-slate-500">Услуги</div>
            <div class="flex justify-between">
                <div class="text-sm font-light text-slate-500">{{ record.services[0].name }}</div>
                <div class="text-sm">{{ record.services[0].price }}₸</div>
            </div>
            <div class="flex justify-between mt-2">
                <div>Итого</div>
                <div>{{ record.services[0].price }}₸</div>
            </div>
            <RouterLink :to="{
        name: 'detail-branch',
        params: {
            id: record.branch.slug,
        }
    }" class="bg-primary py-4 cursor-pointer text-white flex justify-center items-center gap-3 rounded-lg w-full mt-4 text-center">
                <HomeIcon class="h-6 w-6"></HomeIcon>
                <div>Домой</div>
            </RouterLink>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { instance } from '../api/server';
import { RecordView } from '../types';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import AppHeaderComponent from '../components/AppHeaderComponent.vue';
import LoadingComponent from '../components/LoadingComponent.vue';
import { HomeIcon } from '@heroicons/vue/24/outline';
const record = ref<RecordView | undefined>(undefined);

const route = useRoute();
const isLoading = ref<boolean>(false);
onMounted(() => {
    document.title = "Спасибо за бронь !"
    isLoading.value = true;
    instance.get<RecordView>(`/api/records/${route.params.uuid}`)
        .then(res => record.value = res.data)
        .catch(e => console.log(e))
        .finally(() => isLoading.value = false);
});
</script>