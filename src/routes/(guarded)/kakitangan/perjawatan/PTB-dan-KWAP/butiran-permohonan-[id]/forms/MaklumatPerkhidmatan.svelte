<script lang="ts">
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import type { Salary } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-salary-response.view-model';
    import type { Service } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-service-response.view-model';

    import { Tooltip } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    export let editable: boolean = false;

    export let ptbDataService: Service;
    export let ptbDataSalary: Salary;

    let currentService: PtbService;
    let tooltipContent: string = '';
    const itkaTooltip: string = 'ITKA bermaksud ...';
    const itpTooltip: string = 'ITP bermaksud ...';
    const epwTooltip: string = 'EPW bermaksud ...';
    const colaTooltip: string = 'COLA bermaksud ...';
    let isFaedahKWSP: string = 'true';

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

    onMount(async () => {
        currentService = {
            currentGrade: 'E32',
            position: 'Akauntan',
            placement: 'LKIM Puchong',
            educationLevel: 'Diploma',
            pensionBenefit: 'true',
            kwspNumber: '123456789',
            socsoNumber: '123456789',
            taxNumber: '123456789',
            bankName: 'Maybank Berhad',
            accountNumber: '182673091012',
            programme: 'Tiada',
            entitledLeaves: '32',
        };
    });
</script>

