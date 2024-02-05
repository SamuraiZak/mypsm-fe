<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { Select } from 'flowbite-svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import type { LeaveHistoryListResponse } from '$lib/dto/mypsm/leave/report-leave/leave-history-list-response.dto';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { _updateTable } from './+page';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';

    export let data: PageData;
    let leaveInfo: LeaveHistoryListResponse;
    let selectedTahun = tahun[0].value;

    let param: CommonListRequestDTO = data.param;

    let table: TableDTO = {
        param: param,
        meta: data.leaveHistoryListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.leaveHistoryListResponse.data?.dataList ?? [],
    };

    async function _search() {
        _updateTable(table.param).then((value) => {
            table.data = value.props.response.data?.dataList ?? [];
            table.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            table.param.pageSize = table.meta.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
    }
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Laporan Cuti" description="Rekod Cuti Pekerja">
        <!-- TODO: put buttons in this area if necessary -->
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5"
>
    <!-- <FilterContainer>
        <FilterTextInput label="Nama Pekerja"></FilterTextInput>
        <FilterTextInput label="No. Pekerja"></FilterTextInput>
        <FilterTextInput label="No. Kad Pengenalan"></FilterTextInput>
        <div class="flex flex-row gap-x-2.5">
            <div class="flex flex-row items-center justify-center gap-x-2.5">
                <p class="text-sm font-normal">Bulan Cuti</p>
                <div class="flex flex-row items-center justify-start gap-x-2.5">
                    <Select
                        id="bulan-cuti-bulan"
                        items={[
                            {
                                value: 1,
                                name: 'January',
                            },
                            {
                                value: 2,
                                name: 'Febrary',
                            },
                            {
                                value: 3,
                                name: 'March',
                            },
                            {
                                value: 4,
                                name: 'April',
                            },
                            {
                                value: 5,
                                name: 'May',
                            },
                            {
                                value: 6,
                                name: 'June',
                            },
                            {
                                value: 7,
                                name: 'July',
                            },
                            {
                                value: 8,
                                name: 'August',
                            },
                            {
                                value: 9,
                                name: 'September',
                            },
                            {
                                value: 10,
                                name: 'October',
                            },
                            {
                                value: 11,
                                name: 'November',
                            },
                            {
                                value: 12,
                                name: 'December',
                            },
                        ]}
                        placeholder="Bulan"
                        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                        value={''}
                    ></Select>
                    <Select
                        id="bulan-cuti-tahun"
                        items={[
                            {
                                value: 1,
                                name: '2020',
                            },
                            {
                                value: 2,
                                name: '2021',
                            },
                            {
                                value: 3,
                                name: '2022',
                            },
                            {
                                value: 4,
                                name: '2023',
                            },
                        ]}
                        placeholder="Tahun"
                        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                        value={''}
                    ></Select>
                </div>
            </div>
        </div>
        <ShortTextField label="Kod Jenis Cuti" type="text" />
    </FilterContainer> -->

    <SectionHeader title="Senarai Cuti Yang Telah Diambil Mengikut Tahun"
    ></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <CustomTable
            bind:tableData={table}
            bind:passData={leaveInfo}
            enableDetail
            onUpdate={_search}
            detailActions={() => {
                // const url =
                //     '/urus-setia/lnpt/sejarah-apc/tambah-rekod-apc/butiran-' +
                //     leaveInfo.employeeNumber;
                goto(
                    `/urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti-${leaveInfo.leaveId}-${leaveInfo.leaveType}`,
                );
            }}
        ></CustomTable>
        <!-- <DynamicTable
            tableItems={data.leaveHistoryList ?? undefined}
            withActions
            bind:passData={leaveInfo}
            actionOptions={['edit']}
            editActions={() => {
                goto(
                    `/urus-setia/cuti/kelulusan-cuti/butiran-kelulusan-cuti-${leaveInfo.leaveId}-${leaveInfo.leaveType}`,
                );
            }}
        ></DynamicTable> -->
    </div>
</section>
