<script lang="ts">
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    // import { getCurrentService } from '$lib/service/employees/service-service';
    import { Tooltip } from 'flowbite-svelte';
    import { onMount } from 'svelte';

    export let editable: boolean = false;
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

<div class="flex w-full flex-col gap-2.5">
    <b class="text-sm text-system-primary">Maklumat Perkhidmatan</b>
    <TextField
        disabled={!editable}
        id="gredSemasa"
        label={'Gred Semasa'}
        value={currentService?.currentGrade}
    ></TextField>
    <TextField disabled={!editable} id="jawatan" label={'Jawatan'} value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="penempatan"
        label={'Penempatan'}
        value={currentService?.placement}
    ></TextField>
    <TextField
        disabled={!editable}
        id="tarafPerkhidmatan"
        label={'Taraf Perkhidmatan'}
        value={currentService?.educationLevel}
    ></TextField>
    <RadioSingle
        disabled={!editable}
        options={faedahPersaraanOptions}
        legend={'Faedah Persaraan'}
        bind:userSelected={isFaedahKWSP}
    ></RadioSingle>
    <TextField
        disabled={!editable}
        id="noKWSP"
        label={'No. KWSP'}
        value={currentService?.pensionBenefit}
    ></TextField>
    <TextField
        disabled={!editable}
        id="noSOCSO"
        label={'No. SOCSO'}
        value={currentService?.kwspNumber}
    ></TextField>
    <TextField
        disabled={!editable}
        id="noCukai"
        label={'No. Cukai (LHDN)'}
        value={currentService?.taxNumber}
    ></TextField>
    <TextField
        disabled={!editable}
        id="bank"
        label={'Bank'}
        value={currentService?.bankName}
    ></TextField>
    <TextField
        disabled={!editable}
        id="noAkaun"
        label={'No. Akaun'}
        value={currentService?.accountNumber}
    ></TextField>
    <TextField
        disabled={!editable}
        id="program"
        label={'Program'}
        value={currentService?.programme}
    ></TextField>
    <TextField
        disabled={!editable}
        id="kelayakanCuti"
        label={'Kelayakan Cuti'}
        value={currentService?.entitledLeaves}
    ></TextField>
    <TextField
        disabled={!editable}
        id="mulaDilantikPerkhidmatanKerajaan"
        label={'Mula Dilantik Perkhidmatan Kerajaan'}
        value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="mulaDilantikPerkhidmatanLKIM"
        label={'Mula Dilantik Perkhidmatan LKIM'}
        value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="mulaDilantikPerkhidmatanSekarang"
        label={'Mula Dilantik Perkhidmatan Sekarang'}
        value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="disahkanDalamJawatanPertamaLKIM"
        label={'Disahkan Dalam Jawatan Pertama LKIM'}
        value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="disahkanDalamJawatanSemasaLKIM"
        label={'Disahkan Dalam Jawatan Semasa LKIM'}
        value=""
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
    <TextField
        disabled={!editable}
        id="tarikhKelulusanPercantumanPerkhidmatanLepas"
        label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
        value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="pemangkuanSekarang"
        label={'Pemangkuan Sekarang'}
        value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="tanggungKerjaSekarang"
        label={'Tanggung Kerja Sekarang'}
        value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="skimPencen"
        label={'Skim Pencen'}
        value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="kenaikanGajiAkhir"
        label={'Kenaikan Gaji Akhir'}
        value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="kenaikanPangkatAkhir"
        label={'Kenaikan Pangkat Akhir'}
        value=""
    ></TextField>
    <TextField disabled={!editable} id="bulanKGT" label={'Bulan KGT'} value=""
    ></TextField>
    <TextField
        disabled={!editable}
        id="tarikhBersara"
        label={'Tarikh Bersara'}
        value=""
    ></TextField>
    <b class="text-sm text-system-primary">Maklumat Gaji dan Elaun - Elaun</b>
    <div class="grid grid-cols-2 gap-10">
        <div class="space-y-2.5">
            <TextField
                disabled={!editable}
                id="tarikhBerkuatkuasa"
                label={'Tarikh Berkuatkuasa'}
                value={'maklumatGajiElaunData.tarikhBerkuatkuasa'}
            ></TextField>
            <TextField
                disabled={!editable}
                id="tanggaGaji"
                label={'Tangga Gaji'}
                value={CurrencyHelper.formatCurrency(3452)}
            ></TextField>
            <TextField
                disabled={!editable}
                id="gajiPokok"
                label={'Gaji Pokok'}
                value={CurrencyHelper.formatCurrency(3452)}
            ></TextField>
        </div>
        <div class="space-y-2.5">
            <TextField
                hasTooltip={true}
                toolTipID="type-itka"
                disabled={!editable}
                id="type-itka"
                label={'ITKA'}
                value=""
            ></TextField>
            <TextField
                hasTooltip={true}
                toolTipID="type-itp"
                disabled={!editable}
                id="itp"
                label={'ITP'}
                value=""
            ></TextField>
            <TextField
                hasTooltip={true}
                toolTipID="type-epw"
                disabled={!editable}
                id="epw"
                label={'EPW'}
                value=""
            ></TextField>
            <TextField
                hasTooltip={true}
                toolTipID="type-cola"
                disabled={!editable}
                id="cola"
                label={'COLA'}
                value=""
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
