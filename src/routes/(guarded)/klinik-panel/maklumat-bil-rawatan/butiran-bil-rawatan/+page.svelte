<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { afterNavigate, goto } from '$app/navigation';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { Badge } from 'flowbite-svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TreatmentList from '$lib/components/klinik-panel/TreatmentList.svelte';
    import { selectedPatientTreatmentId } from '$lib/stores/globalState';
    import { maklumatBilRawatan } from '$lib/mocks/klinik-panel/maklumat-bil-rawatan';

    export let disabled: boolean = true;
    $selectedPatientTreatmentId;
    let selectedPatientDetail: IStaffPatient | undefined;
    let staffDetail: any;
    let selectedDate = new Date();

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    export const mockPatients: IPatient = {
        1: {
            patient: 'Alyaa Binti Samad',
            noKP: '121111-11-1111',
            treatment: {
                1: {
                    treatment: 'Demam',
                    amount: '1000',
                },
                2: {
                    treatment: 'Selesema',
                    amount: '1000',
                },
            },
        },
        2: {
            patient: 'Danial',
            noKP: '131111-11-1112',
            treatment: {
                1: {
                    treatment: 'Fever',
                    amount: '1000',
                },
                2: {
                    treatment: 'Flu',
                    amount: '1000',
                },
            },
        },
    };

    export const mockStaffPatient: IStaffPatient[] = [
        {
            name: 'Ali',
            noKp: '111111-11-1111',
            patients: mockPatients,
        },
    ];

    $: {
        staffDetail = maklumatBilRawatan.find(
            (mock) => mock.noKP === $selectedPatientTreatmentId,
        );
        selectedPatientDetail = mockStaffPatient.find(
            (mock) => mock.noKp === String(selectedPatientTreatmentId),
        );
        console.log($selectedPatientTreatmentId);
        if (!staffDetail) console.log('TIDAK WUJUD!');
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Ali"
        description="Maklumat-maklumat rawatan dan tuntutan untuk Ali"
        ><TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/klinik-panel/maklumat-bil-rawatan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton></ContentHeader
    >
</section>

<section
    class="flex w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <div class="flex items-center justify-center gap-x-2.5">
        <p class="mt-2 h-full w-full bg-bgr-primary text-sm text-system-accent">
            • Status:
        </p>
        <Badge class="text-sm" rounded color="dark">Baru</Badge>
    </div>
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
                    <TextField {disabled} id="nama" label={'Nama'} value={'Ali'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="noPekerja"
                        label={'No Pekerja'}
                        value={'K12313'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="noKP"
                        label={'No. K/P'}
                        value={'781y2712'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="penempatan"
                        label={'Penempatan'}
                        value={'012 - Bhgn. Teknologi Maklumat'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="kumpulan"
                        label={'Kumpulan'}
                        value={'PP1 - Pengurusan dan Professional - A'}
                    ></TextField>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Maklumat Pesakit"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex max-h-full w-full flex-col gap-2.5">
                    <TextField {disabled} id="nama" label={'Nama'} value={'Ali'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="noKP"
                        label={'No. K/P'}
                        value={'111111-11-1111'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="pejabatLkim"
                        label={'Pejabat LKIM'}
                        value={'Bahagian Pemasaran dan Perlesenan'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="tarikh"
                        label={'Tarikh'}
                        value={'01/01/2023'}
                    ></TextField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Dokumen Rawatan/Ubat"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2">
                    <div class="flex w-full flex-col gap-2">
                        {#each Object.entries(mockPatients) as [key, result], index}
                            <div
                                class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                            >
                                <SectionHeader
                                    color="system-primary"
                                    title="Pesakit #{key}: {result.patient}"
                                ></SectionHeader>
                                <hr />
                                <TreatmentList
                                    {key}
                                    bind:treatmentData={result.treatment}
                                />
                            </div>
                        {/each}
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
