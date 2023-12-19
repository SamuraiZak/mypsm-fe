<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { goto } from '$app/navigation';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { klinik } from '$lib/mocks/urus-setia/perubatan/klinik';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import DynamicAccordionForm from '$lib/components/form/DynamicAccordionForm.svelte';
    import { mockSenaraiTuntutanLists } from '$lib/mocks/database/mockSenaraiTuntutanLists';

    export let disabled: boolean = true;

    let selectedDate = new Date();
    let selectedKlinik = klinik[0].value;
    let labelBlack = !disabled;
    let senaraiTuntutan: IntSenaraiTuntutanLists[] = mockSenaraiTuntutanLists;

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

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Tuntutan Perubatan"
        description="Butiran-butiran permohonan tuntutan perubatan"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/kakitangan/perubatan/');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Maklumat Kakitangan</p>
                <TextField
                    {disabled}
                    id="noPekerja"
                    label={'No. Pekerja'}
                    value={'A23412'}
                ></TextField>
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
                    id="gred"
                    label={'Gred'}
                    value={'F41 - Pegawai Teknologi Maklumat'}
                ></TextField>
                <TextField
                    {disabled}
                    id="penempatan"
                    label={'Penempatan'}
                    value={'5345 - Bhgn. Teknologi Maklumat'}
                ></TextField>
                <TextField
                    {disabled}
                    id="kumpulan"
                    label={'Kumpulan'}
                    value={'PP1 - Pengurusan dan Professional - A'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tuntutan"></StepperContentHeader>
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <DateSelector
                        {disabled}
                        {handleDateChange}
                        label={'Tarikh Rawatan'}
                    />
                    <DropdownSelect
                        id="klinik-dropdown"
                        label="Klinik"
                        dropdownType="label-left-full"
                        bind:index={selectedKlinik}
                        options={klinik}
                    ></DropdownSelect>
                    <TextField
                        {disabled}
                        id="bil-hari-cuti-sakit"
                        label={'Bil Hari Cuti Sakit'}
                        value={'2'}
                    ></TextField>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Senarai Tuntutan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    {#each senaraiTuntutan as item, index}
                        <DynamicAccordionForm
                            header="Tuntutan #{index + 1}"
                            open
                            ><div
                                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                            >
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled
                                    label="Bil"
                                    value="1"
                                ></TextField>
                                <TextField
                                    labelType="label-200"
                                    {labelBlack}
                                    disabled
                                    label="Jumlah Rawatan (RM)"
                                    value={item.jumlahRawatan}
                                ></TextField>
                            </div>
                        </DynamicAccordionForm>
                    {/each}
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent
        ><StepperContentHeader title="Dokumen yang Berkaitan"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Muat Naik Dokumen</p>
                <div
                    class="flex flex-col items-center justify-center rounded-[3px] border border-system-primaryTint p-2.5"
                >
                    <p class="text-base text-txt-secondary">
                        Seret dan lepas fail anda ke dalam ruangan ini atau
                        pilih fail dari peranti anda
                    </p>
                    <span>
                        <FileInputField />
                    </span>
                </div>
                <p class="text-sm text-rose-500">
                    Sila muat naik dokumen sokongan pada ruangan disediakan.
                </p>
                <p class="text-sm">Fail-fail yang telah dimuat naik:</p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <li>
                        <DownloadAttachment fileName="Resit-1" />
                    </li>
                    <li>
                        <DownloadAttachment fileName="Resit-2" />
                    </li>
                </ul>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
