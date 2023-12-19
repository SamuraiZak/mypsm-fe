<!-- Add your changes to the commented parts -->

<script lang="ts">
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';

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
    description="Pertukaran atas permohonan sendiri"
    ><FormButton
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
                <TextField
                    label="Nama Pengarah"
                    value="Iskandar Ismail"
                    disabled={true}
                ></TextField>
                <TextField label="Jabatan" value="LKIM SELANGOR" disabled={true}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Kakitangan"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <TextField label="No. Pekerja" value="001023" disabled={true}
                ></TextField>
                <TextField
                    label="Nama"
                    value="Ismail bin Ramdan"
                    disabled={true}
                ></TextField>
                <TextField
                    label="No. K/P"
                    value="890210-11-2667"
                    disabled={true}
                ></TextField>
                <TextField label="Program" value="-" disabled={true}
                ></TextField>
                <TextField label="Skim" value="-" disabled={true}></TextField>
                <TextField label="Gred" value="F41" disabled={true}></TextField>
                <TextField
                    label="Nama Jawatan"
                    value="F41 - Pegawai Teknologi Maklumat"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Penempatan Sekarang"
                    value="00105 - Bhgn. Teknologi Maklumat"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Kumpulan"
                    value="PP1 - Pengurusan dan Professional - A"
                    disabled={true}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Pertukaran"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <TextField
                    label="Tarikh Pertukaran"
                    value="19/09/2023"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Penempatan Baru"
                    value="LKIM SARAWAK - KUCHING"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Alasan Penukaran"
                    value="Memenuhi keperluan tenaga kerja"
                    disabled={true}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Mesyuarat"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DropdownField
                    dropdownType="label-left-full"
                    label="Nama Mesyuarat"
                    id="dropdown"
                    options={[
                        { value: '1', name: '-' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <DropdownField
                    dropdownType="label-left-full"
                    label="Tarikh Mesyuarat"
                    id="dropdown2"
                    options={[
                        { value: '1', name: 'DD/MM/YYYY' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <DropdownField
                    dropdownType="label-left-full"
                    label="Keputusan"
                    id="dropdown3"
                    options={[
                        { value: '1', name: 'LULUS/TIDAK LULUS' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <DropdownField
                    dropdownType="label-left-full"
                    label="Penempatan Diluluskan (Jika Lulus)"
                    id="dropdown"
                    options={[
                        { value: '1', name: 'Sila Pilih' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <DropdownField
                    dropdownType="label-left-full"
                    label="Tarikh Kuatkuasa Pertukaran (Jika Lulus)"
                    id="dropdown2"
                    options={[
                        { value: '1', name: 'DD/MM/YYYY' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <DropdownField
                    dropdownType="label-left-full"
                    label="No. Rujukan Surat"
                    id="dropdown3"
                    options={[
                        { value: '1', name: '-' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <DropdownField
                    dropdownType="label-left-full"
                    label="Tarikh Surat"
                    id="dropdown2"
                    options={[
                        { value: '1', name: '-' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <DropdownField
                    dropdownType="label-left-full"
                    label="Lapor Diri Kepada"
                    id="dropdown3"
                    options={[
                        { value: '1', name: 'Pilih Penempatan' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Pertukaran"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('../');
                }}><SvgPaperAirplane></SvgPaperAirplane></TextIconButton
            >
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DateSelector label="Tarikh Lapor Diri" {handleDateChange} />
                <TextField
                    label="Penempatan Baru"
                    disabled={false}
                    placeholder="-"
                ></TextField>
                <TextField
                    label="Nama Penyokong"
                    disabled={false}
                    placeholder="-"
                ></TextField>
                <DropdownField
                    dropdownType="label-left-full"
                    label="Keputusan Penyokong"
                    id="dropdown"
                    options={[
                        { value: '1', name: 'Sila Pilih' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <TextField label="Nama Pelulus" disabled={false} placeholder="-"
                ></TextField>
                <DropdownField
                    dropdownType="label-left-full"
                    label="Keputusan Pelulus"
                    id="dropdown3"
                    options={[
                        { value: '1', name: 'Sila Pilih' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
