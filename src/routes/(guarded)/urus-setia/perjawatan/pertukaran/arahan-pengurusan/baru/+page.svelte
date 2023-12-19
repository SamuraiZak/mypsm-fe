<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { pertukaranArahanPengurusanUrusSetia } from '$lib/mocks/perjawatan/pertukaran/pertukaran-arahan-pengurusan-urus-setia';
    import { greds } from '$lib/mocks/gred/gred';
    import { eduLevels } from '$lib/mocks/taraf-pendidikan/taraf-pendidikan';
    import { goto } from '$app/navigation';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';

    let selectedGred: string = greds[0].value; // Default selected filter
    let selectedEdu: string = eduLevels[0].value; // Default selected filter

    // Sample staff information

    let defaultClass: string =
        'text-sm text-system-neutral font-medium flex items-center h-8 gap-2 whitespace-nowrap';

    let openModal = false;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Pertukaran Atas Arahan Pihak Pengurusan"
        description="Sila pilih kakitangan yang berkaitan untuk teruskan permohonan pertukaran."
    >
        <FormButton
            type="back"
            addLabel="Cetak"
            onClick={() => {
                goto('../');
            }}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <SectionHeader title="Semua Kakitangan"></SectionHeader>
    <!-- Table filter placeholder -->
    <FilterContainer>
        <!-- Staff selector options -->
        <ShortTextField label="No. Pekerja"></ShortTextField>
        <ShortTextField label="Nama"></ShortTextField>
        <ShortTextField label="No. K/P"></ShortTextField>
    </FilterContainer>
    <!-- Table showing the lists of candidates to be taken in bulk for 'tawaran baru' -->
    <SectionHeader title="Hasil Carian"></SectionHeader>
    <div class="flex w-full flex-col items-center justify-start p-2.5">
        <DynamicTable
            tableItems={pertukaranArahanPengurusanUrusSetia}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                goto(
                    '/urus-setia/perjawatan/pertukaran/arahan-pengurusan/butiran',
                );
            }}
        />
    </div>
</section>
