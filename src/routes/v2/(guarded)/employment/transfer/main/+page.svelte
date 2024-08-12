<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import selfImage from '$lib/assets/images/forms.jpg';
    let image = '/src/lib/assets/images/forms.jpg';
    let hrImage = '/src/lib/assets/images/hr.jpg';
</script>

<section class="flex w-full flex-col items-center justify-center">
    <div class="flex h-20 w-full flex-row items-center justify-between p-5">
        <!-- leading -->
        <div class="flex w-full flex-col items-start justify-center">
            <p class="text-xl font-semibold text-black">
                Pertukaran Penempatan
            </p>
        </div>
    </div>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
>
    <div class="h-full w-full overflow-y-auto overflow-x-hidden px-5">
        <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-4">
            <div
                class="flex flex-col items-center justify-start overflow-hidden rounded-md border"
            >
            <div class="h-60 w-full overflow-hidden bg-gray-200">
                <img
                    src={image}
                    alt="Image"
                    class="h-full w-full object-cover"
                />
            </div>

                <div
                    class="flex w-full flex-col items-start justify-center gap-1 p-4"
                >
                    <p class="text-md font-medium text-black">
                        Permohonan Pertukaran Sendiri
                    </p>
                </div>
                <div class="h-px w-full px-4">
                    <div class="h-px w-full bg-gray-200"></div>
                </div>
                
                <div
                    class="flex w-full flex-col items-start justify-center p-4"
                >
                    <ul class="d list-inside list-disc text-slate-500">
                        <li>
                            <a
                                href="#"
                                class="text-base font-normal text-slate-500"
                                >Permohonan Baru</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-base font-normal text-slate-500"
                                >Semakan Status Permohonan</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-base font-normal text-slate-500"
                                >Senarai Sejarah Permohonan</a
                            >
                        </li>
                    </ul>
                </div>
            </div>

            <div
                class="flex flex-col items-center justify-start rounded-md border"
            >
            <div class="h-60 w-full overflow-hidden bg-gray-200">
                <img
                    src={hrImage}
                    alt="Image"
                    class="h-full w-full object-cover"
                />
            </div>

                <div
                    class="flex w-full flex-col items-start justify-center gap-1 p-4"
                >
                    <p class="text-md font-medium text-black">
                        Arahan / Cadangan Pertukaran
                    </p>
                </div>
                <div class="h-px w-full px-4">
                    <div class="h-px w-full bg-gray-200"></div>
                </div>
                <div
                    class="flex w-full flex-col items-start justify-center p-4"
                >
                    <ul class="d list-inside list-disc text-slate-500">
                        <li>
                            <a
                                href="#"
                                class="text-base font-normal text-slate-500"
                                >Semakan</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-base font-normal text-slate-500"
                                >Arahan/Cadangan Baru</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-base font-normal text-slate-500"
                                >Senarai Sejarah Arahan/Cadangan</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
