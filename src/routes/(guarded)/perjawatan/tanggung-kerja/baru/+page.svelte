<script lang="ts">
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';

    export let data: PageData;

    let stepperIndex: number = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    let dropdownVal: string;
    let dropdownOption: DropdownDTO[] = [
        { value: 'N21', name: 'N21' },
        { value: 'N22', name: 'N22' },
        { value: 'E22', name: 'E22' },
        { value: 'DV41', name: 'DV41' },
    ];
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Tanggung Kerja">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('./')}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan Tanggung Kerja">
                <TextIconButton
                    type="primary"
                    label="Seterusnya"
                    icon="next"
                    onClick={() => goNext()}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col justify-start gap-2.5 pb-10">
                    <CustomSelectField
                        label="Gred"
                        id="grade"
                        bind:val={dropdownVal}
                        options={dropdownOption}
                    />
                    <CustomSelectField
                        label="Jawatan"
                        id="position"
                        bind:val={dropdownVal}
                        options={dropdownOption}
                    />
                    <CustomSelectField
                        label="Gred"
                        id="grade"
                        bind:val={dropdownVal}
                        options={dropdownOption}
                    />
                    <CustomTextField
                        id="detailNumber"
                        label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                        type="text"
                        val="-"
                    />
                    <CustomTextField
                        id="startDate"
                        label="Tarikh Mula"
                        type="text"
                        val="date selector here"
                    />
                    <CustomTextField
                        id="endDate"
                        label="Tarikh Mula"
                        type="text"
                        val="date selectore here"
                    />
                    <CustomTextField
                        label="Tempat Kekosongan"
                        id="emptyPlacement"
                        type="text"
                        val="-"
                    />
                    <CustomTextField
                        id="emptyReason"
                        label="Sebab-sebab Kekosongan"
                        type="text"
                        val="-"
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pegawai Yang Menanggung Kerja">
                <TextIconButton
                    type="neutral"
                    label="Kembali"
                    icon="previous"
                    onClick={() => goPrevious()}
                />
                <TextIconButton
                    type="primary"
                    label="Seterusnya"
                    icon="next"
                    onClick={() => goNext()}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col justify-start gap-2.5">
                    <CustomTextField
                        label="Nama Pengawai"
                        disabled
                        id="employeeName"
                        type="text"
                        val="Usain Bolt"
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        disabled
                        id="identificationNumber"
                        type="text"
                        val="970221-14-5667"
                    />
                    <CustomTextField
                        label="Tarikh Lantikan Jawatan Sekarang"
                        disabled
                        id="currentPositionAppointDate"
                        type="text"
                        val="22/11/2022"
                    />
                    <CustomTextField
                        label="Tarikh Sah Dalam Jawatan Sekarang"
                        disabled
                        id="currentPositionVerifiedDate"
                        type="text"
                        val="19/09/2022"
                    />
                    <CustomTextField
                        label="Jawatan/Gred"
                        disabled
                        id="positionAndGrade"
                        type="text"
                        val="F41 - Pegawai Teknologi Maklumat"
                    />
                    <CustomTextField
                        label="Tarikh Mula Bertugas di Jawatan Sekarang"
                        disabled
                        id="startWorkingDate"
                        type="text"
                        val="13/11/2022"
                    />
                    <CustomTextField
                        label="Tempat Bertugas Semasa"
                        disabled
                        id="currentWorkplace"
                        type="text"
                        val="LKIM Bintulu"
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pegawai Yang Menanggung Kerja">
                <TextIconButton
                    type="neutral"
                    label="Kembali"
                    icon="previous"
                    onClick={() => goPrevious()}
                />
                <TextIconButton
                    type="primary"
                    label="Seterusnya"
                    icon="next"
                    onClick={() => goNext()}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col justify-start gap-2.5 pb-10">
                    <ContentHeader
                        title="Tempoh Penanggungan Kerja Yang Diperakukan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Dari"
                        id="startDate"
                        type="text"
                        val="date selector here"
                    />
                    <CustomTextField
                        label="Hingga"
                        id="endDate"
                        type="text"
                        val="date selector here"
                    />
                    <ContentHeader
                        title="Tempoh Penanggungan Kerja Bagi Jawatan yang Sama Sebelum Ini (Jika Ada)"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Dari"
                        disabled
                        id="optionalStartDate"
                        type="text"
                        val="date selector here"
                    />
                    <CustomTextField
                        label="Hingga"
                        disabled
                        id="optionalEndDate"
                        type="text"
                        val="date selector here"
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Muat Naik Dokumen Berkaitan">
                <TextIconButton
                    type="neutral"
                    label="Kembali"
                    icon="previous"
                    onClick={() => goPrevious()}
                />
                <TextIconButton
                    type="primary"
                    label="Seterusnya"
                    icon="next"
                    onClick={() => goNext()}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col justify-start gap-2.5 pb-10">
                    <ContentHeader
                        title="Upload Files Here"
                        borderClass="border-none"
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pelangkauan Dari Segi Kekananan">
                <TextIconButton
                    type="neutral"
                    label="Kembali"
                    icon="previous"
                    onClick={() => goPrevious()}
                />
                <TextIconButton
                    type="primary"
                    label="Selesai"
                    icon="check"
                    onClick={() => {}}
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col justify-start gap-2.5 pb-10">
                    <span>Radio here (ada@tidak ada)</span>
                    <CustomTextField
                        label="Sebab-Sebab Pelangkauan (Jika Ada)"
                        id="seniorityReason"
                        type="text"
                        val="-"
                    />
                    <span>checkbox, please refer to figma once checkbox is done</span>
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
