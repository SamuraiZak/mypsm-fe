<script lang="ts">
    import Form from '$lib/components/form/Form.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FormHeading from '$lib/components/form/FormHeading.svelte';
    import FormContents from '$lib/components/form/FormContents.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { pilihKakitanganUntukPersaraanLainLainSenaraiKakitangan } from '$lib/mocks/perjawatan/persaraan/butiran-persaraan-lain-lain/pilih-kakitangan-untuk-persaraan-lain-lain-senarai-kakitangan';
    import { masukkanButiranPersaraan } from '$lib/mocks/perjawatan/persaraan/butiran-persaraan-lain-lain/masukkan-butiran-persaraan';
    import { onMount } from 'svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { senaraiPeperiksaanPerkhidmatan } from '$lib/mocks/urus-setia/pengesahan/pengesahan-lantikan-ke-gred/senarai-peperiksaan-perkhidmatan';
    import { tapisanTatatertib } from '$lib/mocks/urus-setia/pengesahan/pengesahan-lantikan-ke-gred/tapisan-tatatertib';
    import { Badge } from 'flowbite-svelte';

    export let activeStepper: number = 0;
    export let isEditing: boolean = false;
    export let disabled: boolean = false;
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

        // fileSelectionList.set(selectedFiles);
    }
    // Function to handle the file deletion
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        // fileSelectionList.set(selectedFiles);
    }

    let steppers: string[] = [
        'Maklumat Kakitangan',
        'Maklumat Perkhidmatan',
        'Senarai Peperiksaan Perkhidmatan / Kursus Induksi',
        'Tapisan Tatatertib',
        'Sila Tetapkan Keputusan Pengesahan Dalam Perkhidmatan',
        'Keputusan Pengesahan Dalam Perkhidmatan Daripada Peranan-Peranan Berkaitan',
        'Kemaskini Keputusan Mesyuarat',
        'Keputusan Mesyuarat',
    ];

    let activeClasses =
        'text-system-primary text-sm h-full px-4 border-b-2 border-system-primary';

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

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

    let radioValue: any = 'ya';

    const options: RadioOption[] = [
        {
            value: 'ya',
            label: 'Ya',
        },
        {
            value: 'tidak',
            label: 'Tidak',
        },
    ];
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat"
        description="Maklumat-maklumat pengesahan bagi semua kakitangan"
    ></ContentHeader>
</section>

