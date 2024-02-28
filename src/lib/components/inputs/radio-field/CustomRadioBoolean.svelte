<script lang="ts">
    import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';

    // input id
    export let id: string = 'inputId';

    // input label
    export let label: string = 'Label';

    // radio options
    export let options: RadioDTO[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
        },
    ];

    // value
    export let val: any = false;

    // validation errors
    export let errors: string[] | undefined = [] ?? undefined;

    // disable
    export let disabled: boolean = true;
</script>

<div class="flex w-full flex-col items-center justify-start gap-1">
    <!-- input label starts here -->

    <div class="flex h-fit w-full flex-row items-center justify-between">
        <label
            for="password"
            class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
        >
            {label}
        </label>
    </div>

    <!-- input label ends here -->

    <!-- input field starts here -->

    <div class="flex h-8 w-full flex-row items-center justify-start gap-5">
        {#each options as option}
            <label class="flex w-fit flex-row gap-1.5">
                <input
                    {disabled}
                    class="leading-tight focus:outline-none focus:ring-0 {disabled
                        ? ' text-ios-basic-inactiveGray'
                        : ''}"
                    type="radio"
                    bind:group={val}
                    value={option.value}
                />
                <span
                    class="text-base font-normal leading-tight {disabled
                        ? 'text-ios-basic-inactiveGray'
                        : 'text-ios-labelColors-label-light'}"
                    >{option.name}</span
                >
            </label>
        {/each}
    </div>

    <!-- input field ends here -->

    <!-- validation area starts here -->
    <div class="flex h-3 w-full flex-row items-center justify-start">
        {#if errors}
            <p
                class="text-end text-sm font-medium leading-tight text-ios-basic-destructiveRed"
            >
                {errors}
            </p>
        {/if}
    </div>
    <!-- validation area starts here -->
</div>
