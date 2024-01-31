<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { Select } from 'flowbite-svelte';
    import SvgUserCircle from '$lib/assets/svg/SvgUserCircle.svelte';
    import SvgPower from '$lib/assets/svg/SvgPower.svelte';
    import { roles } from '$lib/config/roles';

    let currentUrl = $page.url.pathname;
    let pages = currentUrl.replace('/', '');
    let subs = pages.split('/');

    $: {
        $page.url.pathname;
        currentUrl = $page.url.pathname;
        pages = currentUrl.replace('/', '');
        subs = pages.split('/');
    }

    let selected: string = subs[0];

    let open = false;
    let active = 'Inbox';

    function setActive(value: string) {
        active = value;
        open = false;
    }

    let adminEmail = 'admin@impact-multimedia.com';
    let kakitanganName = 'Mohd Irfan Bin Abu';

    let defaultClass =
        'text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-white focus:border-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500';
</script>

<div class="flex h-full items-center border-l-2 border-r-2 px-2">
    <span class="text-system-accent"><SvgUserCircle size="40" /></span>
    <div class="flex h-3/4 w-[200px] flex-col justify-center">
        <div class="truncate pl-2 text-xs font-bold">{kakitanganName}</div>
        <div class="w-full text-xs font-medium">
            <Select
                placeholder=""
                class="mt-2 truncate border-0 px-2 py-0 text-xs font-normal"
                {defaultClass}
                items={roles}
                bind:value={selected}
                on:change={() => {
                    goto('/' + selected + '/halaman-utama');
                }}
            />
        </div>
    </div>
</div>
<div class="flex h-full cursor-pointer items-center justify-center">
    <SvgPower />
</div>
