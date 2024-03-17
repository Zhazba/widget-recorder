import { reactive } from 'vue';
import UI from './index.vue';


export interface Toast {
    message: string;
    timeout: number
}

export const toasts = reactive<Toast[]>([]);

export function addToast(toast: Toast) {
    toasts.push(toast);
}

export default UI;