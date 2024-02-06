import { goto } from '$app/navigation';
import type { AuthRequestDTO } from '$lib/dto/core/auth/auth-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import {
    getLoadingToast,
    getLoginErrorToast,
    getLoginSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
import { LookupServices } from '$lib/services/implementations/core/lookup/lookup.service';
import { loadingState } from '$lib/stores/globalState';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _kakitanganLoginSchema = z.object({
    idType: z.string(),
    userGroup: z.string(),
    username: z.string().min(5),
    password: z.string().min(5),
    currentRole: z.string(),
});

export const load = async () => {
    const form = await superValidate(_kakitanganLoginSchema);

    // get role list
    const roleResponse: LookupDTO[] = await LookupServices.getLookup('role');

    roleResponse.sort((a, b) => (a.name! < b.name! ? -1 : 1));

    return { form, roleResponse };
};

export const _submit = async (formData: AuthRequestDTO) => {
    loadingState.set(true);
    getLoadingToast();

    const response: CommonResponseDTO = await AuthService.authenticateUser(
        formData,
    ).finally(() => toast.dismiss());

    console.log(response);

    if (response.status == 'success') {
        let accountRes = await AuthService.getFullName();
        loadingState.set(false);
        getLoginSuccessToast().finally(() =>
            setTimeout(() => {
                switch (formData.currentRole) {
                    case 'admin':
                        goto('/kakitangan/halaman-utama');
                        break;

                    case 'audit':
                        goto('/kakitangan/halaman-utama');
                        break;

                    case 'kakitangan':
                        goto('/kakitangan/halaman-utama');
                        break;

                    case 'ketua pengarah':
                        goto('/ketua-pengarah/halaman-utama');
                        break;

                    case 'ketua seksyen':
                        goto('/ketua-seksyen/halaman-utama');
                        break;

                    case 'klinik panel':
                        goto('/kakitangan/halaman-utama');
                        break;

                    case 'pelulus':
                        goto('/pelulus/halaman-utama');
                        break;

                    case 'pengarah audit':
                        goto('/pengarah-audit/halaman-utama');
                        break;

                    case 'pengarah bahagian':
                        goto('/pengarah-bahagian-negeri/halaman-utama');
                        break;

                    case 'pengarah negeri':
                        goto('/pengarah-bahagian-negeri/halaman-utama');
                        break;

                    case 'penyokong':
                        goto('/penyokong/halaman-utama');
                        break;

                    case 'super admin':
                        goto('/super-admin/halaman-utama');
                        break;

                    case 'timbalan ketua seksyen':
                        goto('/timbalan-ketua-seksyen/halaman-utama');
                        break;

                    case 'unit bahagian':
                        goto('/unit-bahagian/halaman-utama');
                        break;

                    case 'unit negeri':
                        goto('/kakitangan/halaman-utama');
                        break;

                    case 'unit pengurusan fasiliti':
                        goto('/kakitangan/halaman-utama');
                        break;

                    case 'urus setia cuti':
                        goto('/urus-setia/halaman-utama');
                        break;

                    case 'urus setia elaun-elaun perkhidmatan':
                        goto('/urus-setia/halaman-utama');
                        break;

                    case 'urus setia gaji':
                        goto('/urus-setia/halaman-utama');
                        break;

                    case 'urus setia integriti':
                        goto('/urus-setia/halaman-utama');
                        break;

                    case 'urus setia kakitangan kontrak':
                        goto('/urus-setia/halaman-utama');
                        break;

                    case 'urus setia latihan':
                        goto('/urus-setia/halaman-utama');
                        break;

                    case 'urus setia lnpt':
                        goto('/urus-setia/halaman-utama');
                        break;

                    case 'urus setia perjawatan':
                        goto('/urus-setia/halaman-utama');
                        break;

                    case 'urus setia persaraan':
                        goto('/urus-setia/halaman-utama');
                        break;

                    case 'urus setia perubatan':
                        goto('/urus-setia/halaman-utama');
                        break;

                    case 'urus setia pinjaman & kuarters':
                        goto('/urus-setia/halaman-utama');
                        break;

                    default:
                        break;
                }
            }, 2000),
        );
    } else {
        getLoginErrorToast();
    }
};
