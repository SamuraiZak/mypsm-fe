<script lang="ts">
    import SvgReload from '$lib/assets/svg/SvgReload.svelte';
    import NotificationTile from '$lib/components/notification-tile/NotificationTile.svelte';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div
    class="flex h-full w-full flex-row items-start justify-start overflow-hidden"
>
    <!-- home section starts -->
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2 overflow-y-auto overflow-x-hidden bg-white p-6"
    >
        <!-- hero starts -->
        <div
            class="flex h-40 min-h-40 w-full flex-col items-start justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-300 p-6 shadow-md"
        >
            <h1 class="text-xl font-medium text-white">
                Salam Sejahtera, {TextAppearanceHelper.toProper(
                    data.props.layoutData.accountDetails.name,
                )}
            </h1>
            <p class="text-md font-medium text-white">
                Selamat datang ke sistem MYPSM
            </p>
        </div>
        <!-- hero ends -->

        <!-- quick links starts -->
        <div
            class="flex h-full w-full flex-col items-start justify-start gap-5"
        >
            <div
                class="flex h-10 w-full flex-row items-center justify-start border-b"
            >
                <p class="text-lg font-semibold leading-tight text-slate-700">
                    Pautan Ringkas
                </p>
            </div>
            <div
                class="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {#each data.props.layoutData.accountDetails.module as module}
                    <a
                        href={module.child.length == 0
                            ? module.url
                            : module.child[0].url}
                    >
                        <div
                            class="flex min-w-20 transform flex-col items-start justify-start gap-2 overflow-hidden rounded-md border bg-white p-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                        >
                            <div
                                class="flex flex-row items-center justify-start gap-2"
                            >
                                <div
                                    class="flex flex-col items-center justify-center rounded"
                                >
                                    <!-- Diamond icon -->
                                    <span class={module.color}>
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            ><g
                                                id="SVGRepo_bgCarrier"
                                                stroke-width="0"
                                            ></g><g
                                                id="SVGRepo_tracerCarrier"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></g><g id="SVGRepo_iconCarrier">
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM12.3975 14.0385L14.859 16.4999C15.1138 16.7548 15.2413 16.8822 15.3834 16.9411C15.573 17.0196 15.7859 17.0196 15.9755 16.9411C16.1176 16.8822 16.2451 16.7548 16.4999 16.4999C16.7548 16.2451 16.8822 16.1176 16.9411 15.9755C17.0196 15.7859 17.0196 15.573 16.9411 15.3834C16.8822 15.2413 16.7548 15.1138 16.4999 14.859L14.0385 12.3975L14.7902 11.6459C15.5597 10.8764 15.9444 10.4916 15.8536 10.0781C15.7628 9.66451 15.2522 9.47641 14.231 9.10019L10.8253 7.84544C8.78816 7.09492 7.7696 6.71966 7.24463 7.24463C6.71966 7.7696 7.09492 8.78816 7.84544 10.8253L9.10019 14.231C9.47641 15.2522 9.66452 15.7628 10.0781 15.8536C10.4916 15.9444 10.8764 15.5597 11.6459 14.7902L12.3975 14.0385Z"
                                                    fill="currentColor"
                                                ></path>
                                            </g></svg
                                        >
                                    </span>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-start"
                                >
                                    <p
                                        class="w-fit text-wrap text-md font-medium text-slate-700"
                                    >
                                        {TextAppearanceHelper.toProper(
                                            module.moduleName,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
        <!-- quick links ends -->
    </div>
    <!-- home section ends -->

    <!-- notification section starts -->
    <div class="flex h-full w-96 flex-col items-start justify-start border-l">
        <!-- section header starts -->
        <div
            class="flex h-14 w-full flex-row items-center justify-between border-b px-4"
        >
            <p class="text-md font-medium leading-tight text-slate-700">
                Notifikasi
            </p>
            <button
                class=" flex flex-col items-center justify-center rounded-md p-2 hover:bg-gray-100"
            >
                <span class="text text-slate-700">
                    <SvgReload size="14"></SvgReload>
                </span>
            </button>
        </div>
        <!-- section header ends -->
        <div
            class="flex h-full w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden"
        >
            {#each data.props.notification as notification}
                <NotificationTile {notification}></NotificationTile>
            {/each}
        </div>
    </div>
    <!-- notification section ends -->
</div>
