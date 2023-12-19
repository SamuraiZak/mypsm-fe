<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { mockPromotionCandidate } from '$lib/mocks/kenaikan-pangkat/mockPromotion';
    import { placements } from '$lib/mocks/placements/mockPlacements';
    import { onMount } from 'svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';

    let selectedValue: any;
    let selectedMonth: any;
    let editPromotionCandidate = false;
    let disabled = false;

    onMount(() => {
        selectedValue = placements[3].value;
        selectedMonth = months[6].value;
    });

    let stepperIndex = 0;

    let radioValue: any = 'peraku';

    const options: RadioOption[] = [
        {
            value: 'peraku',
            label: 'PERAKU',
        },
        {
            value: 'tidak peraku',
            label: 'TIDAK PERAKU',
        },
    ];

    // Step 1 script ends here
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Kenaikan Pangkat Gred 1-54"
        description="Hal-hal berkaitan Kenaikan Pangkat untuk Gred 1-54"
    >
        <FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={stepperIndex}>
    <!-- STEPPER 0 -->
    <StepperContent>
        <StepperContentHeader title="Semak Status Perakuan"
            >{#if editPromotionCandidate == true}
                <FormButton
                    type="back"
                    onClick={() => {
                        editPromotionCandidate = false;
                        disabled = false;
                    }}
                ></FormButton>
                {#if disabled == false}
                    <FormButton
                        type="save"
                        onClick={() => {
                            editPromotionCandidate = false;
                            disabled = false;
                        }}
                    ></FormButton>
                {/if}
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
            >
                {#if editPromotionCandidate == false}
                    <DynamicTable
                        tableItems={mockPromotionCandidate.filter(
                            (record) =>
                                record.districtOrStateDirectorCertification ==
                                'Sedang Diproses',
                        )}
                        withActions
                        actionOptions={['detail', 'edit']}
                        detailActions={() => {
                            editPromotionCandidate = true;
                            disabled = true;
                        }}
                        editActions={() => {
                            editPromotionCandidate = true;
                        }}
                        columnKeys={[
                            'employeeNumber',
                            'name',
                            'identityDocumentNumber',
                            'meetingResult',
                            'integritySecretariatCertification',
                            'districtOrStateDirectorCertification',
                        ]}
                    ></DynamicTable>
                {:else}
                    <p class="h-[35px] text-sm text-system-primary">
                        Ulasan Keputusan daripada Pengarah Bahagian/Negeri
                    </p>
                    <p class="h-[35px] text-sm italic text-system-accent">
                        * Keputusan akan dihantar ke emel Urus Setia berkaitan
                    </p>
                    <TextField
                        label="Nama"
                        value="Mohd Sahwan Bin Murni"
                        disabled
                    ></TextField>
                    <LongTextField
                        label="Tindakan / Ulasan"
                        value="Diperaku."
                        {disabled}
                    ></LongTextField>
                    <RadioSingle
                        {options}
                        legend="Keputusan Mesyuarat"
                        bind:userSelected={radioValue}
                        {disabled}
                    />
                    <p class="h-[35px] text-sm text-system-primary">
                        Ulasan Keputusan daripada Urus Setia Integriti
                    </p>
                    <TextField label="Nama" value="Johari Bin Ahmad" disabled
                    ></TextField>
                    <LongTextField
                        label="Tindakan / Ulasan"
                        value="Setuju untuk perakuan."
                        disabled
                    ></LongTextField>
                    <TextField label="Keputusan" value="DIPERAKU" disabled
                    ></TextField>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
