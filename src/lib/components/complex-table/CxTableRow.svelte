<script lang="ts">
    export let headerColor: boolean = false;
</script>

<tr
    class="border-b last:border-b-0 dark:border-gray-700 dark:bg-gray-800 {headerColor
        ? 'bg-gray-50'
        : 'bg-white'}"
>
    <slot />
</tr>
