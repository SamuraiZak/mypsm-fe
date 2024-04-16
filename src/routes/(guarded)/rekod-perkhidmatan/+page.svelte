<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
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

    // Table list - Charge Appeal Table
    let chargeListTable: TableSettingDTO = {
        param: data.param,
        meta: data.responses.proceedingListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.list.proceedingList as ProceedingChargeListResponseDTO) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['integrityId', 'employeeId', 'declarationLetter'],
        dictionary: [
            {
                english: 'proceedingMeetingDate',
                malay: 'Tarikh Mesyuarat Prosiding',
            },
        ],
        url: 'integrity/proceeding/appeal/list',
        id: 'chargeListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    // Superforms
    const { form } = superForm(data.forms.proceedingStaffInfoForm, {
        SPA: true,
        dataType: 'json',
        validators: false,
    });

    const { form: academicInfoForm } = superForm(
        data.forms.academicInfoForm,

        {
            SPA: true,
            dataType: 'json',
            validators: false,
        },
    );

    const { form: nextOfKinInfoForm } = superForm(
        data.forms.nextOFKInInfoForm,

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
            <div class="flex w-full flex-col gap-2">
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
                    id="employeeNumber"
                    label={'No. Pekerja'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.employeeNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="fullName"
                    label={'Nama Penuh'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.fullName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.alternativeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="identityCardNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.identityCardNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="icColour"
                    label={'Jenis Kad Pengenalan'}
                    placeholder="-"
                    bind:val={$form.employeeDetail.icColour}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="email"
                    label={'Emel'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.email}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    placeholder="-"
                    bind:val={$form.employeeDetail.birthDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="birthplace"
                    label="Tempat Lahir"
                    placeholder="-"
                    bind:val={$form.employeeDetail.birthplace}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="nationality"
                    label="Warganegara"
                    placeholder="-"
                    bind:val={$form.employeeDetail.nationality}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="race"
                    label="Bangsa"
                    placeholder="-"
                    bind:val={$form.employeeDetail.race}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="ethnic"
                    label="Etnik"
                    placeholder="-"
                    bind:val={$form.employeeDetail.ethnic}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="religion"
                    label="Agama"
                    placeholder="-"
                    bind:val={$form.employeeDetail.religion}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="gender"
                    label="Jantina"
                    placeholder="-"
                    bind:val={$form.employeeDetail.gender}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="marital"
                    label="Status Perkahwinan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.marital}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="homeAddress"
                    label="Alamat Rumah"
                    placeholder="-"
                    bind:val={$form.employeeDetail.homeAddress}
                />

                <CustomTextField
                    disabled
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    placeholder="-"
                    bind:val={$form.employeeDetail.mailAddress}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="houseLoanType"
                    label="Perumahan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.houseLoanType}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="houseLoan"
                    label="Pinjaman Perumahan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.houseLoan}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="vehicleLoan"
                    label="Pinjaman Kenderaan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.vehicleLoan}
                />

                <CustomTextField
                    disabled
                    id="isExPolice"
                    label="Bekas Polis / Tentera"
                    placeholder="-"
                    bind:val={$form.employeeDetail.isExPolice}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="isRelatedToLKIM"
                    label="Perhubungan Dengan Kakitangan LKIM"
                    placeholder="-"
                    bind:val={$form.employeeDetail.isRelatedToLKIM}
                ></CustomTextField>

                {#if $form.employeeDetail.isRelatedToLKIM}
                    <CustomTextField
                        disabled
                        id="employeeNumber"
                        label="No. Pekerja LKIM"
                        bind:val={$form.employeeDetail.relationDetail
                            .employeeNumber}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="employeeName"
                        label={'Nama Kakitangan LKIM'}
                        bind:val={$form.employeeDetail.relationDetail.fullName}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="relationDetailPosition"
                        label="Jawatan Kakitangan LKIM"
                        bind:val={$form.employeeDetail.relationDetail.position}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="relationDetailRelationship"
                        label="Hubungan"
                        bind:val={$form.employeeDetail.relationDetail
                            .relationship}
                    ></CustomTextField>
                {/if}
                <hr />
                <ContentHeader
                    title="Maklumat Waris"
                    borderClass="border-none"
                    fontWeight="bold"
                    fontSize="small"
                    color="system-primary"
                    titlePadding={false}
                ></ContentHeader>
                {#if $nextOfKinInfoForm.nextOfKins.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab id="nextOfKins">
                        {#each $nextOfKinInfoForm.nextOfKins as _, i}
                            <CustomTabContent
                                title={i +
                                    1 +
                                    '. ' +
                                    $nextOfKinInfoForm.nextOfKins[i].name}
                            >
                                <CustomTextField
                                    id="name"
                                    label={'Nama'}
                                    type="text"
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .name}
                                ></CustomTextField>

                                <CustomTextField
                                    id="alternativeName"
                                    label={'Nama Lain'}
                                    type="text"
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .alternativeName}
                                ></CustomTextField>
                                <CustomTextField
                                    id="identityDocumentColor"
                                    label={'Jenis Kad Pengenalan'}
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .identityDocumentColor}
                                ></CustomTextField>
                                <CustomTextField
                                    id="identityDocumentNumber"
                                    type="number"
                                    label={'Nombor Kad Pengenalan'}
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .identityDocumentNumber}
                                ></CustomTextField>

                                <CustomTextField
                                    id="address"
                                    label={'Alamat'}
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .address}
                                ></CustomTextField>

                                <CustomTextField
                                    id="postcode"
                                    label={'Poskod'}
                                    type="text"
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .postcode}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    type="date"
                                    id="birthDate"
                                    label={'Tarikh Lahir'}
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .birthDate}
                                ></CustomTextField>

                                <CustomTextField
                                    id="birthCountryId"
                                    label={'Negara Kelahiran'}
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .birthCountryId}
                                ></CustomTextField>

                                <CustomTextField
                                    id="birthStateId"
                                    label={'Negeri Kelahiran'}
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .birthStateId}
                                ></CustomTextField>

                                <CustomTextField
                                    id="relationshipId"
                                    label={'Hubungan'}
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .relationshipId}
                                ></CustomTextField>

                                <CustomTextField
                                    id="educationLevelId"
                                    label={'Taraf Pendidikan'}
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .educationLevelId}
                                ></CustomTextField>

                                <CustomTextField
                                    id="raceId"
                                    label={'Bangsa'}
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .raceId}
                                ></CustomTextField>

                                <CustomTextField
                                    id="nationalityId"
                                    label={'Kewarganegaraan'}
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .nationalityId}
                                ></CustomTextField>

                                <CustomTextField
                                    id="maritalId"
                                    label={'Status Perkhahwinan'}
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .maritalId}
                                ></CustomTextField>

                                <CustomTextField
                                    id="genderId"
                                    label={'Jantina'}
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .genderId}
                                ></CustomTextField>

                                <CustomTextField
                                    id="workAddress"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .workAddress}
                                ></CustomTextField>

                                <CustomTextField
                                    id="workPostcode"
                                    label={'Poskod Majikan'}
                                    type="text"
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .workPostcode}
                                ></CustomTextField>

                                <CustomTextField
                                    id="phoneNumber"
                                    label={'Nombor Telefon Bimbit'}
                                    type="text"
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .phoneNumber}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    type="date"
                                    id="marriageDate"
                                    label={'Tarikh Kahwin'}
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .marriageDate}
                                ></CustomTextField>

                                <CustomTextField
                                    id="inSchool"
                                    label={'Bersekolah'}
                                    disabled
                                    bind:val={$nextOfKinInfoForm.nextOfKins[i]
                                        .inSchool}
                                ></CustomTextField>
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
                    <CustomTab id="academics">
                        {#each $academicInfoForm.academics as _, i}
                            <CustomTabContent title={`Akademik #${i + 1}`}>
                                <input
                                    type="text"
                                    hidden
                                    bind:value={$academicInfoForm.academics[i]
                                        .educationId}
                                />
                                <CustomTextField
                                    disabled
                                    id="majorId"
                                    label={'Jurusan'}
                                    bind:val={$academicInfoForm.academics[i]
                                        .majorId}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="minorId"
                                    label={'Bidang'}
                                    bind:val={$academicInfoForm.academics[i]
                                        .minorId}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="countryId"
                                    label={'Negara'}
                                    bind:val={$academicInfoForm.academics[i]
                                        .countryId}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="institutionId"
                                    label={'Institusi'}
                                    bind:val={$academicInfoForm.academics[i]
                                        .institutionId}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="educationLevelId"
                                    label={'Taraf Pendidikan'}
                                    bind:val={$academicInfoForm.academics[i]
                                        .educationLevelId}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="sponsorshipId"
                                    label={'Penajaan'}
                                    bind:val={$academicInfoForm.academics[i]
                                        .sponsorshipId}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="name"
                                    label={'Nama Sijil/Pencapaian'}
                                    type="text"
                                    bind:val={$academicInfoForm.academics[i]
                                        .name}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="completionDate"
                                    label="Tarikh Tamat Pembelajaran"
                                    type="date"
                                    bind:val={$academicInfoForm.academics[i]
                                        .completionDate}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="finalGrade"
                                    label={'Ijazah/ CGPA/ Gred'}
                                    type="text"
                                    bind:val={$academicInfoForm.academics[i]
                                        .finalGrade}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="field"
                                    label={'Bidang'}
                                    type="text"
                                    bind:val={$academicInfoForm.academics[i]
                                        .field}
                                ></CustomTextField>
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
                        bind:tableData={chargeListTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            const route = `../integriti/prosiding/${rowData.integrityId}-${rowData.employeeId}-${rowData.isAppeal}`;

                            goto(route);
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterSelectField label="Status"
                            ></FilterSelectField>
                            <FilterDateField
                                label="Tarikh"
                                bind:inputValue={chargeListTable.param.filter
                                    .status}
                            ></FilterDateField>
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
                        bind:tableData={chargeListTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            const route = `../integriti/prosiding/${rowData.integrityId}-${rowData.employeeId}-${rowData.isAppeal}`;

                            goto(route);
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterSelectField label="Status"
                            ></FilterSelectField>
                            <FilterDateField
                                label="Tarikh Daripada"
                                bind:inputValue={chargeListTable.param.filter
                                    .status}
                            ></FilterDateField>
                            <FilterDateField
                                label="Tarikh Sehingga"
                                bind:inputValue={chargeListTable.param.filter
                                    .status}
                            ></FilterDateField>
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
                        bind:tableData={chargeListTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            const route = `../integriti/prosiding/${rowData.integrityId}-${rowData.employeeId}-${rowData.isAppeal}`;

                            goto(route);
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterSelectField label="Pengesah"
                            ></FilterSelectField>
                            <FilterDateField
                                label="Tarikh"
                                bind:inputValue={chargeListTable.param.filter
                                    .status}
                            ></FilterDateField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