<Form {steppers} bind:activeStepper>
    <FormHeading title={steppers[activeStepper]}>
        <!-- Form Buttons for each stepper -->

        {#if activeStepper === 0}
            {#if isEditing === true}
                <FormButton type="reset" onClick={() => {}}></FormButton>
            {:else}
                <FormButton
                    type="next"
                    onClick={() => {
                        if (activeStepper !== steppers.length - 1)
                            activeStepper++;
                    }}
                />
            {/if}
        {:else if activeStepper === steppers.length - 1}
            <FormButton
                type="back"
                onClick={() => {
                    if (activeStepper !== 0) activeStepper--;
                }}
            />

            <FormButton
                type="reset"
                onClick={() => {
                    console.log('Resetted!');
                }}
            />

            <FormButton
                type="send"
                onClick={() => {
                    console.log('Sent!');
                }}
            />
        {:else}
            <FormButton
                type="back"
                onClick={() => {
                    if (activeStepper !== 0) activeStepper--;
                }}
            />

            <FormButton
                type="reset"
                onClick={() => {
                    console.log('Resetted!');
                }}
            />

            <FormButton
                type="next"
                onClick={() => {
                    if (activeStepper !== steppers.length - 1) activeStepper++;
                }}
            />
        {/if}
    </FormHeading>

    <FormContents>
        <!-- Form Inputs for each stepper -->

        {#if activeStepper === 0}
            <!-- Maklumat Kakitangan -->
            <div class="m-5 flex flex-col gap-2">
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
                        {handleDateChange}
                        label={'Tarikh Bersara Awal'}
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
                        bind:userSelected={radioValue}
                        {disabled}
                    />
                </div>
            </div>
        {/if}

        {#if activeStepper === 1}
            <!-- Maklumat Perkhidmatan -->
            <div class="m-5 flex flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Perkhidmatan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
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
                        {handleDateChange}
                        label={'Tarikh Kuatkuasa Lantikan Baru'}
                    />
                    <TextField
                        {disabled}
                        id="noPekerja"
                        label={'No. Pekerja'}
                        value={'-'}
                    ></TextField>
                    <DateSelector
                        {handleDateChange}
                        label={'Tarikh Bersara Awal'}
                    />
                    <RadioSingle
                        {options}
                        legend="Faedah Persaraan"
                        bind:userSelected={radioValue}
                        {disabled}
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
                        value={'Islam'}
                    ></TextField>
                    <DateSelector
                        {handleDateChange}
                        label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    />
                    <DateSelector
                        {handleDateChange}
                        label={'Mula Dilantik Perkhidmatan LKIM'}
                    />
                    <DateSelector
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
                    <DateSelector {handleDateChange} label={'Tarikh Bersara'} />
                </div>
            </div>
            <div class="m-5 flex flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Gaji dan Elaun-Elaun</p>
                <DateSelector
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
        {/if}

        {#if activeStepper === 2}
            <!-- Senarai Peperiksaan Perkhidmatan / Kursus Induksi -->
            <div class="m-5 flex flex-col gap-2">
                <DynamicTable tableItems={senaraiPeperiksaanPerkhidmatan}
                ></DynamicTable>
            </div>
        {/if}

        {#if activeStepper === 3}
            <!-- Tapisan Tatatertib -->
            <div class="m-5 flex flex-col gap-2">
                <DynamicTable tableItems={tapisanTatatertib}></DynamicTable>
            </div>
        {/if}

        {#if activeStepper === 4}
            <!-- Sila Tetapkan Keputusan Pengesahan Dalam Perkhidmatan -->
            <div class="m-5 flex flex-col gap-2">
                <p class="text-sm">
                    Keputusan akan dihantar ke peranan-peranan berkaitan
                </p>
                <LongTextField
                    {disabled}
                    id="tindakanUlasan"
                    label={'Tindakan/Ulasan'}
                    value={'Memenuhi Kriteria'}
                ></LongTextField>
                <RadioSingle
                    {options}
                    legend="Keputusan"
                    bind:userSelected={radioValue}
                    {disabled}
                />
            </div>
        {/if}

        {#if activeStepper === 5}
            <!-- Keputusan Pengesahan Dalam Perkhidmatan Daripada Peranan-Peranan Berkaitan -->
            <div class="m-5 flex flex-col gap-2">
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
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Layak'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div>
            <div class="m-5 flex flex-col gap-2">
                <p class="text-sm font-bold">Pengarah Audit</p>
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
                        label={'Tindakan/ Ulasan'}
                        value={'Layak'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div>
            <div class="m-5 flex flex-col gap-2">
                <p class="text-sm font-bold">Pengarah Integriti</p>
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
                        label={'Tindakan/ Ulasan'}
                        value={'Layak'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div>
            <div class="m-5 flex flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Perjawatan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ramdan Bin Ismail'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Layak'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SAH</Badge>
                    </div>
                </div>
            </div>
        {/if}

        {#if activeStepper === 6}
            <!-- Kemaskini Keputusan Mesyuarat -->
            <div class="m-5 flex flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Kumpulan Mesyuarat</p>
                <p class="text-sm">
                    Sekiranya kakitangan tidak lulus mesyuarat, proses akan
                    berakhir untuk kakitangan tersebut.
                </p>
                <p class="text-sm">
                    Borang-borang berkaitan yang akan dijana sekiranya lulus:
                </p>
                <DownloadAttachment fileName="Surat Pengesahan"
                ></DownloadAttachment>
                <TextField
                    {disabled}
                    id="namaBilanganMesyuarat"
                    label={'Nama dan Bilangan Mesyuarat'}
                    value={'1/02'}
                ></TextField>
                <DateSelector {handleDateChange} label={'Tarikh Mesyuarat'} />
                <LongTextField
                    {disabled}
                    id="tindakanUlasanMesyuarat"
                    label={'Tindakan/Ulasan Mesyuarat'}
                    value={'Layak.'}
                ></LongTextField>
                <RadioSingle
                    {options}
                    legend="Keputusan Mesyuarat"
                    bind:userSelected={radioValue}
                    {disabled}
                />
            </div>
        {/if}

        {#if activeStepper === 7}
            <!-- Keputusan Mesyuarat -->
            <div class="m-5 flex flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Kumpulan Mesyuarat</p>
                <p class="text-sm">
                    Sekiranya kakitangan tidak lulus mesyuarat, proses akan
                    berakhir untuk kakitangan tersebut.
                </p>
                <p class="text-sm">
                    Borang-borang berkaitan yang akan dijana sekiranya lulus:
                </p>
                <DownloadAttachment fileName="Surat Pengesahan"
                ></DownloadAttachment>
                <TextField
                    {disabled}
                    id="namaBilanganMesyuarat"
                    label={'Nama dan Bilangan Mesyuarat'}
                    value={'1/02'}
                ></TextField>
                <DateSelector {handleDateChange} label={'Tarikh Mesyuarat'} />
                <LongTextField
                    {disabled}
                    id="tindakanUlasanMesyuarat"
                    label={'Tindakan/Ulasan Mesyuarat'}
                    value={'Layak.'}
                ></LongTextField>
                <RadioSingle
                    {options}
                    legend="Keputusan Mesyuarat"
                    bind:userSelected={radioValue}
                    {disabled}
                />
            </div>
        {/if}
    </FormContents>
</Form>
