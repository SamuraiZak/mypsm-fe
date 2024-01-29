import { goto } from '$app/navigation';
import {
    getLoginErrorToast,
    getLoginSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key-constant';
import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
import type { AuthenticationRequestViewModel } from '$lib/view-models/core/auth/auth-request.view-model';
import type { AuthenticationResponseViewModel } from '$lib/view-models/core/auth/auth-response.view-model';
import type { EnumRoleResponseViewModel } from '$lib/view-models/core/lookup/role/role-enum-reponse.view-model';
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
    const roleResponse: EnumRoleResponseViewModel =
        await AuthService.getRoleOptions();

    return { form, roleResponse };
};

export const _submit = async (formData: AuthenticationRequestViewModel) => {
    const response: AuthenticationResponseViewModel = await AuthService.loginEmployee(formData);
    if (response.status == 200) {
        localStorage.setItem(LocalStorageKeyConstant.currentRole, formData.currentRole);

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
        
            case 'pengarah bahagian/negeri':
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
        
            case 'unit bahagian/negeri':
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
    }
};
