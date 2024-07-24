<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import {
        monthNumberLookup,
        successBooleanOption,
    } from '$lib/constants/core/dropdown.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { Modal } from 'flowbite-svelte';
    import type { ExcludedEmployee } from '$lib/dto/mypsm/gaji/pergerakan-gaji/salary-movement-list.dto';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _salaryMovementComment } from '$lib/schemas/mypsm/gaji/salary-schema';
    import { _submitCommentForm } from './+page';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

    export let data: PageData;

    let openModal: boolean = false;
    let selectedRow: ExcludedEmployee;

    let salaryRecordTable: TableSettingDTO = {
        param: data.props.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: data.table.excludedEmployee.length,
            totalPage: 1,
        },
        data: data.table.excludedEmployee,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'isIncluded'],
        dictionary: [
            { english: 'kgt', malay: 'KGT (RM)' },
            { english: 'currentAllowance', malay: 'Elaun Semasa (RM)' },
            {
                english: 'currentCriticalAllowance',
                malay: 'Elaun Kritikal Semasa (RM)',
            },
            { english: 'newAllowance', malay: 'Elaun Baru (RM)' },
            {
                english: 'newCriticalAllowance',
                malay: 'Elaun Kritikal Baru (RM)',
            },
            { english: 'grade', malay: 'Gred dan Jawatan' },
            { english: 'remark', malay: 'Catatan' },
        ],
        url: '',
        id: 'salaryRecordTable',
        option: {
            checkbox:
                data.props.movementType == 'Kenaikan Gaji Tahunan'
                    ? true
                    : false,
            detail: false,
            edit:
                data.props.movementType == 'Kenaikan Gaji Tahunan'
                    ? true
                    : false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
            pdf: true,
            excel: true,
        },
    };

    const {
        form: commentForm,
        errors: commentError,
        enhance: commentEnhance,
    } = superForm(data.form.commentForm, {
        SPA: true,
        taintedMessage: false,
        id: 'commentForm',
        dataType: 'json',
        invalidateAll: true,
        validators: zod(_salaryMovementComment),
        async onSubmit() {
            $commentForm.id = data.props.id.id;
            $commentForm.employeeId = selectedRow.employeeId;

            await _submitCommentForm($commentForm).finally(
                () => (openModal = false),
            );
        },
    });

    $: {
        salaryRecordTable.data = data.table.excludedEmployee;
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Kemaskini {data.props.movementType}">
        <TextIconButton
            label="Tutup"
            icon="cancel"
            type="neutral"
            onClick={() => goto('/v2/salary/movement')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan">
                <TextIconButton label="Draf" type="draft" icon="save" />
                <TextIconButton
                    label="Hantar"
                    icon="check"
                    onClick={() => console.log('do something here')}
                />
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-none">
                <div class="w-full max-w-full overflow-hidden flex flex-col justify-start items-start">
                    <CustomTab>
                        <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
                            <div class="w-full max-w-full overflow-x-hidden flex flex-col justify-start items-start">
    
                                <div class="w-full flex flex-col justify-start items-start max-w-full">
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium">Arahan: </span>
                                            Pilih kakitangan untuk dikecualikan dari senarai
                                            kakitangan yang terlibat atau tambah catatan
                                            untuk kakitangan.
                                        </p>
                                    </Alert>
                                </div>
                                <div class="h-fit w-full flex flex-col justify-start items-start max-w-full overflow-x-hidden">
                                    <DataTable
                                        title="Senarai Kakitangan"
                                        bind:tableData={salaryRecordTable}
                                        bind:passData={selectedRow}
                                        editActions={() => (openModal = true)}
                                    >
                                        <!-- <FilterWrapper slot="filter">
                                            <FilterTextField
                                            label="Nama"
                                            bind:inputValue={salaryRecordTable.param.filter
                                                .name}
                                        />
                                        <FilterTextField
                                            label="No. Pekerja"
                                            bind:inputValue={salaryRecordTable.param.filter
                                                .employeeNumber}
                                        />
                                        <FilterTextField
                                            label="No. Kad Pengenalan"
                                            bind:inputValue={salaryRecordTable.param.filter
                                                .identityDocumentNumber}
                                        />
                                            <FilterSelectField
                                                label="Gred"
                                                options={data.props.lookup.salaryMovementMonth}
                                                inputValue=""
                                            />
                                            <FilterSelectField
                                                label="Jawatan"
                                                options={kgtMonthLookup}
                                                inputValue=""
                                            />
                                        </FilterWrapper> -->
                                    </DataTable>
                                </div>
                            </div>
                        </CustomTabContent>
                        <CustomTabContent
                            title="Senarai Kakitangan Yang Dikecualikan"
                        >
                            <div class="w-full">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium">Arahan: </span>
                                        Pilih kakitangan untuk dimasukkan ke dalam senarai
                                        kakitangan yang terlibat atau tambah catatan
                                        untuk kakitangan.
                                    </p>
                                </Alert>
                            </div>
                            <div class="h-fit w-full">
                                <DataTable
                                    title="Senarai Kakitangan Yang Dikecualikan"
                                    bind:tableData={salaryRecordTable}
                                    bind:passData={selectedRow}
                                    editActions={() => (openModal = true)}
                                >
                                    <!-- <FilterWrapper slot="filter">
                                        <FilterTextField
                                        label="Nama"
                                        bind:inputValue={salaryRecordTable.param.filter
                                            .name}
                                    />
                                    <FilterTextField
                                        label="No. Pekerja"
                                        bind:inputValue={salaryRecordTable.param.filter
                                            .employeeNumber}
                                    />
                                    <FilterTextField
                                        label="No. Kad Pengenalan"
                                        bind:inputValue={salaryRecordTable.param.filter
                                            .identityDocumentNumber}
                                    />
                                        <FilterSelectField
                                            label="Gred"
                                            options={data.props.lookup.salaryMovementMonth}
                                            inputValue=""
                                        />
                                        <FilterSelectField
                                            label="Jawatan"
                                            options={kgtMonthLookup}
                                            inputValue=""
                                        />
                                    </FilterWrapper> -->
                                </DataTable>
                            </div>
                        </CustomTabContent>
                    </CustomTab>
                    </div>
            </StepperContentBody>
        </StepperContent>

        {#if data.props.movementType == 'Kenaikan Gaji Tahunan'}
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat">
                    <TextIconButton label="Draf" type="draft" icon="save" />
                    <TextIconButton
                        label="Hantar"
                        form="meetingResultForm"
                        icon="check"
                    />
                </StepperContentHeader>
                <StepperContentBody paddingClass="p-5">
                    <form id="meetingResultForm" class="flex w-full">
                        <div class="flex w-1/2 flex-col justify-start">
                            <div class="w-full pb-5">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Arahan:
                                        </span>
                                        Masukkan maklumat dan keputusan mesyuarat
                                        di ruangan yang disediakan.
                                    </p>
                                </Alert>
                            </div>
                            <CustomTextField
                                id="monthAndYear"
                                disabled
                                isRequired={false}
                                label="Bulan dan Tahun Pergerakan Gaji"
                                val={data.form.applicationDetail
                                    .salaryMovementMonth +
                                    ' - ' +
                                    data.form.applicationDetail
                                        .salaryMovementYear}
                            />
                            <CustomTextField
                                id="status"
                                disabled
                                isRequired={false}
                                label="Status"
                                val={data.form.applicationDetail.status}
                            />
                            <CustomTextField
                                id="totalEmployee"
                                disabled
                                isRequired={false}
                                label="Jumlah Kakitangan"
                                val={data.form.applicationDetail.totalEmployee}
                            />
                            <CustomTextField
                                id="meetingName"
                                disabled
                                isRequired={false}
                                label="Nama dan Bilangan Mesyuarat"
                                val={data.form.applicationDetail.meetingName}
                            />
                            <CustomTextField
                                id="meetingDate"
                                type="date"
                                disabled
                                isRequired={false}
                                label="Tarikh Mesyuarat"
                                val={data.form.applicationDetail.meetingDate}
                            />
                            <CustomTextField
                                id="feedback"
                                isRequired={false}
                                type="textarea"
                                label="Tindakan/Ulasan"
                                val={data.form.applicationDetail.totalEmployee}
                            />
                            <CustomSelectField
                                id="meetingResult"
                                label="Keputusan Mesyuarat"
                                options={successBooleanOption}
                                val={true}
                            />
                        </div>
                    </form>
                </StepperContentBody>
            </StepperContent>
        {:else}
            <StepperContent>
                <StepperContentHeader title="Maklumat Kumpulan" />
                <StepperContentBody paddingClass="p-5">
                    <div class="flex w-full">
                        <div class="flex w-1/2 flex-col justify-start">
                            <CustomTextField
                                id="movementType"
                                isRequired={false}
                                label="Jenis Pergerakan Gaji"
                                disabled
                                val={data.props.movementType}
                            />
                            <CustomSelectField
                                id="month"
                                isRequired={false}
                                options={monthNumberLookup}
                                disabled
                                label="Bulan Berkuatkuasa"
                                val={4}
                            />
                            <CustomTextField
                                id="totalPayment"
                                isRequired={false}
                                label="Jumlah (RM)"
                                disabled
                                type="number"
                                val={100}
                            />
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster />

<Modal title="Sistem MyPSM" bind:open={openModal} dismissable={false} size="md">
    <form
        class="flex w-full flex-col justify-start gap-6"
        id="commentForm"
        method="POST"
        use:commentEnhance
    >
        <Alert color="blue" class="flex flex-col gap-2.5">
            <p>
                <span class="font-medium">No. Pekerja: </span>
                {selectedRow?.employeeNumber}
            </p>
            <p>
                <span class="font-medium">Nama Kakitangan: </span>
                {selectedRow?.name}
            </p>
            <p>
                <span class="font-medium">Gred: </span>
                {selectedRow?.grade}
            </p>
            <div class="flex h-fit w-full flex-col justify-center">
                <span class="font-medium">Catatan: </span>
                <CustomTextField
                    id="remark"
                    type="textarea"
                    isRequired={false}
                    label=""
                    bind:val={$commentForm.remarks}
                    errors={$commentError.remarks}
                />
            </div>
        </Alert>
    </form>
    <div class="flex justify-center gap-3">
        <TextIconButton
            label="Batal"
            icon="cancel"
            type="neutral"
            onClick={() => (openModal = false)}
        />
        <TextIconButton label="Hantar" icon="check" form="commentForm" />
    </div>
</Modal>
