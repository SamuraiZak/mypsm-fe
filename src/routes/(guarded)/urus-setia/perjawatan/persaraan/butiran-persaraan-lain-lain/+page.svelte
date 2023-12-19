<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { pilihKakitanganUntukPersaraanLainLainSenaraiKakitangan } from '$lib/mocks/perjawatan/persaraan/butiran-persaraan-lain-lain/pilih-kakitangan-untuk-persaraan-lain-lain-senarai-kakitangan';
    import { masukkanButiranPersaraan } from '$lib/mocks/perjawatan/persaraan/butiran-persaraan-lain-lain/masukkan-butiran-persaraan';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';

    export let disabled: boolean = true;
    export let selectedFiles: any = [];
    let target: any;

    onMount(() => {
        target = document.getElementById('hello');
    });

    function handleOnChange() {
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }
    }

    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
    }

    let radioValue: any = 'sah';

    const options: RadioOption[] = [
        {
            value: 'sah',
            label: 'Sah',
        },
        {
            value: 'tidakSah',
            label: 'Tidak Sah',
        },
    ];

    const currentEmployeeUploadedDocuments = mockEmployeeDocumentLists;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Persaraan Lain-lain"
        description="Hal-hal berkaitan Persaraan Lain-lain"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/urus-setia/perjawatan/persaraan');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Pilih Kakitangan untuk Persaraan Lain-lain"
        ></StepperContentHeader>
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Senarai Kakitangan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <DynamicTable
                        withRowSelection
                        selectAdd
                        tableItems={pilihKakitanganUntukPersaraanLainLainSenaraiKakitangan}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            goto(
                                '/pilih-kakitangan-untuk-persaraan-lain-lain-senarai-kakitangan',
                            );
                        }}
                    ></DynamicTable>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Senarai Kakitangan Yang Dipilih</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <DynamicTable
                        withRowSelection
                        tableItems={pilihKakitanganUntukPersaraanLainLainSenaraiKakitangan}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            goto(
                                '/pilih-kakitangan-untuk-persaraan-lain-lain-senarai-kakitangan',
                            );
                        }}
                    ></DynamicTable>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Masukkan Butiran Persaraan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Senarai Kakitangan Persaraan Lain-lain
                </p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <DynamicTable
                        tableItems={masukkanButiranPersaraan}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            goto('');
                        }}
                    ></DynamicTable>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Persaraan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Dokumen Persaraan Kakitangan</p>
                <p class="text-sm">Fail-fail untuk dimuat turun</p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <li>
                        <DownloadAttachment fileName="Maklumat Persaraan.pdf" />
                    </li>
                    <li>
                        <DownloadAttachment fileName="Maklumat Persaraan.pdf" />
                    </li>
                    <li>
                        <DownloadAttachment fileName="Maklumat Persaraan.pdf" />
                    </li>
                </ul>
            </div>
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Muat Naik Dokumen</p>
                <div
                    class="flex flex-col items-center justify-center rounded-[3px] border border-system-primaryTint p-2.5"
                >
                    <p class="text-base text-txt-secondary">
                        Seret dan lepas fail anda ke dalam ruangan ini atau
                        pilih fail dari peranti anda
                    </p>
                    <span>
                        <FileInputField />
                    </span>
                </div>
                <p class="text-sm text-rose-500">
                    Sila muat naik dokumen sokongan pada ruangan disediakan.
                </p>

                <p class="text-sm">Fail-fail untuk dimuat naik</p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <li>
                        <DownloadAttachment fileName="Maklumat Persaraan.pdf" />
                    </li>
                    <li>
                        <DownloadAttachment fileName="Maklumat Persaraan.pdf" />
                    </li>
                    <li>
                        <DownloadAttachment fileName="Maklumat Persaraan.pdf" />
                    </li>
                </ul>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Pengesahan Urus Setia</p>
                <div class="flex w-full flex-col gap-2">
                    <LongTextField
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Dokumen-dokumen telah disemak'}
                    ></LongTextField>

                    <RadioSingle
                        {options}
                        legend=""
                        bind:userSelected={radioValue}
                    />
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Penghantaran Permohonan"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/urus-setia/perjawatan/persaraan');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Cetak Surat Iringan</p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <li>
                        <DownloadAttachment fileName="Surat Iringan" />
                    </li>
                </ul>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Maklumat Penghantaran Permohonan
                </p>
                <div>
                    <LongTextField
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Dokumen-dokumen telah disemak'}
                    ></LongTextField>

                    <RadioSingle
                        {options}
                        legend=""
                        bind:userSelected={radioValue}
                    />
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
