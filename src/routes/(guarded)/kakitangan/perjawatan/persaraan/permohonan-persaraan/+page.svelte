<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';

    export let disabled: boolean = false;

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
</script>

<ContentHeader
    title="Persaraan"
    description="Maklumat berkaitan dengan perjawatan - persaraan"
    ><FormButton
        type="close"
        onClick={() => {
            goto('/kakitangan/perjawatan/persaraan');
        }}
    /></ContentHeader
>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Permohonan Persaraan"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('../');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Permohonan Persaraan</p>
                <DateSelector
                    {handleDateChange}
                    label={'Tarikh Bersara Awal'}
                />
                <DateSelector
                    {handleDateChange}
                    label={'Tarikh Permohonan Persaraan Awal'}
                />
                <LongTextField
                    {disabled}
                    id="tajukPermohonan"
                    label={'Tujuan Permohonan'}
                    value={'Sila taip jawapan anda dalam ruangan ini'}
                ></LongTextField>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
