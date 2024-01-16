<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Badge, Button, Tooltip } from 'flowbite-svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades.js';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions.js';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { afterUpdate, onMount } from 'svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import ChargesFormGroup from '$lib/components/integriti-charges-form-group/ChargesFormGroup.svelte';
    import { punishmentMeetingNames } from '$lib/mocks/mesyuarat/integrityMeetingName.js';
    import { mockCharges } from '$lib/mocks/integriti/prosiding/mockProsiding.js';
    import AddPunishmentFromGroup from '$lib/components/integriti-charges-form-group/AddPunishmentFromGroup.svelte';
    import { goto } from '$app/navigation';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper.js';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';

    export let data;

    let activeStepper = 0;
    let disabled = true;
    let isCompleted: boolean = false;
    let meetingResult: string = '-';
    let selectedProceedingType: string = '';
    let selectedSuspensionType: string = 'suspension-investigation';
    let suspensionStartDate: string = '2024-01-02';

    function calculateTwoMonthsLater(initialDate: string) {
        // Parse the initial date string to create a Date object
        const startDate = new Date(initialDate);

        // Calculate the date two months later
        const twoMonthsLater = new Date(startDate);
        twoMonthsLater.setMonth(startDate.getMonth() + 2);

        // Format the result as a string (you can adjust the format as needed)
        const result = twoMonthsLater.toISOString().split('T')[0];

        return result;
    }

    const meetingOptions: RadioOption[] = [
        {
            value: 'guilty',
            label: 'BERSALAH',
        },
        {
            value: 'innocent',
            label: 'TIDAK BERSALAH',
        },
    ];
    let integrityDirectorResult: any = 'free';

    const integrityDirectorOptions: RadioOption[] = [
        {
            value: 'free',
            label: 'BEBAS',
        },
        {
            value: 'guilty',
            label: 'TIDAK BEBAS',
        },
    ];

    const options: RadioOption[] = [
        {
            value: 'sah',
            label: 'SAH',
        },
        {
            value: 'tidak sah',
            label: 'TIDAK SAH',
        },
    ];

    const faedahPersaraanOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'KWSP',
        },
        {
            value: 'false',
            label: 'Pencen',
        },
    ];

    function getEmployeeLeave(currentEmployeeNumber: string) {
        if (currentEmployeeNumber === '00001') {
            return '30';
        }
        if (currentEmployeeNumber === '00002') {
            return '27';
        }
        if (currentEmployeeNumber === '00003') {
            return '25';
        }
    }

    function isBlueOrRedIC(isMalaysian: boolean) {
        return isMalaysian ? 'Biru' : 'Merah';
    }

    function dateFormatter(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }

    let isExPoliceSoldier = data.record.currentEmployee.isExPoliceOrSoldier
        ? 'true'
        : 'false';

    let isInRelationshipWithLKIMStaff =
        data.record.currentEmployeeSpouse.isLKIMStaff == 'Ya'
            ? 'true'
            : 'false';
    let isKWSP =
        data.record.currentEmployeePensions.type == 'KWSP' ? 'true' : 'false';

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

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

    // =====================================================================
    // ===================Charges Form Group =========================-

    // ##Charges------------------------------------------------

    let chargesFormGroup: IntCharges = {};
    let chargesNextGroupId = 1;

    function addChargeFormGroup() {
        chargesFormGroup = {
            ...chargesFormGroup,
            [chargesNextGroupId.toString()]: {
                title: '',
            },
        };
        chargesNextGroupId += 1;
    }

    function removeChargeFormGroup(groupId: string) {
        chargesFormGroup = { ...chargesFormGroup };
        delete chargesFormGroup[groupId];
    }

    // ===================End of Charges Form Group ===================
    // =====================================================================

    afterUpdate(() => {
        console.log(selectedProceedingType);
        // Add an initial form group
        // addChargeFormGroup();
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Tambah Rekod Prosiding Tatatertib"
        description="Penambahan rekod prosiding tatatertib {data.record
            .currentEmployee.name}"
    >
        <FormButton
            type="close"
            onClick={() => {
                goto('../../prosiding');
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <TextField
                    {disabled}
                    id="noPerkeja"
                    label={'No. Pekerja'}
                ></TextField>
                <TextField
                    {disabled}
                    id="statusPekerjaan"
                    label={'Status Pekerjaan'}
                ></TextField>
                <TextField
                    {disabled}
                    id="noKadPengenalan"
                    label={'No. Kad Pengenalan'}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaPenuh"
                    label={'Nama Penuh'}
                ></TextField>
                <TextField
                    {disabled}
                    id="namaLain"
                    label={'Nama Lain'}
                ></TextField>
                <TextField
                    {disabled}
                    id="warnaKadPengenalan"
                    label={'Warna Kad Pengenalan'}
                    
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    {disabled}
                    label={'Tarikh Lahir'}
                    
                ></DateSelector>
                <TextField
                    {disabled}
                    id="tempatLahir"
                    label={'Tempat Lahir'}
                ></TextField>
                <TextField
                    {disabled}
                    id="warganegara"
                    label={'Warganegara'}
                    
                ></TextField>
                <TextField
                    {disabled}
                    id="bangsa"
                    label={'Bangsa'}
                ></TextField>
                <TextField
                    {disabled}
                    id="agama"
                    label={'Agama'}
                ></TextField>
                <TextField
                    {disabled}
                    id="jantina"
                    label={'Jantina'}
                ></TextField>
                <TextField
                    {disabled}
                    id="status"
                    label={'Status'}
                ></TextField>
                <TextField
                    {disabled}
                    id="emel"
                    label={'Emel'}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="alamatRumah"
                    label={'Alamat Rumah'}
                ></LongTextField>
                <LongTextField
                    {disabled}
                    id="alamatSuratMenyurat"
                    label={'Alamat Surat Menyurat (jika berlainan dari alamat rumah'}
                ></LongTextField>
                <TextField
                    {disabled}
                    id="perumahan"
                    label={'Perumahan'}
                    value={'-'}
                ></TextField>
                <TextField
                    {disabled}
                    id="pinjPerumahan"
                    label={'Pinjaman Perumahan'}
                    value={'-'}
                ></TextField>
                <TextField
                    {disabled}
                    id="pinjKenderaan"
                    label={'Pinjaman Kenderaan'}
                    value={'-'}
                ></TextField>
                <RadioSingle
                    {disabled}
                    {options}
                    legend={'Bekas Polis / Tentera'}
                ></RadioSingle>
            </div>

            <div class="flex w-full flex-col gap-2">
                <p class={stepperFormTitleClass}>
                    Maklumat Pertalian Dengan Kakitangan LKIM
                </p>

                <!-- kakitanganLKIM? -->
                <RadioSingle
                    {options}
                    {disabled}
                    legend={'Perhubungan Dengan Kakitangan LKIM'}
                ></RadioSingle>
                {#if isInRelationshipWithLKIMStaff === 'true'}
                    <TextField
                        {disabled}
                        id="noPekerjaPasangan"
                        label={'No. Pekerja LKIM'}
                        
                    ></TextField>
                    <TextField
                        {disabled}
                        id="namaPasangan"
                        label={'Nama Kakitangan LKIM'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="jawatanPasangan"
                        label={'Jawatan Kakitangan LKIM'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="hubungan"
                        label={'Hubungan'}
                    ></TextField>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                <TextField
                    disabled={true}
                    id="gredSemasa"
                    label={'Gred Semasa'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="jawatan"
                    label={'Jawatan'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="penempatan"
                    label={'Penempatan'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="tarafPerkhidmatan"
                    label={'Taraf Perkhidmatan'}
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    
                ></DateSelector>
                <RadioSingle
                    disabled={true}
                    options={faedahPersaraanOptions}
                    legend={'Faedah Persaraan'}
                ></RadioSingle>
                <TextField
                    disabled={true}
                    id="noKWSP"
                    label={'No. KWSP'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="noSOCSO"
                    label={'No. SOCSO'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="noCukai"
                    label={'No. Cukai (LHDN)'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="bank"
                    label={'Bank'}
                    value={'Maybank Berhad'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="noAkaun"
                    label={'No. Akaun'}
                    value={'1234-5678-9012'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="program"
                    label={'Program'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="kelayakanCuti"
                    label={'Kelayakan Cuti'}
                    
                ></TextField>

                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    
                ></DateSelector>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    
                ></DateSelector>

                <AccordianField
                    disabled={!disabled}
                    label="Sejarah Lantikan Jawatan LKIM"
                    header="Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan"
                >
                    {#each data.record.currentEmployeePositionHistory as item, i}
                        <label
                            for=""
                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {disabled
                                ? 'text-txt-tertiary'
                                : 'text-txt-primary'}
                                            hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                            >{i + 1}. {mockLookupGrades.find(
                                (grade) => grade.id === item.gradeId,
                            )?.code}, {mockLookupPositions.find(
                                (position) => position.gradeId === item.gradeId,
                            )?.name}, {item.startDate}, {item.startDate}
                        </label>
                    {/each}
                </AccordianField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                    
                ></DateSelector>
                <TextField
                    disabled={true}
                    id="pemangkuanSekarang"
                    label={'Pemangkuan Sekarang'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="tanggungKerjaSekarang"
                    label={'Tanggung Kerja Sekarang'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="skimPencen"
                    label={'Skim Pencen'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="kenaikanGajiAkhir"
                    label={'Kenaikan Gaji Akhir'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="kenaikanPangkatAkhir"
                    label={'Kenaikan Pangkat Akhir'}
                    value={'-'}
                ></TextField>
                <TextField
                    disabled={true}
                    id="bulanKGT"
                    label={'Bulan KGT'}
                    value={'-'}
                ></TextField>
                <DateSelector
                    handleDateChange={() => {}}
                    disabled={true}
                    label={'Tarikh Bersara'}
                    
                ></DateSelector>
                <p class={stepperFormTitleClass}>
                    Maklumat Gaji dan Elaun - Elaun
                </p>
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <TextField
                            disabled={true}
                            id="tarikhBerkuatkuasa"
                            label={'Tarikh Berkuatkuasa'}
                            value={'12/12/2021'}
                        ></TextField>
                        <TextField
                            disabled={true}
                            id="tanggaGaji"
                            label={'Tangga Gaji'}
                        ></TextField>
                        <TextField
                            disabled={true}
                            id="gajiPokok"
                            label={'Gaji Pokok'}
                        ></TextField>
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={true}
                            id="itka"
                            label={'ITKA'}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={true}
                            id="itp"
                            label={'ITP'}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={true}
                            id="epw"
                            label={'EPW'}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={true}
                            id="cola"
                            label={'COLA'}
                        ></TextField>
                        <!-- Tooltip body -->
                        <Tooltip
                            type="dark"
                            triggeredBy="[id^='type-']"
                            on:show={assignContent}>"{tooltipContent}"</Tooltip
                        >
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Jenis Prosiding"
            ><TextIconButton
                primary
                label="Seterusnya"
                onClick={() => {
                    activeStepper = 3;
                }}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <DropdownSelect
                    disabled={isCompleted}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meetings-dropdown"
                    label="Nama dan Bil Mesyuarat"
                    options={[
                        { value: 'charges', name: 'Pertuduhan' },
                        {
                            value: 'suspension',
                            name: 'Tahan Kerja/Gantung Kerja',
                        },
                    ]}
                ></DropdownSelect>
            </div>
        </StepperContentBody>
    </StepperContent>
    {#if selectedProceedingType === 'charges'}
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Pertuduhan"
                ><TextIconButton primary label="Simpan" onClick={() => {}}>
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Maklumat Mesyuarat"
                />
                <DateSelector
                    disabled={isCompleted}
                    labelBlack={true}
                    label="Tarikh Mesyuarat"
                    selectedDate={''}
                    handleDateChange={() => {}}
                />
                <DropdownSelect
                    disabled={isCompleted}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meetings-dropdown"
                    label="Nama dan Bil Mesyuarat"
                    value={''}
                    options={meetings}
                ></DropdownSelect>
                <div class="my-5 h-fit w-full">
                    <hr />
                </div>
                <div
                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                >
                    <SectionHeader
                        color="system-primary"
                        title="Senarai Pertuduhan"
                        ><div class="mr-2">
                            <TextIconButton
                                primary
                                onClick={() => {
                                    addChargeFormGroup();
                                }}
                                label="Tambah Tuduhan"
                                ><SvgPlus /></TextIconButton
                            >
                        </div></SectionHeader
                    >
                    <hr />
                    {#each Object.entries(chargesFormGroup) as [groupId, group], index}
                        <div
                            class="flex w-full flex-row items-center gap-x-2.5 text-base"
                        >
                            <span class="w-4">{index + 1}.</span>
                            <ChargesFormGroup
                                isEditMode={true}
                                bind:group={chargesFormGroup[groupId]}
                                onDelete={() => removeChargeFormGroup(groupId)}
                            />
                        </div>
                    {/each}
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Pengesahan Pengarah Integriti - Pertuduhan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                >
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Pengarah Integriti</b
                        >
                    </div>
                    {#if isCompleted}
                        <TextField
                            disabled
                            type="text"
                            id="integrity-director-name"
                            label="Nama"
                            value="Mohd Safwan Adam"
                        ></TextField>
                        <LongTextField
                            disabled
                            id="integrity-director-remark"
                            label="Tindakan/Ulasan"
                            value="bebas"
                        ></LongTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label
                                for="integrity-director-result"
                                class="w-[220px]">Keputusan</label
                            ><Badge
                                border
                                color={integrityDirectorResult == 'free'
                                    ? 'green'
                                    : 'red'}
                                >{integrityDirectorOptions[0].label}</Badge
                            >
                        </div>
                    {:else}
                        <TextField
                            disabled
                            type="text"
                            id="passer-name"
                            label="Nama"
                            value={'Azim Bin Karim'}
                        ></TextField>
                        <div class="text-sm text-system-primary">
                            <i class=""><li>● Menunggu keputusan...</li></i>
                        </div>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Penentuan
        Hukuman"
                ><TextIconButton primary label="Simpan" onClick={() => {}}>
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Maklumat Mesyuarat"
                />
                <DateSelector
                    disabled={isCompleted}
                    labelBlack={true}
                    label="Tarikh Mesyuarat"
                    selectedDate={''}
                    handleDateChange={() => {}}
                />
                <DropdownSelect
                    disabled={isCompleted}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meeting-number-dropdown"
                    label="Bil Mesyuarat"
                    value={''}
                    options={meetings}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={isCompleted}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meeting-name-dropdown"
                    label="Nama Mesyuarat"
                    value={''}
                    options={punishmentMeetingNames}
                ></DropdownSelect>

                <div class="my-5 h-fit w-full border-b border-t">
                    <SectionHeader
                        color="system-primary"
                        title="Maklumat Keputusan Mesyuarat Prosiding Penentuan Hukuman"
                    ></SectionHeader>
                </div>

                {#each Object.entries(mockCharges) as [key, charge]}
                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                    >
                        <SectionHeader
                            color="system-primary"
                            title="Pertuduhan #{key}: {charge?.title}"
                        ></SectionHeader>
                        <hr />
                        <RadioSingle
                            disabled={false}
                            options={meetingOptions}
                            legend={'Keputusan Mesyuarat'}
                        ></RadioSingle>

                        <hr />

                        <div class="mx-2.5">
                            <AddPunishmentFromGroup {key} />
                        </div>
                    </div>
                {/each}
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Pengesahan Pengarah Integriti - Hukuman"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                >
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Pengarah Integriti</b
                        >
                    </div>
                    {#if isCompleted}
                        <TextField
                            disabled
                            type="text"
                            id="integrity-director-name"
                            label="Nama"
                            value="Mohd Safwan Adam"
                        ></TextField>
                        <LongTextField
                            disabled
                            id="integrity-director-remark"
                            label="Tindakan/Ulasan"
                            value="bebas"
                        ></LongTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label
                                for="integrity-director-result"
                                class="w-[220px]">Keputusan</label
                            ><Badge
                                border
                                color={integrityDirectorResult == 'free'
                                    ? 'green'
                                    : 'red'}
                                >{integrityDirectorOptions[0].label}</Badge
                            >
                        </div>
                    {:else}
                        <TextField
                            disabled
                            type="text"
                            id="passer-name"
                            label="Nama"
                            value={'Azim Bin Karim'}
                        ></TextField>
                        <div class="text-sm text-system-primary">
                            <i class=""><li>● Menunggu keputusan...</li></i>
                        </div>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>
    {/if}
    {#if selectedProceedingType === 'suspension'}
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Tatatertib"
                ><TextIconButton primary label="Simpan" onClick={() => {}}>
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Maklumat Mesyuarat"
                />
                <DateSelector
                    disabled={isCompleted}
                    labelBlack={true}
                    label="Tarikh Mesyuarat"
                    selectedDate={''}
                    handleDateChange={() => {}}
                />
                <DropdownSelect
                    disabled={isCompleted}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meeting-number-dropdown"
                    label="Bil Mesyuarat"
                    value={''}
                    options={meetings}
                ></DropdownSelect>
                <DropdownSelect
                    disabled={isCompleted}
                    labelBlack={true}
                    dropdownType="label-left-full"
                    name="meeting-name-dropdown"
                    label="Nama Mesyuarat"
                    value={''}
                    options={punishmentMeetingNames}
                ></DropdownSelect>

                <RadioSingle
                    disabled={false}
                    options={meetingOptions}
                    legend={'Keputusan Mesyuarat'}
                ></RadioSingle>
                <div
                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                >
                    <SectionHeader
                        title="Maklumat Keputusan Mesyuarat Prosiding Tatatertib"
                    ></SectionHeader>

                    <DropdownSelect
                        disabled={isCompleted}
                        labelBlack={true}
                        dropdownType="label-left-full"
                        name="suspension-type-dropdown"
                        id="suspension-type-dropdown"
                        label="Jenis Prosiding Tahan Kerja"
                        bind:value={selectedSuspensionType}
                        options={[
                            {
                                value: 'suspension-investigation',
                                name: 'Tahan Kerja - Penyiasatan',
                            },
                            {
                                value: 'suspension-criminal-offence',
                                name: 'Tahan Kerja - Prosiding Jenayah',
                            },
                        ]}
                    ></DropdownSelect>

                    <form action="">
                        <div class="mb-2.5 flex w-full flex-col gap-2.5">
                            {#if selectedSuspensionType === 'suspension-investigation'}
                                <SectionHeader
                                    color="system-primary"
                                    title="Butiran Tahan Kerja - Tujuan Penyiasatan"
                                ></SectionHeader>
                                <DateSelector
                                    disabled={isCompleted}
                                    labelBlack={true}
                                    name="start-date-suspenion-investigation"
                                    label="Tarikh Mula"
                                    handleDateChange={() => {}}
                                />
                                <DateSelector
                                    disabled={true}
                                    labelBlack={true}
                                    name="end-date-suspenion-investigation"
                                    label="Tarikh Akhir - 2 Bulan Dari Tarikh Mula"
                                    selectedDate={calculateTwoMonthsLater(
                                        suspensionStartDate,
                                    )}
                                    handleDateChange={() => {}}
                                />
                                <TextField
                                    disabled={true}
                                    type="text"
                                    id="entitled-emolument-suspenion-investigation"
                                    label="Emolumen Yang Layak Diterima"
                                    value={'100%'}
                                ></TextField>
                            {/if}
                            {#if selectedSuspensionType === 'suspension-criminal-offence'}
                                <SectionHeader
                                    color="system-primary"
                                    title="Butiran Tahan Kerja - Prosiding Jenayah"
                                ></SectionHeader>
                                <DateSelector
                                    disabled={isCompleted}
                                    labelBlack={true}
                                    name="start-date-suspenion-criminal-offence"
                                    label="Tarikh Mula"
                                    selectedDate={''}
                                    handleDateChange={() => {}}
                                />
                                <TextField
                                    disabled={true}
                                    type="text"
                                    id="entitled-emolument-criminal-offence"
                                    label="Emolumen Yang Layak Diterima"
                                    value={'50%'}
                                ></TextField>
                            {/if}
                        </div>
                    </form>
                </div>
                <div
                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                >
                    <div class="mb-2.5 flex w-full flex-col gap-2.5">
                        <SectionHeader title="Butiran Gantung Kerja"
                        ></SectionHeader>
                        <DateSelector
                            disabled={isCompleted}
                            labelBlack={true}
                            name="start-date-suspenion-suspended"
                            label="Tarikh Mula"
                            selectedDate={''}
                            handleDateChange={() => {}}
                        />
                        <TextField
                            disabled={true}
                            type="text"
                            id="entitled-emolument-suspended"
                            label="Emolumen Yang Layak Diterima"
                            value={'0%'}
                        ></TextField>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    {/if}
</Stepper>
