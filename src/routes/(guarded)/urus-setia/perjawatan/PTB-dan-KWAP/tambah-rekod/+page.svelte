<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { staffs } from '$lib/mocks/perjawatan/tawaran-baru/tawaran-baru-permonan-list';
    import { greds } from '$lib/mocks/gred/gred';
    import { eduLevels } from '$lib/mocks/taraf-pendidikan/taraf-pendidikan';
    import { goto } from '$app/navigation';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import { z } from 'zod';
    import toast, { Toaster } from 'svelte-french-toast';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    let tempData: any;

    let selectedGred: string = greds[0].value; // Default selected filter
    let selectedEdu: string = eduLevels[0].value; // Default selected filter

    // Sample staff information

    let defaultClass: string =
        'text-sm text-system-neutral font-medium flex items-center h-8 gap-2 whitespace-nowrap';

    let openModal = false;

    let selectedStaffs: any[] = [];
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Tambah Rekod PTB dan KWAP"
        description="Hal-hal berkaitan dengan PTB dan KWAP"
    >
        <FormButton
            type="back"
            addLabel="Kembali"
            onClick={() => {
                goto('../PTB-dan-KWAP');
            }}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <!-- Table filter placeholder -->
    <FilterContainer>
        <FilterTextInput label="Nama Pekerja" />
        <FilterTextInput label="No. Pekerja" />
        <FilterTextInput label="No. Kad Pengenalan" />
        <FilterTextInput label="Kelayakan Cuti"></FilterTextInput>
        <FilterSelectInput
            id="gred-dropdown"
            label="Gred Semasa"
            options={greds}
            selectedVal={selectedGred}
        ></FilterSelectInput>
        <FilterSelectInput
            id="edu-dropdown"
            label="Taraf Pendidikan"
            options={eduLevels}
            selectedVal={selectedEdu}
        ></FilterSelectInput>
    </FilterContainer>
    <SectionHeader title="Pilih Kakitangan Untuk Dikemaskini"></SectionHeader>
    <div class="flex w-full flex-col items-center justify-start p-2.5">
        <DynamicTable
            tableItems={staffs}
            editable
            bind:passData={tempData}
            onEditClick={() => {
                const url =
                    './butiran-permohonan-' +
                    tempData.noPekerja +
                    '-' +
                    tempData.noKadPengenalan;
                goto(url);
            }}
        />
    </div>
</section>

<Toaster />
