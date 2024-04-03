<script lang="ts">
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { Modal } from 'flowbite-svelte';
    import type { PageData } from './$types';
    import { _submitForm, _updateTable } from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        LookupDepartmentSchema,
        LookupEmploymentStatusSchema,
        LookupGradeSchema,
        LookupPlacementSchema,
        LookupPositionSchema,
        LookupProgramSchema,
        LookupSchemeSchema,
        LookupSectionSchema,
        LookupServiceGroupSchema,
        LookupServiceTypeSchema,
        LookupUnitSchema,
    } from '$lib/schemas/core/lookup.schema';
    import { LookupItemConstant } from '$lib/constants/core/lookup-item.constant';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;

    let openModal: boolean = false;

    let modalTitle: string = 'Edit';

    let isAddMode: boolean = true;

    let selectedData: any;

    let param: CommonListRequestDTO = data.props.listParam;

    let table: TableDTO = {
        param: param,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        hiddenData: ['id', 'code'],
    };

    // table search function
    async function _search() {
        _updateTable(table.param, data.props.currentType).then((value) => {
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

    // edit function to open modal
    function showModal(isEdit: boolean) {
        if (isEdit) {
            isAddMode = false;
            modalTitle =
                'Edit - ' + data.props.currentType.name.replaceAll('_', ' ');

            switch (data.props.currentType.name) {
                case LookupItemConstant.department.name:
                    $departmentForm = { ...selectedData };
                    break;
                case LookupItemConstant.grade.name:
                    $gradeForm = { ...selectedData };
                    break;
                case LookupItemConstant.employmentStatus.name:
                    $employmentStatusForm = { ...selectedData };
                    break;
                case LookupItemConstant.placement.name:
                    $placementForm = { ...selectedData };
                    break;
                case LookupItemConstant.position.name:
                    $positionForm = { ...selectedData };
                    break;
                case LookupItemConstant.programme.name:
                    $programmeForm = { ...selectedData };
                    break;
                case LookupItemConstant.scheme.name:
                    $schemeForm = { ...selectedData };
                    break;
                case LookupItemConstant.section.name:
                    $sectionForm = { ...selectedData };
                    break;
                case LookupItemConstant.serviceGroup.name:
                    $serviceGroupForm = { ...selectedData };
                    break;
                case LookupItemConstant.serviceType.name:
                    $serviceTypeForm = { ...selectedData };
                    break;
                case LookupItemConstant.unit.name:
                    $unitForm = { ...selectedData };
                    break;

                default:
                    break;
            }
        } else {
            switch (data.props.currentType.name) {
                case LookupItemConstant.department.name:
                    $departmentForm = data.props.departmentForm.data;
                    break;
                case LookupItemConstant.grade.name:
                    $gradeForm = data.props.gradeForm.data;
                    break;
                case LookupItemConstant.employmentStatus.name:
                    $employmentStatusForm =
                        data.props.employmentStatusForm.data;
                    break;
                case LookupItemConstant.placement.name:
                    $placementForm = data.props.placementForm.data;
                    break;
                case LookupItemConstant.position.name:
                    $positionForm = data.props.positionForm.data;
                    break;
                case LookupItemConstant.programme.name:
                    $programmeForm = data.props.positionForm.data;
                    break;
                case LookupItemConstant.scheme.name:
                    $schemeForm = data.props.schemeForm.data;
                    break;
                case LookupItemConstant.section.name:
                    $sectionForm = data.props.sectionForm.data;
                    break;
                case LookupItemConstant.serviceGroup.name:
                    $serviceGroupForm = data.props.serviceGroupForm.data;
                    break;
                case LookupItemConstant.serviceType.name:
                    $serviceTypeForm = data.props.serviceTypeForm.data;
                    break;
                case LookupItemConstant.unit.name:
                    $unitForm = data.props.unitForm.data;
                    break;

                default:
                    break;
            }

            isAddMode = true;
            modalTitle =
                'Tambah - ' + data.props.currentType.name.replaceAll('_', ' ');
        }
        openModal = true;
    }

    // forms
    // grade
    const {
        form: gradeForm,
        errors: gradeErrors,
        enhance: gradeEnhance,
        options: gradeOption,
    } = superForm(data.props.gradeForm, {
        id: 'gradeForm',
        SPA: true,
        validators: zodClient(LookupGradeSchema),
        resetForm: true,
        onUpdate(event) {},
        onSubmit() {
            _submitForm(data.props.currentType, $gradeForm, isAddMode).then(
                (value) => {
                    if (value.props.result.status == 'success') {
                        openModal = false;
                    }
                    data.props.lookupList = value.props.lookupList;

                    param = value.props.listParam;

                    table = {
                        param: param,
                        meta: value.props.response.data?.meta ?? {
                            pageSize: 1,
                            pageNum: 1,
                            totalData: 1,
                            totalPage: 1,
                        },
                        data: value.props.response.data?.dataList ?? [],
                        hiddenData: ['id', 'code'],
                    };
                },
            );
        },
    });

    // department
    const {
        form: departmentForm,
        errors: departmentErrors,
        enhance: departmentEnhance,
    } = superForm(data.props.departmentForm, {
        id: 'departmentForm',
        SPA: true,
        validators: zodClient(LookupDepartmentSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(
                data.props.currentType,
                $departmentForm,
                isAddMode,
            ).then((value) => {
                if (value.props.result.status == 'success') {
                    openModal = false;
                }
                data.props.lookupList = value.props.lookupList;

                param = value.props.listParam;

                table = {
                    param: param,
                    meta: value.props.response.data?.meta ?? {
                        pageSize: 1,
                        pageNum: 1,
                        totalData: 1,
                        totalPage: 1,
                    },
                    data: value.props.response.data?.dataList ?? [],
                    hiddenData: ['id', 'code'],
                };
            });
        },
    });

    // employmentStatus
    const {
        form: employmentStatusForm,
        errors: employmentStatusErrors,
        enhance: employmentStatusEnhance,
    } = superForm(data.props.employmentStatusForm, {
        id: 'employmentStatusForm',
        SPA: true,
        validators: zodClient(LookupEmploymentStatusSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(
                data.props.currentType,
                $employmentStatusForm,
                isAddMode,
            ).then((value) => {
                if (value.props.result.status == 'success') {
                    openModal = false;
                }
                data.props.lookupList = value.props.lookupList;

                param = value.props.listParam;

                table = {
                    param: param,
                    meta: value.props.response.data?.meta ?? {
                        pageSize: 1,
                        pageNum: 1,
                        totalData: 1,
                        totalPage: 1,
                    },
                    data: value.props.response.data?.dataList ?? [],
                    hiddenData: ['id', 'code'],
                };
            });
        },
    });

    // placement
    const {
        form: placementForm,
        errors: placementErrors,
        enhance: placementEnhance,
    } = superForm(data.props.placementForm, {
        id: 'placementForm',
        SPA: true,
        validators: zodClient(LookupPlacementSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(data.props.currentType, $placementForm, isAddMode).then(
                (value) => {
                    if (value.props.result.status == 'success') {
                        openModal = false;
                    }
                    data.props.lookupList = value.props.lookupList;

                    param = value.props.listParam;

                    table = {
                        param: param,
                        meta: value.props.response.data?.meta ?? {
                            pageSize: 1,
                            pageNum: 1,
                            totalData: 1,
                            totalPage: 1,
                        },
                        data: value.props.response.data?.dataList ?? [],
                        hiddenData: ['id', 'code'],
                    };
                },
            );
        },
    });

    // position
    const {
        form: positionForm,
        errors: positionErrors,
        enhance: positionEnhance,
    } = superForm(data.props.positionForm, {
        id: 'positionForm',
        SPA: true,
        validators: zodClient(LookupPositionSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(data.props.currentType, $positionForm, isAddMode).then(
                (value) => {
                    if (value.props.result.status == 'success') {
                        openModal = false;
                    }
                    data.props.lookupList = value.props.lookupList;

                    param = value.props.listParam;

                    table = {
                        param: param,
                        meta: value.props.response.data?.meta ?? {
                            pageSize: 1,
                            pageNum: 1,
                            totalData: 1,
                            totalPage: 1,
                        },
                        data: value.props.response.data?.dataList ?? [],
                        hiddenData: ['id', 'code'],
                    };
                },
            );
        },
    });

    // programme
    const {
        form: programmeForm,
        errors: programmeErrors,
        enhance: programmeEnhance,
    } = superForm(data.props.programmeForm, {
        id: 'programmeForm',
        SPA: true,
        validators: zodClient(LookupProgramSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(data.props.currentType, $programmeForm, isAddMode).then(
                (value) => {
                    if (value.props.result.status == 'success') {
                        openModal = false;
                    }
                    data.props.lookupList = value.props.lookupList;

                    param = value.props.listParam;

                    table = {
                        param: param,
                        meta: value.props.response.data?.meta ?? {
                            pageSize: 1,
                            pageNum: 1,
                            totalData: 1,
                            totalPage: 1,
                        },
                        data: value.props.response.data?.dataList ?? [],
                        hiddenData: ['id', 'code'],
                    };
                },
            );
        },
    });

    // scheme
    const {
        form: schemeForm,
        errors: schemeErrors,
        enhance: schemeEnhance,
    } = superForm(data.props.schemeForm, {
        id: 'schemeForm',
        SPA: true,
        validators: zodClient(LookupSchemeSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(data.props.currentType, $schemeForm, isAddMode).then(
                (value) => {
                    if (value.props.result.status == 'success') {
                        openModal = false;
                    }
                    data.props.lookupList = value.props.lookupList;

                    param = value.props.listParam;

                    table = {
                        param: param,
                        meta: value.props.response.data?.meta ?? {
                            pageSize: 1,
                            pageNum: 1,
                            totalData: 1,
                            totalPage: 1,
                        },
                        data: value.props.response.data?.dataList ?? [],
                        hiddenData: ['id', 'code'],
                    };
                },
            );
        },
    });

    // section
    const {
        form: sectionForm,
        errors: sectionErrors,
        enhance: sectionEnhance,
    } = superForm(data.props.sectionForm, {
        id: 'sectionForm',
        SPA: true,
        validators: zodClient(LookupSectionSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(data.props.currentType, $sectionForm, isAddMode).then(
                (value) => {
                    if (value.props.result.status == 'success') {
                        openModal = false;
                    }
                    data.props.lookupList = value.props.lookupList;

                    param = value.props.listParam;

                    table = {
                        param: param,
                        meta: value.props.response.data?.meta ?? {
                            pageSize: 1,
                            pageNum: 1,
                            totalData: 1,
                            totalPage: 1,
                        },
                        data: value.props.response.data?.dataList ?? [],
                        hiddenData: ['id', 'code'],
                    };
                },
            );
        },
    });

    // service group
    const {
        form: serviceGroupForm,
        errors: serviceGroupErrors,
        enhance: serviceGroupEnhance,
    } = superForm(data.props.serviceGroupForm, {
        id: 'serviceGroupForm',
        SPA: true,
        validators: zodClient(LookupServiceGroupSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(
                data.props.currentType,
                $serviceGroupForm,
                isAddMode,
            ).then((value) => {
                if (value.props.result.status == 'success') {
                    openModal = false;
                }
                data.props.lookupList = value.props.lookupList;

                param = value.props.listParam;

                table = {
                    param: param,
                    meta: value.props.response.data?.meta ?? {
                        pageSize: 1,
                        pageNum: 1,
                        totalData: 1,
                        totalPage: 1,
                    },
                    data: value.props.response.data?.dataList ?? [],
                    hiddenData: ['id', 'code'],
                };
            });
        },
    });

    // service type
    const {
        form: serviceTypeForm,
        errors: serviceTypeErrors,
        enhance: serviceTypeEnhance,
    } = superForm(data.props.serviceTypeForm, {
        id: 'serviceTypeForm',
        SPA: true,
        validators: zodClient(LookupServiceTypeSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(
                data.props.currentType,
                $serviceTypeForm,
                isAddMode,
            ).then((value) => {
                if (value.props.result.status == 'success') {
                    openModal = false;
                }
                data.props.lookupList = value.props.lookupList;

                param = value.props.listParam;

                table = {
                    param: param,
                    meta: value.props.response.data?.meta ?? {
                        pageSize: 1,
                        pageNum: 1,
                        totalData: 1,
                        totalPage: 1,
                    },
                    data: value.props.response.data?.dataList ?? [],
                    hiddenData: ['id', 'code'],
                };
            });
        },
    });

    // unit
    const {
        form: unitForm,
        errors: unitErrors,
        enhance: unitEnhance,
    } = superForm(data.props.unitForm, {
        id: 'unitForm',
        SPA: true,
        validators: zodClient(LookupUnitSchema),
        onUpdate(event) {},
        onSubmit() {
            _submitForm(data.props.currentType, $unitForm, isAddMode).then(
                (value) => {
                    if (value.props.result.status == 'success') {
                        openModal = false;
                    }
                    data.props.lookupList = value.props.lookupList;

                    param = value.props.listParam;

                    table = {
                        param: param,
                        meta: value.props.response.data?.meta ?? {
                            pageSize: 1,
                            pageNum: 1,
                            totalData: 1,
                            totalPage: 1,
                        },
                        data: value.props.response.data?.dataList ?? [],
                        hiddenData: ['id', 'code'],
                    };
                },
            );
        },
    });
</script>

<div
    class="flex h-full max-h-full w-full max-w-full flex-col items-center justify-start overflow-y-hidden bg-ios-basic-white pb-28"
>
    <!-- div header -->
    <div
        class="flex h-20 min-h-20 w-full flex-col items-center justify-center bg-ios-basic-white px-10"
    >
        <h1 class="w-full text-xl font-medium leading-tight">
            {data.props.currentType.name.replaceAll('_', ' ')}
        </h1>
    </div>

    <div
        class=" flex h-fit max-h-full w-full flex-col items-center justify-start gap-2.5 px-10"
    >
        <!-- <div class="flex h-fit w-full flex-col items-center justify-center">
            <FilterCard onSearch={_search}>
                <FilterTextField
                    label="Nama Gred"
                    bind:inputValue={table.param.filter.description}
                ></FilterTextField>
                <FilterTextField label="Kod SSM"></FilterTextField>
            </FilterCard>
        </div> -->

        <div
            class="flex h-full max-h-full w-full flex-col justify-start overflow-y-hidden"
        >
            <CustomTable
                title="Senarai {data.props.currentType.name.replaceAll(
                    '_',
                    ' ',
                )}"
                bind:tableData={table}
                bind:passData={selectedData}
                enableEdit
                onUpdate={_search}
                editActions={() => {
                    showModal(true);
                }}
            >
                <div slot="buttons" class="flex flex-row items-center gap-2">
                    <TextIconButton
                        label="Tambah"
                        onClick={() => {
                            showModal(false);
                        }}><SvgPlus></SvgPlus></TextIconButton
                    >
                </div>
            </CustomTable>
        </div>
    </div>
</div>

<Modal title={modalTitle} bind:open={openModal}>
    {#if data.props.currentType.name == LookupItemConstant.grade.name}
        <form
            id="gradeForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="name"
                    label={'Gred'}
                    bind:val={$gradeForm.description}
                    errors={$gradeErrors.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="ssmCode"
                    label={'Kod SSM'}
                    bind:val={$gradeForm.ssmCode}
                    errors={$gradeErrors.ssmCode}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    type="number"
                    id="minimumSalary"
                    label={'Gaji Minimum'}
                    bind:val={$gradeForm.minimumSalary}
                    errors={$gradeErrors.minimumSalary}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    type="number"
                    id="maximumSalary"
                    label={'Gaji Maximum'}
                    bind:val={$gradeForm.maximumSalary}
                    errors={$gradeErrors.maximumSalary}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    type="number"
                    id="annualIncrement"
                    label={'Kadar Kenaikan Gaji'}
                    bind:val={$gradeForm.annualIncrementRate}
                    errors={$gradeErrors.annualIncrementRate}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="gradeForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentType.name == LookupItemConstant.department.name}
        <form
            id="departmentForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="name"
                    label={'Nama Jabatan'}
                    bind:val={$departmentForm.description}
                    errors={$departmentErrors.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="departmentForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentType.name == LookupItemConstant.employmentStatus.name}
        <form
            id="employmentStatusForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="occSectorCode"
                    label={'OCC Sector Code'}
                    bind:val={$employmentStatusForm.occSectorCode}
                    errors={$employmentStatusErrors.occSectorCode}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="occSectorName"
                    label={'OCC Sector Name'}
                    bind:val={$employmentStatusForm.occSectorName}
                    errors={$employmentStatusErrors.occSectorName}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="employmentStatusForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentType.name == LookupItemConstant.placement.name}
        <form
            id="placementForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama'}
                    bind:val={$placementForm.description}
                    errors={$placementErrors.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="placementForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentType.name == LookupItemConstant.position.name}
        <form
            id="positionForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama'}
                    bind:val={$positionForm.description}
                    errors={$positionErrors.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="positionForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentType.name == LookupItemConstant.programme.name}
        <form
            id="programmeForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama Program'}
                    bind:val={$programmeForm.description}
                    errors={$programmeErrors.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="programmeForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentType.name == LookupItemConstant.scheme.name}
        <form
            id="schemeForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama Program'}
                    bind:val={$schemeForm.description}
                    errors={$schemeErrors.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="schemeForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentType.name == LookupItemConstant.section.name}
        <form
            id="sectionForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama Seksyen'}
                    bind:val={$sectionForm.description}
                    errors={$sectionErrors.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="sectionForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentType.name == LookupItemConstant.serviceGroup.name}
        <form
            id="serviceGroupForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama Seksyen'}
                    bind:val={$serviceGroupForm.description}
                    errors={$serviceGroupErrors.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="serviceGroupForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentType.name == LookupItemConstant.serviceType.name}
        <form
            id="serviceTypeForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama Seksyen'}
                    bind:val={$serviceTypeForm.description}
                    errors={$serviceTypeErrors.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="serviceTypeForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {:else if data.props.currentType.name == LookupItemConstant.unit.name}
        <form
            id="unitForm"
            method="POST"
            use:gradeEnhance
            class="flex w-full flex-col gap-2 p-2"
        >
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="description"
                    label={'Nama Seksyen'}
                    bind:val={$unitForm.description}
                    errors={$unitErrors.description}
                ></CustomTextField>
            </div>
            <div class="flex w-full flex-row justify-end gap-2">
                <TextIconButton
                    label="Batal"
                    type="light"
                    icon="cancel"
                    onClick={() => {
                        openModal = false;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Simpan"
                    form="unitForm"
                    type="primary"
                    icon="check"
                ></TextIconButton>
            </div>
        </form>
    {/if}
</Modal>

<Toaster></Toaster>
