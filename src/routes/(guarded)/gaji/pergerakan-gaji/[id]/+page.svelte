<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import type { PageData } from './$types';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { confirmOptions } from '$lib/constants/core/radio-option-constants';

    export let data: PageData;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Pergerakan Gaji">
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
            <StepperContentHeader title="Keputusan Mesyuarat"
            ></StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Maklumat Pergerakan Gaji"
                    borderClass="border-none"
                />
                <CustomTextField
                    label="Tarikh Pergerakan Gaji (TPG)"
                    disabled
                    id="meetingDate"
                    type="date"
                    bind:val={data.salaryMovementDetail.meetingDate}
                />
                <CustomTextField
                    label="Gaji Bulan Berkenaan"
                    disabled
                    id="salary1"
                    val=""
                />
                <CustomTextField
                    label="Kenaikan Gaji Tahun (KGT)"
                    disabled
                    id="salary1"
                    val=""
                />
                <CustomTextField
                    label="Elaun Wilayah (EW)"
                    disabled
                    id="salary1"
                    val=""
                />
                <CustomTextField
                    label="Elaun Kritikal (5%)"
                    disabled
                    id="salary1"
                    val=""
                />
                <CustomTextField
                    label="KGT Khas"
                    disabled
                    id="salary1"
                    val=""
                />
                <CustomTextField
                    label="Gaji Khas"
                    disabled
                    id="salary1"
                    val=""
                />
                <CustomTextField label="EW Khas" disabled id="salary1" val="" />
                <CustomTextField
                    label="Elaun Kritikal (5%)"
                    disabled
                    id="salary1"
                    val=""
                />
                <ContentHeader
                    title="Pergerakan Gaji Baru"
                    borderClass="border-none"
                />
                <CustomTextField
                    label="Nama dan Bilangan Mesyuarat"
                    disabled
                    id="meetingName"
                    bind:val={data.salaryMovementDetail.meetingName}
                />
                <CustomTextField
                    label="Tarikh Mesyuarat"
                    disabled
                    id="meetingDate"
                    type="date"
                    bind:val={data.salaryMovementDetail.meetingDate}
                />
                <CustomTextField
                    label="Bulan Pergerakan Gaji"
                    disabled
                    id="salaryMovementMonth"
                    bind:val={data.salaryMovementDetail.salaryMovementMonth}
                />
                <div
                    class="flex w-full flex-row items-center justify-start gap-10"
                >
                    <!-- <ContentHeader
                        title="Keputusan Mesyuarat"
                        borderClass="border-none"
                    /> -->
                    <CustomTextField
                        label="Bantuan Khas Kewangan (RM)"
                        disabled
                        type="number"
                        id="specialAid"
                        bind:val={data.salaryMovementDetail.specialAid}
                    />
                    <CustomTextField
                        label="Kenaikan Khas (RM)"
                        disabled
                        type="number"
                        id="specialRaise"
                        bind:val={data.salaryMovementDetail.specialRaise}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Semakan Jadual Pergerakan Gaji"
            ></StepperContentHeader>
            <StepperContentBody>
                <DynamicTable tableItems={data.salaryMovementSchedule} />
                <div class="w-full flex flex-col justify-start gap-2.5 border-t">
                    <ContentHeader
                        title="Pengarah Khidmat Pengurusan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Nama"
                        disabled
                        id="salary1"
                        val=""
                    />
                    <CustomTextField
                        label="Ulasan/Tindakan"
                        disabled
                        id="salary1"
                        val=""
                    />
                    <CustomSelectField
                        label="Keputusan"
                        disabled
                        options={confirmOptions}
                        id="salary1"
                        val={true}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
