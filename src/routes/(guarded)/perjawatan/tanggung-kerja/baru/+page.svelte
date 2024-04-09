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
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { _submitAddNewInterimApplicationForm } from './+page';
    import { _addNewInterimApplicationSchema } from '$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas';
    import { zod } from 'sveltekit-superforms/adapters';
    import { Toaster } from 'svelte-french-toast';
    import type { InterimApplicationResponse } from '$lib/dto/mypsm/employment/tanggung-kerja/interim-application-response.dto';
    import Alert from 'flowbite-svelte/Alert.svelte';

    export let data: PageData;
    let afterSuccessApply = {} as InterimApplicationResponse;
    let submitSuccess: boolean = false;

    const {
        form: addNewInterimApplicationForm,
        errors: addNewInterimApplicationError,
        enhance: addNewInterimApplicationEnhance,
    } = superForm(data.addNewInterimApplicationForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        id: 'addNewInterimApplicationForm',
        validators: zod(_addNewInterimApplicationSchema),
        async onSubmit() {
            const res = await _submitAddNewInterimApplicationForm(
                $addNewInterimApplicationForm,
            );

            if (res?.response.status == 'success') {
                submitSuccess = true;
                afterSuccessApply.interimId =
                    res.response.data?.details.interimId;
                goto(
                    '/perjawatan/tanggung-kerja/butiran-' +
                        afterSuccessApply.interimId,
                );
            }
        },
    });
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
                {#if !submitSuccess}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        icon="check"
                        form="addNewInterimApplicationForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 pb-12"
                    id="addNewInterimApplicationForm"
                    method="POST"
                    use:addNewInterimApplicationEnhance
                >
                    <CustomSelectField
                        label="Gred"
                        id="gradeId"
                        bind:val={$addNewInterimApplicationForm.gradeId}
                        errors={$addNewInterimApplicationError.gradeId}
                        options={data.lookup.gradeLookup}
                    />
                    <CustomSelectField
                        label="Jawatan"
                        id="positionId"
                        bind:val={$addNewInterimApplicationForm.positionId}
                        errors={$addNewInterimApplicationError.positionId}
                        options={data.lookup.positionLookup}
                    />
                    <CustomSelectField
                        label="Kementerian/Jabatan"
                        id="placementId"
                        bind:val={$addNewInterimApplicationForm.placementId}
                        errors={$addNewInterimApplicationError.placementId}
                        options={data.lookup.departmentLookup}
                    />
                    <CustomTextField
                        id="referenceNumber"
                        label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                        type="text"
                        bind:val={$addNewInterimApplicationForm.referenceNumber}
                        errors={$addNewInterimApplicationError.referenceNumber}
                    />
                    <CustomTextField
                        id="startDate"
                        label="Tarikh Mula"
                        type="date"
                        bind:val={$addNewInterimApplicationForm.startDate}
                        errors={$addNewInterimApplicationError.startDate}
                    />
                    <CustomTextField
                        id="endDate"
                        label="Tarikh Tamat"
                        type="date"
                        bind:val={$addNewInterimApplicationForm.endDate}
                        errors={$addNewInterimApplicationError.endDate}
                    />
                    <CustomSelectField
                        label="Tempat Kekosongan"
                        id="newPlacementId"
                        options={data.lookup.placementLookup}
                        bind:val={$addNewInterimApplicationForm.newPlacementId}
                        errors={$addNewInterimApplicationError.newPlacementId}
                    />
                    <CustomTextField
                        id="reason"
                        label="Sebab-sebab Kekosongan"
                        type="text"
                        bind:val={$addNewInterimApplicationForm.reason}
                        errors={$addNewInterimApplicationError.reason}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Pegawai Yang Menanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <Alert color="blue" class="w-full">
                    <p>
                        <span class="font-medium">Tiada Maklumat!</span>
                        Sila lengkapkan butiran permohonan tanggung kerja terlebih
                        dahulu.
                    </p>
                </Alert>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Pegawai Yang Menanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <Alert color="blue" class="w-full">
                    <p>
                        <span class="font-medium">Tiada Maklumat!</span>
                        Sila lengkapkan butiran permohonan tanggung kerja terlebih
                        dahulu.
                    </p>
                </Alert>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Muat Naik Dokumen Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody>
                <Alert color="blue" class="w-full">
                    <p>
                        <span class="font-medium">Tiada Maklumat!</span>
                        Sila lengkapkan butiran permohonan tanggung kerja terlebih
                        dahulu.
                    </p>
                </Alert>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Pelangkauan Dari Segi Kekananan"
            ></StepperContentHeader>
            <StepperContentBody>
                <Alert color="blue" class="w-full">
                    <p>
                        <span class="font-medium">Tiada Maklumat!</span>
                        Sila lengkapkan butiran permohonan tanggung kerja terlebih
                        dahulu.
                    </p>
                </Alert>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
