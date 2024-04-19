<script lang="ts">
    // import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    // import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    // import FormButton from '$lib/components/buttons/FormButton.svelte';
    // import CustomTextField from '$lib/components/input/LongCustomTextField.svelte';
    // import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    // import CustomTextField from '$lib/components/input/CustomTextField.svelte';
    // import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    // import { semakRekodTatatertibKakitangan } from '$lib/mocks/perjawatan/persaraan/butiran-persaraan-paksaan/semak-rekod-tatatertib-kakitangan';
    import { Badge } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    // import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    // import ContentHeader from '$lib/components/header/ContentHeader.svelte';
    // import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    // import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    // import { status } from '$lib/mocks/urus-setia/persaraan/status';
    // import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { _updateTable } from './+page';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    
    export let data: PageData;
    export let disabled = true;
    let param: CommonListRequestDTO = data.param;

    let table: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList ?? [],
        
    };

    async function _search() {
        _updateTable(table.param).then((value) => {
            table.data = value.response?.dataList ?? [];
            table.meta = value.response?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            table.param.pageSize = table.meta.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
    }

    // let selectedTahun = tahun[0].val;
    // let selectedStatus = status[0].val;

    // const options: RadioOption[] = [
    //     {
    //         val: 'sah',
    //         label: 'Sah',
    //     },
    //     {
    //         val: 'tidakSah',
    //         label: 'Tidak Sah',
    //     },
    // ];

    //Verification Retirement Application
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Permohonan Persaraan Paksaan 0282378L"
        ><TextIconButton
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
                    <CustomTextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        val={'Hafiz Bin Ahmad'}
                    ></CustomTextField>
                    <CustomTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        val={'Dokumen-dokumen telah disemak'}
                    ></CustomTextField>
                    <!-- <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div> -->
                    <CustomRadioBoolean
                    disabled={false}
                    id="resultOption"
                    label="Keputusan"
                    val=""
                ></CustomRadioBoolean>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Rekod Tatatertib Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <ContentHeader title="Senarai Tindakan/Ulasan Tatatertib">
                    <!-- <DropdownSelect
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
                    ></DropdownSelect> -->
                </ContentHeader>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <!-- <DynamicTable
                        tableItems={semakRekodTatatertibKakitangan}
                        withActions
                        actionOptions={['detail']}
                        detailActions={() => {
                            goto('');
                        }}
                    ></DynamicTable> -->

                    <!-- <CustomTable
                    onUpdate={_search}
                    enableDetail
                    bind:tableData={table}
                ></CustomTable> -->


                Table
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan Persaraan"
            ><TextIconButton
                type="primary"
                label="Simpan"
                form="FormStepperVerificationRetirementApplication"
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <div>
                    <CustomTextField
                        id="actionRemark"
                        label="Tindakan / Ulasan"
                        val=""
                    />

                    <CustomRadioBoolean
                    disabled={false}
                    id="resultOption"
                    val=""
                ></CustomRadioBoolean>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Dokumen Persaraan"
            ><TextIconButton
                type="primary"
                label="Simpan"
                form="FormStepperVerificationRetirementDocuments"
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Dokumen Persaraan Kakitangan</p>
                <p class="text-sm">Fail-fail yang dimuat naik:</p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <!-- <li>
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
                        </li> -->
                </ul>
            </div>
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Pengesahan Urus Setia</p>
                <div>
                    <CustomTextField
                        id="actionRemarkVRD"
                        label="Tindakan / Ulasan"
                        val=""
                    />

                    <CustomRadioBoolean
                    disabled={false}
                    id="resultOption"
                    val=""
                ></CustomRadioBoolean>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Penghantaran Permohonan"
            ><TextIconButton
                type="primary"
                label="Simpan"
                form="FormStepperUpdateApplicationDeliveryInformation"
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Cetak Surat Iringan</p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <!-- <li>
                        <DownloadAttachment fileName="Surat Iringan" />
                    </li> -->
                </ul>
            </div>
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">
                    Maklumat Penghantaran Permohonan
                </p>
                <div>
                    <CustomTextField
                        id="actionRemarkUADI"
                        label="Tindakan / Ulasan"
                        val=""
                    />

                    <CustomRadioBoolean
                    disabled={false}
                    id="resultOption"
                    val=""
                ></CustomRadioBoolean>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />
