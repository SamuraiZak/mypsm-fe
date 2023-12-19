<script lang="ts">
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
</script>

<div
    class="flex h-full w-screen flex-col items-center justify-start bg-bgr-secondary p-2.5"
>
    <div
        class=" flex h-full w-full flex-col items-center justify-start gap-2.5"
    >
        <div class="flex h-[40px] w-full flex-col items-start justify-start">
            <p class="text-base font-semibold">How to use CustomCard</p>
            <p class="text-sm font-normal text-txt-secondary">
                Refer to the code and copy
            </p>
        </div>

        <div class="flex w-full flex-col items-start justify-start">
            <!-- Custom card example starts here -->
            <CustomCard>
                <CustomCardHeader title="Example Card Title">
                    <TextIconButton
                        primary
                        label="Example Button"
                        onClick={() => {
                            alert('Clicked');
                        }}
                    >
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </TextIconButton>
                </CustomCardHeader>
                <CustomCardBody>
                    <!-- card content starts here customised the following div accordingly -->
                    <div class="flex w-full flex-row justify-start gap-2.5">
                        <FilterTextInput label="Example filter"
                        ></FilterTextInput>
                        <FilterTextInput label="Example filter"
                        ></FilterTextInput>
                    </div>
                </CustomCardBody>
            </CustomCard>
        </div>

        <div class="w-full border border-bdr-primary bg-gray-800 p-2.5">
            <pre>
                <code class="text-sm text-txt-blend">
                    &lt;CustomCard&gt;
                        &lt;CustomCardHeader title="Example Card Title"&gt;
                            &lt;TextIconButton
                                primary
                                label="Example Button"
                                &gt;
                                &lt;SvgManifyingGlass&gt;&lt;/SvgManifyingGlass&gt;
                            &lt;/TextIconButton&gt;
                        &lt;/CustomCardHeader&gt;
                        &lt;CustomCardBody&gt;
                            &lt;!-- card content starts here customised the following div accordingly --&gt;
                            &lt;div
                                class="flex w-full flex-wrap justify-start gap-2.5"&gt;
                                &lt;FilterTextInput label="Example filter"
                                &gt;&lt;/FilterTextInput&gt;
                                &lt;FilterTextInput label="Example filter"
                                &gt;&lt;/FilterTextInput&gt;
                            &lt;/div&gt;
                        &lt;/CustomCardBody&gt;
                    &lt;/CustomCard&gt;
                </code>
            </pre>
        </div>
    </div>
</div>
