// ===============================================================
// ToastHelper
// ===============================================================

import toast from 'svelte-french-toast';

export const getLoginSuccessToast = async () => {
    toast.success('Log Masuk Berjaya!', {
        style: 'background: #333; color: #fff;',
    });
};

export const getLoginErrorToast = async () => {
    toast.error(
        'Log Masuk Gagal! Sila pastikan maklumat adalah lengkap dengan tepat.',
        {
            style: 'background: #333; color: #fff;',
        },
    );
};

export const getSuccessToast = async () => {
    toast.success('Berjaya disimpan!', {
        style: 'background: #333; color: #fff;',
    });
};

export const getErrorToast = async () => {
    toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
        style: 'background: #333; color: #fff;',
    });
};

export const getServerErrorToast = async () => {
    toast.error('Tidak dapat disimpan.', {
        style: 'background: #333; color: #fff;',
    });
};

export const getLoadingToast = async () => {
    toast.loading('Sedang diproses', {
        style: 'background: #333; color: #fff;',
    });
};

export const getPromiseToast = async (promise: Promise<unknown>) => {
    return toast.promise(
        promise,
        {
            loading: 'Sedang disimpan...',
            success: 'Berjaya disimpan!',
            error: 'Tidak dapat disimpan.',
        },
        {
            style: 'background: #333; color: #fff;',
        },
    );
};

// =======================================================
// forgot password
// =======================================================
export const getPasswordResetSuccessToast = async () => {
    console.log('toast success');
    toast.success(
        'Kata laluan berjaya ditukar! Sila semak emel anda untuk kata laluan baru anda.',
        {
            style: 'background: #333; color: #fff;',
        },
    );
};

export const getPasswordResetErroToast = async () => {
    toast.error(
        'Ralat! Sila pastikan maklumat diisi dengan lengkap dan tepat',
        {
            style: 'background: #333; color: #fff;',
        },
    );
};
