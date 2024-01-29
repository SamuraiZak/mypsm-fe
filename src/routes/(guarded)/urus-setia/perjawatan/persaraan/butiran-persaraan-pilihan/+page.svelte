<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { Badge } from 'flowbite-svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _stepperVerificationRetirementApplication,
        _submitFormStepperVerificationRetirementApplication,
    } from './+page';
    import {
        _stepperSupporterApprover,
        _submitFormStepperSupporterApprover,
    } from './+page';
    import {
        _stepperRetirementApplicationApproval,
        _submitFormStepperRetirementApplicationApproval,
    } from './+page';
    import {
        _stepperVerificationRetirementDocuments,
        _submitFormStepperVerificationRetirementDocuments,
    } from './+page';
    import {
        _stepperUpdateApplicationDeliveryInformation,
        _submitFormStepperUpdateApplicationDeliveryInformation,
    } from './+page';

    export let data: PageData;

    export let disabled = true;

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

    const approveOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'Lulus',
        },
        {
            value: 'false',
            label: 'Tidak Lulus',
        },
    ];

    //Verification Retirement Application
    const {
        form: verificationRetirementApplicationForm,
        errors: verificationRetirementApplicationErrors,
        enhance: verificationRetirementApplicationEnhance,
    } = superForm(data.stepperVerificationRetirementApplication, {
        SPA: true,
        validators: _stepperVerificationRetirementApplication,
        onSubmit() {
            _submitFormStepperVerificationRetirementApplication(
                $verificationRetirementApplicationForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    //Supporter Approver
    const {
        form: supporterApproverForm,
        errors: supporterApproverErrors,
        enhance: supporterApproverEnhance,
    } = superForm(data.stepperSupporterApprover, {
        SPA: true,
        validators: _stepperSupporterApprover,
        onSubmit() {
            _submitFormStepperSupporterApprover($supporterApproverForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    //Retirement Application Approval
    const {
        form: retirementApplicationApprovalForm,
        errors: retirementApplicationApprovalErrors,
        enhance: retirementApplicationApprovalEnhance,
    } = superForm(data.stepperRetirementApplicationApproval, {
        SPA: true,
        validators: _stepperRetirementApplicationApproval,
        onSubmit() {
            _submitFormStepperRetirementApplicationApproval(
                $retirementApplicationApprovalForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    //Verification Retirement Documents
    const {
        form: verificationRetirementDocumentsForm,
        errors: verificationRetirementDocumentsErrors,
        enhance: verificationRetirementDocumentsEnhance,
    } = superForm(data.stepperVerificationRetirementDocuments, {
        SPA: true,
        validators: _stepperVerificationRetirementDocuments,
        onSubmit() {
            _submitFormStepperVerificationRetirementDocuments(
                $verificationRetirementDocumentsForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });

    //Update Application Delivery Information
    const {
        form: updateApplicationDeliveryInformationForm,
        errors: updateApplicationDeliveryInformationErrors,
        enhance: updateApplicationDeliveryInformationEnhance,
    } = superForm(data.stepperUpdateApplicationDeliveryInformation, {
        SPA: true,
        validators: _stepperUpdateApplicationDeliveryInformation,
        onSubmit() {
            _submitFormStepperUpdateApplicationDeliveryInformation(
                $updateApplicationDeliveryInformationForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Persaraan Pilihan 0282378L"
        description="Maklumat-maklumat permohonan persaraan pilihan pekerja 0282378L"
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
                <p class="text-sm font-bold">Unit Integriti</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="name"
                        label={'Nama'}
                        value={'Hafiz Bin Ahmad'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Review'}
                        value={'Dokumen-dokumen telah disemak'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Result</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan Persaraan"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperVerificationRetirementApplication"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <form
                        id="FormStepperVerificationRetirementApplication"
                        class="flex w-full flex-col gap-2"
                        use:verificationRetirementApplicationEnhance
                        method="POST"
                    >
                        <LongTextField
                            hasError={$verificationRetirementApplicationErrors.actionRemark
                                ? true
                                : false}
                            name="actionRemark"
                            label="Tindakan / Ulasan"
                            bind:value={$verificationRetirementApplicationForm.actionRemark}
                        />
                        {#if $verificationRetirementApplicationErrors.actionRemark}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$verificationRetirementApplicationErrors
                                    .actionRemark[0]}</span
                            >
                        {/if}
                        <RadioSingle
                            {options}
                            name="resultOption"
                            bind:userSelected={$verificationRetirementApplicationForm.resultOption}
                        ></RadioSingle>
                        {#if $verificationRetirementApplicationErrors.resultOption}
                            <span
                                class="ml-[0px] font-sans text-sm italic text-system-danger"
                                >{$verificationRetirementApplicationErrors
                                    .resultOption[0]}</span
                            >
                        {/if}
                    </form>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong & Pelulus"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperSupporterApprover"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperSupporterApprover"
                class="flex w-full flex-col gap-2"
                use:supporterApproverEnhance
                method="POST"
            >
                <div class="flex w-full flex-col gap-2">
                    <div>
                        <DropdownSelect
                            hasError={!!$supporterApproverErrors.supporter1Option
                                }
                            dropdownType="label-left-full"
                            id="supporter1Option"
                            label="Nama Penyokong #1"
                            bind:value={$supporterApproverForm.supporter1Option}
                            options={[
                                { value: '1', name: 'Ali Bin Abu' },
                                { value: '2', name: 'Abu Bin Ahmad' },
                                { value: '3', name: 'Ahmad Bin Ali' },
                            ]}
                        ></DropdownSelect>
                        {#if $supporterApproverErrors.supporter1Option}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$supporterApproverErrors
                                    .supporter1Option}</span
                            >
                        {/if}
                    </div>
                    <div>
                        <DropdownSelect
                            hasError={$supporterApproverErrors.supporter2Option
                                ? true
                                : false}
                            dropdownType="label-left-full"
                            id="supporter2Option"
                            label="Nama Penyokong #1"
                            bind:value={$supporterApproverForm.supporter2Option}
                            options={[
                                { value: '1', name: 'Ali Bin Abu' },
                                { value: '2', name: 'Abu Bin Ahmad' },
                                { value: '3', name: 'Ahmad Bin Ali' },
                            ]}
                        ></DropdownSelect>
                        {#if $supporterApproverErrors.supporter2Option}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$supporterApproverErrors
                                    .supporter2Option}</span
                            >
                        {/if}
                    </div>
                    <div>
                        <DropdownSelect
                            hasError={$supporterApproverErrors.approverOption
                                ? true
                                : false}
                            dropdownType="label-left-full"
                            id="approverOption"
                            label="Nama Pelulus"
                            bind:value={$supporterApproverForm.approverOption}
                            options={[
                                { value: '1', name: 'Ali Bin Abu' },
                                { value: '2', name: 'Abu Bin Ahmad' },
                                { value: '3', name: 'Ahmad Bin Ali' },
                            ]}
                        ></DropdownSelect>
                        {#if $supporterApproverErrors.approverOption}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$supporterApproverErrors
                                    .approverOption}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Status Sokongan dan Kelulusan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Penyokong #1</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ismail Bin Ramdan'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Ulasan'}
                        value={'Layak disokong'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SOKONG</Badge>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Penyokong #2</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Nurhamzah Binti Jamaludin'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Ulasan'}
                        value={'Layak disokong'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SOKONG</Badge>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Pelulus</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ramdan Bin Ismail'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Ulasan'}
                        value={'Setuju diluluskan'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">LULUS</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kelulusan Permohonan Persaraan"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperRetirementApplicationApproval"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperRetirementApplicationApproval"
                class="flex w-full flex-col gap-2"
                use:retirementApplicationApprovalEnhance
                method="POST"
            >
                <div class="flex w-full flex-col gap-2">
                    <div>
                        <LongTextField
                            hasError={$retirementApplicationApprovalErrors.actionRemarkRAA
                                ? true
                                : false}
                            name="actionRemarkRAA"
                            label="Tindakan / Ulasan"
                            bind:value={$retirementApplicationApprovalForm.actionRemarkRAA}
                        />
                        {#if $retirementApplicationApprovalErrors.actionRemarkRAA}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$retirementApplicationApprovalErrors
                                    .actionRemarkRAA}</span
                            >
                        {/if}
                        <RadioSingle
                        options={approveOptions}
                            name="resultOptionRAA"
                            bind:userSelected={$retirementApplicationApprovalForm.resultOptionRAA}
                        ></RadioSingle>
                        {#if $retirementApplicationApprovalErrors.resultOptionRAA}
                            <span
                                class="ml-[0px] font-sans text-sm italic text-system-danger"
                                >{$retirementApplicationApprovalErrors
                                    .resultOptionRAA}</span
                            >
                        {/if}

                        <p class="text-sm">
                            Nota: Notifikasi akan dihantar ke kakitangan untuk
                            mengisi borang persaraan
                        </p>
                    </div>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Dokumen Persaraan"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperVerificationRetirementDocuments"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperVerificationRetirementDocuments"
                class="flex w-full flex-col gap-2"
                use:verificationRetirementDocumentsEnhance
                method="POST"
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">
                        Dokumen Persaraan Kakitangan
                    </p>
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
                            hasError={$verificationRetirementDocumentsErrors.actionRemarkVRD
                                ? true
                                : false}
                            name="actionRemarkVRD"
                            label="Tindakan / Ulasan"
                            bind:value={$verificationRetirementDocumentsForm.actionRemarkVRD}
                        />
                        {#if $verificationRetirementDocumentsErrors.actionRemarkVRD}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$verificationRetirementDocumentsErrors
                                    .actionRemarkVRD}</span
                            >
                        {/if}
                        <RadioSingle
                            {options}
                            name="resultOptionVRD"
                            bind:userSelected={$verificationRetirementDocumentsForm.resultOptionVRD}
                        ></RadioSingle>
                        {#if $verificationRetirementDocumentsErrors.resultOptionVRD}
                            <span
                                class="ml-[0px] font-sans text-sm italic text-system-danger"
                                >{$verificationRetirementDocumentsErrors
                                    .resultOptionVRD}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Penghantaran Permohonan"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperUpdateApplicationDeliveryInformation"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="FormStepperUpdateApplicationDeliveryInformation"
                class="flex w-full flex-col gap-2"
                use:updateApplicationDeliveryInformationEnhance
                method="POST"
            >
                <div
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
                            hasError={$updateApplicationDeliveryInformationErrors.actionRemarkUADI
                                ? true
                                : false}
                            name="actionRemarkUADI"
                            label="Tindakan / Ulasan"
                            bind:value={$updateApplicationDeliveryInformationForm.actionRemarkUADI}
                        />
                        {#if $updateApplicationDeliveryInformationErrors.actionRemarkUADI}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$updateApplicationDeliveryInformationErrors
                                    .actionRemarkUADI}</span
                            >
                        {/if}
                        <RadioSingle
                            {options}
                            name="resultOptionUADI"
                            bind:userSelected={$updateApplicationDeliveryInformationForm.resultOptionUADI}
                        ></RadioSingle>
                        {#if $updateApplicationDeliveryInformationErrors.resultOptionUADI}
                            <span
                                class="ml-[0px] font-sans text-sm italic text-system-danger"
                                >{$updateApplicationDeliveryInformationErrors
                                    .resultOptionUADI}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
