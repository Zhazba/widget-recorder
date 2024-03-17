import { ref } from "vue";
import { instance } from "../api/server";


export function usePost(url: string, json: any) {
    const data = ref(null);
    const error = ref(null);
    const isLoading = ref<boolean>(false);
    isLoading.value = true;
    instance.post(url, json).then((res)=>data.value=res.data).catch((e)=>error.value = e).finally(()=>isLoading.value=false);
    return {
        data, error, isLoading
    }
}