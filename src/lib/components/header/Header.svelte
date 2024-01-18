<script lang="ts">
    import AccountTile from '../account-tile/AccountTile.svelte';
    import IconButton from '../buttons/IconButton.svelte';
    import HeaderProfile from './HeaderProfile.svelte';
</script>

<header
    class="flex max-h-[50px] w-full justify-between border-b bg-white text-black"
>
    <div
        class="flex h-[50px] w-[200px] min-w-[200px] items-center justify-center border-r"
    >
        <div class="flex items-center justify-between gap-2">
            <img class="h-10" src="/src/lib/assets/logo.png" alt="" />
            <img class="h-8" src="/src/lib/assets/Group.png" alt="" />
            <img class="h-5" src="/src/lib/assets/MyPSM.png" alt="" />
        </div>
    </div>
    <div class="flex w-fit flex-row items-center md:justify-end">
        <!-- <HeaderProfile /> -->
        <AccountTile></AccountTile>
        <div class="flex w-[50px] flex-col items-center justify-center p-0">
            <form method="POST" action="/logout">
                <button>
                    <IconButton>
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
                                d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                            />
                        </svg>
                    </IconButton></button
                >
            </form>
        </div>
    </div>
</header>
