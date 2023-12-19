<!-- Add your changes to the commented parts -->

<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import Form from '$lib/components/form/Form.svelte';
    import FormHeading from '$lib/components/form/FormHeading.svelte';
    import FormContents from '$lib/components/form/FormContents.svelte';

    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';

    let id: number = 193699;
    let status: string = 'Sedang Diproses';
    let activeStepper: number = 0;

    // Stepper Names
    let steppers: string[] = [
        'First Stepper',
        'Stepper #2',
        'Stepper Hat-trick',
        'Stepper V4',
        'Stepper the Fifth',
    ];
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
    <Form {id} {status} {steppers} bind:activeStepper>
        <FormHeading title={steppers[activeStepper]}>
            <!-- Form Buttons for each stepper -->
            {#if activeStepper === 0}
                <FormButton
                    type="reset"
                    onClick={() => {
                        console.log('Resetted!');
                    }}
                />
                <FormButton
                    type="next"
                    onClick={() => {
                        if (activeStepper !== steppers.length - 1)
                            activeStepper++;
                    }}
                />
            {:else if activeStepper === steppers.length - 1}
                <FormButton
                    type="back"
                    onClick={() => {
                        if (activeStepper !== 0) activeStepper--;
                    }}
                />
                <FormButton
                    type="reset"
                    onClick={() => {
                        console.log('Resetted!');
                    }}
                />
                <FormButton
                    type="send"
                    onClick={() => {
                        console.log('Sent!');
                    }}
                />
            {:else}
                <FormButton
                    type="back"
                    onClick={() => {
                        if (activeStepper !== 0) activeStepper--;
                    }}
                />
                <FormButton
                    type="reset"
                    onClick={() => {
                        console.log('Resetted!');
                    }}
                />
                <FormButton
                    type="next"
                    onClick={() => {
                        if (activeStepper !== steppers.length - 1)
                            activeStepper++;
                    }}
                />
            {/if}
        </FormHeading>
        <FormContents>
            <!-- Form Inputs for each stepper -->
            {#if activeStepper === 0}
                <div class="m-5 flex flex-col gap-2">
                    <h1>First Stepper:</h1>
                    <TextField disabled={false}></TextField>
                    <LongTextField disabled={false}></LongTextField>
                    <FileInputField id="hello" />
                </div>
            {/if}
            {#if activeStepper === 1}
                <div class="m-5 flex flex-col gap-2">
                    <h1>Second Stepper:</h1>
                    <TextField disabled={false}></TextField>
                    <TextField disabled={false}></TextField>
                    <TextField disabled={false}></TextField>
                </div>
            {/if}
            {#if activeStepper === 2}
                <div class="m-5 flex flex-col gap-2">
                    <h1>Third Stepper:</h1>
                    <LongTextField disabled={false}></LongTextField>
                    <TextField disabled={false}></TextField>
                    <TextField disabled={false}></TextField>
                </div>
            {/if}
            {#if activeStepper === 3}
                <div class="m-5 flex flex-col gap-2">
                    <h1>Fourth Stepper:</h1>
                    <TextField disabled={false}></TextField>
                    <TextField disabled={false}></TextField>
                    <FileInputField id="hello" />
                </div>
            {/if}
            {#if activeStepper === 4}
                <div class="m-5 flex flex-col gap-2">
                    <h1>Fifth Stepper:</h1>
                    <LongTextField disabled={false}></LongTextField>
                    <FileInputField id="hello" />
                    <TextField disabled={false}></TextField>
                </div>
            {/if}
        </FormContents>
    </Form>
</section>
