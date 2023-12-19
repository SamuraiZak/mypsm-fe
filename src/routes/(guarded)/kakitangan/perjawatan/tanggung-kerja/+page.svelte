<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import OptionButton from '$lib/components/buttons/OptionButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { permohonanTanggungKerja } from '$lib/mocks/kakitangan/tanggung-kerja/permohonan-tanggung-kerja';
    import { penamatanTanggungKerja } from '$lib/mocks/kakitangan/tanggung-kerja/penamatan-tanggung-kerja';

    let columnKeys = [
        'employeeNumber',
        'name',
        'identityDocumentNumber',
        'currentPosition',
        'workAllowancePosition',
        'currentPlacement',
        'workAllowancePlacement',
        'status',
        'action',
    ];
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Tanggung Kerja"
        description="Hal-hal berkaitan urusan tanggung kerja"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <!-- Permohonan Tanggung Kerja -->
        <CustomTabContent title="Permohonan Tanggung Kerja">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <SectionHeader title="Senarai Rekod Permohonan"
                    ><FormButton
                        type="new"
                        addLabel="Tambah Permohonan Baru"
                        onClick={() => {
                            goto('tanggung-kerja/permohonan/baru');
                        }}
                    /></SectionHeader
                >
                <DynamicTable
                    tableItems={permohonanTanggungKerja}
                    columnKeys={[
                        'employeeNumber',
                        'staffName',
                        'identityDocumentNumber',
                        'applicationDate',
                        'startDate',
                        'endDate',
                        'status',
                        'remark',
                    ]}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/kakitangan/perjawatan/tanggung-kerja/permohonan/butiran',
                        );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- Penamatan Tanggung Kerja -->
        <CustomTabContent title="Penamatan Tanggung Kerja">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={penamatanTanggungKerja}
                    columnKeys={[
                        'employeeNumber',
                        'staffName',
                        'identityDocumentNumber',
                        'startDate',
                        'endDate',
                        'status',
                    ]}
                    withActions={true}
                    actionOptions={['print']}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
