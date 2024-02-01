<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import { goto } from '$app/navigation';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import type { EmployeeListResponse } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-employee-list-response.view-model';
    import type { Filter } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-chosen-employee-list-request.view-model';
    let tempData: EmployeeListResponse;    
    export let data;
    let selectedEmployee: EmployeeListResponse[] = [];

    function pushSelected(data: EmployeeListResponse) {
        let tempSelected = selectedEmployee;
        if (!tempSelected.includes(data)) {
            tempSelected.push(data);
            selectedEmployee = tempSelected;
        }
    }

    function popSelected(data: EmployeeListResponse) {
        let tempSelected = selectedEmployee;
        tempSelected = tempSelected.filter((item) => item !== data);

        selectedEmployee = tempSelected;
    }

    function pushNewCandidate() {
    }
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Gred 1-54 - Baru"
        description="Sila pilih kakitangan yang layak sebagai calon pemangkuan."
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Batal"
            onClick={() => {
                goto('/urus-setia/perjawatan/pemangkuan');
            }}
        >
            <SvgBlock></SvgBlock>
        </TextIconButton>
        <TextIconButton
            label="Seterusnya"
            primary
            onClick={() => {
                pushNewCandidate();
                goto('/urus-setia/perjawatan/pemangkuan/gred-1_54/butiran');
                // const url = './pemangkuan/gred-1_54/butiran-'+selectedEmployee;

                // goto(url);
            }}
        >
            <SvgArrowRight></SvgArrowRight>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <CustomTab>
        <!-- Senarai Semua Kakitangan -->
        <CustomTabContent title="Senarai Semua Kakitangan">
            <CustomCard borderClass="border-system-primary">
                <CustomCardHeader title="Semua Tetapan Pencarian">
                    <TextIconButton label="Cari" primary onClick={() => {}}>
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </TextIconButton>
                </CustomCardHeader>
                <CustomCardBody>
                    <div class="flex w-full flex-wrap gap-2.5">
                        <FilterTextInput label="Gred"></FilterTextInput>
                        <FilterTextInput label="Jawatan"></FilterTextInput>
                        <FilterTextInput label="Nama"></FilterTextInput>
                        <FilterTextInput label="No. K/P"></FilterTextInput>
                    </div>
                </CustomCardBody>
            </CustomCard>

            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <SectionHeader
                    title="Hasil Carian"
                    subTitle="Tekan tombol tambah untuk masukkan nama kakitangan ke dalam senarai kakitangan yang terpilih"
                ></SectionHeader>
                <DynamicTable
                    bind:passData={tempData}
                    tableItems={data.employeeRecord}
                    withRowSelection
                    selectAdd
                    onSelect={() => {
                        pushSelected(tempData);
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- Senarai Kakitangan Yang Dipilih -->
        <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
            <CustomCard borderClass="border-system-primary">
                <CustomCardHeader title="Semua Tetapan Pencarian">
                    <TextIconButton label="Cari" primary onClick={() => {}}>
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </TextIconButton>
                </CustomCardHeader>
                <CustomCardBody>
                    <div class="flex w-full flex-wrap gap-2.5">
                        <FilterTextInput label="Gred"></FilterTextInput>
                        <FilterTextInput label="Jawatan"></FilterTextInput>
                        <FilterTextInput label="Nama"></FilterTextInput>
                        <FilterTextInput label="No. K/P"></FilterTextInput>
                    </div>
                </CustomCardBody>
            </CustomCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <SectionHeader
                    title="Hasil Carian"
                    subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                ></SectionHeader>
                <DynamicTable
                    tableItems={selectedEmployee}
                    withRowSelection
                    bind:passData={tempData}
                    onSelect={() => {
                        popSelected(tempData);
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
