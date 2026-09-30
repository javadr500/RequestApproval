

import axios from 'axios';

interface IdentityError {
    code?: string;
    description?: string;
}

export function getApiErrorMessage(error: any): string {
    const data = error.response?.data;
    const status = error.response?.status;


    if (axios.isAxiosError(error)) {

        if (status === 401) {
            return 'احراز هویت انجام نشد. لطفاً دوباره وارد شوید.';
        }

        if (status === 403) {
            return 'شما مجوز انجام این عملیات را ندارید.';
        }

        if (status === 404) {
            return 'اطلاعات موردنظر پیدا نشد.';
        }

        if (status === 409) {
            return 'این اطلاعات قبلاً ثبت شده است.';
        }

        
        if (Array.isArray(data)) {
            return data.map((x) => x.description).join('\r\n');
        }

        if (data?.message) {
            return data.message;
        }

        if (data?.title) {
            return data.title;
        }

        if (typeof data === 'string') {
            return data;
        }

        if (data) {
            return JSON.stringify(data, null, 2);
        }

        if (error.request && !error.response) {
            return 'ارتباط با سرور برقرار نشد.';
        }

        return 'خطایی در ارتباط با سرور رخ داد.';
    }

    if (error instanceof Error) {
        return error.message;
    }

    if (data)
        return JSON.stringify(data, null, 2);

    return 'خطای غیرمنتظره‌ای رخ داد.';
}


