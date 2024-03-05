<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { InterimApplicationDetailDTO } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-application-detail-response.dto';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    export let data: PageData;

    // const interimApplicationDetail: InterimApplicationDetailDTO =
    //     data.employeeInterimApplicationDetailResponse
    //         .data?.details as InterimApplicationDetailDTO;

    const interimApplicationDetail: InterimApplicationDetailDTO = {
        view: data.employeeInterimApplicationDetailResponse.data?.details.applicationDetail,
        detail: data.employeeInterimApplicationDetailResponse.data?.details.employeeDetail,
        duration: data.employeeInterimApplicationDetailResponse.data?.details.duration,
    }

    
    console.log(data.employeeInterimApplicationDetailResponse.data?.details)
    let stepperIndex: number = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pemangkuan">
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
    <Stepper bind:activeIndex={stepperIndex}>
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
                        disabled
                        id="gradeId"
                        options={data.selectionOptions.gradeLookup}
                        val={interimApplicationDetail.view?.grade}
                    />
                    <CustomSelectField
                        label="Kementrian/Jabatan"
                        disabled
                        id="position"
                        options={data.selectionOptions.positionLookup}
                        val={interimApplicationDetail.view?.position}
                    />
                    <CustomTextField
                        id="detailNumber"
                        label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                        disabled
                        type="text"
                        val={interimApplicationDetail.view?.referenceNumber}
                    />
                    <CustomTextField
                        id="startDate"
                        label="Tarikh Mula"
                        disabled
                        type="text"
                        val={interimApplicationDetail.view?.startDate}
                    />
                    <CustomTextField
                        id="endDate"
                        label="Tarikh Tamat"
                        disabled
                        type="text"
                        val={interimApplicationDetail.view?.endDate}
                    />
                    <CustomSelectField
                        label="Tempat Kekosongan"
                        disabled
                        id="emptyPlacement"
                        options={data.selectionOptions.placementLookup}
                        val={interimApplicationDetail.view?.placement}
                    />
                    <CustomTextField
                        id="emptyReason"
                        label="Sebab-sebab Kekosongan"
                        disabled
                        type="text"
                        val={interimApplicationDetail.view?.reason}
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
                        val={interimApplicationDetail.detail?.name}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        disabled
                        id="identificationNumber"
                        type="text"
                        val={interimApplicationDetail.detail?.identityCardNumber}
                    />
                    <CustomTextField
                        label="Tarikh Lantikan Jawatan Sekarang"
                        disabled
                        id="currentPositionAppointDate"
                        type="date"
                        val={interimApplicationDetail.detail?.confirmServiceDate}
                    />
                    <CustomTextField
                        label="Tarikh Sah Dalam Jawatan Sekarang"
                        disabled
                        id="currentPositionVerifiedDate"
                        type="date"
                        val={interimApplicationDetail.detail?.effectiveDate}
                    />
                    <CustomTextField
                        label="Jawatan/Gred"
                        disabled
                        id="positionAndGrade"
                        type="text"
                        val={interimApplicationDetail.detail?.positionWithGrade}
                    />
                    <CustomTextField
                        label="Tarikh Mula Bertugas di Jawatan Sekarang"
                        disabled
                        id="startWorkingDate"
                        type="date"
                        val={interimApplicationDetail.detail?.effectiveDate}
                    />
                    <CustomTextField
                        label="Tempat Bertugas Semasa"
                        disabled
                        id="currentWorkplace"
                        type="text"
                        val={interimApplicationDetail.detail?.placement}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Tempoh Penanggungan Kerja">
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
                        disabled
                        type="date"
                        val={interimApplicationDetail.duration?.from}
                    />
                    <CustomTextField
                        label="Hingga"
                        id="endDate"
                        disabled
                        type="date"
                        val={interimApplicationDetail.duration?.to}
                    />
                    <ContentHeader
                        title="Tempoh Penanggungan Kerja Bagi Jawatan yang Sama Sebelum Ini (Jika Ada)"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Dari"
                        disabled
                        id="optionalStartDate"
                        type="date"
                        val={interimApplicationDetail.duration?.previousInterim[0].from}
                    />
                    <CustomTextField
                        label="Hingga"
                        disabled
                        id="optionalEndDate"
                        type="date"
                        val={interimApplicationDetail.duration?.previousInterim[0].to}
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
                <div class="flex w-full flex-col justify-start gap-2.5 pb-10">
                    <div class="w-full flex flex-col text-sm text-ios-labelColors-secondaryLabel-light">
                        <span>Fail-fail yang dimuat naik:</span>
                        <span>Carta Organisasi (Kedudukan Pegawai dan Jawatan yang Ditanggung Kerja)</span>
                        <span>Salinan Surat Arahan Penagguhan Kerja</span>
                        <span>Maklumat Cuti Yang Terkini</span>
                        <span>Senarai Tugas Jawatan Ditanggung Kerja dan Pegawai Menanggung Kerja</span>
                    </div>
                    <DownloadAttachment fileName="Carta Organisasi"/>
                    <DownloadAttachment fileName="Salinan Surat Arahan Penangguhan Kerja"/>
                    <DownloadAttachment fileName="Maklumat Cuti Terkini"/>
                    <DownloadAttachment fileName="Senarai Tugas"/>
                </div>
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
                {#if data.currentRoleCode === UserRoleConstant.kakitangan.code}
                    <TextIconButton
                        type="primary"
                        label="Selesai"
                        icon="check"
                        onClick={() => {}}
                    />
                {:else}
                    <TextIconButton
                        type="primary"
                        label="Seterusnya"
                        icon="next"
                        onClick={() => goNext()}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form class="flex w-full flex-col justify-start gap-2.5 pb-10">
                    <span>Radio here (ada@tidak ada)</span>
                    <CustomTextField
                        label="Sebab-Sebab Pelangkauan (Jika Ada)"
                        disabled
                        id="seniorityReason"
                        type="text"
                        val="-"
                    />
                    <span
                        >checkbox, please refer to figma once checkbox is done</span
                    >
                </form>
            </StepperContentBody>
        </StepperContent>

        {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code}
            <!-- Pengarah Bahagian/Negeri can only view this -->
            <StepperContent>
                <StepperContentHeader
                    title="Sokongan dari Pengarah Bahagian/Negeri"
                >
                    <TextIconButton
                        type="neutral"
                        label="Kembali"
                        icon="previous"
                        onClick={() => goPrevious()}
                    />
                    {#if data.currentRoleCode === UserRoleConstant.pengarahNegeri.code || data.currentRoleCode === UserRoleConstant.pengarahBahagian.code}
                        <TextIconButton
                            label="Selesai"
                            icon="check"
                            type="primary"
                            onClick={() => {}}
                        />
                    {:else}
                        <TextIconButton
                            type="primary"
                            label="Seterusnya"
                            icon="next"
                            onClick={() => goNext()}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form class="flex w-full flex-col justify-start gap-2.5">
                        <ContentHeader
                            title="Ulasan Keputusan Daripada Pengarah Bahagian/Negeri"
                            borderClass="border-none"
                        />
                        <CustomTextField
                            label="Tindakan/Ulasan"
                            disabled={data.currentRoleCode !==
                                UserRoleConstant.pengarahNegeri.code &&
                            data.currentRoleCode !==
                                UserRoleConstant.pengarahBahagian.code
                                ? true
                                : false}
                            id="directorRemark"
                            type="text"
                            val="Dokumen-dokumen telah disemak"
                        />
                        <span>radio here (sokong@tidak sokong)</span>
                    </form>
                </StepperContentBody>
            </StepperContent>
            {#if data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code && data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code}
                <StepperContent>
                    <StepperContentHeader
                        title="Senarai Semak Permohonan Penangguhan/Pindaan Penempatan Kerja"
                    >
                        <TextIconButton
                            type="neutral"
                            label="Kembali"
                            icon="previous"
                            onClick={() => goPrevious()}
                        />
                        {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
                            <TextIconButton
                                type="primary"
                                label="Selesai"
                                icon="check"
                                onClick={() => {}}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Seterusnya"
                                icon="next"
                                onClick={() => goNext()}
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <span>Radio here (ada@tidak ada)</span>
                            <CustomTextField
                                label="Sebab-Sebab Pelangkauan (Jika Ada)"
                                disabled
                                id="seniorityReason"
                                type="text"
                                val="-"
                            />
                            <span
                                >checkbox, please refer to figma once checkbox
                                is done</span
                            >
                        </form>
                    </StepperContentBody>
                </StepperContent>

                {#if data.currentRoleCode === UserRoleConstant.pengarahKhidmatPengurusan.code}
                    <StepperContent>
                        <StepperContentHeader
                            title="Kelulusan Permohonan Tanggung Kerja"
                        >
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
                            <form
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <ContentHeader
                                    title="Ulasan Keputusan daripada Pengarah Khidmat Pengurusan"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Tindakan/Ulasan"
                                    disabled
                                    id="managementServiceDirectorRemark"
                                    type="text"
                                    val="-"
                                />
                                <span>radio here sokong@tidak sokong</span>
                            </form>
                        </StepperContentBody>
                    </StepperContent>
                {/if}
            {/if}
        {/if}
    </Stepper>
</section>
