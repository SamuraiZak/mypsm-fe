import { toast } from 'svelte-french-toast';

export const toasterCommon = async (promise: Promise<Response>) => {
    return toast.promise(
        promise,
        {
            loading: 'Sedang diproses...',
            success: 'Berjaya!',
            error: 'Tidak Berjaya.',
        },
        {
            style: 'background: #333; color: #fff;',
        },
    );
};

export const toasterGetMethod = async (promise: Promise<Response>) => {
    return toast.promise(
        promise,
        {
            loading: 'Memuat turun data...',
            success: 'Muat turun berjaya!',
            error: 'Muat turun tidak berjaya.',
        },
        {
            style: 'background: #333; color: #fff;',
        },
    );
};

export const toasterLogin = async (promise: Promise<Response>) => {
    return toast.promise(
        promise,
        {
            loading: 'Sila tunggu sebentar...',
            success: 'Anda telah berjaya log masuk!',
            error: 'Log masuk tidak berjaya.',
        },
        {
            style: 'background: #333; color: #fff;',
        },
    );
};