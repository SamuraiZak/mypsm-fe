<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { goto } from '$app/navigation';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Badge } from 'flowbite-svelte';
    import DynamicAccordionForm from '$lib/components/form/DynamicAccordionForm.svelte';
    import { mockSenaraiTuntutanLists } from '$lib/mocks/database/mockSenaraiTuntutanLists';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import {
        _stepperSupporterApprover,
        _submitFormStepperSupporterApprover,
    } from './+page';

    export let disabled: boolean = true;
    export let data: PageData;

    let selectedDate = new Date();
    let labelBlack = !disabled;
    let senaraiTuntutan: IntSenaraiTuntutanLists[] = mockSenaraiTuntutanLists;

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    const options: RadioOption[] = [
        {
            value: 'sokong',
            label: 'Sokong',
        },
        {
            value: 'tidakSokong',
            label: 'Tidak Sokong',
        },
    ];

    // Supporter Approver
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
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Tuntutan K231"
        description="Hal-hal berkaitan dengan pengurusan tuntutan kakitangan K231"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/penyokong/perubatan/bil-tuntutan-kakitangan');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Kakitangan</p>
                <TextField
                    {disabled}
                    id="noPekerja"
                    label={'No. Pekerja'}
                    value={'A23412'}
                ></TextField>
                <TextField
                    {disabled}
                    id="nama"
                    label={'Nama'}
                    value={'Irfan Bin Abu'}
                ></TextField>
                <TextField
                    {disabled}
                    id="noKadPengenalan"
                    label={'No. K/P'}
                    value={'111111-11-1111'}
                ></TextField>
                <TextField
                    {disabled}
                    id="gred"
                    label={'Gred'}
                    value={'F41 - Pegawai Teknologi Maklumat'}
                ></TextField>
                <TextField
                    {disabled}
                    id="penempatan"
                    label={'Penempatan'}
                    value={'5345 - Bhgn. Teknologi Maklumat'}
                ></TextField>
                <TextField
                    {disabled}
                    id="kumpulan"
                    label={'Kumpulan'}
                    value={'PP1 - Pengurusan dan Professional - A'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tuntutan"></StepperContentHeader>
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Rawatan'}
                    />
                    <TextField
                        {disabled}
                        id="klinik-panel"
                        label={'Klinik Panel'}
                        value={'Klinik Petrajaya'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="bil-hari-cuti-sakit"
                        label={'Bil Hari Cuti Sakit'}
                        value={'2'}
                    ></TextField>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Senarai Tuntutan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    {#each senaraiTuntutan as item, index}
                        <DynamicAccordionForm
                            header="Tuntutan #{index + 1}"
                            open
                            ><div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                            >
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled
                                    label="Bil"
                                    value="1"
                                ></TextField>
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled
                                    label="Jumlah Rawatan (RM)"
                                    value={item.jumlahRawatan}
                                ></TextField>
                            </div>
                        </DynamicAccordionForm>
                    {/each}
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Fail-fail yang telah dimuat naik:
                </p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <li>
                        <DownloadAttachment fileName="Resit-1" />
                    </li>
                    <li>
                        <DownloadAttachment fileName="Resit-2" />
                    </li>
                </ul>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Ulasan Penyemakan daripada Urus Setia
                </p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ikhwan'}
                    ></TextField>
                    <LongTextField
                        disabled
                        label="Tindakan/Ulasan"
                        placeholder="-"
                        value="Sah untuk dipohon"
                    />
                </div>
                <div class="flex w-full flex-row text-sm">
                    <label for="staffing-sec-result" class="w-[220px]"
                        >Keputusan</label
                    ><Badge border color="green">SAH</Badge>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong dan Pelulus"
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
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">
                        Keputusan daripada Penyokong
                    </p>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                    >
                        • Keputusan akan dihantar ke email klinik dan Urus Setia
                        negeri berkaitan
                    </p>
                    <LongTextField
                        hasError={!!$supporterApproverErrors.remark}
                        name="remark"
                        label="Tindakan / Ulasan"
                        bind:value={$supporterApproverForm.remark}
                    />
                    {#if $supporterApproverErrors.remark}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$supporterApproverErrors.remark}</span
                        >
                    {/if}
                    <RadioSingle
                        {options}
                        name="resultOption"
                        bind:userSelected={$supporterApproverForm.resultOption}
                    ></RadioSingle>
                    {#if $supporterApproverErrors.resultOption}
                        <span
                            class="ml-[0px] font-sans text-sm italic text-system-danger"
                            >{$supporterApproverErrors.resultOption}</span
                        >
                    {/if}
                </div>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">Keputusan daripada Pelulus</p>
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ahmad'}
                    ></TextField>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                    >
                        • Menunggu keputusan daripada PENYOKONG
                    </p>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />