<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgSetting from '$lib/assets/svg/SvgSetting.svelte';
    import ImpactCard from '$lib/components/button/ImpactCard.svelte';
    import RouterCard from '$lib/components/card/RouterCard.svelte';
    import { RoleConstant } from '$lib/constants/core/role.constant';
    import { ModuleConstant } from '$lib/constants/core/routes.constant';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<section
    class="flex h-full max-h-full min-h-full w-full flex-col items-center justify-start overflow-y-auto bg-ios-basic-white pb-10"
>
    <div
        class="flex h-20 max-h-20 min-h-20 w-full flex-col items-start justify-center bg-ios-basic-white px-10"
    >
        <div class="flex w-full flex-row items-center justify-start">
            <p class="text-xl font-semibold">Halaman Utama {data.props.currentRole.description}</p>
        </div>
    </div>

    <div
        class="flex h-fit w-full flex-col items-center justify-start bg-ios-basic-white px-10"
    >
        <div
            class="grid h-fit w-full grid-cols-1 gap-2.5 py-2 md:grid-cols-2 lg:grid-cols-4"
        >
            {#each data.props.moduleList as module}
                {#if module.roles.includes(data.props.currentRole)}
                    <RouterCard
                        url={module.url}
                        icon={module.icon}
                        title={module.name}
                        subtitle={module.description}
                    ></RouterCard>
                <!-- {:else if module.roles.length < 1}
                    <RouterCard
                        url={module.url}
                        icon={module.icon}
                        title={module.name}
                        subtitle={module.description}
                    ></RouterCard> -->
                {/if}
            {/each}
        </div>
    </div>
</section>
