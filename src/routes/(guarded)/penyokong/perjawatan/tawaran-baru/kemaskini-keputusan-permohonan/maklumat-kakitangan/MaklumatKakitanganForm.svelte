<script lang="ts">
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    import { positions } from '$lib/mocks/positions/positions';
    import { maklumatPeribadiForm } from '$lib/mocks/profil/maklumat-peribadi';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';

    let staffs: MaklumatPeribadi[] = maklumatPeribadiForm;

    export let editable: boolean = false;

    let radioValueExSoldier: string | undefined = 'tidak';
    let radioValueRelationToStaff: string | undefined = 'ya';
    let selectedPosition: string = positions[2].value;

    const options: RadioOption[] = [
        {
            value: 'ya',
            label: 'YA',
        },
        {
            value: 'tidak',
            label: 'Tidak',
        },
    ];
</script>

<Accordion>
    {#each Object.values(staffs) as values, index}
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
                    >{values.namaPenuh} ({values.noPekerja})</span
                >
            </span>
            <div class="space-y-2.5">
                <b class="text-sm text-system-primary">Maklumat Peribadi</b>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="staff-number-{values.noPekerja}"
                    label="No. Pekerja"
                    value={values.noPekerja}
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="service-status-{values.noPekerja}"
                    label="Status Pekerjaan"
                    value=""
                ></TextField>
                <TextField
                    type="date"
                    disabled={!editable}
                    id="inactive-date-{values.noPekerja}"
                    label="Tarikh Kuatkuasa Tidak Aktif"
                    value=""
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="nama-penuh-{values.noPekerja}"
                    label="Nama Penuh"
                    value={values.namaPenuh}
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="nama-lain-{values.noPekerja}"
                    label="Nama Lain"
                    value=""
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="ic-number-{values.noPekerja}"
                    label="No. K/P"
                    value={values.noKadPengenalan}
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="ic-color-{values.noPekerja}"
                    label="Warna K/P"
                    value={values.warnaKadPengenalan}
                ></TextField>
                <TextField
                    type="date"
                    disabled={!editable}
                    id="dob-{values.noPekerja}"
                    label="Tarikh Lahir"
                    value={values.tarikhLahir}
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="place-of-birth-{values.noPekerja}"
                    label="Tempat Lahir"
                    value={values.tempatLahir}
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="citizenship-{values.noPekerja}"
                    label="Warganegara"
                    value={values.warganegara}
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="race-{values.noPekerja}"
                    label="Bangsa"
                    value={values.bangsa}
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="religion-{values.noPekerja}"
                    label="Agama"
                    value={values.agama}
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="gender-{values.noPekerja}"
                    label="Jantina"
                    value={values.jantina}
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="status-{values.noPekerja}"
                    label="Status"
                    value={values.status}
                ></TextField>
                <TextField
                    type="email"
                    disabled={!editable}
                    id="email-{values.noPekerja}"
                    label="Emel"
                    value={values.status}
                ></TextField>
                <LongTextField
                    disabled={!editable}
                    id="address-{values.noPekerja}"
                    label="Alamat Rumah"
                    value={values.alamatRumah}
                ></LongTextField>
                <LongTextField
                    disabled={!editable}
                    id="posting-address-{values.noPekerja}"
                    label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                    value={values.alamatSuratMenyurat}
                ></LongTextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="home-phone-{values.noPekerja}"
                    label="No. Telefon Rumah"
                    value=""
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="mobile-phone-{values.noPekerja}"
                    label="No. Telefon Bimbit"
                    value=""
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="home-{values.noPekerja}"
                    label="Perumahan"
                    value=""
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="loaned-home-{values.noPekerja}"
                    label="Pinjaman Perumahan"
                    value=""
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="loaned-vehicle-{values.noPekerja}"
                    label="Pinjaman Kenderaam"
                    value=""
                ></TextField>
                <RadioSingle
                    disabled={!editable}
                    {options}
                    legend="Bekas Polis/Tentera"
                    bind:userSelected={radioValueExSoldier}
                />
                <div class="pt-5">
                    <b class="text-sm text-system-primary"
                        >Maklumat Pertalian Dengan Kakitangan LKIM
                    </b>
                </div>
                <RadioSingle
                    disabled={!editable}
                    {options}
                    legend="Pertalian Dengan Kakitangan LKIM"
                    bind:userSelected={radioValueRelationToStaff}
                />
                <TextField
                    type="text"
                    disabled={!editable}
                    id="related-staff-number-{values.noPekerja}"
                    label="No. Pekerja Kakitangan LKIM"
                    value=""
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="related-staff-name-{values.noPekerja}"
                    label="Nama Kakitangan LKIM"
                    value=""
                ></TextField>
                <TextField
                    type="text"
                    disabled={!editable}
                    id="related-staff-position-{values.noPekerja}"
                    label="Jawatan Kakitangan LKIM"
                    value=""
                ></TextField>
                <DropdownSelect
                    disabled={!editable}
                    id="related-staff-relations-{values.noPekerja}"
                    label="Hubungan dengan Kakitangan LKIM"
                    dropdownType="label-left-full"
                    options={positions}
                    bind:index={selectedPosition}
                />
            </div>
        </AccordionItem>
    {/each}
</Accordion>
