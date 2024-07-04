<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type {
        ProceedingChargeDetailResponseDTO,
        ProceedingChargeListResponseDTO,
    } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { superForm } from 'sveltekit-superforms';

    export let data: PageData;
    let rowData: ProceedingChargeDetailResponseDTO;

    // Table list - Service Statement Table
    let serviceStatementListTable: TableSettingDTO = {
        param: data.param,
        meta: data.responses.serviceStatementListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.responses.serviceStatementListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'permission',
                malay: 'Kebenaran',
            },
            {
                english: 'changes',
                malay: 'Perubahan',
            },
            {
                english: 'serviceDetails',
                malay: 'Butiran Perkhidmatan',
            },
            {
                english: 'serviceStartDate',
                malay: 'Tarikh Mula Perkhidmatan',
            },
            {
                english: 'retirementStatus',
                malay: 'Status Persaraan',
            },
            {
                english: 'monthlySalary',
                malay: 'Gaji Bulanan',
            },
            {
                english: 'modifiedBy',
                malay: 'Diubah Oleh',
            },
            {
                english: 'modifiedAt',
                malay: 'Diubah Pada',
            },
        ],
        url: 'service_record/service_statement',
        id: 'serviceStatementListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    // Table list - Leave Statement Table
    let leaveStatementListTable: TableSettingDTO = {
        param: data.param,
        meta: data.responses.leaveStatementListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.responses.leaveStatementListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'durationDays',
                malay: 'Tempoh Hari',
            },
            {
                english: 'paid',
                malay: 'Cuti Bergaji',
            },
            {
                english: 'halfPaid',
                malay: 'Cuti Setengah Gaji',
            },
            {
                english: 'unPaid',
                malay: 'Cuti Tanpa Gaji',
            },
        ],
        url: 'service_record/leave_statement',
        id: 'leaveStatementListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    // Table list - Behaviour Histories Table
    let behaviourHistoriesListTable: TableSettingDTO = {
        param: data.param,
        meta: data.responses.behaviourHistoriesListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            data.responses.behaviourHistoriesListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'permission',
                malay: 'Kebenaran',
            },
            {
                english: 'appraisalDetail',
                malay: 'Butiran Penilaian',
            },
            {
                english: 'verifiedBy',
                malay: 'Disahkan Oleh',
            },
        ],
        url: 'service_record/behaviour_histories',
        id: 'behaviourHistoriesListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    // Superforms
    const { form } = superForm(data.forms.personalDetailForm, {
        SPA: true,
        dataType: 'json',
        validators: false,
    });

    const { form: academicInfoForm } = superForm(
        data.forms.qualificationInfoForm,
        {
            SPA: true,
            dataType: 'json',
            validators: false,
        },
    );
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Perkhidmatan Pegawai LKIM"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <CustomTabContent title="Umum">
            <div class="flex w-full flex-col gap-2 px-2.5">
                <!-- Maklumat Peperiksaan -->
                <ContentHeader
                    title="Maklumat Pegawai"
                    borderClass="border-none"
                    fontWeight="bold"
                    fontSize="small"
                    color="system-primary"
                    titlePadding={false}
                ></ContentHeader>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="fullName"
                    label={'Nama Penuh'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.name}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="identityCardNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.identityDocumentNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    placeholder="-"
                    bind:val={$form.birthDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="birhtplace"
                    label="Tempat Lahir"
                    placeholder="-"
                    bind:val={$form.birhtplace}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="religion"
                    label="Agama"
                    placeholder="-"
                    bind:val={$form.religion}
                ></CustomTextField>
                <hr />
                <ContentHeader
                    title="Maklumat Waris"
                    borderClass="border-none"
                    fontWeight="bold"
                    fontSize="small"
                    color="system-primary"
                    titlePadding={false}
                ></ContentHeader>
                {#if $form.nextOfKins.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab pill={true} id="nextOfKins">
                        {#each $form.nextOfKins as _, i}
                            <CustomTabContent title={$form.nextOfKins[i].name}>
                                <div
                                    class="w-full rounded-lg border border-system-primary p-2.5"
                                >
                                    <CustomTextField
                                        id="name"
                                        label={'Nama'}
                                        type="text"
                                        disabled
                                        isRequired={false}
                                        placeholder="-"
                                        bind:val={$form.nextOfKins[i].name}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="address"
                                        label={'Alamat'}
                                        disabled
                                        isRequired={false}
                                        placeholder="-"
                                        bind:val={$form.nextOfKins[i].address}
                                    ></CustomTextField>
                                </div>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </div>
        </CustomTabContent>
        <CustomTabContent title="Kelayakan">
            <div class="flex w-full flex-col gap-2">
                {#if $academicInfoForm.academics.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab pill={true} id="academics">
                        {#each $academicInfoForm.academics as _, i}
                            <CustomTabContent title={`Akademik #${i + 1}`}>
                                <div
                                    class="w-full rounded-lg border border-system-primary p-2.5"
                                >
                                    <input
                                        type="text"
                                        hidden
                                        bind:value={$academicInfoForm.academics[
                                            i
                                        ].educationId}
                                    />
                                    <CustomSelectField
                                        disabled
                                        isRequired={false}
                                        id="majorId"
                                        label={'Jurusan'}
                                        options={data.selectionOptions
                                            .majorMinorLookup}
                                        bind:val={$academicInfoForm.academics[i]
                                            .majorId}
                                    ></CustomSelectField>

                                    <CustomSelectField
                                        disabled
                                        isRequired={false}
                                        id="minorId"
                                        label={'Bidang'}
                                        bind:val={$academicInfoForm.academics[i]
                                            .minorId}
                                        options={data.selectionOptions
                                            .majorMinorLookup}
                                    ></CustomSelectField>

                                    <CustomSelectField
                                        disabled
                                        isRequired={false}
                                        id="countryId"
                                        label={'Negara'}
                                        bind:val={$academicInfoForm.academics[i]
                                            .countryId}
                                        options={data.selectionOptions
                                            .countryLookup}
                                    ></CustomSelectField>

                                    <CustomSelectField
                                        disabled
                                        isRequired={false}
                                        id="institutionId"
                                        label={'Institusi'}
                                        bind:val={$academicInfoForm.academics[i]
                                            .institutionId}
                                        options={data.selectionOptions
                                            .institutionLookup}
                                    ></CustomSelectField>

                                    <CustomSelectField
                                        disabled
                                        isRequired={false}
                                        id="educationLevelId"
                                        label={'Taraf Pendidikan'}
                                        bind:val={$academicInfoForm.academics[i]
                                            .educationLevelId}
                                        options={data.selectionOptions
                                            .educationLookup}
                                    ></CustomSelectField>

                                    <CustomSelectField
                                        disabled
                                        isRequired={false}
                                        id="sponsorshipId"
                                        label={'Penajaan'}
                                        bind:val={$academicInfoForm.academics[i]
                                            .sponsorshipId}
                                        options={data.selectionOptions
                                            .sponsorshipLookup}
                                    ></CustomSelectField>

                                    <CustomTextField
                                        disabled
                                        isRequired={false}
                                        id="name"
                                        label={'Nama Sijil/Pencapaian'}
                                        type="text"
                                        bind:val={$academicInfoForm.academics[i]
                                            .name}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled
                                        isRequired={false}
                                        id="completionDate"
                                        label="Tarikh Tamat Pembelajaran"
                                        type="date"
                                        bind:val={$academicInfoForm.academics[i]
                                            .completionDate}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled
                                        isRequired={false}
                                        id="finalGrade"
                                        label={'Ijazah/ CGPA/ Gred'}
                                        type="text"
                                        bind:val={$academicInfoForm.academics[i]
                                            .finalGrade}
                                    ></CustomTextField>

                                    <CustomTextField
                                        disabled
                                        isRequired={false}
                                        id="field"
                                        label={'Catatan'}
                                        type="text"
                                        bind:val={$academicInfoForm.academics[i]
                                            .field}
                                    ></CustomTextField>
                                </div>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </div>
        </CustomTabContent>
        <CustomTabContent title="Kenyataan Perkhidmatan">
            <div
                class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DataTable
                        title="Senarai Rekod Perkhidmatan"
                        bind:tableData={serviceStatementListTable}
                    >
                        <FilterWrapper slot="filter">
                            <FilterSelectField
                                label="Gred"
                                options={data.selectionOptions.gradeLookup}
                                bind:inputValue={serviceStatementListTable.param
                                    .filter.grade}
                            ></FilterSelectField>
                            <FilterSelectField
                                label="Tahun Perubahan"
                                options={data.selectionOptions.yearLookup}
                                bind:inputValue={serviceStatementListTable.param
                                    .filter.year}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Kenyataan Cuti">
            <div
                class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DataTable
                        title="Senarai Kenyataan Cuti"
                        bind:tableData={leaveStatementListTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            const route = `../integriti/prosiding/${rowData.integrityId}-${rowData.employeeId}-${rowData.isAppeal}`;

                            goto(route);
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="Jenis Cuti"
                                bind:inputValue={leaveStatementListTable.param
                                    .filter.leaveType}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Tahun"
                                options={data.selectionOptions.yearLookup}
                                bind:inputValue={leaveStatementListTable.param
                                    .filter.year}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Rekod Kelakuan">
            <div
                class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DataTable
                        title="Senarai Rekod Kelakuan"
                        bind:tableData={behaviourHistoriesListTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            const route = `../integriti/prosiding/${rowData.integrityId}-${rowData.employeeId}-${rowData.isAppeal}`;

                            goto(route);
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="Nota"
                                bind:inputValue={behaviourHistoriesListTable
                                    .param.filter.description}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Tahun"
                                options={data.selectionOptions.yearLookup}
                                bind:inputValue={behaviourHistoriesListTable
                                    .param.filter.year}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
