<script lang="ts">
    import ReTableColumnHeader from './ReTableColumnHeader.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-start">
    <table class="w-full border-collapse border border-gray-400">
        <thead class=" bg-gray-100">
            <tr>
                <ReTableColumnHeader></ReTableColumnHeader>
            </tr>
        </thead>
    </table>
</div>
