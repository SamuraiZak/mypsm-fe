<script lang="ts">
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { getEmployees } from '$lib/service/employees/staff-service';
    import { onMount } from 'svelte';
    let radioValueExSoldier: string | undefined = 'tidak';
    let radioValueRelationToStaff: string | undefined = 'ya';
    let staffData: IntEmployees | undefined;
    export let ptbData: PtbAndKwap;
    export let editable: boolean = false;

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

    // fetch data on mount.
    onMount(async () => {
        const data: IntEmployees[] = await getEmployees();

        staffData = data.find((staff) => {
            return (
                staff.employeeNumber === ptbData.noPekerja &&
                staff.identityDocumentNumber === ptbData.noKadPengenalan
            );
        });
    });
</script>

<form class="flex w-full flex-col gap-2.5">
    <b class="text-sm text-system-primary">Maklumat Peribadi</b>
    <TextField
        type="text"
        disabled={!editable}
        id="staff-number-{staffData?.employeeNumber}"
        label="No. Pekerja"
        value={staffData?.employeeNumber}
    ></TextField>
    <TextField
        type="date"
        disabled={!editable}
        id="service-status-{staffData?.employeeNumber}"
        label="Status Pekerjaan"
        value=""
    ></TextField>
    <TextField
        type="date"
        disabled={!editable}
        id="inactive-date-{staffData?.employeeNumber}"
        label="Tarikh Kuatkuasa Tidak Aktif"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="nama-penuh-{staffData?.employeeNumber}"
        label="Nama Penuh"
        value={staffData?.name}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="nama-lain-{staffData?.alternativeName}"
        label="Nama Lain"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="ic-number-{staffData?.employeeNumber}"
        label="No. K/P"
        value={staffData?.identityDocumentNumber}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="ic-color-{staffData?.employeeNumber}"
        label="Warna K/P"
        value={staffData?.identityDocumentType}
    ></TextField>
    <TextField
        type="date"
        disabled={!editable}
        id="dob-{staffData?.employeeNumber}"
        label="Tarikh Lahir"
        value={staffData?.birthDate}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="place-of-birth-{staffData?.employeeNumber}"
        label="Tempat Lahir"
        value={staffData?.birthPlace}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="citizenship-{staffData?.employeeNumber}"
        label="Warganegara"
        value={staffData?.isMalaysian}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="race-{staffData?.employeeNumber}"
        label="Bangsa"
        value={staffData?.raceId}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="religion-{staffData?.employeeNumber}"
        label="Agama"
        value={staffData?.religionId}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="gender-{staffData?.employeeNumber}"
        label="Jantina"
        value={staffData?.gender}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="status-{staffData?.employeeNumber}"
        label="Status"
        value=""
    ></TextField>
    <TextField
        type="email"
        disabled={!editable}
        id="email-{staffData?.employeeNumber}"
        label="Emel"
        value={staffData?.email}
    ></TextField>
    <LongTextField
        disabled={!editable}
        id="address-{staffData?.employeeNumber}"
        label="Alamat Rumah"
        value={staffData?.homeAddress}
    ></LongTextField>
    <LongTextField
        disabled={!editable}
        id="posting-address-{staffData?.employeeNumber}"
        label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
        value={staffData?.mailAddress}
    ></LongTextField>
    <TextField
        type="text"
        disabled={!editable}
        id="home-phone-{staffData?.employeeNumber}"
        label="No. Telefon Rumah"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="mobile-phone-{staffData?.employeeNumber}"
        label="No. Telefon Bimbit"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="home-{staffData?.employeeNumber}"
        label="Perumahan"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="loaned-home-{staffData?.employeeNumber}"
        label="Pinjaman Perumahan"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="loaned-vehicle-{staffData?.employeeNumber}"
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
        id="related-staff-number-{staffData?.employeeNumber}"
        label="No. Pekerja Kakitangan LKIM"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="related-staff-name-{staffData?.employeeNumber}"
        label="Nama Kakitangan LKIM"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="related-staff-position-{staffData?.employeeNumber}"
        label="Jawatan Kakitangan LKIM"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="related-staff-relations-{staffData?.employeeNumber}"
        label="Hubungan dengan Kakitangan LKIM"
        value="Ayah"
    ></TextField>
</form>
