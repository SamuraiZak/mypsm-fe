<!-- Add your changes to the commented parts -->

<script lang="ts">
    // import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    // import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    // import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    // import LongCustomTextField from '$lib/components/input/LongCustomTextField.svelte';
    // import TextField from '$lib/components/input/TextField.svelte';
    // import DateSelector from '$lib/components/input/DateSelector.svelte';
    // import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    // import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    // import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    // import SectionHeader from '$lib/components/header/SectionHeader.svelte';

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

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
</script>

<ContentHeader
    title="Permohonan Pertukaran"
    ><TextIconButton
        type="close"
        onClick={() => {
            goto('../');
        }}
    /></ContentHeader
>
<Stepper dataId={id} dataStatus={status}>
    <StepperContent>
        <StepperContentHeader title="Butiran Pemohon"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <CustomTextField
                id="namaPengarah"
                    label="Nama Pengarah"
                    val="Iskandar Ismail"
                    disabled={true}
                ></CustomTextField>
                <CustomTextField id="jabatan" label="Jabatan" val="LKIM SELANGOR" disabled={true}
                ></CustomTextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Kakitangan"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <CustomTextField id="noPkerja" label="No. Pekerja" val="001023" disabled={true}
                ></CustomTextField>
                <CustomTextField
                id="nama"
                    label="Nama"
                    val="Ismail bin Ramdan"
                    disabled={true}
                ></CustomTextField>
                <CustomTextField
                id="noKP"
                    label="No. K/P"
                    val="890210-11-2667"
                    disabled={true}
                ></CustomTextField>
                <CustomTextField id="program" label="Program" val="-" disabled={true}
                ></CustomTextField>
                <CustomTextField id="skim" label="Skim" val="-" disabled={true}></CustomTextField>
                <CustomTextField id="gred" label="Gred" val="F41" disabled={true}></CustomTextField>
                <CustomTextField
                id="namaJawatan"
                    label="Nama Jawatan"
                    val="F41 - Pegawai Teknologi Maklumat"
                    disabled={true}
                ></CustomTextField>
                <CustomTextField
                id="penempatanSekarang"
                    label="Penempatan Sekarang"
                    val="00105 - Bhgn. Teknologi Maklumat"
                    disabled={true}
                ></CustomTextField>
                <CustomTextField
                id="kumpulan"
                    label="Kumpulan"
                    val="PP1 - Pengurusan dan Professional - A"
                    disabled={true}
                ></CustomTextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Pertukaran"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <CustomTextField
                id="tarikhPertukaran"
                    label="Tarikh Pertukaran"
                    val="19/09/2023"
                    disabled={true}
                ></CustomTextField>
                <CustomTextField
                id="penempatanBaru"
                    label="Penempatan Baru"
                    val="LKIM SARAWAK - KUCHING"
                    disabled={true}
                ></CustomTextField>
                <CustomTextField
                id="alasanPenukaran"
                    label="Alasan Penukaran"
                    val="Memenuhi keperluan tenaga kerja"
                    disabled={true}
                ></CustomTextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Mesyuarat"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="Nama Mesyuarat"
                    id="dropdown"
                    options={[
                        { val: '1', name: '-' },
                        { val: '2', name: '1/12' },
                        { val: '3', name: '1/102' },
                        { val: '4', name: '2/101' },
                    ]}
                /> -->
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="Tarikh Mesyuarat"
                    id="dropdown2"
                    options={[
                        { val: '1', name: 'DD/MM/YYYY' },
                        { val: '2', name: '1/12' },
                        { val: '3', name: '1/102' },
                        { val: '4', name: '2/101' },
                    ]}
                /> -->
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="Keputusan"
                    id="dropdown3"
                    options={[
                        { val: '1', name: 'LULUS/TIDAK LULUS' },
                        { val: '2', name: '1/12' },
                        { val: '3', name: '1/102' },
                        { val: '4', name: '2/101' },
                    ]}
                /> -->
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="Penempatan Diluluskan (Jika Lulus)"
                    id="dropdown"
                    options={[
                        { val: '1', name: 'Sila Pilih' },
                        { val: '2', name: '1/12' },
                        { val: '3', name: '1/102' },
                        { val: '4', name: '2/101' },
                    ]}
                /> -->
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="Tarikh Kuatkuasa Pertukaran (Jika Lulus)"
                    id="dropdown2"
                    options={[
                        { val: '1', name: 'DD/MM/YYYY' },
                        { val: '2', name: '1/12' },
                        { val: '3', name: '1/102' },
                        { val: '4', name: '2/101' },
                    ]}
                /> -->
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="No. Rujukan Surat"
                    id="dropdown3"
                    options={[
                        { val: '1', name: '-' },
                        { val: '2', name: '1/12' },
                        { val: '3', name: '1/102' },
                        { val: '4', name: '2/101' },
                    ]}
                /> -->
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="Tarikh Surat"
                    id="dropdown2"
                    options={[
                        { val: '1', name: '-' },
                        { val: '2', name: '1/12' },
                        { val: '3', name: '1/102' },
                        { val: '4', name: '2/101' },
                    ]}
                /> -->
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="Lapor Diri Kepada"
                    id="dropdown3"
                    options={[
                        { val: '1', name: 'Pilih Penempatan' },
                        { val: '2', name: '1/12' },
                        { val: '3', name: '1/102' },
                        { val: '4', name: '2/101' },
                    ]}
                /> -->
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Pertukaran"
            ><TextIconButton
                type=primary
                label="Hantar"
                onClick={() => {
                    goto('../');
                }}></TextIconButton
            >
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <!-- <DateSelector label="Tarikh Lapor Diri" {handleDateChange} /> -->
                <CustomTextField
                id="penempatanBaru"
                    label="Penempatan Baru"
                    disabled={false}
                    placeholder="-"
                    val=""
                ></CustomTextField>
                <CustomTextField
                id="namaPenyokong"
                    label="Nama Penyokong"
                    disabled={false}
                    placeholder="-"
                    val=""
                ></CustomTextField>
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="Keputusan Penyokong"
                    id="dropdown"
                    options={[
                        { val: '1', name: 'Sila Pilih' },
                        { val: '2', name: '1/12' },
                        { val: '3', name: '1/102' },
                        { val: '4', name: '2/101' },
                    ]}
                /> -->
                <!-- <CustomTextField label="Nama Pelulus" disabled={false} placeholder="-"
                ></CustomTextField>
                <DropdownField
                    dropdownType="label-left-full"
                    label="Keputusan Pelulus"
                    id="dropdown3"
                    options={[
                        { val: '1', name: 'Sila Pilih' },
                        { val: '2', name: '1/12' },
                        { val: '3', name: '1/102' },
                        { val: '4', name: '2/101' },
                    ]}
                /> -->
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
