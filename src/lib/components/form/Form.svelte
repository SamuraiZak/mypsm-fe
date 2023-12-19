<script lang="ts">
    import SideStepper from '$lib/components/side-stepper/SideStepperItem.svelte';

    export let id: number = 0;
    export let status: string = '';
    export let steppers: string[] = [];
    export let activeStepper: number = 0;

    let index: number = 0;
</script>

<div class="flex h-full w-full flex-row overflow-x-hidden">
    <div class="flex h-full w-[300px] flex-col border-r">
        {#if id !== 0}
            <div
                class="top-0 z-10 flex w-full h-[50px] min-h-[50px] flex-row justify-between border-b border-bdr-primary bg-bgr-primary py-[5.5px]"
            >
                <!-- leading -->
                <div class="h-full w-full px-2.5">
                    <div
                        class="flex h-full shrink grow basis-0 flex-col items-center justify-center"
                    >
                        <div
                            class="flex flex-col items-center justify-center self-stretch"
                        >
                            <span class="text-sm font-semibold text-txt-primary"
                                >ID #{id}</span
                            >
                        </div>
                        <div
                            class="flex flex-col items-center justify-center self-stretch"
                        >
                            <span class="text-lg font-normal text-txt-secondary"
                                >{status}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        {/if}
        <div
            class="flex w-full flex-col items-center gap-2 overflow-y-auto py-2"
        >
            {#each steppers as stepper, i}
                <SideStepper
                    active={stepper === steppers[activeStepper]}
                    label={stepper}
                    onClick={() => {
                        activeStepper = i;
                    }}
                />
            {/each}
        </div>
    </div>
    <div
        class="flex h-full w-full flex-col overflow-x-hidden overflow-y-hidden"
    >
        <slot />
    </div>
</div>
