<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import ScaleInput from '$lib/components/scale-input/ScaleInput.svelte';
    let options: RadioOption[] = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
    ];
    let options2: RadioOption[] = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
    ];

    let a1Value: string = '1';
    let a2Value: string = '1';
    let a3Value: string = '1';
    let a4Value: string = '1';
</script>

<SectionHeader title="Aspek A: Pengetahuan, Kemahiran, dan Penghasilan Kerja" />
<div class="flex h-fit w-full flex-col rounded-[3px] border text-center">
    <p class="w-full text-sm font-bold">
        Skala Penilaian Aspek Pengetahuan, Kemahiran, dan Penghasilan Kerja
    </p>
    <div class="flex flex-row border-t">
        <div class="w-full border-r">
            <p class="w-full text-sm text-system-accent">Sangat Rendah</p>
            <div class="flex flex-row border-t">
                <div class="w-full border-r">
                    <p class="w-full text-sm">1</p>
                </div>
                <div class="w-full">
                    <p class="w-full text-sm">2</p>
                </div>
            </div>
        </div>
        <div class="w-full border-r">
            <p class="w-full text-sm text-system-accent">Rendah</p>
            <div class="flex flex-row border-t">
                <div class="w-full border-r">
                    <p class="w-full text-sm">3</p>
                </div>
                <div class="w-full">
                    <p class="w-full text-sm">4</p>
                </div>
            </div>
        </div>
        <div class="w-full border-r">
            <p class="w-full text-sm text-system-accent">Sederhana</p>
            <div class="flex flex-row border-t">
                <div class="w-full border-r">
                    <p class="w-full text-sm">5</p>
                </div>
                <div class="w-full">
                    <p class="w-full text-sm">6</p>
                </div>
            </div>
        </div>
        <div class="w-full border-r">
            <p class="w-full text-sm text-system-accent">Tinggi</p>
            <div class="flex flex-row border-t">
                <div class="w-full border-r">
                    <p class="w-full text-sm">7</p>
                </div>
                <div class="w-full">
                    <p class="w-full text-sm">8</p>
                </div>
            </div>
        </div>
        <div class="w-full">
            <p class="w-full text-sm text-system-accent">Sangat Tinggi</p>
            <div class="flex flex-row border-t">
                <div class="w-full border-r">
                    <p class="w-full text-sm">9</p>
                </div>
                <div class="w-full">
                    <p class="w-full text-sm">10</p>
                </div>
            </div>
        </div>
    </div>
</div>

<ul class="w-full list-inside list-decimal text-base">
    <li>
        <ScaleInput
            legend="Ilmu Pengetahuan Dan Kemahiran Dalam Bidang Kerja"
            {options}
        />
    </li>
    <li>
        <ScaleInput legend="Kuantiti Hasil Kerja" {options} />
    </li>
    <li>
        <ScaleInput legend="Kualiti Hasil Kerja" {options} />
    </li>
    <li>
        <ScaleInput legend="Penganalisian" {options} />
    </li>
    <li>
        <ScaleInput legend="Nilai Tambah" {options} />
    </li>
</ul>

<br />
<TextField
    disabled={true}
    labelBlack={true}
    id="total-aspect-a"
    label={'JUMLAH MARKAH ASPEK A ( /50) :'}
    value={''}
></TextField>

<hr class="mt-5 h-1 w-full" />

<SectionHeader title="Aspek B: Aspek Kualiti Peribadi" />
<div class="flex h-fit w-full flex-col rounded-[3px] border text-center">
    <p class="w-full text-sm font-bold">Skala Aspek Kualiti Peribadi</p>
    <div class="flex flex-row border-t">
        <div class="w-full border-r">
            <p class="w-full text-sm text-system-accent">Sangat Lemah</p>
            <div class="flex flex-row border-t">
                <div class="w-full border-r">
                    <p class="w-full text-sm">1</p>
                </div>
                <div class="w-full">
                    <p class="w-full text-sm">2</p>
                </div>
            </div>
        </div>
        <div class="w-full border-r">
            <p class="w-full text-sm text-system-accent">Lemah</p>
            <div class="flex flex-row border-t">
                <div class="w-full border-r">
                    <p class="w-full text-sm">3</p>
                </div>
                <div class="w-full">
                    <p class="w-full text-sm">4</p>
                </div>
            </div>
        </div>
        <div class="w-full border-r">
            <p class="w-full text-sm text-system-accent">Sederhana</p>
            <div class="flex flex-row border-t">
                <div class="w-full border-r">
                    <p class="w-full text-sm">5</p>
                </div>
                <div class="w-full">
                    <p class="w-full text-sm">6</p>
                </div>
            </div>
        </div>
        <div class="w-full border-r">
            <p class="w-full text-sm text-system-accent">Baik</p>
            <div class="flex flex-row border-t">
                <div class="w-full border-r">
                    <p class="w-full text-sm">7</p>
                </div>
                <div class="w-full">
                    <p class="w-full text-sm">8</p>
                </div>
            </div>
        </div>
        <div class="w-full">
            <p class="w-full text-sm text-system-accent">Cemerlang</p>
            <div class="flex flex-row border-t">
                <div class="w-full border-r">
                    <p class="w-full text-sm">9</p>
                </div>
                <div class="w-full">
                    <p class="w-full text-sm">10</p>
                </div>
            </div>
        </div>
    </div>
</div>

<ul class="w-full list-inside list-decimal text-base">
    <li class="">
        <ScaleInput legend="Integriti" {options} bind:userSelected={a1Value} />
    </li>
    <li>
        <ScaleInput legend="Kepimpinan / Penyeliaan" {options} />
    </li>
    <li>
        <ScaleInput legend="Kreatif Dan Proaktif" {options} />
    </li>
    <li>
        <ScaleInput legend="Kawalan Diri" {options} />
    </li>
    <li>
        <ScaleInput legend="Jalinan Hubungan Dan Kerjasama" {options} />
    </li>
</ul>

<br />
<TextField
    disabled={true}
    labelBlack={true}
    id="total-aspect-b"
    label={'JUMLAH MARKAH ASPEK B ( /50) :'}
    value={''}
></TextField>
<hr />
<TextField
    disabled={true}
    labelBlack={true}
    id="total-overall"
    label={'JUMLAH MARKAH KES B ( /50) :'}
    value={''}
></TextField>
