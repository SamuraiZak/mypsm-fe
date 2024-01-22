<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { onMount } from 'svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { senaraiPeperiksaanPerkhidmatan } from '$lib/mocks/urus-setia/pengesahan/pengesahan-lantikan-ke-gred/senarai-peperiksaan-perkhidmatan';
    import { tapisanTatatertib } from '$lib/mocks/pengarah-audit/perjawatan/tapisan-tatatertib';
    import { goto } from '$app/navigation';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import SvgPdf from '$lib/assets/svg/SvgPDF.svelte';
    import { Badge, Tooltip } from 'flowbite-svelte';
    import { CurrencyHelper } from '$lib/helper/core/currency-helper/currency-helper';
    import { superForm } from 'sveltekit-superforms/client';
    import toast, { Toaster } from 'svelte-french-toast';
    import { _keputusanPengesahan, _submitKeputusanPengesahan } from './+page';
    import type { PageData } from './$types';

    export let data: PageData;


    export let disabled: boolean = true;
    export let selectedFiles: any = [];
    let target: any;

    onMount(() => {
        target = document.getElementById('hello');
    });

    function handleOnChange() {
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }
    }
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
    }

    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    const options: RadioOption[] = [
        {
            value: 'ya',
            label: 'Ya',
        },
        {
            value: 'tidak',
            label: 'TIDAK',
        },
    ];

    const faedahOptions: RadioOption[] = [
        {
            value: 'kwsp',
            label: 'KWSP',
        },
        {
            value: 'pencen',
            label: 'Pencen',
        },
    ];

    const perakuanOptions: RadioOption[] = [
        {
            value: 'perakuan',
            label: 'Perakuan',
        },
        {
            value: 'tidakPerakuan',
            label: 'Tidak Perakuan',
        },
    ];

    let tooltipContent: string = '';
    const itkaTooltip: string = 'ITKA bermaksud ...';
    const itpTooltip: string = 'ITP bermaksud ...';
    const epwTooltip: string = 'EPW bermaksud ...';
    const colaTooltip: string = 'COLA bermaksud ...';
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
    const { form, errors, enhance } = superForm(data.keputusanPengesahan, {
        SPA: true,
        validators: _keputusanPengesahan,
        onSubmit() {
            _submitKeputusanPengesahan($form);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat"
        description="Maklumat-maklumat pengesahan bagi semua kakitangan"
        ><FormButton
            type="close"
            onClick={() => {
                goto(
                    '/pengarah-audit/perjawatan/pengesahan-dalam-perkhidmatan',
                );
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Peribadi Kakitangan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Hafiz Bin Ahmad'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="namaLain"
                        label={'Nama Lain'}
                        value={'Apiz'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="noKP"
                        label={'No. K/P'}
                        value={'890715-12-5433'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="warnaKP"
                        label={'Warna K/P'}
                        value={'Biru'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="noPekerja"
                        label={'No. Pekerja'}
                        value={'-'}
                    ></TextField>
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Lahir'}
                    />
                    <TextField
                        {disabled}
                        id="tempatLahir"
                        label={'Tempat Lahir'}
                        value={'Selangor'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="warganegara"
                        label={'Warganegara'}
                        value={'Malaysia'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="bangsa"
                        label={'Bangsa'}
                        value={'Melayu'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="agama"
                        label={'Agama'}
                        value={'Islam'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="jantina"
                        label={'Jantina'}
                        value={'Lelaki'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="status"
                        label={'Status'}
                        value={'Bujang'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="alamatRumah"
                        label={'Alamat Rumah'}
                        value={''}
                    ></LongTextField>
                    <LongTextField
                        {disabled}
                        id="alamatSuratMenyurat"
                        label={'Alamat Surat Menyurat (jika berlainan dari alamat rumah)'}
                        value={''}
                    ></LongTextField>
                    <TextField
                        {disabled}
                        id="noTelRumah"
                        label={'No. Telefon Rumah'}
                        value={''}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="noTelBimbit"
                        label={'No. Telefon Bimbit'}
                        value={''}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="perumahan"
                        label={'Perumahan'}
                        value={''}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="pinjPerumahan"
                        label={'Pinj. Perumahan'}
                        value={''}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="pinjKenderaan"
                        label={'Pinj. Kenderaan'}
                        value={''}
                    ></TextField>
                    <RadioSingle
                        {options}
                        legend="Bekas Polis / Tentera"
                        {disabled}
                    />
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Perkhidmatan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        {disabled}
                        id="gredBaru"
                        label={'Gred Baru'}
                        value={'F44'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="jawatan"
                        label={'Jawatan'}
                        value={'Pegawai Teknologi Maklumat'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="penempatan"
                        label={'Penempatan'}
                        value={'PP1-Pengurusan dan Professional - A'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="tarafPerkhidmatan"
                        label={'Taraf Perkhidmatan'}
                        value={'-'}
                    ></TextField>
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Kuatkuasa Lantikan Baru'}
                    />
                    <RadioSingle
                        options={faedahOptions}
                        legend="Faedah Persaraan"
                        disabled
                    />
                    <TextField
                        {disabled}
                        id="noKWSP"
                        label={'No. KWSP'}
                        value={'54352352'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="noAkaunMaybank"
                        label={'No. Akaun Maybank'}
                        value={'124141'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="program"
                        label={'Program'}
                        value={''}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="kelayakanCuti"
                        label={'Kelayakan Cuti (Hari)'}
                        value={'30'}
                    ></TextField>
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    />
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Mula Dilantik Perkhidmatan LKIM'}
                    />
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Mula Dilantik Perkhidmatan Sekarang'}
                    />
                    <TextField
                        {disabled}
                        id="disahkanDlmJwtnPertamaLKIM"
                        label={'Disahkan Dalam Jawatan Pertama LKIM'}
                        value={'-'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="pemangkuanSekarang"
                        label={'Pemangkuan Sekarang'}
                        value={''}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="tanggungKerjaSekarang"
                        label={'Tanggung Kerja Sekarang'}
                        value={''}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="masukSkimPencen"
                        label={'Masuk Skim Pencen'}
                        value={''}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="kenaikanGajiAkhir"
                        label={'Kenaikan Gaji Akhir'}
                        value={''}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="kenaikanPangkatAkhir"
                        label={'Kenaikan Pangkat Akhir'}
                        value={''}
                    ></TextField>
                    <DateSelector
                        {handleDateChange}
                        label={'Tarikh Bersara'}
                        {disabled}
                    />
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Gaji dan Elaun-Elaun</p>

                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <DateSelector
                            {disabled}
                            {handleDateChange}
                            label={'Tarikh Berkuatkuasa'}
                        />
                        <TextField
                            {disabled}
                            id="tanggaGaji"
                            label={'Tangga Gaji'}
                            value={'RM3,244.43'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id="gajiPokok"
                            label={'Gaji Pokok'}
                            value={'RM3,044.43'}
                        ></TextField>
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            {disabled}
                            id="itka"
                            label={'ITKA'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            {disabled}
                            id="itp"
                            label={'ITP'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            {disabled}
                            id="epw"
                            label={'EPW'}
                            value={CurrencyHelper.formatCurrency(123.45)}
                        ></TextField>
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            {disabled}
                            id="cola"
                            label={'COLA'}
                            value={CurrencyHelper.formatCurrency(123.45)}
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
        <StepperContentHeader
            title="Senarai Peperiksaan Perkhidmatan / Kursus Induksi"
        ></StepperContentHeader>
        <StepperContentBody
            ><div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <section class="h-full w-full">
                    <DataTable title="">
                        <DtTableHead>
                            <DtTableHeadCell title="Bil."></DtTableHeadCell>
                            <DtTableHeadCell title="Nama Peperiksaan"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Tarikh Peperiksaan"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Keputusan Peperiksaan"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Tarikh Kelulusan"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Surat Kelulusan"
                            ></DtTableHeadCell>
                        </DtTableHead>
                        <DtTableBody>
                            {#each senaraiPeperiksaanPerkhidmatan as item}
                                <DtTableRow>
                                    <DtTableDataCell value={item.id}
                                    ></DtTableDataCell>
                                    <DtTableDataCell
                                        value={item.namaPeperiksaan}
                                    ></DtTableDataCell>
                                    <DtTableDataCell
                                        value={item.tarikhPeperiksaan}
                                    ></DtTableDataCell>
                                    <DtTableDataCell
                                        value={item.keputusanPeperiksaan}
                                    ></DtTableDataCell>
                                    <DtTableDataCell
                                        value={item.tarikhKelulusan}
                                    ></DtTableDataCell>
                                    <DtTableDataCell>
                                        <IconButton onClick={() => {}}>
                                            <SvgPdf></SvgPdf>
                                        </IconButton>
                                    </DtTableDataCell>
                                </DtTableRow>
                            {/each}
                        </DtTableBody>
                    </DataTable>
                </section>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Tapisan Tatatertib"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={tapisanTatatertib}></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Sila Tetapkan Keputusan Pengesahan Dalam Perkhidmatan"
            ><TextIconButton
                primary
                label="Hantar"
                form="FormKeputusanPengesahan"><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">
                    Sila Tetapkan Keputusan Pengesahan Dalam Perkhidmatan
                    (Pengarah Audit)
                </p>
                <form
                id="FormKeputusanPengesahan"
                class="flex w-full flex-col gap-2"
                use:enhance
                method="POST"
            >
                <p
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                >
                    ● Keputusan akan dihantar ke peranan-peranan berkaitan
                </p>
                <LongTextField
                hasError={$errors.tindakanUlasan ? true : false}
                name="tindakanUlasan"
                label={'Tindakan/Ulasan'}
                bind:value={$form.tindakanUlasan}
            ></LongTextField>
            {#if $errors.tindakanUlasan}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.tindakanUlasan[0]}</span
                >
            {/if}
            <RadioSingle
            name="perakuan"
            options={perakuanOptions}
            bind:userSelected={$form.perakuan}
        />
        {#if $errors.perakuan}
            <span
                class="ml-[0px] font-sans text-sm italic text-system-danger"
                >{$errors.perakuan[0]}</span
            >
        {/if}
    </form>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">
                    Keputusan Daripada Peranan Peranan Lain
                </p>
                <p class="text-sm font-bold">Pengarah Negeri/Bahagian</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ismail Bin Ramdan'}
                    ></TextField>
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                    >
                        ● Menunggu keputusan daripada Pengarah Audit
                    </p>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Pengarah Integriti</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Nurhamzah Binti Jamaludin'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/Ulasan'}
                        value={'Layak.'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Perjawatan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Senah Binti Ismail'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/Ulasan'}
                        value={'Layak.'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SAH</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster/>
