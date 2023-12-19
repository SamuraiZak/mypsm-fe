<!-- Add your changes to the commented parts -->

<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';

    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Example Form Page"
        description="Layout for Form Page with Steppers"
        ><FormButton
            type="close"
            onClick={() => {
                console.log('Closed!');
            }}
        /></ContentHeader
    >
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper dataId={id} dataStatus={status}>
        <StepperContent>
            <StepperContentHeader title="First Stepper"></StepperContentHeader>
            <StepperContentBody
                ><div class="w-full flex flex-col gap-2">
                    <h1>First Stepper:</h1>
                    <TextField disabled={false}></TextField>
                    <LongTextField disabled={false}></LongTextField>
                    <FileInputField id="hello" />
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Stepper #2"></StepperContentHeader>
            <StepperContentBody
                ><div class="w-full flex flex-col gap-2">
                    <h1>Second Stepper:</h1>
                    <TextField disabled={false}></TextField>
                    <TextField disabled={false}></TextField>
                    <TextField disabled={false}></TextField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Stepper Hat-trick"></StepperContentHeader>
            <StepperContentBody
                ><div class="w-full flex flex-col gap-2">
                    <h1>Third Stepper:</h1>
                    <LongTextField disabled={false}></LongTextField>
                    <TextField disabled={false}></TextField>
                    <TextField disabled={false}></TextField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Stepper V4"></StepperContentHeader>
            <StepperContentBody
                ><div class="w-full flex flex-col gap-2">
                    <h1>Fourth Stepper:</h1>
                    <TextField disabled={false}></TextField>
                    <TextField disabled={false}></TextField>
                    <FileInputField id="hello" />
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Stepper the Fifth"></StepperContentHeader>
            <StepperContentBody
                ><div class="w-full flex flex-col gap-2">
                    <h1>Fifth Stepper:</h1>
                    <LongTextField disabled={false}></LongTextField>
                    <FileInputField id="hello" />
                    <TextField disabled={false}></TextField>
                </div></StepperContentBody
            >
        </StepperContent>
    </Stepper>
</section>
