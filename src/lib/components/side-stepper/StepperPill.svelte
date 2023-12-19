<script>
    export let label = 'Item';
    export let active = false;
    export let onClick = () => {};
</script>

<button
    on:click={onClick}
    class="flex h-fit min-h-[32px] w-full flex-row items-center justify-start gap-2 rounded-[3px] {active
        ? 'bg-stepper-active'
        : 'bg-stepper-default'} p-2"
>
    <div class="flex h-fit w-full flex-col items-start justify-start">
        <span
            class="text-start text-base font-normal {active
                ? 'text-system-primary'
                : 'text-txt-tertiary'}">{label}</span
        >
    </div>
    <div class="flex h-fit w-fit flex-col items-center justify-center">
        <span class={active ? 'text-system-primary' : 'text-txt-tertiary'}>
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
            >
                <path
                    d="M6 0.5C9.30469 0.5 12 3.19531 12 6.5C12 9.82812 9.30469 12.5 6 12.5C2.67188 12.5 0 9.82812 0 6.5C0 3.19531 2.67188 0.5 6 0.5ZM8.39062 7.03906C8.53125 6.89844 8.625 6.71094 8.625 6.5C8.625 6.3125 8.53125 6.125 8.39062 5.98438L5.76562 3.35938C5.48438 3.05469 4.99219 3.05469 4.71094 3.35938C4.40625 3.64062 4.40625 4.13281 4.71094 4.41406L6.79688 6.5L4.71094 8.60938C4.40625 8.89062 4.40625 9.38281 4.71094 9.66406C4.99219 9.96875 5.48438 9.96875 5.76562 9.66406L8.39062 7.03906Z"
                    fill="currentColor"
                />
            </svg>
        </span>
    </div>
</button>
