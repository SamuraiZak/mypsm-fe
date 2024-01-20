<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FormModal from './form-modal/FormModal.svelte';
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
    import { superForm, superValidate } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import {
        _applicantsSchema,
        _submitAdvancementApplicantsForm,
    } from './+page';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import { getErrorToast } from '$lib/toast/toast-service';
    export let data: PageData;

    let selectedGred: string = greds[0].value; // Default selected filter
    let selectedEdu: string = eduLevels[0].value; // Default selected filter

    // Sample staff information

    let defaultClass: string =
        'text-sm text-system-neutral font-medium flex items-center h-8 gap-2 whitespace-nowrap';

    let openModal = false;

    export const { form, errors, enhance } = superForm(data.applicantsForm, {
        SPA: true,
        validators: _applicantsSchema,
        async onSubmit() {
            await superValidate($form, _applicantsSchema).then((res) => {
                if (!res.valid) {
                    getErrorToast();
                } else openModal = true;
            });
        },
    });
</script>

<!-- content header     starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Tawaran Baru Dalam Perkhidmatan"
        description="Hal-hal berkaitan Tawaran Baru Dalam Perkhidmatan (Rasionalisasi/Tukar Lantik/Jumud/Lain-lain)"
    >
        <FormButton
            type="back"
            addLabel="Cetak"
            onClick={() => {
                goto('../tawaran-baru');
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
    <FilterCard>
        <StaffSelector />
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
    </FilterCard>
    <!-- Page action section -->
    <div
        class="flex h-[50px] flex-row items-center justify-between border-b border-t text-txt-secondary"
    >
        <span class="text-base"
            >Nota: Cetak senarai nama kakitangan yang terlibat untuk dibawa ke
            mesyuarat berkaitan.</span
        >
        <TextIconButton primary label="Cetak" form="staffToSelect">
            <SvgPrinter />
        </TextIconButton>
    </div>
    <!-- Table showing the lists of candidates to be taken in bulk for 'tawaran baru' -->
    <form
        id="staffToSelect"
        method="POST"
        use:enhance
        class="flex w-full flex-col items-center justify-start p-2.5"
    >
        {#if $errors.selectedStaffs}
            <span class="font-sans text-sm italic text-system-danger"
                >{$errors.selectedStaffs._errors}</span
            >
        {/if}
        <DynamicTable
            tableItems={staffs}
            hasCheckbox
            bind:checkedItems={$form.selectedStaffs}
        />
    </form>
</section>

<Toaster />

<FormModal bind:data={data.advancementForm} bind:selectedStaffs={$form.selectedStaffs} bind:isOpen={openModal} />
