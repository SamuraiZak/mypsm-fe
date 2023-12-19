<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { penempatan } from '$lib/mocks/kakitangan/cuti/gcr/penempatan';
    import { kumpulan } from '$lib/mocks/kakitangan/cuti/gcr/kumpulan';
    import { gred } from '$lib/mocks/kakitangan/cuti/gcr/gred';
    import FileInputField from '$lib/components/input/FileInputField.svelte';

    export let disabled: boolean = true;

    let selectedGred = gred[0].value;
    let selectedPenempatan = penempatan[0].value;
    let selectedKumpulan = kumpulan[0].value;
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
</script>

<ContentHeader
    title="Gantian Cuti Rehat"
    description="Maklumat berkaitan Gantian Cuti Rehat (GCR)"
    ><FormButton
        type="close"
        onClick={() => {
            goto('/kakitangan/cuti/gantian-cuti-rehat');
        }}
    /></ContentHeader
>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Kakitangan</p>
                <TextField
                    {disabled}
                    id="nama"
                    label={'Nama'}
                    value={'Irfan Bin Abu'}
                ></TextField>
                <TextField
                    {disabled}
                    id="noKadPengenalan"
                    label={'No. K/P'}
                    value={'111111-11-1111'}
                ></TextField>
                <TextField
                    {disabled}
                    id="noPekerja"
                    label={'No. Pekerja'}
                    value={'A23412'}
                ></TextField>
                <DropdownSelect
                    id="gred-dropdown"
                    label="Gred"
                    dropdownType="label-left-full"
                    bind:index={selectedGred}
                    options={gred}
                ></DropdownSelect>
                <DropdownSelect
                    id="penempatan-dropdown"
                    label="Penempatan"
                    dropdownType="label-left-full"
                    bind:index={selectedPenempatan}
                    options={penempatan}
                ></DropdownSelect>
                <DropdownSelect
                    id="kumpulan-dropdown"
                    label="Kumpulan"
                    dropdownType="label-left-full"
                    bind:index={selectedKumpulan}
                    options={kumpulan}
                ></DropdownSelect>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran GCR Sedia Ada"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Butiran GCR Sedia Ada</p>
                <TextField
                    {disabled}
                    id="jumlahGcrTerkumpul"
                    label={'Jumlah GCR Terkumpul'}
                    value={'120'}
                ></TextField>
                <TextField
                    {disabled}
                    id="jumlahLayakUntukPengeluaran"
                    label={'Jumlah Layak Untuk Pengeluaran'}
                    value={'90'}
                ></TextField>
                <TextField
                    {disabled}
                    id="bakiSelepasPengeluaran"
                    label={'Baki Selepas Pengeluaran'}
                    value={'30'}
                ></TextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm">Syarat-Syarat Pengeluaran Awal GCR</p>
                <ul class="list-inside list-disc text-sm">
                    <li>
                        Tempoh perkhidmatan pegawai tidak kurang daripada 15
                        tahun
                    </li>
                    <li>
                        Pegawai telah mencapai umur 45 tahun semasa permohonan
                        dibuat
                    </li>
                    <li>Jumlah terkumpul GCR 90 hari</li>
                    <li>
                        Bebas daripada prosiding jenayah atau tindakan
                        tatatertib
                    </li>
                    <li>Mendapat perakuan daripada Ketua Jabatan</li>
                    <li>
                        Pemberian awal award wang tunai GCR sebanyak 90 hari
                        hanya boleh dibuat sekali sahaja sepanjang perkhidmatan
                        pegawai
                    </li>
                </ul>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/kakitangan/cuti/gantian-cuti-rehat');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">
                        Sila Muat Naik Dokumen yang Berkaitan
                    </p>
                    <ul class="list-inside list-disc text-sm">
                        <li>
                            Satu (1) Salinan Rekod Kenyataan Perkhidmatan yang
                            Terkini
                        </li>
                        <li>Satu (1) Salinan Kenyataan Cuti</li>
                        <li>Dua (2) Salinan Penyata Kiraan Cuti</li>
                        <li>Satu (1) Salinan Kad Pengenalan</li>
                        <li>Lain-lain dokumen sokongan</li>
                    </ul>
                </div>
                <div
                    class="flex w-full flex-col items-center justify-center rounded-[3px] border border-system-primaryTint p-2.5"
                >
                    <p class="text-base text-txt-secondary">
                        Format dokumen: PDF sahaja
                    </p>
                    <span>
                        <FileInputField />
                    </span>
                </div>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm">Fail-fail yang dimuat naik:</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <li>
                            <DownloadAttachment
                                fileName="Salinan-Kenyataan-Perkhidmatan.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Salinan-Kenyataan-Cuti.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Salinan-Penyata-Kiraan-Cuti.pdf"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
