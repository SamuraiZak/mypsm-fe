<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { kgtMonthLookup } from '$lib/constants/core/dropdown.constant';
    import type { PageData } from './$types';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { goto } from '$app/navigation';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { approveOptions } from '$lib/constants/core/radio-option-constants';
    export let data: PageData;

    let umumTable: TableDTO = {
        param: data.param,
        meta: {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.leaveRecord ?? [],
    };
    let pemangkuanTable: TableDTO = {
        param: data.param,
        meta: {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.actingSchedule ?? [],
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Gaji Dan Elaun">
        <TextIconButton
            label="Tutup"
            type="neutral"
            icon="cancel"
            onClick={() => goto('./')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="No. Pekerja"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Nama"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="No. Kad Pengenalan"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Gred"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Penempatan"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Kumpulan"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Tarikh Lantikan Gred Semasa"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Status Semasa Kakitangan"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Gaji dan Elaun Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="Tangga Gaji (RM)"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="Gaji Pokok (RM)"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="ITKA"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="ITP"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomTextField
                    label="COLA"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
                <CustomSelectField
                    label="Bulan Pergerakan Gaji"
                    id=""
                    disabled
                    options={kgtMonthLookup}
                    val={4}
                    errors={[]}
                />
                <CustomTextField
                    label="Jumlah (RM)"
                    id=""
                    disabled
                    val=""
                    errors={[]}
                />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Lain-Lain"
            ></StepperContentHeader>
            <StepperContentBody>
                {#each data.otherDetail as details}
                    <div class="w-full flex flex-col  border-b pb-2.5">
                        <div class="w-full">
                            <span
                                class="text-base text-ios-labelColors-link-light"
                                >{details.name}</span
                            >
                        </div>
                        <CustomTextField
                            label="Jumlah (RM)"
                            id=""
                            disabled
                            val={details.jumlah}
                            errors={[]}
                        />
                        <CustomTextField
                            label="Tarikh Mula"
                            id=""
                            disabled
                            type="date"
                            val={details.tarikhMula}
                            errors={[]}
                        />
                        <CustomTextField
                            label="Tarikh Tamat"
                            id=""
                            disabled
                            type="date"
                            val={details.tarikhTamat}
                            errors={[]}
                        />
                    </div>
                {/each}
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Perubahan Gaji"></StepperContentHeader>
            <StepperContentBody>
                <CustomTab>
                    <CustomTabContent title="Umum">
                        <div class="w-full">
                            <CustomTable
                                title="Rekod Cuti Kakitangan"
                                tableData={umumTable}
                            />
                        </div>
                        <CustomTextField
                            label="Jumlah Potongan Cuti (RM)"
                            id=""
                            type="number"
                            val={1234}
                        />
                        <CustomTextField
                            label="Tempoh Bayaran (Bulan)"
                            id=""
                            type="number"
                            val={324}
                        />
                        <ContentHeader
                            title="Senarai Potongan"
                            borderClass="border-none"
                        />
                        {#each data.otherDetail as details}
                            <div class="w-full">
                                <span
                                    class="text-base text-ios-labelColors-link-light"
                                    >{details.name}</span
                                >
                            </div>
                            <CustomTextField
                                label="Tarikh Mula"
                                id=""
                                disabled
                                val={details.tarikhMula}
                                errors={[]}
                            />
                            <CustomTextField
                                label="Tarikh Tamat"
                                id=""
                                disabled
                                val={details.tarikhTamat}
                                errors={[]}
                            />
                            <CustomTextField
                                label="Jenis Bayaran"
                                id=""
                                disabled
                                val={details.jenisBayaran}
                                errors={[]}
                            />
                            <CustomTextField
                                label="Jumlah Bayaran(RM)"
                                id=""
                                disabled
                                val={details.jumlah}
                                errors={[]}
                            />
                        {/each}
                    </CustomTabContent>
                    <CustomTabContent title="Pemangkuan">
                        <div class="w-full">
                            <CustomTable
                                title="Rekod Cuti Kakitangan"
                                tableData={pemangkuanTable}
                            />
                        </div>
                        <CustomTextField
                            label="Tarikh Berkuatkuasa"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Bulan Pelarasan Gaji"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Gred"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Penempatan"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Gaji Pokok"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="ITKA"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Jenis Elaun Perumahan"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Jumlah Elaun Perumahan"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="COLA"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Tarikh Pergerakan Gaji dan Jumlah"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Jumlah (RM)"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                    </CustomTabContent>
                    <CustomTabContent title="Pelarasan">
                        <div class="w-full">
                            <span
                                class="text-base text-ios-labelColors-link-light"
                                >Penambahan 1</span
                            >
                        </div>
                        <CustomTextField
                            label="Jenis Penambahan"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Tarikh Mula"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Tarikh Tamat"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Jenis Bayaran"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                        <CustomTextField
                            label="Jumlah Bayaran"
                            id=""
                            disabled
                            val=""
                            errors={[]}
                        />
                    </CustomTabContent>
                </CustomTab>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengarah Khidmat Pengurusan">
                <TextIconButton label="Simpan" icon="check" form="" />
            </StepperContentHeader>
            <StepperContentBody>
                <CustomTextField label="Ulasan/Tindakan" id="" val="Lulus" />
                <CustomRadioBoolean
                    label="Keputusan"
                    options={approveOptions}
                    id=""
                    val={true}
                />
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
