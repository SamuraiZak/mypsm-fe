<script lang="ts">
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { Tooltip } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { Modal } from 'flowbite-svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import {
        dateProxy,
        superForm,
        superValidate,
    } from 'sveltekit-superforms/client';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import type { PageData } from '../$types';
    import { Checkbox } from 'flowbite-svelte';
    import { getErrorToast } from '$lib/services/core/toast/toast-service';
    import {
        _submitAddMoreAcademicForm,
        _addAcademicInfoSchema,
        _addActivityModalSchema,
        _stepperMaklumatPeribadi,
        _submitFormStepperMaklumatPeribadi,
        _stepperMaklumatPerkhidmatan,
        _submitFormStepperMaklumatPerkhidmatan,
        _stepperMaklumatAkademik,
        _submitFormStepperMaklumatAkademik,
        _stepperMaklumatPengalaman,
        _submitFormStepperMaklumatPengalaman,
        _stepperMaklumatWaris,
        _submitFormStepperMaklumatWaris,
        _submitAddExperienceModal,
        _personalDetailsAllRequired,
        _addExperienceInfoSchema,
        _addRelationModalSchema,
        _submitCreateAcademicForm,
        _submitCreateExperienceForm,
        _submitCreateActivityForm,
        _submitCreateFamilyForm,
        _submitCreateDependencyForm,
        _submitCreateNextOfKinForm,
    } from '../+page';
    import StepperNextStep from '$lib/components/stepper-conditional-rules/StepperNextStep.svelte';

    export let disabled: boolean = true;
    export let data: PageData;
    export let openExperienceInfoModal: boolean = false;
    export let openMembershipInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openNextOfKinInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    export let openAcademicInfoModal: boolean = false;

    const {
        form,
        errors,
        enhance,
        options: stepperMaklumatPeribadiOption,
    } = superForm(data.stepperMaklumatPeribadi, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        validators: false,
        multipleSubmits: 'prevent',
        onSubmit() {
            _submitFormStepperMaklumatPeribadi($form);
        },
        taintedMessage: false,
    });

    const {
        form: maklumatPerkhidmatanForm,
        errors: maklumatPerkhidmatanErrors,
        enhance: maklumatPerkhidmatanEnhance,
    } = superForm(data.stepperMaklumatPerkhidmatan, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        validators: false,
        multipleSubmits: 'prevent',
        onSubmit() {
            _submitFormStepperMaklumatPerkhidmatan($maklumatPerkhidmatanForm);
        },
        taintedMessage: false,
    });

    const {
        form: maklumatAkademikForm,
        errors: maklumatAkademikErrors,
        enhance: maklumatAkademikEnhance,
        options: maklumatAkademikOption,
    } = superForm(data.stepperMaklumatAkademik, {
        SPA: true,
        validators: false,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'prevent',
        onSubmit() {
            _submitFormStepperMaklumatAkademik($maklumatAkademikForm);
        },
        taintedMessage: false,
    });
    const {
        form: maklumatPengalamanForm,
        errors: maklumatPengalamanErrors,
        enhance: maklumatPengalamanEnhance,
    } = superForm(data.stepperMaklumatPengalaman, {
        SPA: true,
        validators: _stepperMaklumatPengalaman,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'prevent',
        onSubmit() {
            _submitFormStepperMaklumatPengalaman($maklumatPengalamanForm);
        },

        taintedMessage: false,
    });
    const {
        form: maklumatWarisForm,
        errors: maklumatWarisErrors,
        enhance: maklumatWarisEnhance,
    } = superForm(data.stepperMaklumatWaris, {
        SPA: true,
        validators: _stepperMaklumatWaris,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'prevent',
        onSubmit() {
            _submitFormStepperMaklumatWaris($maklumatWarisForm);
        },
        taintedMessage: false,
    });
    const {
        form: addAcademicInfoModal,
        errors: addAcademicInfoErrors,
        enhance: addAcademicInfoEnhance,
    } = superForm(data.addAcademicModal, {
        SPA: true,
        validators: _addAcademicInfoSchema,
        dataType: 'json',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        async onSubmit() {
            _submitCreateAcademicForm($form);
            // openAcademicInfoModal = false;
        },
    });

    const {
        form: addExperienceModalForm,
        errors: addExperienceModalErrors,
        enhance: addExperienceModalEnhance,
    } = superForm(data.addExperienceModal, {
        SPA: true,
        validators: _addExperienceInfoSchema,
        dataType: 'json',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        async onSubmit() {
            _submitCreateExperienceForm($addExperienceModalForm);
            // openExperienceInfoModal = false;
        },
    });

    const {
        form: addActivityModal,
        errors: addActivityModalErrors,
        enhance: addActivityModalEnhance,
    } = superForm(data.addActivityModal, {
        SPA: true,
        validators: _addActivityModalSchema,
        dataType: 'json',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        async onSubmit() {
            _submitCreateActivityForm($addActivityModal);
            // openMembershipInfoModal = false;
        },
    });

    const {
        form: addNonFamilyModal,
        errors: addNonFamilyErrors,
        enhance: addNonFamilyEnhance,
    } = superForm(data.addNonFamilyModal, {
        SPA: true,
        validators: _addRelationModalSchema,
        dataType: 'json',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        async onSubmit() {
            _submitCreateDependencyForm($addNonFamilyModal);
            // openNonFamilyInfoModal = false;
        },
    });

    const {
        form: addFamilyModal,
        errors: addFamilyErrors,
        enhance: addFamilyEnhance,
    } = superForm(data.addFamilyModal, {
        SPA: true,
        validators: _addRelationModalSchema,
        dataType: 'json',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        async onSubmit() {
            _submitCreateFamilyForm($addFamilyModal);
            // openFamilyInfoModal = false;
        },
    });
    const {
        form: addNextOfKinModal,
        errors: addNextOfKinErrors,
        enhance: addNextOfKinEnhance,
    } = superForm(data.addNextOfKinModal, {
        SPA: true,
        validators: _addRelationModalSchema,
        dataType: 'json',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        async onSubmit() {
            _submitCreateNextOfKinForm($addNextOfKinModal);
            // openFamilyInfoModal = false;
        },
    });

    const proxyBirthDate = dateProxy(form, 'birthDate', {
        format: 'date',
    });
    const proxyAcademicCompletionDate = dateProxy(
        addAcademicInfoModal,
        'completionDate',
        {
            format: 'date',
        },
    );

    const proxyEffectiveDate = dateProxy(
        maklumatPerkhidmatanForm,
        'effectiveDate',
        { format: 'date' },
    );
    const proxyCivilServiceStartDate = dateProxy(
        maklumatPerkhidmatanForm,
        'civilServiceStartDate',
        { format: 'date' },
    );
    const proxyConfirmServiceDate = dateProxy(
        maklumatPerkhidmatanForm,
        'confirmServiceDate',
        { format: 'date' },
    );
    const proxyFirstEffectiveDate = dateProxy(
        maklumatPerkhidmatanForm,
        'firstEffectiveDate',
        { format: 'date' },
    );
    const proxyPastAttachmentDate = dateProxy(
        maklumatPerkhidmatanForm,
        'pastAttachmentDate',
        { format: 'date' },
    );
    const proxyActingDate = dateProxy(maklumatPerkhidmatanForm, 'actingDate', {
        format: 'date',
    });
    const proxyInterimDate = dateProxy(
        maklumatPerkhidmatanForm,
        'interimDate',
        {
            format: 'date',
        },
    );
    const proxyLastSalaryRaiseDate = dateProxy(
        maklumatPerkhidmatanForm,
        'lastSalaryRaiseDate',
        { format: 'date' },
    );
    const proxyLastPromotionDate = dateProxy(
        maklumatPerkhidmatanForm,
        'lastPromotionDate',
        { format: 'date' },
    );
    const proxyRetirementDate = dateProxy(
        maklumatPerkhidmatanForm,
        'retirementDate',
        { format: 'date' },
    );
    const proxySalaryEffectiveDate = dateProxy(
        maklumatPerkhidmatanForm,
        'salaryEffectiveDate',
        { format: 'date' },
    );

    const proxyAddAcademiStartDate = dateProxy(
        addExperienceModalForm,
        'startDate',
        {
            format: 'date',
        },
    );
    const proxyAddAcademiEndDate = dateProxy(
        addExperienceModalForm,
        'endDate',
        {
            format: 'date',
        },
    );
    const proxyAddActivityJoinDate = dateProxy(addActivityModal, 'joinDate', {
        format: 'date',
    });
    const proxyAddFamilyBirthDate = dateProxy(addFamilyModal, 'birthDate', {
        format: 'date',
    });
    const proxyAddFamilyMarriageDate = dateProxy(
        addFamilyModal,
        'marriageDate',
        {
            format: 'date',
        },
    );
    const proxyAddDependencyBirthDate = dateProxy(
        addNonFamilyModal,
        'birthDate',
        {
            format: 'date',
        },
    );
    const proxyAddDependencyMarriageDate = dateProxy(
        addNonFamilyModal,
        'marriageDate',
        {
            format: 'date',
        },
    );
    const proxyAddNextOfKinBirthDate = dateProxy(
        addNextOfKinModal,
        'birthDate',
        {
            format: 'date',
        },
    );
    const proxyAddNextOfKinMarriageDate = dateProxy(
        addNextOfKinModal,
        'marriageDate',
        {
            format: 'date',
        },
    );

    if (!disabled) {
        stepperMaklumatPeribadiOption.validators = _stepperMaklumatPeribadi;

        if (!!$form.isRelatedToLKIM) {
            stepperMaklumatPeribadiOption.validators =
                _personalDetailsAllRequired;
        }

        maklumatAkademikOption.validators = _stepperMaklumatAkademik;

        stepperMaklumatPeribadiOption.taintedMessage =
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini-1?';
    }

    export let employeeNumber: string = '00001';

    let editable: boolean = true;

    const approveOptions: RadioOption[] = [
        {
            value: true,
            label: 'LULUS',
        },
        {
            value: false,
            label: 'TIDAK LULUS',
        },
    ];

    let currentEmployee = mockEmployees.find((employee) => {
        return employee.employeeNumber === employeeNumber;
    })!;

    let currentEmployeeService = mockCurrentService.find((service) => {
        return service.employeeId === currentEmployee.id;
    })!;

    let currentEmployeeUploadedDocuments = mockEmployeeDocumentLists.filter(
        (document) => {
            return document.employeeId === currentEmployee.id;
        },
    )!;

    // =================================================================================
    // z validation schema for the example form fields==================================
    // =================================================================================
    let tempAcademicRecord: any[] = [];

    // Stepper Classes //

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    // Radio Functions
    const options: RadioOption[] = [
        {
            value: true,
            label: 'Ya',
        },
        {
            value: false,
            label: 'Tidak',
        },
    ];

    function dateFormatter(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    function currencyFormatter(amount: number) {
        const formatter = new Intl.NumberFormat('ms-MY', {
            style: 'currency',
            currency: 'MYR',
        });
        return formatter.format(Number(amount)).toString();
    }

    let tooltipContent: string = '';
    const itkaTooltip: string = 'ITKA bermaksud ...';
    const itpTooltip: string = 'ITP bermaksud ...';
    const epwTooltip: string = 'EPW bermaksud ...';
    const colaTooltip: string = 'COLA bermaksud ...';

    // function to assign the content  of the tooltip
    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id.split('-')[1];

            switch (eventName) {
                case 'itka':
                    tooltipContent = itkaTooltip;
                    break;
                case 'itp':
                    tooltipContent = itpTooltip;
                    break;
                case 'epw':
                    tooltipContent = epwTooltip;
                    break;
                case 'cola':
                    tooltipContent = colaTooltip;
                    break;
                default:
                    tooltipContent = 'no tooltip available';
            }
        }
    }
