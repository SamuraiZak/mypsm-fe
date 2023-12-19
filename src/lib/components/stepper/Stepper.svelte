<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
    import StepperButton from './StepperButton.svelte';

    export let activeIndex = 0;
    export let dataId: string = '';
    export let dataStatus: string = '';
    let contentList: any;
    let stepperList: any[] = [];
    let tempStepperList: any[] = [];

    let randId = (Math.random() + 1).toString(36).substring(7);

    // Run logic whenever activeTab changes
    afterUpdate(() => {
        let tempList: any[] = [];

        if (contentList) {
            for (let index = 0; index < contentList.children.length; index++) {
                if (index !== activeIndex) {
                    contentList.children[index].classList.add('hidden');
                } else {
                    contentList.children[index].classList.remove('hidden');
                }
            }
        }

        contentList = document.getElementById(randId);
        for (let index = 0; index < contentList.children.length; index++) {
            tempList.push(contentList.children[index].id);
        }

        stepperList = tempList;
    });

    onMount(() => {
        contentList = document.getElementById(randId);
        for (let index = 0; index < contentList.children.length; index++) {
            tempStepperList.push(contentList.children[index].id);
        }

        stepperList = tempStepperList;
    });

    function setActiveStepper(index: number) {
        activeIndex = index;
    }
</script>

<div
    class="flex h-full max-h-full w-full max-w-full flex-row items-start justify-start overflow-hidden bg-bgr-primary"
>
    <!-- left -->
    <div
        class="flex h-full max-h-full w-[250px] min-w-[250px] max-w-[250px] flex-col items-start justify-start border-r border-bdr-primary"
    >
        {#if dataId !== ''}
            <!-- form info -->
            <div
                class="flex h-[50px] max-h-[50px] min-h-[50px] w-full flex-col items-center justify-center border-b border-bdr-primary px-2.5"
            >
                <p
                    class="text-base font-semibold leading-tight text-txt-primary"
                >
                    {dataId}
                </p>
                <p class="text-sm font-normal leading-tight text-txt-secondary">
                    {dataStatus}
                </p>
            </div>
        {/if}

        <!-- steppers -->
        <div
            class="flex h-full max-h-full w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5"
        >
            {#each stepperList as item, index}
                <StepperButton
                    label={item}
                    active={activeIndex == index}
                    onClick={() => {
                        setActiveStepper(index);
                    }}
                ></StepperButton>
            {/each}
        </div>
    </div>

    <ul id={randId} class="h-full max-h-full w-full max-w-full">
        <slot />
    </ul>

    <!-- content -->
</div>
