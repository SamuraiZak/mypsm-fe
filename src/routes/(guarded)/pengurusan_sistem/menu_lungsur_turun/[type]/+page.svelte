<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { LookupCategoryDTO } from '$lib/dto/core/lookup/lookup-item.dto';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms';
    import {
        LookupCommonSchema,
        LookupDistrictSchema,
        LookupEmploymentStatusSchema,
        LookupGradeSchema,
        LookupMeetingSchema,
        LookupRelationshipSchema,
    } from '$lib/schemas/core/lookup.schema';
    import { Modal } from 'flowbite-svelte';
    import { LookupCategoryConstant } from '$lib/constants/core/lookup-category.constant';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { _submitForm } from './+page';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;

    let param: CommonListRequestDTO = data.props.listParam;

    let selectedData: any;

    let showModal: boolean = false;

    let modalTitle: string = '';

    let isNew: boolean = false;

    function handleEdit(param: LookupCategoryDTO) {
        // fill the form data
        switch (data.props.currentCategory) {
            case LookupCategoryConstant.district:
                $formDistrict = { ...selectedData };
                break;
            case LookupCategoryConstant.meetingType:
                $formMeeting = { ...selectedData };
                break;
            case LookupCategoryConstant.relationship:
                $formRelationship = { ...selectedData };
                break;
            case LookupCategoryConstant.employmentStatus:
                $formEmploymentStatus = { ...selectedData };
                break;
            case LookupCategoryConstant.grade:
                $formGrade = { ...selectedData };
                break;

            default:
                $formCommon = { ...selectedData };
                break;
        }
        // set the mode
        isNew = false;
        // set modal title
        modalTitle = 'Edit';
        showModal = true;
    }
    function handleAdd() {
        // reset the form data
        switch (data.props.currentCategory) {
            case LookupCategoryConstant.district:
                $formDistrict = { ...data.forms.formDistrict.data };
                break;
            case LookupCategoryConstant.meetingType:
                $formMeeting = { ...data.forms.formMeeting.data };
                break;
            case LookupCategoryConstant.relationship:
                $formRelationship = { ...selectedData };
                break;
            case LookupCategoryConstant.employmentStatus:
                $formEmploymentStatus = {
                    ...data.forms.formEmploymentStatus.data,
                };
                break;
            case LookupCategoryConstant.grade:
                $formGrade = { ...data.forms.formGrade.data };
                break;

            default:
                $formCommon = { ...data.forms.formCommon.data };
                break;
        }

        // set the mode
        isNew = true;
        // set modal title
        modalTitle = 'Tambah';
        showModal = true;
    }

    // setting up table
    let newTable: TableSettingDTO = {
        param: data.props.listParam,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id', 'code', 'occSectorCode'],
        dictionary: [
            {
                english: 'description',
                malay: 'Nama',
            },
        ],
        url: data.props.currentCategory.url + '/filter',
        id: 'lookupListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: true,
            select: false,
            filter: true,
        },
        controls: {
            add: true,
        },
    };

    // common form
    const {
        form: formCommon,
        errors: errorsCommon,
        enhance: enhanceCommon,
    } = superForm(data.forms.formCommon, {
        id: 'formCommon',
        SPA: true,
        validators: zodClient(LookupCommonSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(
                $formCommon,
                data.props.currentCategory,
                isNew,
                newTable,
            ).then((value) => {
                if (value.response.status == 'success') {
                    if (value.newData.status == 'success') {
                        newTable.data = value.newData.data?.dataList ?? [];
                    }

                    showModal = false;
                }
            });
        },
    });

    // District form
    const {
        form: formDistrict,
        errors: errorsDistrict,
        enhance: enhanceDistrict,
    } = superForm(data.forms.formDistrict, {
        id: 'formDistrict',
        SPA: true,
        validators: zodClient(LookupDistrictSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(
                $formDistrict,
                data.props.currentCategory,
                isNew,
                newTable,
            ).then((value) => {
                if (value.response.status == 'success') {
                    if (value.newData.status == 'success') {
                        newTable.data = value.newData.data?.dataList ?? [];
                    }

                    showModal = false;
                }
            });
        },
    });

    // Meeting form
    const {
        form: formMeeting,
        errors: errorsMeeting,
        enhance: enhanceMeeting,
    } = superForm(data.forms.formMeeting, {
        id: 'formMeeting',
        SPA: true,
        validators: zodClient(LookupMeetingSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(
                $formMeeting,
                data.props.currentCategory,
                isNew,
                newTable,
            ).then((value) => {
                if (value.response.status == 'success') {
                    if (value.newData.status == 'success') {
                        newTable.data = value.newData.data?.dataList ?? [];
                    }

                    showModal = false;
                }
            });
        },
    });

    // Relationship form
    const {
        form: formRelationship,
        errors: errorsRelationship,
        enhance: enhanceRelationship,
    } = superForm(data.forms.formRelationship, {
        id: 'formRelationship',
        SPA: true,
        validators: zodClient(LookupRelationshipSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(
                $formRelationship,
                data.props.currentCategory,
                isNew,
                newTable,
            ).then((value) => {
                if (value.response.status == 'success') {
                    if (value.newData.status == 'success') {
                        newTable.data = value.newData.data?.dataList ?? [];
                    }

                    showModal = false;
                }
            });
        },
    });

    // EmploymentStatus form
    const {
        form: formEmploymentStatus,
        errors: errorsEmploymentStatus,
        enhance: enhanceEmploymentStatus,
    } = superForm(data.forms.formEmploymentStatus, {
        id: 'formEmploymentStatus',
        SPA: true,
        validators: zodClient(LookupEmploymentStatusSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(
                $formEmploymentStatus,
                data.props.currentCategory,
                isNew,
                newTable,
            ).then((value) => {
                if (value.response.status == 'success') {
                    if (value.newData.status == 'success') {
                        newTable.data = value.newData.data?.dataList ?? [];
                    }

                    showModal = false;
                }
            });
        },
    });

    // Grade form
    const {
        form: formGrade,
        errors: errorsGrade,
        enhance: enhanceGrade,
    } = superForm(data.forms.formGrade, {
        id: 'formGrade',
        SPA: true,
        validators: zodClient(LookupGradeSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(
                $formGrade,
                data.props.currentCategory,
                isNew,
                newTable,
            ).then((value) => {
                if (value.response.status == 'success') {
                    if (value.newData.status == 'success') {
                        newTable.data = value.newData.data?.dataList ?? [];
                    }

                    showModal = false;
                }
            });
        },
    });
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title={data.props.currentCategory.name}></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai {data.props.currentCategory.name}"
                bind:tableData={newTable}
                bind:passData={selectedData}
                editActions={() => {
                    handleEdit(selectedData);
                }}
                addActions={() => {
                    handleAdd();
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama"
                        bind:inputValue={newTable.param.filter.description}
                    ></FilterTextField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>

<Modal bind:open={showModal} title={modalTitle}>
    {#if data.props.currentCategory.name == LookupCategoryConstant.district.name}
        <form
            id="formDistrict"
            method="POST"
            use:enhanceDistrict
            class="flex w-full flex-col items-center justify-start gap-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama'}
                    bind:val={$formDistrict.description}
                    bind:errors={$errorsDistrict.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="divisionCode"
                    label={'Bahagian'}
                    bind:val={$formDistrict.divisionCode}
                    bind:errors={$errorsDistrict.divisionCode}
                ></CustomTextField>
            </div>
            <div
                class="flex h-10 w-full flex-row items-center justify-end gap-2"
            >
                <TextIconButton
                    label="Batal"
                    type="light"
                    onClick={() => {
                        showModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton label="Simpan" form="formDistrict"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentCategory.name == LookupCategoryConstant.meetingType.name}
        <form
            id="formMeeting"
            method="POST"
            use:enhanceMeeting
            class="flex w-full flex-col items-center justify-start gap-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama'}
                    bind:val={$formMeeting.description}
                    bind:errors={$errorsMeeting.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="module"
                    label={'Modul'}
                    bind:val={$formMeeting.module}
                    bind:errors={$errorsMeeting.module}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="module"
                    label={'Submodul'}
                    bind:val={$formMeeting.subModule}
                    bind:errors={$errorsMeeting.subModule}
                ></CustomTextField>
            </div>
            <div
                class="flex h-10 w-full flex-row items-center justify-end gap-2"
            >
                <TextIconButton
                    label="Batal"
                    type="light"
                    onClick={() => {
                        showModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton label="Simpan" form="formMeeting"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentCategory.name == LookupCategoryConstant.relationship.name}
        <form
            id="formRelationship"
            method="POST"
            use:enhanceRelationship
            class="flex w-full flex-col items-center justify-start gap-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama'}
                    bind:val={$formRelationship.description}
                    bind:errors={$errorsRelationship.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomSelectField
                    id="isFamily"
                    label={'Adakah Hubungan Ini Dianggap Ahli Keluarga?'}
                    bind:val={$formRelationship.isFamily}
                    errors={$errorsRelationship.isFamily}
                    options={data.props.isFamilyDropdown}
                ></CustomSelectField>
            </div>
            <div
                class="flex h-10 w-full flex-row items-center justify-end gap-2"
            >
                <TextIconButton
                    label="Batal"
                    type="light"
                    onClick={() => {
                        showModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton label="Simpan" form="formRelationship"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentCategory.name == LookupCategoryConstant.employmentStatus.name}
        <form
            id="formEmploymentStatus"
            method="POST"
            use:enhanceEmploymentStatus
            class="flex w-full flex-col items-center justify-start gap-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="occSectorName"
                    label={'Nama'}
                    bind:val={$formEmploymentStatus.occSectorName}
                    bind:errors={$errorsEmploymentStatus.occSectorName}
                ></CustomTextField>
            </div>
            <div
                class="flex h-10 w-full flex-row items-center justify-end gap-2"
            >
                <TextIconButton
                    label="Batal"
                    type="light"
                    onClick={() => {
                        showModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton label="Simpan" form="formEmploymentStatus"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentCategory.name == LookupCategoryConstant.grade.name}
        <form
            id="formGrade"
            method="POST"
            use:enhanceGrade
            class="flex w-full flex-col items-center justify-start gap-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="ssmCode"
                    label={'Kod SSM'}
                    bind:val={$formGrade.ssmCode}
                    bind:errors={$errorsGrade.ssmCode}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="minimumSalary"
                    label={'Gaji Minimum'}
                    bind:val={$formGrade.minimumSalary}
                    bind:errors={$errorsGrade.minimumSalary}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="maximumSalary"
                    label={'Gaji Maksimum'}
                    bind:val={$formGrade.maximumSalary}
                    bind:errors={$errorsGrade.maximumSalary}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="annualIncrementRate"
                    label={'Kenaikan Gaji Tahunan'}
                    bind:val={$formGrade.annualIncrementRate}
                    bind:errors={$errorsGrade.annualIncrementRate}
                ></CustomTextField>
            </div>
            <div
                class="flex h-10 w-full flex-row items-center justify-end gap-2"
            >
                <TextIconButton
                    label="Batal"
                    type="light"
                    onClick={() => {
                        showModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton label="Simpan" form="formGrade"
                ></TextIconButton>
            </div>
        </form>
    {:else}
        <form
            id="formCommon"
            method="POST"
            use:enhanceCommon
            class="flex w-full flex-col items-center justify-start gap-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama'}
                    bind:val={$formCommon.description}
                    bind:errors={$errorsCommon.description}
                ></CustomTextField>
            </div>
            <div
                class="flex h-10 w-full flex-row items-center justify-end gap-2"
            >
                <TextIconButton
                    label="Batal"
                    type="light"
                    onClick={() => {
                        showModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton label="Simpan" form="formCommon"
                ></TextIconButton>
            </div>
        </form>
    {/if}
</Modal>

<Toaster></Toaster>
