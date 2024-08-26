<script lang="ts">
    import { _checkIfFail, _createNewOfferMeetingForm } from './+page';
    import { getEmptyDataToast } from '$lib/helpers/core/toast.helper';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type { ConfirmationListResponseDTO } from '$lib/dto/mypsm/employment/confirmation/confirmation_request_response.dto';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms';
    import { Modal } from 'flowbite-svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import { _createMeetingBatchSchema } from '$lib/schemas/mypsm/employment/new-offer/schema';
    import { zod } from 'sveltekit-superforms/adapters';

    export let data: PageData;
    let openModal: boolean = false;
    let rowData: ConfirmationListResponseDTO;

    // Table list - New Offer Meeting
    let confirmationRationalisationListTable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.responses.employeesListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.responses.employeesListResponse.data
                ?.dataList as ConfirmationListResponseDTO[]) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [
            {
                english: 'positionByBoard',
                malay: 'Jawatan Mengikut Waran',
            },
            {
                english: 'employedDate',
                malay: 'Tarikh Mula Perkhidmatan',
            },
        ],
        url: 'employee/list',
        id: 'confirmationRationalisationListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: true,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    // Superforms
    const { form, errors, enhance } = superForm(
        data.form.newOfferMeetingDetailForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: zod(_createMeetingBatchSchema),
            taintedMessage: false,
            onSubmit() {
                _createNewOfferMeetingForm($form);
            },
        },
    );

    const addToMeeting = () => {
        if (confirmationRationalisationListTable.selectedData.length < 1) {
            getEmptyDataToast();
        } else {
            $form.employees = (
                confirmationRationalisationListTable.selectedData as CommonEmployeeDTO[]
            ).map((data) => ({
                employeeId: Number(data.employeeId),
            }));
            openModal = true;
        }
    };

    // Table list
    let includedEmployeesListTable: TableSettingDTO = {
        param: data.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (confirmationRationalisationListTable.selectedData as CommonEmployeeDTO[]) ??
            [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [
            'employeeId',
            'program',
            'scheme',
            'grade',
            'position',
            'placement',
        ],
        dictionary: [],
        url: '',
        id: 'includedEmployeesListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
            footer: false,
        },
        controls: {
            add: false,
            header: false,
        },
    };

    $: {
        includedEmployeesListTable.data =
            (confirmationRationalisationListTable.selectedData as CommonEmployeeDTO[]) ??
            [];
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengesahan Lantikan ke Gred/Skim Baru (Rasionalisasi)"
    >
        <!-- <TextIconButton
            label="Simpan"
            type="neutral"
            onClick={() => {
                $form.isDraft = true;
                addToMeeting();
            }}
        /> -->
        <TextIconButton
            label="Tambah"
            type="primary"
            onClick={() => {
                $form.isDraft = false;
                addToMeeting();
            }}
        />
        <TextIconButton
            label="Kembali"
            type="neutral"
            onClick={() => {
                goto('../confirmation');
            }}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DataTable
                title="Senarai Pekerja"
                bind:tableData={confirmationRationalisationListTable}
                bind:passData={rowData}
                selectActions={() => {
                    _checkIfFail(
                        rowData.applicationId,
                        rowData.employeeId,
                        'Baharu',
                    );
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={confirmationRationalisationListTable
                            .param.filter.employeeNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={confirmationRationalisationListTable
                            .param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={confirmationRationalisationListTable
                            .param.filter.identityDocumentNumber}
                    ></FilterTextField>
                    <FilterSelectField
                        label="Gred Semasa"
                        options={data.selectionOptions.gradeLookup}
                        bind:inputValue={confirmationRationalisationListTable
                            .param.filter.grade}
                    ></FilterSelectField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>

<Toaster />

<Modal bind:open={openModal} size="xs" autoclose={false} class="w-fit">
    <div class="text-center">
        <form
            id="newOfferMeetingFormId"
            method="POST"
            use:enhance
            class="flex flex-col items-center space-y-6"
        >
            <h3
                class="mb-4 text-xl font-semibold text-gray-900 dark:text-white"
            >
                Mesyuarat Tawaran Baru
            </h3>
            <p class="text-sm">
                Kumpulan dibawa ke mesyuarat ini akan direkodkan. Sila kemaskini
                keputusan meyuarat di jadual hadapan
            </p>
            <p class="text-sm">
                Bilangan Kakitangan Dipilih: {$form.employees.length}
            </p>
            <DataTable title="" bind:tableData={includedEmployeesListTable}
            ></DataTable>
            <span class="w-full">
                <CustomTextField
                    errors={$errors.meetingGroupName}
                    id="meetingGroupName"
                    type="text"
                    label="Sila Tetapkan Nama Kumpulan Mesyuarat"
                    placeholder={'Kumpulan #12'}
                    bind:val={$form.meetingGroupName}
                ></CustomTextField>
                <CustomTextField
                    errors={$errors.meetingDate}
                    id="meetingDate"
                    type="date"
                    label="Tarikh Mesyuarat"
                    bind:val={$form.meetingDate}
                ></CustomTextField>
            </span>
            <div class="flex flex-row gap-x-4">
                <TextIconButton
                    label={$form.isDraft ? 'Simpan' : 'Tambah'}
                    type="primary"
                    form="newOfferMeetingFormId"
                />
                <TextIconButton
                    label="Batal"
                    type="neutral"
                    onClick={() => {
                        goto('../new-offer');
                    }}
                />
            </div>
        </form>
    </div>
</Modal>
