<script lang="ts">
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import type { Employee } from '$lib/view-models/mypsm/perjawatan/pension/pension-personal-detail-response.view-model';

    export let editable: boolean = false;

    export let ptbData: Employee;

</script>

<form class="flex w-full flex-col gap-2.5">
    <b class="text-sm text-system-primary">Maklumat Peribadi</b>
    <TextField
        type="text"
        disabled={!editable}
        id="staff-number-{ptbData.employeeNo}"
        label="No. Pekerja"
        value={ptbData.employeeNo}
    ></TextField>
    <!-- <TextField
        type="date"
        disabled={!editable}
        id="service-status-{ptbData.employeeNumber}"
        label="Status Pekerjaan"
        value=""
    ></TextField> -->
    <!-- <TextField
        type="date"
        disabled={!editable}
        id="inactive-date-{ptbData.employeeNumber}"
        label="Tarikh Kuatkuasa Tidak Aktif"
        value=""
    ></TextField> -->
    <TextField
        type="text"
        disabled={!editable}
        id="nama-penuh-{ptbData.name}"
        label="Nama Penuh"
        value={ptbData.name}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="nama-lain-{ptbData.otherName}"
        label="Nama Lain"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="ic-number-{ptbData.identityCard}"
        label="No. K/P"
        value={ptbData.identityCard}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="ic-color-{ptbData.identityCardColor}"
        label="Warna K/P"
        value={ptbData.identityCardColor}
    ></TextField>
    <TextField
        type="date"
        disabled={!editable}
        id="dob-{ptbData.dateOfBirth}"
        label="Tarikh Lahir"
        value={ptbData.dateOfBirth}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="place-of-birth-{ptbData.placeOfBirth}"
        label="Tempat Lahir"
        value={ptbData.placeOfBirth}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="citizenship-{ptbData.nationality}"
        label="Warganegara"
        value={ptbData.nationality}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="race-{ptbData.race}"
        label="Bangsa"
        value={ptbData.race}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="religion-{ptbData.religion}"
        label="Agama"
        value={ptbData.religion}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="gender-{ptbData.gender}"
        label="Jantina"
        value={ptbData.gender}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="status-{ptbData.status}"
        label="Status"
        value={ptbData.status}
    ></TextField>
    <TextField
        type="email"
        disabled={!editable}
        id="email-{ptbData.mailAddress}"
        label="Emel"
        value={ptbData.mailAddress}
    ></TextField>
    <LongTextField
        disabled={!editable}
        id="address-{ptbData.homeAddress}"
        label="Alamat Rumah"
        value={ptbData.homeAddress}
    ></LongTextField>
    <LongTextField
        disabled={!editable}
        id="posting-address-{ptbData.mailAddress}"
        label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
        value={ptbData.mailAddress}
    ></LongTextField>
    <TextField
        type="text"
        disabled={!editable}
        id="home-phone-{ptbData.homeNo}"
        label="No. Telefon Rumah"
        value={ptbData.homeNo}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="mobile-phone-{ptbData.mobileNo}"
        label="No. Telefon Bimbit"
        value={ptbData.mobileNo}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="home-{ptbData.housing}"
        label="Perumahan"
        value={ptbData.housing}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="loaned-home-{ptbData.houseLoan}"
        label="Pinjaman Perumahan"
        value={ptbData.houseLoan}
    ></TextField>
    <!-- <TextField
        type="text"
        disabled={!editable}
        id="loaned-vehicle-{ptbData.employeeNumber}"
        label="Pinjaman Kenderaam"
        value=""
    ></TextField> -->
    <!-- <RadioSingle
        disabled={!editable}
        {options}
        legend="Bekas Polis/Tentera"
        bind:userSelected={stffData?.isExPolice}
    /> -->
    <div class="pt-5">
        <b class="text-sm text-system-primary"
            >Maklumat Pertalian Dengan Kakitangan LKIM
        </b>
    </div>
    <!-- <RadioSingle
        disabled={!editable}
        {options}
        legend="Pertalian Dengan Kakitangan LKIM"
        bind:userSelected={radioValueRelationToStaff}
    /> -->
    <!-- <TextField
        type="text"
        disabled={!editable}
        id="related-staff-number-{ptbData.employeeNumber}"
        label="No. Pekerja Kakitangan LKIM"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="related-staff-name-{ptbData.employeeNumber}"
        label="Nama Kakitangan LKIM"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="related-staff-position-{ptbData.employeeNumber}"
        label="Jawatan Kakitangan LKIM"
        value=""
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        id="related-staff-relations-{ptbData.employeeNumber}"
        label="Hubungan dengan Kakitangan LKIM"
        value="Ayah"
    ></TextField> -->
</form>
