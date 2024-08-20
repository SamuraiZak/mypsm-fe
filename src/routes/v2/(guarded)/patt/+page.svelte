<script lang="ts">
    import CustomSelectField from './../../../../lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from './../../../../lib/components/inputs/text-field/CustomTextField.svelte';
    import StepperContent from './../../../../lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';

    var text = 'Hello World';
    // Stepper Classes
    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let options = ['1', '2', '3'];
</script>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <CustomTabContent title="Tab 1">
            <Stepper>
                <StepperContent>
                    <StepperContentHeader title="Stepper Content Header 1">
                        <TextIconButton
                            type="primary"
                            label="Button 1"
                            onClick={() => {
                                text = 'Button 1 pressed';
                            }}
                        />
                        <TextIconButton
                            type="neutral"
                            label="Button 2"
                            onClick={() => {
                                text = 'Button 2 pressed';
                            }}
                        />
                        <TextIconButton
                            type="draft"
                            label="Button 3"
                            onClick={() => {
                                text = 'Button 3 pressed';
                            }}
                        />
                        <TextIconButton
                            type="danger"
                            label="Reset"
                            onClick={() => {
                                text = 'Hello World';
                            }}
                        />
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form class="flex w-full flex-col gap-2">
                            <div class="max-h-[calc(100vh - 172px)]">
                                <CustomTextField
                                    id="1"
                                    label="Text Field"
                                    type="text"
                                    bind:val={text}
                                />
                                <CustomSelectField
                                    id="2"
                                    label="Select Field"
                                    val={options[0]}
                                ></CustomSelectField>
                            </div>
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContentHeader title="Stepper Content Header 2">
                    <TextIconButton
                        type="primary"
                        label="Change"
                        onClick={() => {
                            text = 'Changed in Stepper 2';
                        }}
                    />
                </StepperContentHeader>
                <StepperContentHeader title="Stepper Content Header 3"
                ></StepperContentHeader>
            </Stepper>
        </CustomTabContent>
        <CustomTabContent title="Tab 2"></CustomTabContent>
        <CustomTabContent title="Tab 3"></CustomTabContent>
    </CustomTab>
</section>
