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
    import { z, ZodError } from 'zod';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import {
        _stepperPermohonanPersaraan,
        _submitFormStepperPermohonanPersaraan,
    } from './+page';

    export let data: PageData;

    export let disabled = true;

    let applicationConfirmationReview: string;
    let applicationConfirmationResult: any;
    let applicationApprovalReview: string;
    let applicationApprovalResult: any;
    let validateDocumentReview: string;
    let validateDocumentResult: any;
    let updateApplicationReview: string;
    let updateApplicationResult: any;
    let supporter1Option: any;
    let supporter2Option: any;
    let approverOption: any;

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

    const supportOptions: RadioOption[] = [
        {
            value: 'lulus',
            label: 'Lulus',
        },
        {
            value: 'tidakLulus',
            label: 'Tidak Lulus',
        },
    ];
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
                label="Hantar"
                form="applicationConfirmationFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <form
                        id="applicationConfirmationFormValidation"
                        on:submit|preventDefault={applicationConfirmationForm}
                        class="flex w-full flex-col gap-2"
                    >
                        <LongTextField
                            hasError={errorData?.applicationConfirmationReview}
                            name="applicationConfirmationReview"
                            label="Ulasan/Tindakan"
                            bind:value={applicationConfirmationReview}
                        />
                        {#if errorData?.applicationConfirmationReview}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData
                                    ?.applicationConfirmationReview[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="applicationConfirmationResult"
                            legend={''}
                            bind:userSelected={applicationConfirmationResult}
                        ></RadioSingle>
                        {#if errorData?.applicationConfirmationResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData
                                    ?.applicationConfirmationResult[0]}</span
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
                label="Hantar"
                form="supporterApproverFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="supporterApproverFormValidation"
                on:submit|preventDefault={supporterApproverForm}
                class="flex w-full flex-col gap-2"
            >
                <div class="flex w-full flex-col gap-2">
                    <div>
                        <DropdownSelect
                            hasError={errorData?.supporter1Option}
                            dropdownType="label-left-full"
                            id="supporter1Option"
                            label="Nama Penyokong #1"
                            bind:value={supporter1Option}
                            options={[
                                { value: '1', name: 'Ali Bin Abu' },
                                { value: '2', name: 'Abu Bin Ahmad' },
                                { value: '3', name: 'Ahmad Bin Ali' },
                            ]}
                        ></DropdownSelect>
                        {#if errorData?.supporter1Option}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.supporter1Option[0]}</span
                            >
                        {/if}
                    </div>
                    <div>
                        <DropdownSelect
                            hasError={errorData?.supporter2Option}
                            dropdownType="label-left-full"
                            id="supporter2Option"
                            label="Nama Penyokong #2"
                            bind:value={supporter2Option}
                            options={[
                                { value: '1', name: 'Ali Bin Abu' },
                                { value: '2', name: 'Abu Bin Ahmad' },
                                { value: '3', name: 'Ahmad Bin Ali' },
                            ]}
                        ></DropdownSelect>
                        {#if errorData?.supporter2Option}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.supporter2Option[0]}</span
                            >
                        {/if}
                    </div>
                    <div>
                        <DropdownSelect
                            hasError={errorData?.approverOption}
                            dropdownType="label-left-full"
                            id="approverOption"
                            label="Nama Pelulus"
                            bind:value={approverOption}
                            options={[
                                { value: '1', name: 'Ali Bin Abu' },
                                { value: '2', name: 'Abu Bin Ahmad' },
                                { value: '3', name: 'Ahmad Bin Ali' },
                            ]}
                        ></DropdownSelect>
                        {#if errorData?.approverOption}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.approverOption[0]}</span
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
                label="Hantar"
                form="applicationApprovalFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="applicationApprovalFormValidation"
                on:submit|preventDefault={applicationApprovalForm}
                class="flex w-full flex-col gap-2"
            >
                <div class="flex w-full flex-col gap-2">
                    <div>
                        <LongTextField
                            hasError={errorData?.applicationApprovalReview}
                            name="applicationApprovalReview"
                            label="Ulasan/Tindakan"
                            bind:value={applicationApprovalReview}
                        />
                        {#if errorData?.applicationApprovalReview}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.applicationApprovalReview[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            options={supportOptions}
                            name="applicationApprovalResult"
                            legend={''}
                            bind:userSelected={applicationApprovalResult}
                        ></RadioSingle>
                        {#if errorData?.applicationApprovalResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.applicationApprovalResult[0]}</span
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
                label="Hantar"
                form="validateDocumentFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="validateDocumentFormValidation"
                on:submit|preventDefault={validateDocumentForm}
                class="flex w-full flex-col gap-2"
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
                            hasError={errorData?.validateDocumentReview}
                            name="validateDocumentReview"
                            label="Ulasan/Tindakan"
                            bind:value={validateDocumentReview}
                        />
                        {#if errorData?.validateDocumentReview}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.validateDocumentReview[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="validateDocumentResult"
                            legend={''}
                            bind:userSelected={validateDocumentResult}
                        ></RadioSingle>
                        {#if errorData?.validateDocumentResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.validateDocumentResult[0]}</span
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
                label="Hantar"
                form="updateApplicationFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="updateApplicationFormValidation"
                on:submit|preventDefault={updateApplicationForm}
                class="flex w-full flex-col gap-2"
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
                            hasError={errorData?.updateApplicationReview}
                            name="updateApplicationReview"
                            label="Ulasan/Tindakan"
                            bind:value={updateApplicationReview}
                        />
                        {#if errorData?.updateApplicationReview}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.updateApplicationReview[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="updateApplicationResult"
                            legend={''}
                            bind:userSelected={updateApplicationResult}
                        ></RadioSingle>
                        {#if errorData?.updateApplicationResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.updateApplicationResult[0]}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
