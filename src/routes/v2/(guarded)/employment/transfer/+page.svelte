<script lang="ts">
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.ts';
    import type { ModuleDTO } from '$lib/dto/core/system/system.dto';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';

    let menu: ModuleDTO[] = [
        {
            moduleName: 'Pertukaran Atas Permohonan Sendiri',
            url: '',
            child: [
                {
                    moduleName: 'Tambah Permohonan Baharu',
                    url: '',
                    child: [],
                },
                {
                    moduleName: 'Lihat Senarai Permohonan',
                    url: '/v2/employment/transfer/self/list',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Arahan / Cadangan Pertukaran',
            url: '',
            child: [
                {
                    moduleName: 'Tambah Arahan / Cadangan Pertukaran Baharu',
                    url: '',
                    child: [],
                },
                {
                    moduleName: 'Lihat Senarai Permohonan',
                    url: '',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Sejarah Pertukaran',
            url: '',
            child: [
                {
                    moduleName: 'Lihat Senarai Sejarah Pertukaran',
                    url: '',
                    child: [],
                },
            ],
        },
        {
            moduleName: 'Perkara-perkara Yang Memerlukan Tindakan Anda',

            url: '',
            child: [
                {
                    moduleName: 'Senarai',
                    url: '',
                    child: [],
                },
            ],
        },
    ];
</script>

<section
    class="flex h-2/3 w-full flex-col items-start justify-center bg-cover bg-center object-scale-down"
    style="background-image: linear-gradient(
    to bottom, transparent, #555555), url('/src/lib/assets/images/forms.jpg');"
>
    <div
        class="flex h-full w-full flex-col items-start justify-center bg-black bg-opacity-50 p-10"
    >
        <div
            class="flex h-fit w-full flex-col items-start justify-center gap-2"
        >
            <p class="text-2xl font-semibold leading-tight text-white">
                Modul Pertukaran
            </p>
            <p class="text-lg font-medium leading-tight text-white">
                Menu Utama
            </p>
        </div>
    </div>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden p-10"
>
    <div class="h-full w-full overflow-y-auto overflow-x-hidden px-5">
        <div
            class="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {#each menu as module}
                <a
                    data-sveltekit-preload-data="false"
                    href={module.url}
                    class="cur cursor-default"
                >
                    <div
                        class="flex h-full min-w-20 transform flex-col items-start justify-start gap-2 overflow-hidden rounded-md border bg-white p-4 transition-transform"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <div
                                class="flex flex-col items-center justify-center rounded"
                            >
                                <!-- Diamond icon -->
                                <span class="text text-slate-500">
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
                                        module.moduleName ?? '',
                                    )}
                                </p>
                            </div>
                            <div class="h-px w-full bg-gray-200"></div>
                            <div
                                class="w-full flex-col items-start justify-start"
                            >
                                <div
                                    class="flex w-full flex-col items-start justify-center px-5"
                                >
                                    <ul
                                        class="d list-outside list-disc text-slate-500"
                                    >
                                        {#each module.child as child}
                                            <li class="hover:scale-105">
                                                <a
                                                    href={child.url}
                                                    class="text-md font-normal text-slate-500 hover:text-slate-700"
                                                >
                                                    {TextAppearanceHelper.toProper(
                                                        child.moduleName ?? '',
                                                    )}
                                                </a>
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>