</script>

<Stepper>
    <!------------------------------------------------------>
    <!---------------Maklumat Peribadi---------------------->
    <!------------------------------------------------------>

    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi">
            {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperMaklumatPeribadi"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <form
                id="FormStepperMaklumatPeribadi"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <TextField
                    disabled
                    name="employeeNumber"
                    label={'No. Pekerja'}
                    type="text"
                    bind:value={$form.employeeNumber}
                ></TextField>

                <TextField
                    disabled
                    name="identityCardNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:value={$form.identityCardNumber}
                ></TextField>

                <TextField
                    disabled
                    name="fullName"
                    label={'Nama Penuh'}
                    type="text"
                    bind:value={$form.fullName}
                ></TextField>

                <TextField
                    {disabled}
                    name="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    bind:value={$form.alternativeName}
                ></TextField>

                <TextField
                    {disabled}
                    id="statusPekerjaan"
                    label="Emel Pekerja"
                    bind:value={$form.email}
                ></TextField>

                {#if $errors.email}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.email}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.icColour}
                    dropdownType="label-left-full"
                    id="icColour"
                    name="icColour"
                    label="Warna Kad Pengenalan"
                    bind:value={$form.icColour}
                    options={data.identityCardColorLookup}
                ></DropdownSelect>
                {#if $errors.icColour}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.icColour}</span
                    >
                {/if}

                <DateSelector
                    {disabled}
                    hasError={!!$errors.birthDate}
                    name="birthDate"
                    label="Tarikh Lahir"
                    bind:selectedDate={$proxyBirthDate}
                ></DateSelector>
                {#if $errors?.birthDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.birthDate}</span
                    >
                {/if}
                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.birthplace}
                    dropdownType="label-left-full"
                    id="birthplace"
                    name="birthplace"
                    label="Tempat Lahir"
                    bind:value={$form.birthplace}
                    options={data.stateLookupString}
                ></DropdownSelect>
                {#if $errors.birthplace}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.birthplace}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.nationality}
                    dropdownType="label-left-full"
                    id="nationality"
                    name="nationality"
                    label="Warganegara"
                    bind:value={$form.nationality}
                    options={data.nationalityLookupString}
                ></DropdownSelect>
                {#if $errors.nationality}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.nationality}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.race}
                    dropdownType="label-left-full"
                    id="race"
                    name="race"
                    label="Bangsa"
                    bind:value={$form.race}
                    options={data.raceLookupString}
                ></DropdownSelect>
                {#if $errors.race}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.race}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.ethnic}
                    dropdownType="label-left-full"
                    id="ethnic"
                    label="Etnik"
                    bind:value={$form.ethnic}
                    options={data.ethnicityLookupString}
                ></DropdownSelect>
                {#if $errors.ethnic}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.ethnic}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.religion}
                    dropdownType="label-left-full"
                    id="religion"
                    label="Agama"
                    bind:value={$form.religion}
                    options={data.religionLookupString}
                ></DropdownSelect>
                {#if $errors.religion}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.religion}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.gender}
                    dropdownType="label-left-full"
                    id="gender"
                    name="gender"
                    label="Jantina"
                    bind:value={$form.gender}
                    options={data.genderLookupString}
                ></DropdownSelect>
                {#if $errors.gender}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.gender}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.marital}
                    dropdownType="label-left-full"
                    id="marital"
                    label="Status"
                    bind:value={$form.marital}
                    options={data.maritalLookupString}
                ></DropdownSelect>
                {#if $errors.marital}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.marital}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={!!$errors.email}
                    name="email"
                    label={'Emel'}
                    type="text"
                    bind:value={$form.email}
                ></TextField>

                {#if $errors?.email}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.email}</span
                    >
                {/if}

                <LongTextField
                    hasError={!!$errors.homeAddress}
                    {disabled}
                    name="homeAddress"
                    label="Alamat Rumah"
                    bind:value={$form.homeAddress}
                />
                {#if $errors.homeAddress}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.homeAddress}</span
                    >
                {/if}

                <LongTextField
                    hasError={!!$errors.mailAddress}
                    {disabled}
                    name="mailAddress"
                    label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                    bind:value={$form.mailAddress}
                />
                {#if $errors.mailAddress}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.mailAddress}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    name="houseLoanType"
                    label={'Perumahan'}
                    type="text"
                    bind:value={$form.houseLoanType}
                ></TextField>
                <TextField
                    {disabled}
                    name="houseLoan"
                    label={'Pinjaman Perumahan'}
                    type="text"
                    bind:value={$form.houseLoan}
                ></TextField>

                <RadioSingle
                    name="isExPolice"
                    {disabled}
                    options={approveOptions}
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={$form.isExPolice}
                ></RadioSingle>
                {#if $errors.isExPolice}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.isExPolice}</span
                    >
                {/if}

                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Maklumat Pertalian Dengan Kakitangan LKIM
                    </p>

                    <RadioSingle
                        name="isRelatedToLKIM"
                        {options}
                        {disabled}
                        legend={'Perhubungan Dengan Kakitangan LKIM'}
                        bind:userSelected={$form.isRelatedToLKIM}
                    ></RadioSingle>

                    {#if $form.isRelatedToLKIM}
                        <TextField
                            {disabled}
                            hasError={!!$errors.employeeNumber}
                            name="employeeNumber"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            bind:value={$form.employeeNumber}
                        ></TextField>

                        {#if $errors.employeeNumber}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.employeeNumber}</span
                            >
                        {/if}
                        <DropdownSelect
                            {disabled}
                            hasError={!!$errors.relationDetail?.fullName}
                            dropdownType="label-left-full"
                            id="fullName"
                            label="Jawatan Kakitangan LKIM"
                            bind:value={$form.fullName}
                            options={data.employeeListLookupString}
                        ></DropdownSelect>
                        {#if $errors.fullName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.fullName}</span
                            >
                        {/if}

                        <!-- <DropdownSelect
                            {disabled}
                            hasError={!!$errors.relationDetail?.position}
                            dropdownType="label-left-full"
                            id="relationDetailPosition"
                            label="Jawatan Kakitangan LKIM"
                            bind:value={$form.position}
                            options={data.positionLookupString}
                        ></DropdownSelect>
                        {#if $errors.position}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.position}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={!!$errors.relationship}
                            dropdownType="label-left-full"
                            id="relationDetailRelationship"
                            label="Hubungan"
                            bind:value={$form.relationship}
                            options={data.relationshipLookupString}
                        ></DropdownSelect>
                        {#if $errors.relationship}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.relationship}</span
                            >
                        {/if} -->
                    {/if}
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>

    <!----------------------------------------------------->
    <!--------------- Maklumat Perkhidmatan --------------->
    <!----------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan">
            <div class="text-sm font-medium italic text-system-primary">
                Bahagian "read-only". Tidak boleh ditukar.
            </div>
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperMaklumatPerkhidmatan"
                    class="flex w-full flex-col gap-2"
                    use:maklumatPerkhidmatanEnhance
                    method="POST"
                >
                    <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>

                    <TextField
                        disabled
                        id="currentGrade"
                        label="Gred Semasa"
                        bind:value={$maklumatPerkhidmatanForm.currentGrade}
                    ></TextField>

                    <TextField
                        disabled
                        id="currentPosition"
                        label="Jawatan"
                        bind:value={$maklumatPerkhidmatanForm.currentPosition}
                    ></TextField>

                    <TextField
                        disabled
                        id="placement"
                        label="Penempatan"
                        bind:value={$maklumatPerkhidmatanForm.placement}
                    ></TextField>
                    <TextField
                        disabled
                        id="tarafPerkhidmatan"
                        label="Taraf Perkhidmatan"
                        bind:value={$maklumatPerkhidmatanForm.serviceType}
                    ></TextField>

                    <DateSelector
                        disabled
                        name="effectiveDate"
                        label="Tarikh Kuatkuasa Lantikan Semasa"
                        bind:selectedDate={$proxyEffectiveDate}
                    ></DateSelector>

                    <!-- <DropdownSelect
                        disabled
                        dropdownType="label-left-full"
                        name="retirementBenefit"
                        label={'Faedah Persaraan'}
                        options={data.retirementBenefitLookupString}
                        bind:value={$maklumatPerkhidmatanForm.retirementBenefit}
                    ></DropdownSelect> -->

                    <TextField
                        disabled
                        name="retirementBenefit"
                        label={'Faedah Persaraan'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.retirementBenefit}
                    ></TextField>

                    <TextField
                        disabled
                        name="EPFNumber"
                        label={'No. KWSP'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.EPFNumber}
                    ></TextField>

                    <TextField
                        disabled
                        name="SOCSO"
                        label={'No. SOCSO'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.SOCSO}
                    ></TextField>

                    <TextField
                        disabled
                        name="taxIncome"
                        label={'No. Cukai (LHDN)'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.taxIncome}
                    ></TextField>

                    <TextField
                        disabled
                        name="bankName"
                        label={'Bank'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.bankName}
                    ></TextField>

                    <TextField
                        disabled
                        name="accountNumber"
                        label={'No.Akaun'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.accountNumber}
                    ></TextField>

                    <TextField
                        disabled
                        name="program"
                        label={'Program'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.program}
                    ></TextField>

                    <TextField
                        disabled
                        name="eligibleLeaveCount"
                        label={'Kelayakan Cuti'}
                        type="number"
                        bind:value={$maklumatPerkhidmatanForm.eligibleLeaveCount}
                    ></TextField>

                    <DateSelector
                        disabled
                        name="mulaDilantikPerkhidmatanKerajaan"
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        bind:selectedDate={$proxyCivilServiceStartDate}
                    ></DateSelector>
                    <DateSelector
                        disabled
                        name="firstEffectiveDate"
                        label="Mula Dilantik Perkhidmatan LKIM"
                        bind:selectedDate={$proxyFirstEffectiveDate}
                    ></DateSelector>

                    <DateSelector
                        disabled
                        name="confirmServiceDate"
                        label="Disahkan Dalam Jawatan Semasa LKIM"
                        bind:selectedDate={$proxyConfirmServiceDate}
                    ></DateSelector>
                    <!--
                    <AccordianField
                        disabled={!disabled}
                        label="Sejarah Lantikan Jawatan LKIM"
                        header="Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan"
                    >
                        {#each currentEmployeePositionHistory as item, i}
                            <label
                                for=""
                                class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {disabled
                                    ? 'text-txt-tertiary'
                                    : 'text-txt-primary'}
                                            hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                                >{i + 1}. {mockLookupGrades.find(
                                    (grade) => grade.id === item.gradeId,
                                )?.code}, {mockLookupPositions.find(
                                    (position) =>
                                        position.gradeId === item.gradeId,
                                )?.name}, {item.startDate}, {item.startDate}
                            </label>
                        {/each}
                    </AccordianField> -->

                    <DateSelector
                        disabled
                        name="pastAttachmentDate"
                        label="Tarikh Kelulusan Percantuman Perkhidmatan Lepas"
                        bind:selectedDate={$proxyPastAttachmentDate}
                    ></DateSelector>

                    <DateSelector
                        disabled
                        name="actingDate"
                        label="Pemangkuan Sekarang"
                        bind:selectedDate={$proxyActingDate}
                    ></DateSelector>

                    <DateSelector
                        disabled
                        name="interimDate"
                        label="Tanggung Kerja Sekarang"
                        bind:selectedDate={$proxyInterimDate}
                    ></DateSelector>

                    <TextField
                        disabled
                        name="pensionScheme"
                        label={'Skim Pencen'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.pensionScheme}
                    ></TextField>

                    <DateSelector
                        disabled
                        name="lastSalaryRaiseDate"
                        label="Kenaikan Gaji Akhir"
                        bind:selectedDate={$proxyLastSalaryRaiseDate}
                    ></DateSelector>

                    <DateSelector
                        disabled
                        name="lastPromotionDate"
                        label="Kenaikan Pangkat Akhir"
                        bind:selectedDate={$proxyLastPromotionDate}
                    ></DateSelector>

                    <DropdownSelect
                        disabled
                        dropdownType="label-left-full"
                        id="salaryMovementMonth"
                        label="Bulan KGT"
                        bind:value={$maklumatPerkhidmatanForm.salaryMovementMonth}
                        options={data.monthStringLookup}
                    ></DropdownSelect>

                    <DateSelector
                        disabled
                        name="retirementDate"
                        label="Tarikh Bersara"
                        bind:selectedDate={$proxyRetirementDate}
                    ></DateSelector>

                    <p class={stepperFormTitleClass}>
                        Maklumat Gaji dan Elaun - Elaun
                    </p>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <DateSelector
                                disabled
                                name="salaryEffectiveDate"
                                label="Tarikh Berkuatkuasa"
                                bind:selectedDate={$proxySalaryEffectiveDate}
                            ></DateSelector>
                            <TextField
                                disabled
                                name="tanggaGaji"
                                label={'Tangga Gaji'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.maximumSalary}
                            ></TextField>

                            <TextField
                                disabled
                                name="baseSalary"
                                label={'Gaji Pokok'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.baseSalary}
                            ></TextField>
                        </div>

                        <div class="space-y-2.5">
                            <TextField
                                disabled
                                hasTooltip={true}
                                toolTipID="type-itka"
                                name="ITKA"
                                label={'ITKA'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.ITKA}
                            ></TextField>

                            <TextField
                                disabled
                                hasTooltip={true}
                                toolTipID="type-itp"
                                name="ITP"
                                label={'ITP'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.ITP}
                            ></TextField>

                            <TextField
                                disabled
                                hasTooltip={true}
                                toolTipID="type-epw"
                                name="EPW"
                                label={'EPW'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.EPW}
                            ></TextField>

                            <TextField
                                disabled
                                hasTooltip={true}
                                toolTipID="type-cola"
                                name="COLA"
                                label={'COLA'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.COLA}
                            ></TextField>
                            <!-- Tooltip body -->
                            <Tooltip
                                type="dark"
                                triggeredBy="[id^='type-']"
                                on:show={assignContent}
                                >"{tooltipContent}"</Tooltip
                            >
                        </div>
                    </div>
                </form>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------>
    <!---Maklumat Akademik / Kelayakan / Latihan yang Lalu-->
    <!------------------------------------------------------>

    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
        >
            <!-- {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperAkademik"
                />
            {/if} -->
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperAkademik"
                    class="flex w-full flex-col gap-2"
                    use:maklumatAkademikEnhance
                    method="POST"
                >
                    {#if $maklumatAkademikForm.dataList.length < 1}
                        <div
                            class="text-center text-sm italic text-system-primary"
                        >
                            Tiada data dijumpai. Sila tambah.
                        </div>
                    {:else}
                        {#each $maklumatAkademikForm.dataList as _, i}
                            <div class="space-y-2.5 rounded-[3px] border p-2.5">
                                <div
                                    class="mb-5 mt-2.5 text-sm text-system-primary"
                                >
                                    <p>Maklumat Akademik #{i + 1}</p>
                                </div>

                                <TextField
                                    disabled
                                    name="major"
                                    label={'Jurusan'}
                                    type="text"
                                    bind:value={$maklumatAkademikForm.dataList[
                                        i
                                    ].major}
                                ></TextField>

                                <!-- {#if $maklumatAkademikErrors?.dataList[i]?.major}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors?.dataList[i]
                                    ?.major}</span
                            >
                        {/if} -->
                                <TextField
                                    disabled
                                    name="minor"
                                    label={'Bidang'}
                                    type="text"
                                    bind:value={$maklumatAkademikForm.dataList[
                                        i
                                    ].minor}
                                ></TextField>

                                <!-- {#if $maklumatAkademikErrors?.dataList[i]?.minor}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors?.dataList[i]
                                    ?.minor}</span
                            >
                        {/if} -->
                                <DropdownSelect
                                    disabled
                                    name="country"
                                    options={data.countryLookupString}
                                    label={'Negara'}
                                    dropdownType="label-left-fit"
                                    bind:value={$maklumatAkademikForm.dataList[
                                        i
                                    ].country}
                                ></DropdownSelect>

                                <!-- {#if $maklumatAkademikErrors?.dataList[i]?.country}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors?.dataList[i]
                                    ?.country}</span
                            >
                        {/if} -->

                                <DropdownSelect
                                    disabled
                                    name="institution"
                                    options={data.institutionLookupString}
                                    label={'Institusi'}
                                    dropdownType="label-left-fit"
                                    bind:value={$maklumatAkademikForm.dataList[
                                        i
                                    ].institution}
                                ></DropdownSelect>

                                <!-- {#if $maklumatAkademikErrors?.dataList[i]?.institution}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors?.dataList[i]
                                    ?.institution}</span
                            >
                        {/if} -->

                                <DropdownSelect
                                    disabled
                                    name="educationLevel"
                                    options={data.educationLookupString}
                                    label={'Taraf Pendidikan'}
                                    dropdownType="label-left-fit"
                                    bind:value={$maklumatAkademikForm.dataList[
                                        i
                                    ].educationLevel}
                                ></DropdownSelect>

                                <!-- {#if $maklumatAkademikErrors?.dataList[i]?.educationLevel}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors?.dataList[i]
                                    ?.educationLevel}</span
                            >
                        {/if} -->

                                <DropdownSelect
                                    disabled
                                    name="sponsorship"
                                    options={data.sponsorshipLookupString}
                                    label={'Penajaan'}
                                    dropdownType="label-left-fit"
                                    bind:value={$maklumatAkademikForm.dataList[
                                        i
                                    ].sponsorship}
                                ></DropdownSelect>

                                <!-- {#if $maklumatAkademikErrors?.dataList[i]?.sponsorship}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors?.dataList[i]
                                    ?.sponsorship}</span
                            >
                        {/if} -->

                                <TextField
                                    disabled
                                    label={'Nama Sijil/Pencapaian'}
                                    type="text"
                                    bind:value={$maklumatAkademikForm.dataList[
                                        i
                                    ].name}
                                ></TextField>

                                <!-- {#if $maklumatAkademikErrors?.dataList[i]?.name}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors?.dataList[i]
                                    ?.name}</span
                            >
                        {/if} -->

                                <DateSelector
                                    disabled
                                    name="completionDate"
                                    label="Tarikh Tamat Pembelajaran"
                                    bind:selectedDate={$maklumatAkademikForm
                                        .dataList[i].completionDate}
                                ></DateSelector>
                                <!-- {#if $maklumatAkademikForm.dataList[i].completionDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikForm.dataList[i]
                                    .completionDate}</span
                            >
                        {/if} -->

                                <TextField
                                    disabled
                                    name="finalGrade"
                                    label={'Ijazah/ CGPA/ Gred'}
                                    type="text"
                                    bind:value={$maklumatAkademikForm.dataList[
                                        i
                                    ].finalGrade}
                                ></TextField>

                                <!-- {#if $maklumatAkademikErrors?.dataList[i]?.finalGrade}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors?.dataList[i]
                                    ?.finalGrade}</span
                            >
                        {/if} -->

                                <TextField
                                    disabled
                                    name="remark"
                                    label={'Catatan'}
                                    type="text"
                                    bind:value={$maklumatAkademikForm.dataList[
                                        i
                                    ].remark}
                                ></TextField>

                                <!-- {#if $maklumatAkademikErrors?.dataList[i]?.remark}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors?.dataList[i]
                                    ?.remark}</span
                            >
                        {/if} -->
                            </div>
                        {/each}
                    {/if}
                </form>
                {#if !disabled}
                    <div class="w-full rounded-[3px] border-b border-t p-2.5">
                        <TextIconButton
                            primary
                            label="Tambah Akademik/Kelayakan/Latihan yang Lalu"
                            onClick={() => (openAcademicInfoModal = true)}
                        >
                            <SvgPlus></SvgPlus>
                        </TextIconButton>
                    </div>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!---------------Maklumat Pengalaman--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman">
            <!-- {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperPengalaman"
                />
            {/if} -->
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperPengalaman"
                    class="flex w-full flex-col gap-2"
                    use:maklumatPengalamanEnhance
                    method="POST"
                >
                    {#if $maklumatPengalamanForm.dataList.length < 1}
                        <div
                            class="text-center text-sm italic text-system-primary"
                        >
                            Tiada data dijumpai. Sila tambah.
                        </div>
                    {:else}
                        {#each $maklumatPengalamanForm.dataList as _, i}
                            <div class="space-y-2.5 rounded-[3px] border p-2.5">
                                <p class={stepperFormTitleClass}>
                                    Maklumat Pengalaman #{i + 1}
                                </p>

                                <TextField
                                    disabled
                                    name="company"
                                    label={'Nama Majikan'}
                                    type="text"
                                    bind:value={$maklumatPengalamanForm
                                        .dataList[i].company}
                                ></TextField>
                                <!-- {#if $maklumatPengalamanErrors.company}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.company}</span
                            >
                        {/if} -->

                                <TextField
                                    disabled
                                    name="address"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    bind:value={$maklumatPengalamanForm
                                        .dataList[i].address}
                                ></TextField>
                                <!-- {#if $maklumatPengalamanErrors.address}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.address}</span
                            >
                        {/if} -->

                                <TextField
                                    disabled
                                    name="position"
                                    label={'Jawatan'}
                                    type="text"
                                    bind:value={$maklumatPengalamanForm
                                        .dataList[i].position}
                                ></TextField>
                                <!-- {#if $maklumatPengalamanErrors.position}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.position}</span
                            >
                        {/if} -->

                                <TextField
                                    disabled
                                    name="positionCode"
                                    label={'Kod Jawatan (jika ada)'}
                                    type="text"
                                    bind:value={$maklumatPengalamanForm
                                        .dataList[i].positionCode}
                                ></TextField>
                                <!-- {#if $maklumatPengalamanErrors.positionCode}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.positionCode}</span
                            >
                        {/if} -->
                                <DateSelector
                                    disabled
                                    name="startDate"
                                    label="Tarikh Tamat Pembelajaran"
                                    bind:selectedDate={$maklumatPengalamanForm
                                        .dataList[i].startDate}
                                ></DateSelector>

                                <DateSelector
                                    disabled
                                    name="endDate"
                                    label="Tarikh Tamat Pembelajaran"
                                    bind:selectedDate={$maklumatPengalamanForm
                                        .dataList[i].endDate}
                                ></DateSelector>

                                <!-- {#if $maklumatPengalamanErrors.duration}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.duration}</span
                            >
                        {/if} -->

                                <TextField
                                    disabled
                                    name="salary"
                                    label={'Gaji'}
                                    type="number"
                                    bind:value={$maklumatPengalamanForm
                                        .dataList[i].salary}
                                ></TextField>
                                <!-- {#if $maklumatPengalamanErrors.salary}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.salary}</span
                            >
                        {/if} -->
                            </div>
                        {/each}
                    {/if}
                </form>
                {#if !disabled}
                    <div class="w-full rounded-[3px] border-b border-t p-2.5">
                        <TextIconButton
                            primary
                            label="Tambah Pengalaman"
                            onClick={() => {
                                openExperienceInfoModal = true;
                            }}
                        >
                            <SvgPlus></SvgPlus>
                        </TextIconButton>
                    </div>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!--------------Maklumat Kegiatan / Keahlian------------->
    <!------------------------------------------------------->

    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={data.personalActivityList}
                ></DynamicTable>
            </div>
            {#if !disabled}
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Kegiatan/Keahlian"
                        onClick={() => {
                            openMembershipInfoModal = true;
                        }}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
            {/if}</StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Keluarga--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga">
            <!-- <TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    getSuccessToast();
                }}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton> -->
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={data.personalFamilyList}
                ></DynamicTable>
            </div>
            {#if !disabled}
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Maklumat Keluarga"
                        onClick={() => {
                            openFamilyInfoModal = true;
                        }}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
            {/if}
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Tanggungan Selain Isteri dan Anak"
        >
            <!-- <TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    getSuccessToast();
                }}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton> -->
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={data.personalDependencyList}
                ></DynamicTable>
            </div>
            {#if !disabled}
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Tanggungan Selain Isteri dan Anak"
                        onClick={() => {
                            openNonFamilyInfoModal = true;
                        }}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
            {/if}
        </StepperContentBody>
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Waris--------------------->
    <!------------------------------------------------------->

    <StepperContent>
        <StepperContentHeader title="Maklumat Waris">
            <!-- {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperWaris"
                />
            {/if} -->
        </StepperContentHeader>

        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={data.personalNextOfKinList}
                ></DynamicTable>
            </div>
            {#if !disabled}
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Waris"
                        onClick={() => {
                            openNextOfKinInfoModal = true;
                        }}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
            {/if}</StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class={stepperFormTitleClass}>Fail-fail yang dimuat naik:</p>
                {#each currentEmployeeUploadedDocuments as item, i}
                    <div
                        class="flex w-full flex-row items-center justify-between"
                    >
                        <label
                            for=""
                            class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                            >{i + 1}.</label
                        >
                        <DownloadAttachment fileName={item.documentPath}
                        ></DownloadAttachment>
                    </div>
                {/each}
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>

<!-- Academic Info Modal -->
<Modal
    title={'Tambah Maklumat Akademik / Kelayakan / Latihan yang Lalu'}
    bind:open={openAcademicInfoModal}
>
    <form
        id="addAcademicModalForm"
        method="POST"
        use:addAcademicInfoEnhance
        class="flex h-fit w-full flex-col gap-y-2"
    >
        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.majorMinor}
            name="majorMinor"
            dropdownType="label-left-full"
            label={'Jenis Jurusan'}
            options={data.majorMinorLookupString}
            bind:value={$addAcademicInfoModal.majorMinor}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.majorMinor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.majorMinor}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.country}
            name="country"
            dropdownType="label-left-full"
            label={'Negara'}
            options={data.countryLookupString}
            bind:value={$addAcademicInfoModal.country}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.country}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.country}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.institution}
            name="institution"
            dropdownType="label-left-full"
            label={'Institusi'}
            options={data.institutionLookupString}
            bind:value={$addAcademicInfoModal.institution}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.institution}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.institution}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.educationLevel}
            name="educationLevel"
            dropdownType="label-left-full"
            label={'Taraf Pembelajaran'}
            options={data.educationLookupString}
            bind:value={$addAcademicInfoModal.educationLevel}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.educationLevel}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.educationLevel}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.sponsorship}
            name="sponsorship"
            dropdownType="label-left-full"
            label={'Penajaan'}
            options={data.sponsorshipLookupString}
            bind:value={$addAcademicInfoModal.sponsorship}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.sponsorship}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.sponsorship}</span
            >
        {/if}

        <TextField
            hasError={!!$addAcademicInfoErrors.name}
            name="name"
            label={'Nama Pencapaian/Sijil'}
            bind:value={$addAcademicInfoModal.name}
        ></TextField>
        {#if $addAcademicInfoErrors.name}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.name}</span
            >
        {/if}
        <DateSelector
            hasError={!!$addAcademicInfoErrors.completionDate}
            name="completionDate"
            label={'Tarikh Kelulusan'}
            bind:selectedDate={$proxyAcademicCompletionDate}
        ></DateSelector>
        {#if $addAcademicInfoErrors.completionDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.completionDate}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.finalGrade}
            name="finalGrade"
            label={'Pencapaian Akhir (Gred)'}
            bind:value={$addAcademicInfoModal.finalGrade}
        ></TextField>
        {#if $addAcademicInfoErrors.finalGrade}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.finalGrade}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.field}
            name="field"
            label={'Catatan'}
            bind:value={$addAcademicInfoModal.field}
        ></TextField>
        {#if $addAcademicInfoErrors.field}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.field}</span
            >
        {/if}
        <TextIconButton primary label={'Simpan'} form="addAcademicModalForm" />
    </form>
</Modal>

<!-- Experience Info Modal -->
<Modal title={'Tambah Maklumat Pengalaman'} bind:open={openExperienceInfoModal}>
    <form
        id="addExperienceInfoModal"
        method="POST"
        use:addExperienceModalEnhance
        class="flex w-full flex-col gap-2"
    >
        <TextField
            hasError={!!$addExperienceModalErrors.company}
            name="addCompany"
            label={'Nama Majikan'}
            type="text"
            bind:value={$addExperienceModalForm.company}
        ></TextField>
        {#if $addExperienceModalErrors.company}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.company}</span
            >
        {/if}

        <TextField
            hasError={!!$addExperienceModalErrors.address}
            name="addAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addExperienceModalForm.address}
        ></TextField>
        {#if $addExperienceModalErrors.address}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.address}</span
            >
        {/if}

        <TextField
            hasError={!!$addExperienceModalErrors.position}
            name="addPosition"
            label={'Jawatan'}
            type="text"
            bind:value={$addExperienceModalForm.position}
        ></TextField>
        {#if $addExperienceModalErrors.position}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.position}</span
            >
        {/if}

        <TextField
            hasError={!!$addExperienceModalErrors.positionCode}
            name="addPositionCode"
            label={'Kod Jawatan'}
            type="text"
            bind:value={$addExperienceModalForm.positionCode}
        ></TextField>

        <DateSelector
            hasError={!!$addExperienceModalErrors.startDate}
            name="addStartDate"
            label={'Dari (tahun)'}
            bind:selectedDate={$proxyAddAcademiStartDate}
        ></DateSelector>
        {#if $addExperienceModalErrors.startDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.startDate}</span
            >
        {/if}
        <DateSelector
            hasError={!!$addExperienceModalErrors.endDate}
            name="addEndDate"
            label={'Hingga (tahun)'}
            bind:selectedDate={$proxyAddAcademiEndDate}
        ></DateSelector>
        {#if $addExperienceModalErrors.endDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.endDate}</span
            >
        {/if}

        <TextField
            hasError={!!$addExperienceModalErrors.salary}
            name="addSalary"
            label={'Gaji'}
            type="text"
            bind:value={$addExperienceModalForm.salary}
        ></TextField>
        {#if $addExperienceModalErrors.salary}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.salary}</span
            >
        {/if}
        <TextIconButton
            primary
            label={'Simpan'}
            form="addExperienceInfoModal"
        />
    </form>
</Modal>

<!-- Membership Info Modal -->
<Modal title={'Tambah Kegiatan/Keahlian'} bind:open={openMembershipInfoModal}>
    <form
        id="addMembershipInfoModal"
        class="flex w-full flex-col gap-2"
        use:addActivityModalEnhance
        method="POST"
    >
        <TextField
            hasError={!!$addActivityModalErrors.name}
            name="addName"
            label={'Nama Kegiatan'}
            type="text"
            bind:value={$addActivityModal.name}
        ></TextField>
        {#if $addActivityModalErrors.name}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.name}</span
            >
        {/if}

        <DateSelector
            hasError={!!$addActivityModalErrors.joinDate}
            name="addJoinDate"
            label={'Tarikh Keahlian'}
            bind:selectedDate={$proxyAddActivityJoinDate}
        ></DateSelector>
        {#if $addActivityModalErrors.joinDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.joinDate}</span
            >
        {/if}

        <TextField
            hasError={!!$addActivityModalErrors.position}
            name="addPosition"
            label={'Jawatan'}
            type="text"
            bind:value={$addActivityModal.position}
        ></TextField>
        {#if $addActivityModalErrors.position}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.position}</span
            >
        {/if}

        <TextField
            hasError={!!$addActivityModalErrors.description}
            name="addDescription"
            label={'Catatan'}
            type="text"
            bind:value={$addActivityModal.description}
        ></TextField>
        {#if $addActivityModalErrors.description}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.description}</span
            >
        {/if}

        <TextIconButton
            primary
            label={'Simpan'}
            form="addMembershipInfoModal"
        />
    </form>
</Modal>
<!-- Family Info Modal -->
<Modal
    title={'Tambah Maklumat Suami/Isteri & Anak'}
    bind:open={openFamilyInfoModal}
>
    <form
        id="addFamilyInfoModal"
        class="flex w-full flex-col gap-2"
        use:addFamilyEnhance
        method="POST"
    >
        <TextField
            hasError={!!$addFamilyErrors.name}
            name="addName"
            label={'Nama'}
            type="text"
            bind:value={$addFamilyModal.name}
        ></TextField>
        {#if $addFamilyErrors.name}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.name}</span
            >
        {/if}

        <TextField
            hasError={!!$addFamilyErrors.alternativeName}
            name="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:value={$addFamilyModal.alternativeName}
        ></TextField>
        {#if $addFamilyErrors.alternativeName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.alternativeName}</span
            >
        {/if}
        <DropdownSelect
            hasError={!!$addFamilyErrors.identityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            dropdownType="label-left-full"
            options={data.identityCardColorLookup}
            bind:value={$addFamilyModal.identityDocumentColor}
        ></DropdownSelect>
        {#if $addFamilyErrors.identityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.identityDocumentColor}</span
            >
        {/if}
        <TextField
            hasError={!!$addFamilyErrors.identityDocumentNumber}
            name="addIdentityDocumentNumber"
            type="number"
            label={'Nombor Kad Pengenalan'}
            bind:value={$addFamilyModal.identityDocumentNumber}
        ></TextField>
        {#if $addFamilyErrors.identityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.identityDocumentNumber}</span
            >
        {/if}

        <LongTextField
            hasError={!!$addFamilyErrors.address}
            name="addAddress"
            label={'Alamat'}
            bind:value={$addFamilyModal.address}
        ></LongTextField>
        {#if $addFamilyErrors.address}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.address}</span
            >
        {/if}

        <TextField
            hasError={!!$addFamilyErrors.postcode}
            name="addPostcode"
            label={'Poskod'}
            type="text"
            bind:value={$addFamilyModal.postcode}
        ></TextField>
        {#if $addFamilyErrors.postcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.postcode}</span
            >
        {/if}

        <DateSelector
            hasError={!!$addFamilyErrors.birthDate}
            name="addBirthDate"
            label={'Tarikh Lahir'}
            bind:selectedDate={$proxyAddFamilyBirthDate}
        ></DateSelector>
        {#if $addFamilyErrors.birthDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.birthDate}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.birthCountry}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countryLookupString}
            bind:value={$addFamilyModal.birthCountry}
        ></DropdownSelect>
        {#if $addFamilyErrors.birthCountry}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.birthCountry}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.birthState}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateLookupString}
            bind:value={$addFamilyModal.birthState}
        ></DropdownSelect>
        {#if $addFamilyErrors.birthState}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.birthState}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.relationship}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipLookupString}
            bind:value={$addFamilyModal.relationship}
        ></DropdownSelect>
        {#if $addFamilyErrors.relationship}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.relationship}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.educationLevel}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationLookupString}
            bind:value={$addFamilyModal.educationLevel}
        ></DropdownSelect>
        {#if $addFamilyErrors.educationLevel}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.educationLevel}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.race}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceLookupString}
            bind:value={$addFamilyModal.race}
        ></DropdownSelect>
        {#if $addFamilyErrors.race}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.race}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.nationality}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalityLookupString}
            bind:value={$addFamilyModal.nationality}
        ></DropdownSelect>
        {#if $addFamilyErrors.nationality}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.nationality}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.marital}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalLookupString}
            bind:value={$addFamilyModal.marital}
        ></DropdownSelect>
        {#if $addFamilyErrors.marital}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.marital}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.gender}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderLookupString}
            bind:value={$addFamilyModal.gender}
        ></DropdownSelect>
        {#if $addFamilyErrors.gender}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.gender}</span
            >
        {/if}

        <TextField
            hasError={!!$addFamilyErrors.workAddress}
            name="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addFamilyModal.workAddress}
        ></TextField>
        {#if $addFamilyErrors.workAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.workAddress}</span
            >
        {/if}

        <TextField
            hasError={!!$addFamilyErrors.workPostcode}
            name="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:value={$addFamilyModal.workPostcode}
        ></TextField>
        {#if $addFamilyErrors.workPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.workPostcode}</span
            >
        {/if}

        <TextField
            hasError={!!$addFamilyErrors.phoneNumber}
            name="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:value={$addFamilyModal.phoneNumber}
        ></TextField>
        {#if $addFamilyErrors.phoneNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.phoneNumber}</span
            >
        {/if}

        <DateSelector
            hasError={!!$addFamilyErrors.marriageDate}
            name="addMarriageDate"
            label={'Tarikh Kahwin'}
            bind:selectedDate={$proxyAddFamilyMarriageDate}
        ></DateSelector>
        {#if $addFamilyErrors.marriageDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.marriageDate}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addInSchool"
                bind:checked={$addFamilyModal.inSchool}
            />
        </div>
        {#if $addFamilyErrors.inSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.inSchool}</span
            >
        {/if}
        <br />

        <TextIconButton primary label={'Simpan'} form="addFamilyInfoModal" />
    </form>
</Modal>

<!-- Non Family Info Modal -->
<Modal
    title={'Tambah Maklumat Suami/Isteri & Anak'}
    bind:open={openNonFamilyInfoModal}
>
    <form
        id="addNonFamilyInfoModal"
        class="flex w-full flex-col gap-2"
        use:addNonFamilyEnhance
        method="POST"
    >
        <TextField
            hasError={!!$addNonFamilyErrors.name}
            name="addName"
            label={'Nama'}
            type="text"
            bind:value={$addNonFamilyModal.name}
        ></TextField>
        {#if $addNonFamilyErrors.name}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.name}</span
            >
        {/if}

        <TextField
            hasError={!!$addNonFamilyErrors.alternativeName}
            name="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:value={$addNonFamilyModal.alternativeName}
        ></TextField>
        {#if $addNonFamilyErrors.alternativeName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.alternativeName}</span
            >
        {/if}
        <DropdownSelect
            hasError={!!$addNonFamilyErrors.identityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            dropdownType="label-left-full"
            options={data.identityCardColorLookup}
            bind:value={$addNonFamilyModal.identityDocumentColor}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.identityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.identityDocumentColor}</span
            >
        {/if}
        <TextField
            hasError={!!$addNonFamilyErrors.identityDocumentNumber}
            name="addIdentityDocumentNumber"
            type="number"
            label={'Nombor Kad Pengenalan'}
            bind:value={$addNonFamilyModal.identityDocumentNumber}
        ></TextField>
        {#if $addNonFamilyErrors.identityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.identityDocumentNumber}</span
            >
        {/if}

        <LongTextField
            hasError={!!$addNonFamilyErrors.address}
            name="addAddress"
            label={'Alamat'}
            bind:value={$addNonFamilyModal.address}
        ></LongTextField>
        {#if $addNonFamilyErrors.address}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.address}</span
            >
        {/if}

        <TextField
            hasError={!!$addNonFamilyErrors.postcode}
            name="addPostcode"
            label={'Poskod'}
            type="text"
            bind:value={$addNonFamilyModal.postcode}
        ></TextField>
        {#if $addNonFamilyErrors.postcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.postcode}</span
            >
        {/if}

        <DateSelector
            hasError={!!$addNonFamilyErrors.birthDate}
            name="addBirthDate"
            label={'Tarikh Lahir'}
            bind:selectedDate={$proxyAddDependencyBirthDate}
        ></DateSelector>
        {#if $addNonFamilyErrors.birthDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.birthDate}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.birthCountry}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countryLookupString}
            bind:value={$addNonFamilyModal.birthCountry}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.birthCountry}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.birthCountry}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.birthState}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateLookupString}
            bind:value={$addNonFamilyModal.birthState}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.birthState}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.birthState}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.relationship}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipLookupString}
            bind:value={$addNonFamilyModal.relationship}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.relationship}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.relationship}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.educationLevel}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationLookupString}
            bind:value={$addNonFamilyModal.educationLevel}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.educationLevel}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.educationLevel}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.race}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceLookupString}
            bind:value={$addNonFamilyModal.race}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.race}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.race}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.nationality}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalityLookupString}
            bind:value={$addNonFamilyModal.nationality}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.nationality}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.nationality}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.marital}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalLookupString}
            bind:value={$addNonFamilyModal.marital}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.marital}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.marital}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.gender}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderLookupString}
            bind:value={$addNonFamilyModal.gender}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.gender}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.gender}</span
            >
        {/if}

        <TextField
            hasError={!!$addNonFamilyErrors.workAddress}
            name="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addNonFamilyModal.workAddress}
        ></TextField>
        {#if $addNonFamilyErrors.workAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.workAddress}</span
            >
        {/if}

        <TextField
            hasError={!!$addNonFamilyErrors.workPostcode}
            name="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:value={$addNonFamilyModal.workPostcode}
        ></TextField>
        {#if $addNonFamilyErrors.workPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.workPostcode}</span
            >
        {/if}

        <TextField
            hasError={!!$addNonFamilyErrors.phoneNumber}
            name="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:value={$addNonFamilyModal.phoneNumber}
        ></TextField>
        {#if $addNonFamilyErrors.phoneNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.phoneNumber}</span
            >
        {/if}

        <DateSelector
            hasError={!!$addNonFamilyErrors.marriageDate}
            name="addMarriageDate"
            label={'Tarikh Kahwin'}
            bind:selectedDate={$proxyAddDependencyMarriageDate}
        ></DateSelector>
        {#if $addNonFamilyErrors.marriageDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.marriageDate}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addInSchool"
                bind:checked={$addNonFamilyModal.inSchool}
            />
        </div>
        {#if $addNonFamilyErrors.inSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.inSchool}</span
            >
        {/if}
        <br />

        <TextIconButton primary label={'Simpan'} form="addNonFamilyInfoModal" />
    </form>
</Modal>

<!-- Next Of Kin Info Modal -->
<Modal title={'Tambah Maklumat Waris'} bind:open={openNextOfKinInfoModal}>
    <form
        id="addNextOfKinInfoModal"
        use:addNextOfKinEnhance
        method="POST"
        class="flex w-full flex-col gap-2"
    >
        <TextField
            hasError={!!$addNextOfKinErrors.name}
            name="addName"
            label={'Nama'}
            type="text"
            bind:value={$addNextOfKinModal.name}
        ></TextField>
        {#if $addNextOfKinErrors.name}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.name}</span
            >
        {/if}

        <TextField
            hasError={!!$addNextOfKinErrors.alternativeName}
            name="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:value={$addNextOfKinModal.alternativeName}
        ></TextField>
        {#if $addNextOfKinErrors.alternativeName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.alternativeName}</span
            >
        {/if}
        <DropdownSelect
            hasError={!!$addNextOfKinErrors.identityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            dropdownType="label-left-full"
            options={data.identityCardColorLookup}
            bind:value={$addNextOfKinModal.identityDocumentColor}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.identityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.identityDocumentColor}</span
            >
        {/if}
        <TextField
            hasError={!!$addNextOfKinErrors.identityDocumentNumber}
            name="addIdentityDocumentNumber"
            type="number"
            label={'Nombor Kad Pengenalan'}
            bind:value={$addNextOfKinModal.identityDocumentNumber}
        ></TextField>
        {#if $addNextOfKinErrors.identityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.identityDocumentNumber}</span
            >
        {/if}

        <LongTextField
            hasError={!!$addNextOfKinErrors.address}
            name="addAddress"
            label={'Alamat'}
            bind:value={$addNextOfKinModal.address}
        ></LongTextField>
        {#if $addNextOfKinErrors.address}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.address}</span
            >
        {/if}

        <TextField
            hasError={!!$addNextOfKinErrors.postcode}
            name="addPostcode"
            label={'Poskod'}
            type="text"
            bind:value={$addNextOfKinModal.postcode}
        ></TextField>
        {#if $addNextOfKinErrors.postcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.postcode}</span
            >
        {/if}

        <DateSelector
            hasError={!!$addNextOfKinErrors.birthDate}
            name="addBirthDate"
            label={'Tarikh Lahir'}
            bind:selectedDate={$proxyAddNextOfKinBirthDate}
        ></DateSelector>
        {#if $addNextOfKinErrors.birthDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.birthDate}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.birthCountry}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countryLookupString}
            bind:value={$addNextOfKinModal.birthCountry}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.birthCountry}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.birthCountry}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.birthState}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateLookupString}
            bind:value={$addNextOfKinModal.birthState}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.birthState}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.birthState}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.relationship}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipLookupString}
            bind:value={$addNextOfKinModal.relationship}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.relationship}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.relationship}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.educationLevel}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationLookupString}
            bind:value={$addNextOfKinModal.educationLevel}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.educationLevel}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.educationLevel}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.race}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceLookupString}
            bind:value={$addNextOfKinModal.race}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.race}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.race}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.nationality}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalityLookupString}
            bind:value={$addNextOfKinModal.nationality}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.nationality}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.nationality}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.marital}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalLookupString}
            bind:value={$addNextOfKinModal.marital}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.marital}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.marital}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.gender}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderLookupString}
            bind:value={$addNextOfKinModal.gender}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.gender}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.gender}</span
            >
        {/if}

        <TextField
            hasError={!!$addNextOfKinErrors.workAddress}
            name="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addNextOfKinModal.workAddress}
        ></TextField>
        {#if $addNextOfKinErrors.workAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.workAddress}</span
            >
        {/if}

        <TextField
            hasError={!!$addNextOfKinErrors.workPostcode}
            name="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:value={$addNextOfKinModal.workPostcode}
        ></TextField>
        {#if $addNextOfKinErrors.workPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.workPostcode}</span
            >
        {/if}

        <TextField
            hasError={!!$addNextOfKinErrors.phoneNumber}
            name="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:value={$addNextOfKinModal.phoneNumber}
        ></TextField>
        {#if $addNextOfKinErrors.phoneNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.phoneNumber}</span
            >
        {/if}

        <DateSelector
            hasError={!!$addNextOfKinErrors.marriageDate}
            name="addMarriageDate"
            label={'Tarikh Kahwin'}
            bind:selectedDate={$proxyAddNextOfKinMarriageDate}
        ></DateSelector>
        {#if $addNextOfKinErrors.marriageDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.marriageDate}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addInSchool"
                bind:checked={$addNextOfKinModal.inSchool}
            />
        </div>
        {#if $addNextOfKinErrors.inSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.inSchool}</span
            >
        {/if}

        <TextIconButton primary label={'Simpan'} form="addNextOfKinInfoModal" />
    </form>
</Modal>
