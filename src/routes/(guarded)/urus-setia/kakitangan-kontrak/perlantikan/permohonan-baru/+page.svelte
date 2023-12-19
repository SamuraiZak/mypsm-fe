<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';

    const characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let generatedLink: string = '';

    function generateRandomString() {
        let randomString =
            'https://www.mypsm.com.gov.my/lantikan-baru-kontrak/calon/daftar-';

        for (let i = 0; i < 15; i++) {
            randomString +=
                characters[Math.floor(Math.random() * characters.length)];
        }
        generatedLink = randomString + '.com';
    }

    // funtion to copy text from html body
    // import { clickToCopy } from '$lib/components/click-to-copy/ClickToCopy';

    let text = '';
</script>

<!-- test button to click to copy -->
<!-- <button use:clickToCopy={'generated-link'}> Click to copy </button> -->

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Lantikan Baru (Kontrak)"
        description="Hal-hal berkaitan lantikan baru kontrak. Sila semak dan simpan pautan setelah selesai."
    >
        <FormButton
            type="back"
            addLabel="Cetak"
            onClick={() => {
                goto('../perlantikan');
            }}
        />
        <FormButton type="reset" addLabel="Simpan" onClick={() => {}} />
        <FormButton
            type="save"
            addLabel="Simpan"
            onClick={() => {
                goto('../perlantikan');
            }}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <form action="">
        <StepperContentHeader title="Maklumat kakitangan dan Kontrak" />
        <div class="my-5 space-y-2.5">
            <TextField
                type="text"
                label="Nama"
                placeholder="contoh: Mohd Azizi Bin Othman"
                value=""
            />
            <TextField
                type="text"
                label="ID Calon"
                placeholder="contoh: 12345"
                value=""
            />
            <TextField
                type="email"
                placeholder="contoh: azizi@lkim.com"
                label="Emel"
                value=""
            />

            <DateSelector
                handleDateChange={() => {}}
                label={'Tarikh Mula Kontrak'}
                selectedDate={''}
            ></DateSelector>
            <DateSelector
                handleDateChange={() => {}}
                label={'Tarikh Tamat Kontrak'}
                selectedDate={''}
            ></DateSelector>
            <TextField
                type="number"
                placeholder=""
                label="Tempoh Kontrak (Bulan)"
                value=""
            />
            <TextField
                type="number"
                placeholder=""
                label="Kadar Upah (RM)"
                value=""
            />
            <DropdownSelect
                labelBlack={true}
                dropdownType="label-left-full"
                name="contract-placement-dropdown"
                label="Penempatan"
                options={[
                    { value: 'selangor-lkim-01', name: 'LKIM Negeri Selangor' },
                    {
                        value: 'sarawak-lkim-01',
                        name: 'LKIM Negeri Sarawak',
                    },
                ]}
            ></DropdownSelect>
            <TextField
                type="text"
                placeholder=""
                label="Gelaran Tugas"
                value=""
            />
            <DateSelector
                handleDateChange={() => {}}
                label={'Tarikh Lapor Diri'}
                selectedDate={'1/10/2024'}
            ></DateSelector>
        </div>
        <div class="mb-5 w-fit">
            <FormButton
                type="generate-link"
                onClick={() => generateRandomString()}
            />
        </div>
        <StepperContentHeader
            title="Pautan bagi kegunaan kakitangan baru mengisi borang permohonan
        secara atas talian:"
        />
        <div class="my-5 space-y-2.5">
            <TextField
                id="generated-link"
                type="text"
                label="Pautan"
                placeholder="https://"
                bind:value={generatedLink}
            />
        </div>
    </form>
</section>
