<script lang="ts">
    export let disabled: boolean = false;
    export let color: string =
        'default' ||
        'alternative' ||
        'dark' ||
        'light' ||
        'blue' ||
        'green' ||
        'red' ||
        'yellow';
    export let onClick = () => {};
</script>

<button
    {disabled}
    on:click={onClick}
    class="flex h-7 max-h-7 min-h-7 flex-row items-center justify-center rounded px-2 {color ==
    'yellow'
        ? 'bg-ios-systemColors-systemYellow-light text-ios-labelColors-label-dark hover:bg-ios-systemColors-systemYellow-dark'
        : color == 'red'
          ? 'bg-ios-systemColors-systemRed-light text-ios-labelColors-label-dark hover:bg-ios-systemColors-systemRed-dark'
          : color == 'green'
            ? 'bg-ios-systemColors-systemGreen-light text-ios-labelColors-label-dark hover:bg-ios-systemColors-systemGreen-dark'
            : color == 'blue'
              ? 'bg-ios-systemColors-systemBlue-light text-ios-labelColors-label-dark hover:bg-ios-systemColors-systemBlue-dark'
              : color == 'light'
                ? 'border bg-ios-systemColors-systemGrey6-light text-ios-labelColors-opaqueSeparator-dark hover:bg-ios-systemColors-systemGrey5-light'
                : color == 'dark'
                  ? 'bg-ios-systemColors-systemGrey6-dark text-ios-labelColors-label-dark hover:bg-ios-systemColors-systemGrey6-dark'
                  : color == 'alternative'
                    ? 'border bg-ios-basic-white text-ios-labelColors-opaqueSeparator-dark hover:bg-ios-systemColors-quaternarySystemFill-light'
                    : 'bg-ios-systemColors-systemBlue-light text-ios-labelColors-label-dark hover:bg-ios-systemColors-systemBlue-dark'}"
>
    <!-- icon -->

    <!-- label -->
    <div class="flex h-full flex-row items-center justify-center">
        <span class="w-fit leading-tight">
            <slot name="icon" />
        </span>
    </div>
</button>
