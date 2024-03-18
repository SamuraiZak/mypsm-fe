<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Gaji Akhir" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard>
            <FilterTextField label="Nama" inputValue={''} />
        </FilterCard>
    </div>
</section>
