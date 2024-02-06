<script lang="ts">
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';
    import { greds } from '$lib/mocks/gred/gred';
    import { Tooltip } from 'flowbite-svelte';
    import type { SalaryMovementListDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement.dto';
    import type { DropdownOptionsInterface } from '$lib/interfaces/common/dropdown-option';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import { _updateTable } from './+layout';
    import type { PageData } from './$types';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { ListSalaryMovementApprovalDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-approval.dto';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import { loadingState } from '$lib/stores/globalState';
    import { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';

    let tempData: ListSalaryMovementApprovalDTO;
    export let data;
    let selectedDay: number = 1;
    let selectedMonth: number;
    let tooltipContent: string = '';
    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id;

            switch (eventName) {
                default:
                    tooltipContent =
                        'Pergerakan gaji kakitangan akan diadakan sebanyak 4 kali setahun iaitu 3 bulan sekali (Januari, April, Julai, Oktober)';
            }
        }
    }

    const monthLookup: DropdownOptionsInterface[] = [
        { value: 1, name: 'Januari' },
        { value: 2, name: 'Februari' },
        { value: 3, name: 'Mac' },
        { value: 4, name: 'April' },
        { value: 5, name: 'Mei' },
        { value: 6, name: 'Jun' },
        { value: 7, name: 'Julai' },
        { value: 8, name: 'Ogos' },
        { value: 9, name: 'September' },
        { value: 10, name: 'Oktober' },
        { value: 11, name: 'November' },
        { value: 12, name: 'Disember' },
    ];
    let selectedGrade = 'All';
     
    // table
    let param: CommonListRequestDTO = data.props.param;
    let table: TableDTO = {
        param: param,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        selectedData: [],
    };

    console.log(table.data)
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
            table.param.filter = {
                month: selectedDay,
                year: 2024
            }
        });
    }

</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pergerakan Gaji"
        description="Hal-hal berkaitan pengurusan gaji bagi kakitangan LKIM"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <!-- Table filter placeholder -->
        <!-- <FilterContainer> -->
            <!-- Select dropdowns -->
            <!-- <DropdownSelect
                toolTipID="bulanTooltip"
                hasTooltip={true}
                id="bulan-dropdown"
                label="Bulan Pergerakan Gaji"
                dropdownType="label-top"
                bind:value={selectedMonth}
                options={monthLookup}
            />

            <FilterTextInput label="No. Pekerja"></FilterTextInput>
            <FilterTextInput label="KGT Pegawai"></FilterTextInput>
            <DropdownSelect
                id="gred-dropdown"
                label="Gred"
                dropdownType="label-top"
                bind:index={selectedGrade}
                options={greds}
            />
        </FilterContainer>
        <SectionHeader title="Tindakan: Lihat butiran mesyuarat untuk proses kelulusan pergerakan gaji.">
            <TextIconButton label="Cari" primary onClick={() => {}}>
                <SvgManifyingGlass />
            </TextIconButton>
        </SectionHeader> -->
        <!-- <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DynamicTable
                hasCheckbox
                onSelect={() => {}}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    const url =
                    '/pengarah-khidmat-pengurusan/gaji/pergerakan-gaji/butiran-' +
                    tempData.meetingId+'-'+tempData.employeeNumber
                    goto(url);
                }}
                tableItems={data.salaryMovementApprovalList}
                bind:passData={tempData}
                columnKeys={[
                    'employeeNumber',
                    'employeeName',
                    'employeeGrade',
                    'tpg',
                    'kgt',
                    'salary1',
                    'wilayahAllowance1',
                    'criticalAllowance1',
                    'salary2',
                    'wilayahAllowance2',
                    'criticalAllowance2',
                    'specialkgt',
                    'specialSalary',
                    'specialWilayahAllowance',
                    'specialAid',
                    'status'
                ]}
            ></DynamicTable>
        </div> -->
        <div class="h-full max-h-full w-full pb-5">
            <CustomTable
                bind:tableData={table}
                enableDetail
                detailActions={() => {
                    const url =
                        '/pengarah-khidmat-pengurusan/gaji/pergerakan-gaji/butiran-' +
                        tempData.meetingId
                    goto(url);
                }}
                bind:passData={tempData}
                onUpdate={_search}
            />
        </div>
    </div>
</section>
<!-- Tooltip body -->
<Tooltip
    type="dark"
    triggeredBy="[id^='bulanTooltip']"
    class="w-[350px] text-center"
    on:show={assignContent}>{tooltipContent}</Tooltip
>
