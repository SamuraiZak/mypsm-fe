<script lang="ts">
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';

    let choice: string = '';
</script>

<!-- header section -->
<!-- <section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pemangkuan : Proses Pemangkuan Baharu">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Batal"
            onClick={() => {
                goto('/v2/employment/acting/menu');
            }}
        />
        <TextIconButton
            icon="next"
            label="Seterusnya"
            type="primary"
            onClick={() => {}}
        />
    </ContentHeader>
</section> -->

<section class="flex w-full flex-col items-center justify-center">
    <div class="flex h-20 w-full flex-row items-center justify-between px-5">
        <!-- leading -->
        <div class="flex w-full flex-col items-start justify-center">
            <p class="text-xl font-semibold text-black">Urusan Pemangkuan</p>
            <p class="text-md font-medium text-black">
                Tambah Pemangkuan Baharu
            </p>
        </div>
        <div class="flex flex-row items-center justify-end gap-2">
            <TextIconButton
                icon="cancel"
                type="neutral"
                label="Batal"
                onClick={() => {
                    goto('/v2/employment/acting/menu');
                }}
            />
            <TextIconButton
                icon="next"
                label="Seterusnya"
                type="primary"
                onClick={() => {}}
            />
        </div>
    </div>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden"
>
    <div
        class="flex h-full w-full flex-col items-start justify-start gap-2 p-5"
    >
        <!-- section for settings -->
        <div class="flex w-full flex-col items-start justify-start rounded">
            <div
                class="flex h-10 w-full flex-row items-center justify-start bg-slate-100 px-4"
            >
                <p class="text-md font-medium">Bahagian 1: Butiran Dasar Pemangkuan</p>
            </div>
            <div class="flex w-full flex-col items-start justify-start p-4">
                <form
                    id="createNewActingForm"
                    method="POST"
                    class="flex w-full flex-col items-center justify-start gap-1 lg:w-3/4 lg:flex-row lg:gap-4"
                >
                    <CustomSelectField
                        id="actingType"
                        label="Jenis Pemangkuan"
                        bind:val={choice}
                        options={[
                            {
                                name: 'Gred 1-54',
                                value: '1-54',
                            },
                            {
                                name: 'Gred Flexi 41',
                                value: 'Flexi 41',
                            },
                            {
                                name: 'Gred Utama',
                                value: 'Utama',
                            },
                        ]}
                    ></CustomSelectField>
                    <CustomSelectField
                        id="actingType"
                        label="Gred Jawatan Untuk Dipangku"
                        bind:val={choice}
                        options={[
                            {
                                name: 'Gred 1-54',
                                value: 'Gred 1-54',
                            },
                            {
                                name: 'Gred 1-54',
                                value: 'Gred 1-54',
                            },
                            {
                                name: 'Gred 1-54',
                                value: 'Gred 1-54',
                            },
                        ]}
                    ></CustomSelectField>
                </form>
            </div>
        </div>
        <!-- section for settings -->
        <div
            class="flex h-full w-full flex-col items-start justify-start rounded"
        >
            <div
                class="flex h-10 w-full flex-row items-center justify-start bg-slate-100 px-4"
            >
                <p class="text-md font-medium">
                    Bahagian 2: Pemilihan Calon Pemangkuan
                </p>
            </div>
            <div class="flex w-full flex-col items-start justify-start p-4">
                <CustomTab>
                    <CustomTabContent title="Senarai Kakitangan"
                    ></CustomTabContent>
                    <CustomTabContent title="Previu Senarai Calon Pemangkuan"
                    ></CustomTabContent>
                </CustomTab>
            </div>
        </div>
    </div>
</section>
