// ===============================================================
// ToastHelper
// ===============================================================

import toast from 'svelte-french-toast';

// =======================================================
// auth toast
// =======================================================
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

export const getLoginToast = async (promise: Promise<Response>) => {
    return toast.promise(
        promise,
        {
            loading: 'Cuba Log masuk...',
            success: 'Log Masuk Berjaya!',
            error: 'Log Masuk Gagal',
        },
        {
            style: 'background: #333; color: #fff;',
        },
    );
};

export const getResetPasswordToast = async (promise: Promise<Response>) => {
    return toast.promise(
        promise,
        {
            loading: 'Sedang diproses...',
            success: 'Berjaya! Kata laluan baru telah dihantar ke emel anda.',
            error: 'Tidak berjaya! Sila semak semula maklumat anda.',
        },
        {
            style: 'background: #333; color: #fff;',
        },
    );
};

// =======================================================
// general promise toast using resolved and rejected state
// =======================================================
export const getPromiseToast = async (promise: Promise<Response>) => {
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
// individual loading, success, error toast
// =======================================================
export const getLoadingToast = async () => {
    toast.loading('Sedang diproses', {
        style: 'background: #333; color: #fff;',
    });
};

export const getErrorToast = async (message?: string) => {
    if (message !== undefined) {
        toast.error(message, {
            style: 'background: #333; color: #fff;',
        });
    } else {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
    }
};

export const getInsufficientFileToast = async (message?: string) => {
    if (message !== undefined) {
        toast.error(message, {
            style: 'background: #333; color: #fff;',
        });
    } else {
        toast.error('Dokumen sokongan hendaklah lebih daripada 1.', {
            style: 'background: #333; color: #fff;',
        });
    }
};

export const getSuccessToast = async () => {
    toast.success('Berjaya disimpan!', {
        style: 'background: #333; color: #fff;',
    });
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