<div class="flex flex-col gap-2.5">
    <b class="text-sm text-system-primary">Maklumat Perkhidmatan</b>
    <TextField
        disabled={!editable}
        id="gredSemasa"
        label={'Gred Semasa'}
       bind:value={ptbDataService.grade}
    ></TextField>
    <TextField disabled={!editable} id="jawatan" label={'Jawatan'} value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="penempatan"
        label={'Penempatan'}
        bind:value={ptbDataService.placement}
    ></TextField>
    <TextField
        disabled={!editable}
        id="tarafPerkhidmatan"
        label={'Taraf Perkhidmatan'}
        value={ptbDataService.serviceLevel}
    ></TextField>
    <!-- <RadioSingle
        disabled={!editable}
        options={faedahPersaraanOptions}
        legend={'Faedah Persaraan'}
        bind:userSelected={retirementType}
    ></RadioSingle> -->
    <TextField
        disabled={!editable}
        id="noKWSP"
        label={'No. KWSP'}
       bind:value={ptbDataService.EPFNumber}
    ></TextField>
    <TextField
        disabled={!editable}
        id="noSOCSO"
        label={'No. SOCSO'}
       bind:value={ptbDataService.SOCSONumber}
    ></TextField>
    <TextField
        disabled={!editable}
        id="noCukai"
        label={'No. Cukai (LHDN)'}
        bind:value={ptbDataService.incomeNumber}
    ></TextField>
    <TextField
        disabled={!editable}
        id="bank"
        label={'Bank'}
        bind:value={ptbDataService.bankName}
    ></TextField>
    <TextField
        disabled={!editable}
        id="noAkaun"
        label={'No. Akaun'}
       bind:value={ptbDataService.bankAccount}
    ></TextField>
    <!-- <TextField
        disabled={!editable}
        id="program"
        label={'Program'}
       bind:value={currentService?.programme}
    ></TextField> -->
    <TextField
        disabled={!editable}
        id="kelayakanCuti"
        label={'Kelayakan Cuti'}
       bind:value={ptbDataService.leaveEntitlement}
    ></TextField>
    <TextField
        disabled={!editable}
        id="mulaDilantikPerkhidmatanKerajaan"
        label={'Mula Dilantik Perkhidmatan Kerajaan'}
      bind:value={ptbDataService.hireByGovermentDate}
    ></TextField>
    <TextField
        disabled={!editable}
        id="mulaDilantikPerkhidmatanLKIM"
        label={'Mula Dilantik Perkhidmatan LKIM'}
        bind:value={ptbDataService.hireByLKIMDate}
    ></TextField>
    <TextField
        disabled={!editable}
        id="mulaDilantikPerkhidmatanSekarang"
        label={'Mula Dilantik Perkhidmatan Sekarang'}
        bind:value={ptbDataService.currentServiceStartDate}
    ></TextField>
    <TextField
        disabled={!editable}
        id="disahkanDalamJawatanPertamaLKIM"
        label={'Disahkan Dalam Jawatan Pertama LKIM'}
        bind:value={ptbDataService.firstServiceConfirmedDate}
    ></TextField>
    <TextField
        disabled={!editable}
        id="disahkanDalamJawatanSemasaLKIM"
        label={'Disahkan Dalam Jawatan Semasa LKIM'}
        bind:value={ptbDataService.currentServiceConfirmedDate}
    ></TextField>
    <AccordianField
        disabled={editable}
        label="Sejarah Lantikan Jawatan LKIM (Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan)"
        header={'maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM[0]'}
    >
        <!-- {#each maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM as val, i} -->
        <label
            for=""
            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {!editable
                ? 'text-txt-tertiary'
                : 'text-txt-primary'}
                                    hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
            >{'i + 1'}. {'val'}</label
        >
        <!-- {/each} -->
    </AccordianField>
    <!-- <TextField
        disabled={!editable}
        id="tarikhKelulusanPercantumanPerkhidmatanLepas"
        label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
       bind:value=""
    ></TextField> -->
    <TextField
        disabled={!editable}
        id="pemangkuanSekarang"
        label={'Pemangkuan Sekarang'}
        bind:value={ptbDataService.currentActing}
    ></TextField>
    <TextField
        disabled={!editable}
        id="tanggungKerjaSekarang"
        label={'Tanggung Kerja Sekarang'}
        bind:value={ptbDataService.currentInterim}
    ></TextField>
    <TextField
        disabled={!editable}
        id="skimPencen"
        label={'Skim Pencen'}
        bind:value={ptbDataService.pensionScheme}
    ></TextField>
    <TextField
        disabled={!editable}
        id="kenaikanGajiAkhir"
        label={'Kenaikan Gaji Akhir'}
        bind:value={ptbDataService.lastSalary}
    ></TextField>
    <TextField
        disabled={!editable}
        id="kenaikanPangkatAkhir"
        label={'Kenaikan Pangkat Akhir'}
        bind:value={ptbDataService.lastPromotion}
    ></TextField>
    <!-- <TextField
    disabled={!editable}
    id="bulanKGT"
    label={'Bulan KGT'}
    value=""
    ></TextField> -->
    <TextField
        disabled={!editable}
        id="tarikhBersara"
        label={'Tarikh Bersara'}
        bind:value={ptbDataService.retirementDate}
    ></TextField>
    <b class="text-sm text-system-primary">Maklumat Gaji dan Elaun - Elaun</b>
    <div class="grid grid-cols-2 gap-10">
        <div class="space-y-2.5">
            <TextField
                disabled={!editable}
                id="tarikhBerkuatkuasa"
                label={'Tarikh Berkuatkuasa'}
                bind:value={ptbDataSalary.effectiveDate}
            ></TextField>
            <!-- <TextField
                disabled={!editable}
                id="tanggaGaji"
                label={'Tangga Gaji'}
                bind:value={ptbDataSalary.baseSalary}
            ></TextField> -->
            <TextField
                disabled={!editable}
                id="gajiPokok"
                label={'Gaji Pokok'}
                bind:value={ptbDataSalary.baseSalary}
            ></TextField>
        </div>
        <div class="space-y-2.5">
            <TextField
                hasTooltip={true}
                toolTipID="type-itka"
                disabled={!editable}
                id="type-itka"
                label={'ITKA'}
                bind:value={ptbDataSalary.ITKA}
            ></TextField>
            <TextField
                hasTooltip={true}
                toolTipID="type-itp"
                disabled={!editable}
                id="itp"
                label={'ITP'}
                bind:value={ptbDataSalary.ITP}
            ></TextField>
            <TextField
                hasTooltip={true}
                toolTipID="type-epw"
                disabled={!editable}
                id="epw"
                label={'EPW'}
                bind:value={ptbDataSalary.EPW}
            ></TextField>
            <TextField
                hasTooltip={true}
                toolTipID="type-cola"
                disabled={!editable}
                id="cola"
                label={'COLA'}
                bind:value={ptbDataSalary.COLA}
            ></TextField>
            <!-- Tooltip body -->
            <Tooltip
                type="dark"
                triggeredBy="[id^='type-']"
                on:show={assignContent}>"{tooltipContent}"</Tooltip
            >
        </div>
    </div>
</div>
