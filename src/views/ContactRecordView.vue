<template>
    <LoadinViewComponent :isLoading="isLoading || isLoadingCreate"></LoadinViewComponent>
    <div v-if="store.employee">
        <div class="bg-white rounded-bl-2xl rounded-br-2xl shadow">
            <AppHeaderComponent v-if="store.branch" :backRoute="{
        name: 'time',
        params: {
            id: route.params.id,
            serviceId: store.service!.id,
            masterId: store.employee.id
        }
    }" :title="store.branch?.name"></AppHeaderComponent>
            <div v-if="store.service" class="px-6 pb-5">
                <div class="mt-1">
                    {{ formatDate(date, 'dd MMMM', { locale: ru }) }} <span v-if="store.selectedDate">{{
        withZeroInteger(store.selectedDate?.getHours()) }}:{{
        withZeroInteger(store.selectedDate?.getMinutes()) }}</span>
                </div>
                <div class="cursor-pointer mt-1 py-2 flex gap-[15px] bg-white rounded-2xl items-center text-sm">
                    <div class="h-[45px] w-[45px] overflow-hidden rounded-[45px]">
                        <img class="w-full h-full" :src="store.employee.image" />
                    </div>
                    <div>
                        <div class=" text-slate-500 text-xs font-light">Мастер</div>
                        <h2 class="text-sm">{{ store.employee.first_name }}</h2>
                    </div>
                </div>
                <div class="mt-3">
                    <input @input="checkIsRequired(form.name)" @blur="checkIsRequired(form.name)"
                        v-model="form.name.value" placeholder="Имя" :class="{
        '!border-red-400 focus:outline-red-400': !form.name.isValid
    }" class="bg-gray-100 border border-transparent focus:outline-primary w-full py-2 px-4 rounded-lg" />

                    <IMaskComponent
                        class="bg-gray-100 border border-transparent focus:outline-primary mt-2 w-full py-2 px-4 rounded-lg"
                        @input="checkIsRequired(form.phone)" @blur="checkIsRequired(form.phone)"
                        :value="form.phone.value" :mask="'+{7} (000) 000-00-00'" radix="."
                        @accept:unmasked="onAcceptUnmasked" placeholder='Номер телефона' />
                    <input @input="checkIsEmail(form.email)" @blur="checkIsEmail(form.email)" type="email"
                        v-model="form.email.value" placeholder="Почта" :class="{
        '!border-red-400 focus:outline-red-400': !form.email.isValid
    }" class="mt-2 bg-gray-100 border border-transparent focus:outline-primary w-full py-2 px-4 rounded-lg" />
                </div>
                <div class="mt-4">
                    <div class="text-sm  font-light ">Услуги</div>
                    <div class="flex text-sm justify-between mt-1">
                        <div class=" text-slate-500 font-light">{{ store.service.name }}</div>
                        <div class=" text-slate-500 font-light">{{ store.service.price }} ₸</div>
                    </div>
                    <div class="flex justify-between mt-2">
                        <div>Итого</div>
                        <div>{{ store.service.price }} ₸</div>
                    </div>
                </div>

                <button :disabled="!disabled" @click="create" :class="{
        'bg-slate-300 text-slate-100': !disabled
                }" class="bg-primary py-4 text-white rounded-lg w-full mt-4">Бронировать</button>
            </div>
        </div>

        <div class="h-[100px]"></div>
    </div>

</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import AppHeaderComponent from '../components/AppHeaderComponent.vue';
import LoadinViewComponent from '../components/LoadingComponent.vue';
import { IMaskComponent } from 'vue-imask';
import { computed, onMounted, reactive, ref } from 'vue';
import { addDays, addMinutes, formatDate } from "date-fns";
import { ru } from "date-fns/locale";
import { instance } from '../api/server';
import { clearStore, setServiceWithEmployeeAndDate, store } from '../appStore';
import { withZeroInteger } from '../utils';
import { RecordView, RecordData } from '../types';
import { addToast } from '../components/ToastComponent';

const route = useRoute();
const router = useRouter();
const date = ref<Date>(addDays(new Date(), 0));
const isLoading = ref<boolean>(false);
const isLoadingCreate = ref<boolean>(false);


function onAcceptUnmasked(unmaskedValue: string) {
    form.phoneUnMasked = unmaskedValue;
}

const form = reactive({
    name: {
        value: "",
        isValid: true
    },
    email: {
        value: "",
        isValid: true
    },
    phoneUnMasked: "",
    phone: {
        value: "+7 ",
        isValid: true
    },
});

const checkIsRequired = (item: any) => {
    if (item.value == "" || item.value == undefined) {
        item.isValid = false;
        return;
    }
    item.isValid = true;
}

const checkIsEmail = (item: any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (item.value == "" || item.value == undefined) {
        item.isValid = false;
        return;
    }
    if (emailPattern.test(item.value) == false) {
        item.isValid = false;
        return;
    }
    item.isValid = true;
}

const disabled = computed(() => form.name.value != "" && form.email.value != "" && form.phone.value != "");

onMounted(() => {

    document.title = "Заполнить контакты"
    isLoading.value = true;
    instance.get(`/api/services/${route.params.serviceId}/`).then(
        (res) => setServiceWithEmployeeAndDate(res.data, parseInt(route.params.masterId.toString()),
            route.params.selectedDate.toString())
    ).catch(
        (e) => console.log(e)
    ).finally(
        () => isLoading.value = false
    )
});

const create = () => {
    isLoadingCreate.value = true;
    const data: RecordData = {
        first_name: form.name.value,
        email: form.email.value,
        phone: form.phoneUnMasked,
        branch_id: store.branch?.id!,
        record_start_datetime: store.selectedDate!.toISOString(),
        record_end_datetime: addMinutes(store.selectedDate!, store.service?.duration!).toISOString(),
        services_ids: [store.service!.id],
        employee_id: store.employee!.id
    };
    instance.post<RecordView>("/api/records/", data)
        .then(res => {
            clearStore();
            router.push({
                name: 'record-view',
                params: {
                    uuid: res.data.uuid!
                }
            })
        })
        .catch((e: any) => {
            addToast({
                message: e.message.toString(),
                timeout: 5000
            });
        })
        .finally(() => {
            isLoadingCreate.value = false;
        })
}

</script>