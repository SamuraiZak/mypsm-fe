<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { greds } from '$lib/mocks/gred/gred';
    import { eduLevels } from '$lib/mocks/taraf-pendidikan/taraf-pendidikan';
    import { goto } from '$app/navigation';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import SvgClipBoard from '$lib/assets/svg/SvgClipBoard.svelte';
    import FormModal from './form-modal/FormModal.svelte';

    let selectedGred: string = greds[0].value; // Default selected filter
    let selectedEdu: string = eduLevels[0].value; // Default selected filter
    export let data;
    const lantikanBaru = data.props.newHireLists;

    // Sample staff information

    let defaultClass: string =
        'text-sm text-system-neutral font-medium flex items-center h-8 gap-2 whitespace-nowrap';

    let openModal = false;
    let tempContractEndingStaff: any; // any type for testing since no interface is created for it yet
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Tawaran Baru Dalam Perkhidmatan"
        description="Hal-hal berkaitan Tawaran Baru Dalam Perkhidmatan (Rasionalisasi/Tukar Lantik/Jumud/Lain-lain)"
    >
        <FormButton
            type="back"
            addLabel="Kembali"
            onClick={() => {
                goto('../pembaharuan');
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
        <FormButton
            type="print"
            addLabel="Cetak"
            onClick={() => {
                openModal = true;
            }}
        />
    </div>
    <!-- Table showing the lists of candidates to be taken in bulk for 'tawaran baru' -->
    <div class="flex w-full flex-col items-start justify-center">
        <ContentHeader
            borderClass="border-t border-b border-bdr-primary"
            title="Semak senarai kakitangan kontrak dibawah yang akan ditamatkan, kemudian hantar ke pegawai penilai dengan menekan butang di sebelah kanan."
            description=""
        >
            <TextIconButton
                primary
                label="Hantar untuk Dinilai"
                onClick={() => {}}
            >
                <SvgClipBoard />
            </TextIconButton>
        </ContentHeader>
        <SectionHeader title="Senarai Kakitangan yang Akan Tamat Kontrak"
        ></SectionHeader>
        <DynamicTable
            hasCheckbox
            tableItems={lantikanBaru}
            bind:passData={tempContractEndingStaff}
            actionOptions={['edit']}
            editActions={() => {
                const url =
                    './pembaharuan/kemaskini-permohonan-00001-990909-13-5076';
                goto(url);
            }}
        ></DynamicTable>
    </div>
</section>

<FormModal bind:isOpen={openModal} />
