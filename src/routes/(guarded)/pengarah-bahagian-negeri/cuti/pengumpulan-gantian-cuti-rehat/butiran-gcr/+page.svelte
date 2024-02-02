<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { _stepperRetirementApplicationSupporter, _submitFormStepperRetirementApplicationSupporter } from './+page';


    export let data: PageData;
    const options: RadioOption[] = [
        {
            value: 'lulus',
            label: 'Lulus',
        },
        {
            value: 'tidakLulus',
            label: 'Tidak Lulus',
        },
    ];

    export let disabled: boolean = true;

    const {
        form: retirementApplicationSupporterForm,
        errors: retirementApplicationSupporterErrors,
        enhance: retirementApplicationSupporterEnhance,
    } = superForm(data.stepperRetirementApplicationSupporterForm, {
        SPA: true,
        validators: _stepperRetirementApplicationSupporter,
        onSubmit() {
            _submitFormStepperRetirementApplicationSupporter(
                $retirementApplicationSupporterForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengumpulan Gantian Cuti Rehat (GCR)"
        description="Butiran Permohonan Pengumpulan Gantian Cuti Rehat (GCR)"
    >
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto(
                    '/pengarah-bahagian-negeri/cuti/pengumpulan-gantian-cuti-rehat',
                );
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start gap-2"
                    >
                        <TextField
                            label="Nama"
                            disabled={true}
                            placeholder="-"
                            value="Abu Bin Ali"
                        />
                        <TextField
                            label="No. K/P"
                            disabled={true}
                            placeholder="-"
                            value="870121-21-4531"
                        />
                        <TextField
                            label="No. Pekerja"
                            disabled={true}
                            placeholder="-"
                            value="123456"
                        />
                        <TextField
                            label="Gred"
                            disabled={true}
                            placeholder="-"
                            value="F41 - Pegawai Teknologi Maklumat"
                        />
                        <TextField
                            label="Penempatan"
                            disabled={true}
                            placeholder="-"
                            value="123 - Bhgn. Teknologi Maklumat"
                        />
                        <TextField
                            label="Kumpulan"
                            disabled={true}
                            placeholder="-"
                            value="PP1 - Pengurusan dan Professional - A"
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Butiran Pengumpulan GCR"
                ><TextIconButton
                    primary
                    label="Hantar"
                    onClick={() => {
                        goto('/kakitangan/cuti/gantian-cuti-rehat');
                    }}><SvgPaperAirplane /></TextIconButton
                ></StepperContentHeader
            >
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">
                        Butiran Pengumpulan Gantian Cuti (GCR)
                    </p>
                    <TextField
                        {disabled}
                        id="tahunTerkini"
                        label={'Tahun Terkini'}
                        value={'2023'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="jumlahKelayakan"
                        label={'Jumlah Kelayakan'}
                        value={'33'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="bakiCutiSemasa"
                        label={'Baki Cuti Semasa'}
                        value={'14'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="jumlahGcrTerkumpul"
                        label={'Jumlah GCR Terkumpul'}
                        value={'67'}
                    ></TextField>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                {disabled}
                                id="jumlahpengumpulanGcr2023"
                                label={'Jumlah Pengumpulan GCR 2023'}
                                value={'3'}
                            ></TextField>
                        </div>
                        <div class="space-y-2.5">
                            <TextField
                                {disabled}
                                id="jumlahCutiBawaKehadapan"
                                label={'Jumlah Cuti Bawa Kehadapan'}
                                value={'11'}
                            ></TextField>
                        </div>
                    </div>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Keputusan Pengarah Bahagian atau Negeri"
                ><TextIconButton
                    primary
                    label="Hantar"
                    form="FormStepperRetirementApplicationSupporter"
                >
                    <SvgPaperAirplane></SvgPaperAirplane>
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader
                    title="Keputusan daripada Pengarah Bahagian atau Negeri"
                ></SectionHeader>
                <p
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                >
                    ● Keputusan akan dihantar ke email klinik dan Urus Setia
                    berkaitan.
                </p>
                <form
                id="FormStepperRetirementApplicationSupporter"
                class="flex w-full flex-col gap-2"
                use:retirementApplicationSupporterEnhance
                method="POST"
            >
                <LongTextField
                    hasError={$retirementApplicationSupporterErrors.actionRemark
                        ? true
                        : false}
                    name="actionRemark"
                    label="Tindakan / Ulasan"
                    bind:value={$retirementApplicationSupporterForm.actionRemark}
                />
                {#if $retirementApplicationSupporterErrors.actionRemark}
                    <span
                        class="text-system-danger ml-[220px] font-sans text-sm italic"
                        >{$retirementApplicationSupporterErrors
                            .actionRemark[0]}</span
                    >
                {/if}
                <RadioSingle
                    {options}
                    name="resultOption"
                    legend="Keputusan"
                    bind:userSelected={$retirementApplicationSupporterForm.resultOption}
                ></RadioSingle>
                {#if $retirementApplicationSupporterErrors.resultOption}
                    <span
                        class="text-system-danger ml-[220px] font-sans text-sm italic"
                        >{$retirementApplicationSupporterErrors
                            .resultOption[0]}</span
                    >
                {/if}
            </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster />
