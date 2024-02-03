<script lang="ts">
    import AccountTile from '../account-tile/AccountTile.svelte';
    import IconButton from '../buttons/IconButton.svelte';
    import group from '$lib/assets/group.png';
    import logo from '$lib/assets/logo.png';
    import MyPSM from '$lib/assets/MyPSM.png';
    import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
    import { goto, pushState } from '$app/navigation';
    import type { RoleOption } from '$lib/view-models/core/role-option/role-option.view-model';
    import SvgAddCircle from '$lib/assets/svg/SvgAddCircle.svelte';
    import SvgSettings from '$lib/assets/svg/SvgSettings.svelte';
    import SvgPower from '$lib/assets/svg/SvgPower.svelte';

    export let roleOptionList: RoleOption[] = [];

    const logOutUser = async () => {
        await AuthService.logout().finally(() => {
            goto('/');
        });
    };

    const redirectSetting = async () => {
        goto('/tetapan');
    };
</script>

<header
    class="flex max-h-[50px] w-full justify-between border-b bg-white text-black"
>
    <div
        class="flex h-[50px] w-[200px] min-w-[200px] items-center justify-center border-r"
    >
        <div class="flex items-center justify-between gap-2">
            <img class="h-10" src={logo} alt="" />
            <img class="h-8" src={group} alt="" />
            <img class="h-5" src={MyPSM} alt="" />
        </div>
    </div>
    <div class="flex w-fit flex-row items-center md:justify-end">
        <!-- <HeaderProfile /> -->
        <AccountTile {roleOptionList}></AccountTile>
        <div
            class="flex h-full w-[50px] flex-col items-center justify-center border-r p-0"
        >
            <button type="button" on:click={redirectSetting} class="p-2">
                <span class="text text-ios-labelColors-label-light">
                    <SvgSettings size="19"></SvgSettings>
                </span>
            </button>
        </div>
        <div
            class="flex h-full w-[50px] flex-col items-center justify-center p-0"
        >
            <button on:click={logOutUser} class="p-2">
                <span class="text text-ios-labelColors-label-light">
                    <SvgPower size="19"></SvgPower>
                </span>
            </button>
        </div>
    </div>
</header>
