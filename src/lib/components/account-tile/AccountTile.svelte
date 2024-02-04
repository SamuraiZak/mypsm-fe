<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { Select } from 'flowbite-svelte';
    import { roles } from '$lib/config/roles';
    import { activeRole, loadingState } from '$lib/stores/globalState';
    import currentRole from '$lib/stores/activeRole';
    import type {
        EnumRole,
        EnumRoleResponseViewModel,
    } from '$lib/view-models/core/lookup/role/role-enum-reponse.view-model';
    import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
    import type { RoleOption } from '$lib/view-models/core/role-option/role-option.view-model';
    import { TextHelper } from '$lib/helper/core/text-helper/text-helper';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key-constant';
    import type { AuthRequestDTO } from '$lib/dto/core/auth/auth-request.dto';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import {
        getLoadingToast,
        getLoginSuccessToast,
        getLoginErrorToast,
    } from '$lib/services/core/toast/toast-service';
    import toast from 'svelte-french-toast';

    export let roleOptionList: RoleOption[] = [];
    let currentUrl = $page.url.pathname;
    let pages = currentUrl.replace('/', '');
    let subs = pages.split('/');

    $: {
        $page.url.pathname;
        currentUrl = $page.url.pathname;
        pages = currentUrl.replace('/', '');
        subs = pages.split('/');
    }

    let selected: string =
        localStorage.getItem(LocalStorageKeyConstant.currentRole) ?? 'default';

    let open = false;
    let active = 'Inbox';

    function setActive(value: string) {
        active = value;
        open = false;
    }

    let currentUser = {
        fullName: localStorage.getItem(LocalStorageKeyConstant.fullName),
        adminEmail: '',
    };

    function generateUrlPrefix(param: string) {
        let currentRolePrefix = param.replaceAll(' ', '-');

        currentRolePrefix = currentRolePrefix.replaceAll('/', '-');

        if (
            currentRolePrefix.includes('urus-setia') ||
            currentRolePrefix.includes('unit')
        ) {
            return 'urus-setia';
        } else {
            return currentRolePrefix;
        }
    }

    async function _changeRole(newRole: string) {
        let param: AuthRequestDTO = {
            idType: localStorage.getItem(LocalStorageKeyConstant.idType) ?? "undefined",
            userGroup: localStorage.getItem(LocalStorageKeyConstant.userGroup) ?? "undefined",
            username: localStorage.getItem(LocalStorageKeyConstant.userName) ?? "undefined",
            password: localStorage.getItem(LocalStorageKeyConstant.password) ?? "undefined",
            currentRole: newRole ?? "undefined",
        };
        loadingState.set(true);
        getLoadingToast();

        const response: CommonResponseDTO = await AuthService.authenticateUser(
            param,
        ).finally(() => toast.dismiss());

        console.log(response);

        if (response.status == 'success') {
            let accountRes = await AuthService.getFullName();
            loadingState.set(false);
            getLoginSuccessToast().finally(() =>
                setTimeout(() => {
                    switch (param.currentRole) {
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
                }, 2000),
            );
        } else {
            getLoginErrorToast();
        }
    }
</script>

<div
    class="flex h-full w-fit flex-row items-center justify-center border-l border-r bg-bgr-primary"
>
    <!-- leading -->

    <div class="flex h-[50px] w-[50px] flex-col items-center justify-center">
        <div
            class="flex h-[30px] w-[30px] flex-col items-center justify-center rounded-full bg-system-accent text-txt-blend"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
            </svg>
        </div>
    </div>
    <!-- content -->
    <div class="flex w-full flex-col items-start justify-center">
        <div class="flex w-full flex-row items-center justify-start px-2">
            <p class="text-sm font-semibold text-txt-primary">
                {currentUser.fullName}
            </p>
        </div>
        <div class="text-xs w-fit font-medium">
            <Select
                placeholder=""
                class="cursor-pointer truncate rounded-[3px] border-0 bg-transparent px-2 py-0 text-sm font-normal"
                items={roleOptionList}
                bind:value={selected}
                on:change={() => {
                    activeRole.set(selected ?? 'kakitangan');
                    currentRole.set(selected ?? 'kakitangan');

                    _changeRole(selected);

                    // let rolePrefix = generateUrlPrefix(
                    //     selected ?? 'kakitangan',
                    // );
                    // goto('/' + rolePrefix + '/halaman-utama');
                }}
            />
        </div>
    </div>
</div>
