<script lang="ts">
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import { maklumatPeribadiForm } from '$lib/mocks/profil/maklumat-peribadi';
    import { maklumatPerkhidmatan } from '$lib/mocks/profil/maklumat-perkhidmatan';
    import { Accordion, AccordionItem, Tooltip } from 'flowbite-svelte';

    let tooltipContent: string = '';
    export let editable: boolean = false;
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

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';
</script>

<Accordion>
    {#each maklumatPeribadiForm as staff, index}
        <AccordionItem
            activeClass="outline-none bg-blue-100 text-blue-600 dark:text-white"
            inactiveClasses="text-gray-500 hover:bg-blue-100"
            open={index == 0}
        >
            <span slot="header" class="flex items-center gap-2 text-base">
                <svg
                    width="11"
                    height="10"
                    viewBox="0 0 11 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.2656 6.03906L6.51562 9.78906C6.375 9.92969 6.1875 10 6 10C5.78906 10 5.60156 9.92969 5.46094 9.78906C5.15625 9.50781 5.15625 9.01562 5.46094 8.73438L7.92188 6.25H0.75C0.328125 6.25 0 5.92188 0 5.5C0 5.10156 0.328125 4.75 0.75 4.75H7.92188L5.46094 2.28906C5.15625 2.00781 5.15625 1.51562 5.46094 1.23438C5.74219 0.929688 6.23438 0.929688 6.51562 1.23438L10.2656 4.98438C10.5703 5.26562 10.5703 5.75781 10.2656 6.03906Z"
                        fill="currentColor"
                    />
                </svg>
                <span class="font-semibold"
                    >{staff.namaPenuh} ({staff.noPekerja})</span
                >
            </span>

            <!-- contents of the accordion body -->
            <div class="flex flex-col gap-2.5">
                <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                <TextField
                    disabled={!editable}
                    id="gredSemasa"
                    label={'Gred Semasa'}
                    value=""
                ></TextField>
                <TextField
                    disabled={!editable}
                    id="jawatan"
                    label={'Jawatan'}
                    value=""
                ></TextField>
                <TextField
                    disabled={!editable}
                    id="penempatan"
                    label={'Penempatan'}
                    value=""
                ></TextField>
                <TextField
                    disabled={!editable}
                    id="tarafPerkhidmatan"
                    label={'Taraf Perkhidmatan'}
                    value=""
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
                    value=""
                ></TextField>
                <TextField
                    disabled={!editable}
                    id="noSOCSO"
                    label={'No. SOCSO'}
                    value=""
                ></TextField>
                <TextField
                    disabled={!editable}
                    id="noCukai"
                    label={'No. Cukai (LHDN)'}
                    value=""
                ></TextField>
                <TextField
                    disabled={!editable}
                    id="bank"
                    label={'Bank'}
                    value=""
                ></TextField>
                <TextField
                    disabled={!editable}
                    id="noAkaun"
                    label={'No. Akaun'}
                    value=""
                ></TextField>
                <TextField
                    disabled={!editable}
                    id="program"
                    label={'Program'}
                    value=""
                ></TextField>
                <TextField
                    disabled={!editable}
                    id="kelayakanCuti"
                    label={'Kelayakan Cuti'}
                    value=""
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
                <TextField
                    disabled={!editable}
                    id="bulanKGT"
                    label={'Bulan KGT'}
                    value=""
                ></TextField>
                <TextField
                    disabled={!editable}
                    id="tarikhBersara"
                    label={'Tarikh Bersara'}
                    value=""
                ></TextField>
                <p class={stepperFormTitleClass}>
                    Maklumat Gaji dan Elaun - Elaun
                </p>
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
            </div></AccordionItem
        >
    {/each}
</Accordion>
