import toast from "svelte-french-toast";

export const getErrorToast = async () => {
    toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
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
