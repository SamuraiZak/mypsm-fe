<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { semakRekodTatatertibKakitangan } from '$lib/mocks/perjawatan/persaraan/butiran-persaraan-paksaan/semak-rekod-tatatertib-kakitangan';
    import { Badge } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import { status } from '$lib/mocks/urus-setia/persaraan/status';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';

    export let disabled: boolean = true;

    let radioValue: any = 'sah';
    let selectedTahun = tahun[0].value;
    let selectedStatus = status[0].value;

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
        title="Rekod Permohonan Persaraan Paksaan 0282378L"
        description="Maklumat-maklumat permohonan persaraan paksaan pekerja 0282378L"
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
        <StepperContentHeader title="Perakuan Dari Unit Integriti"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Unit Integriti</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Hafiz Bin Ahmad'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Dokumen-dokumen telah disemak'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Rekod Tatatertib Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <SectionHeader title="Senarai Tindakan/Ulasan Tatatertib"
                    ><DropdownSelect
                        id="tahunDropdown"
                        label="Tahun"
                        dropdownType="label-left"
                        bind:index={selectedTahun}
                        options={tahun}
                    ></DropdownSelect>
                    <DropdownSelect
                        id="statusDropdown"
                        label="Status"
                        dropdownType="label-left"
                        bind:index={selectedStatus}
                        options={status}
                    ></DropdownSelect></SectionHeader
                >
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <DynamicTable
                        tableItems={semakRekodTatatertibKakitangan}
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
        <StepperContentHeader title="Pengesahan Permohonan Persaraan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <div>
                    <LongTextField
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Memenuhi Kriteria'}
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
        <StepperContentHeader title="Pengesahan Dokumen Persaraan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Dokumen Persaraan Kakitangan</p>
                <p class="text-sm">Fail-fail yang dimuat naik:</p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <li>
                        <DownloadAttachment
                            fileName="JPA.BP.SPPP.B01a-Maklumat Pesara.pdf"
                        />
                    </li>
                    <li>
                        <DownloadAttachment
                            fileName="JPA.BP.SPPP.B01a-Maklumat Pesara.pdf"
                        />
                    </li>
                    <li>
                        <DownloadAttachment
                            fileName="JPA.BP.SPPP.B01a-Maklumat Pesara.pdf"
                        />
                    </li>
                </ul>
            </div>
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Pengesahan Urus Setia</p>
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
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
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
