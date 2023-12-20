<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgAddCircle from '$lib/assets/svg/SvgAddCircle.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';

    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';

    import ComplexTable from '$lib/components/complex-table/ComplexTable.svelte';
    import CxTableHead from '$lib/components/complex-table/CxTableHead.svelte';
    import CxTableHeadCell from '$lib/components/complex-table/CxTableHeadCell.svelte';
    import CxTableBody from '$lib/components/complex-table/CxTableBody.svelte';
    import CxTableDataCell from '$lib/components/complex-table/CxTableDataCell.svelte';
    import CxTableRow from '$lib/components/complex-table/CxTableRow.svelte';

    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { lantikanKeGredTable } from '$lib/mocks/kakitangan/pengesahan/lantikan-ke-gred/lantikan-ke-gred-table';
    import { melebihi3TahunTable } from '$lib/mocks/kakitangan/pengesahan/melebihi-tempoh-3-tahun/melebihi-tempoh-3-tahun-table';
    import { lantikanBaruTable } from '$lib/mocks/kakitangan/pengesahan/pengesahan-lantikan-baru/lantikan-baru-table';
    import { positions } from '$lib/mocks/positions/positions';
    import { status } from '$lib/mocks/status/status';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import type { fromJSON } from 'postcss';

    let selectedStatus = status[0].value;
    let selectedPos: string = positions[0].value;
    let passData: Record<string, any> = {};
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengesahan Dalam Perkhidmatan"
        description="Hal-hal berkaitan Pengesahan Dalam Perkhidmatan"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <CustomTab>
        <CustomTabContent title="Pengesahan Lantikan Baru">
            <FilterContainer>
                <StaffSelector />
                <ShortTextField label="Tarikh Lantikan" type="date" />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
            </FilterContainer>
            
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <ComplexTable title="">
                <CxTableHead>
                    <CxTableRow>
                        <CxTableHeadCell rowSize={2} title="Bil."/>
                        <CxTableHeadCell rowSize={2} title="No. Pekerja"/>
                        <CxTableHeadCell rowSize={2} title="Nama Pekerja"/>
                        <CxTableHeadCell rowSize={2} title="No. Kad Pengenalan"/>
                        <CxTableHeadCell rowSize={2} title="Jawatan Pertama Dilantik Di Lembaga"/>
                        <CxTableHeadCell rowSize={2} title="Tarikh Lantikan"/>
                        <CxTableHeadCell rowSize={2} title="Jawatan Semasa"/>
                        <CxTableHeadCell rowSize={2} title="Penempatan Semasa"/>
                        <CxTableHeadCell columnSize={8} title="Peperiksaan Perkhidmatan/Kursus Induksi"/>
                        <CxTableHeadCell rowSize={2} title="LNPT"/>
                        <CxTableHeadCell rowSize={2} title="Status"/>
                        <CxTableHeadCell rowSize={2} title=""/>
                    </CxTableRow>
                    <CxTableRow>
                        <CxTableHeadCell title="Program Transformasi Media"/>
                        <CxTableHeadCell columnSize={2} title="Peperiksaan JPA Bahagian A/B"/>
                        <CxTableHeadCell columnSize={3} title="Peperiksaan Jabatan Bahagian II/III,IV"/>
                        <CxTableHeadCell title="ISAC"/>
                        <CxTableHeadCell title="ISAC (PTSU)"/>
                    </CxTableRow>
                </CxTableHead>
                <CxTableBody>
                    {#each lantikanBaruTable as item, i(i) }
                    <CxTableRow>
                        <CxTableDataCell value={i+1}/>
                        <CxTableDataCell value={item.employeeId}/>
                        <CxTableDataCell value={item.employeeName}/>
                        <CxTableDataCell value={item.idNumber}/>
                        <CxTableDataCell value={item.jawatanPertamaDilantikDiLembaga}/>
                        <CxTableDataCell value={item.tarikhLantikan}/>
                        <CxTableDataCell value={item.jawatanSemasa}/>
                        <CxTableDataCell value={item.penempatanSemasa}/>
                        <CxTableDataCell><SvgCheck/></CxTableDataCell>
                        <CxTableDataCell><SvgCheck/></CxTableDataCell>
                        <CxTableDataCell><SvgCheck/></CxTableDataCell>
                        <CxTableDataCell><SvgCheck/></CxTableDataCell>
                        <CxTableDataCell><SvgCheck/></CxTableDataCell>
                        <CxTableDataCell><SvgCheck/></CxTableDataCell>
                        <CxTableDataCell><SvgCheck/></CxTableDataCell>
                        <CxTableDataCell><SvgCheck/></CxTableDataCell>
                        <CxTableDataCell>
                            {#if item.LNPT === true}
                            <SvgCheck/>
                            {:else}
                            <SvgXMark/>
                            {/if}
                        </CxTableDataCell>
                        <CxTableDataCell value={item.status}/>
                        <CxTableDataCell><IconButton
                            onClick={() => alert("function here")}>
                                <SvgEdit/>
                        </IconButton></CxTableDataCell>
                    </CxTableRow>
                    {/each}
                </CxTableBody>
            </ComplexTable>

            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <!-- <DynamicTable
                    tableItems={lantikanBaruTable}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        if (passData.status === 'Baru')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/baru');
                        else if (passData.status === 'DIPERAKU - Pengarah Negeri/Bahagian')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/diperaku-pengarah-negeri-bahagian');
                        else if (passData.status === 'Selesai')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/selesai');
                    }}
                    bind:passData
                ></DynamicTable> -->

                <!-- DataTable -->

                <!-- <DataTable title="">
                    <DtTableHead>
                        <DtTableHeadCell title="Bil. " />
                        <DtTableHeadCell title="No. Pekerja" />
                        <DtTableHeadCell title="Nama Pekerja" />
                        <DtTableHeadCell title="No. Kad Pengenalan" />
                        <DtTableHeadCell
                            title="Jawatan Pertama Dilantik Di Lembaga"
                        />
                        <DtTableHeadCell title="Tarikh Lantikan" />
                        <DtTableHeadCell title="Jawatan Semasa" />
                        <DtTableHeadCell title="Penempatan Semasa" />

                        
                
                            <div class="px-6 py-2 text-center border">
                                <span class="text-center text-sm font-bold text-txt-secondary">
                                    Peperiksaan Perkhidmatan/Kursus Induksi
                                </span>
                            </div>
                                <div class="flex">
                                <DtTableHeadCell
                                    title="Program Transformasi Minda"
                                ></DtTableHeadCell>
                                <DtTableHeadCell
                                    title="Peperiksaan JPA Bahagian A/B"
                                />
                                <DtTableHeadCell
                                    title="Peperiksaan Jabatan Bahagian II/III,IV"
                                />
                                <DtTableHeadCell title="ISAC" />
                                <DtTableHeadCell title="ISAC (PTSU)" />
                            </div>

                        <DtTableHeadCell title="LNPT" />
                        <DtTableHeadCell title="Status" />
                        <DtTableHeadCell></DtTableHeadCell>
                    </DtTableHead>
                    <DtTableBody>
                        {#each lantikanBaruTable as item, i (i)}
                            <DtTableRow>
                                <DtTableDataCell value={i + 1} />
                                <DtTableDataCell value={item.employeeId} />
                                <DtTableDataCell value={item.employeeName} />
                                <DtTableDataCell value={item.idNumber} />
                                <DtTableDataCell
                                    value={item.jawatanPertamaDilantikDiLembaga}
                                />
                                <DtTableDataCell value={item.tarikhLantikan} />
                                <DtTableDataCell value={item.jawatanSemasa} />
                                <DtTableDataCell
                                    value={item.penempatanSemasa}
                                />
                                
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium">
                                    <div class="flex w-full">
                                        <div class="flex h-full flex-row items-center justify-center">
                                            {item.employeeName}
                                        </div>
                                        <div class="flex h-full flex-row items-center justify-center">
                                            {item.employeeName}
                                        </div>
                                    </div>
                                    
                                </td>
                                <DtTableDataCell>
                                    {#if item.LNPT === true}
                                        <SvgCheck />
                                    {:else}
                                        <SvgXMark />
                                    {/if}
                                </DtTableDataCell>
                                <DtTableDataCell value={item.status} />
                                <DtTableDataCell>
                                    <IconButton
                                    onClick={() => alert("function here")}>
                                        <SvgEdit/>
                                    </IconButton>
                                </DtTableDataCell>
                            </DtTableRow>
                        {/each}
                    </DtTableBody>
                </DataTable> -->
                <div
                class="flex h-full max-h-full w-full flex-col justify-start overflow-x-hidden"
                >
                <div class="h-full max-h-full w-full overflow-x-auto overflow-y-auto">
                <div class="h-fit bg-bgr-primary">
                    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead class="text-xs uppercase text-gray-700 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
                            <tr class="border-b last:border-b-0 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                <th class="py-2 text-center border px-2.5" rowspan="2">Bil.</th>
                                <th class="py-2 text-center border px-2.5" rowspan="2">No. Pekerja</th>
                                <th class="py-2 text-center border px-2.5" rowspan="2">Nama Pekerja</th>
                                <th class="py-2 text-center border px-2.5" rowspan="2"><div class="flex flex-row items-center justify-center gap-1"><span class="text-center text-sm font-bold text-txt-secondary">No. Kad Pengenalan</span></div></th>
                                <th class="py-2 text-center border px-2.5" rowspan="2">Jawatan Pertaman Dilantik Di Lembaga</th>
                                <th class="py-2 text-center border px-2.5" rowspan="2">Tarikh Lantikan</th>
                                <th class="py-2 text-center border px-2.5" rowspan="2">Jawatan Semasa</th>
                                <th class="py-2 text-center border px-2.5" rowspan="2">Penempatan Semasa</th>
                                <th class="py-2 text-center border px-2.5" colspan="8">Peperiksaan Perkhidmatan/Kursus Induksi</th>
                                <th class="py-2 text-center border px-2.5" rowspan="2">LNPT</th>
                                <th class="py-2 text-center border px-2.5" rowspan="2">Status</th>
                                <th class="py-2 text-center border px-2.5" rowspan="2"></th>
                            </tr>
                            <tr>
                                <th class="py-2 text-center border px-2.5">Program Transformasi Media</th>
                                <th class="py-2 text-center border px-2.5" colspan="2">Peperiksaan JPA Bahagian A/B</th>
                                <th class="py-2 text-center border px-2.5" colspan="3">Peperiksaan Jabatan Bahagian II/III,IV</th>
                                <th class="py-2 text-center border px-2.5">ISAC</th>
                                <th class="py-2 text-center border px-2.5">ISAC (PTSU)</th>
                            </tr>
                        </thead>
                        <tbody class="h-fit">
                            {#each lantikanBaruTable as item, i(i)}
                            <tr class="border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700">
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium">{i+1}</td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium">{item.employeeId}</td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"><div class="flex h-full flex-row items-center justify-center">{item.employeeName}</div></td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium">{item.idNumber}</td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium">{item.jawatanPertamaDilantikDiLembaga}</td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium">{item.tarikhLantikan}</td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium">{item.jawatanSemasa}</td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium">{item.penempatanSemasa}</td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"><div class="flex h-full flex-row items-center justify-center"><SvgCheck/></div></td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"><div class="flex h-full flex-row items-center justify-center"><SvgCheck/></div></td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"><div class="flex h-full flex-row items-center justify-center"><SvgCheck/></div></td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"><div class="flex h-full flex-row items-center justify-center"><SvgCheck/></div></td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"><div class="flex h-full flex-row items-center justify-center"><SvgXMark/></div></td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"><div class="flex h-full flex-row items-center justify-center"><SvgCheck/></div></td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"><div class="flex h-full flex-row items-center justify-center"><SvgCheck/></div></td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"><div class="flex h-full flex-row items-center justify-center"><SvgCheck/></div></td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"><div class="flex h-full flex-row items-center justify-center">
                                    {#if item.LNPT === true}
                                    <SvgCheck/>
                                    {:else}
                                    <SvgXMark/>
                                    {/if}
                                </div>
                                </td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium">{item.status}</td>
                                <td class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium">
                                    <IconButton
                                        onClick={() => alert("function here")}>
                                            <SvgEdit/>
                                    </IconButton>
                                </td>
                            </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
                </div>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Pengesahan Yang Melebihi Tempoh 3 Tahun">
            <FilterContainer>
                <StaffSelector />
                <ShortTextField label="Tarikh Lantikan" type="date" />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
            </FilterContainer>
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={melebihi3TahunTable}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        if (passData.status === 'Baru')
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/baru',
                            );
                        else if (
                            passData.status ===
                            'DIPERAKU - Pengarah Negeri/Bahagian'
                        )
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/diperaku-pengarah-negeri-bahagian',
                            );
                        else if (passData.status === 'Selesai')
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/selesai',
                            );
                    }}
                    bind:passData
                ></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent
            title="Pengesahan Lantikan ke Gred/Skim Baru (Rasionalisasi)"
        >
            <FilterContainer>
                <StaffSelector />
                <ShortTextField label="Tarikh Lantikan" type="date" />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
            </FilterContainer>
            <SectionHeader title="Senarai Rekod Kumpulan Persaraan Lain-lain"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={lantikanKeGredTable}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        if (passData.status === 'Baru')
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/baru',
                            );
                        else if (
                            passData.status ===
                            'DIPERAKU - Pengarah Negeri/Bahagian'
                        )
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/diperaku-pengarah-negeri-bahagian',
                            );
                        else if (passData.status === 'Selesai')
                            goto(
                                '/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/selesai',
                            );
                    }}
                    bind:passData
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
