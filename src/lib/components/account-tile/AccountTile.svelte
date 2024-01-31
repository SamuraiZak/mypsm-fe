<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { Select } from 'flowbite-svelte';
    import { roles } from '$lib/config/roles';
    import { activeRole } from '$lib/stores/globalState';
    import currentRole from '$lib/stores/activeRole';
    import type { EnumRole, EnumRoleResponseViewModel } from '$lib/view-models/core/lookup/role/role-enum-reponse.view-model';
    import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
    import type { RoleOption } from '$lib/view-models/core/role-option/role-option.view-model';
    import { TextHelper } from '$lib/helper/core/text-helper/text-helper';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key-constant';

    export let roleOptionList:RoleOption[]=[];
    let currentUrl = $page.url.pathname;
    let pages = currentUrl.replace('/', '');
    let subs = pages.split('/');

    $: {
        $page.url.pathname;
        currentUrl = $page.url.pathname;
        pages = currentUrl.replace('/', '');
        subs = pages.split('/');

    }

    let selected: string | null = localStorage.getItem(LocalStorageKeyConstant.currentRole);

    let open = false;
    let active = 'Inbox';

    function setActive(value: string) {
        active = value;
        open = false;
    }

    let currentUser = {
        fullName: 'Mohd Irfan bin Abu',
        adminEmail: 'irfan@lkim.com',
    };

    function generateUrlPrefix(param:string) {
        let currentRolePrefix = param.replaceAll(" ", "-");

        currentRolePrefix = currentRolePrefix.replaceAll("/", "-");

        if (currentRolePrefix.includes("urus-setia") || currentRolePrefix.includes("unit")) {
            return "urus-setia"
        } else{
            return currentRolePrefix;
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
                    activeRole.set(selected??"kakitangan");
                    currentRole.set(selected??"kakitangan");

                    let rolePrefix = generateUrlPrefix(selected ?? "kakitangan");
                    goto('/' + rolePrefix + '/halaman-utama');
                }}
            />
        </div>
    </div>
</div>
