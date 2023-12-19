<script lang="ts">
    import BayaranBalikPengagkutanBarangaMelaluiJalanLaut from './forms/BayaranBalikPengagkutanBarangaMelaluiJalanLaut.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import TabungKebajikanKakitangan from './forms/TabungKebajikanKakitangan.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupServiceGroups } from '$lib/mocks/database/mockLookupServiceGroups';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { categories } from '$lib/mocks/elaun/categories.js';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import BantuanPakaianIstiadat from './forms/BantuanPakaianIstiadat.svelte';
    import BantuanPakaianPanas from './forms/BantuanPakaianPanas.svelte';
    import TambangMengunjungiWilayahAsal from './forms/TambangMengunjungiWilayahAsal.svelte';
    import BantuanMengurusJenazah from './forms/BantuanMengurusJenazah.svelte';
    import PerpindahanRumah from './forms/PerpindahanRumah.svelte';
    import PembayaranBalikPassport from './forms/PembayaranBalikPassport.svelte';
    import InsuransKesihatan from './forms/InsuransKesihatan.svelte';

    let activeStepper = 0;
    let currEmp = mockEmployees[0];
    let currEmpService = mockCurrentService[0];
    let grades = mockLookupGrades[currEmpService.gradeId];
    let groups = mockLookupServiceGroups[currEmpService.serviceGroupId];
    let labelBlack = false;
    let selectedAllowance = '';

    let famInfo = {
        name: '',
        age: 0,
        relationship: '',
    };

    let famData: any[] = [{ ...famInfo }];
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Elaun"
        description="Sila isi borang permohonan elaun di bawah dengan butiran yang tepat dan lengkap."
    >
        <FormButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
            ><FormButton
                type="next"
                onClick={() => {
                    activeStepper = 1;
                }}
            /></StepperContentHeader
        >
        <StepperContentBody>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <TextField
                    {labelBlack}
                    label="No. Pekerja"
                    value={currEmp.employeeNumber}
                    disabled
                ></TextField>
                <TextField
                    {labelBlack}
                    label="Nama"
                    value={currEmp.name}
                    disabled
                ></TextField>
                <TextField
                    {labelBlack}
                    label="No. K/P"
                    value={currEmp.identityDocumentNumber}
                    disabled
                ></TextField>
                <TextField
                    {labelBlack}
                    label="Gred"
                    value={grades.code + ' - ' + grades.name}
                    disabled
                ></TextField>
                <TextField
                    {labelBlack}
                    label="Penempatan"
                    value={currEmpService.placement}
                    disabled
                ></TextField>
                <TextField
                    {labelBlack}
                    label="Kumpulan"
                    value={groups.name}
                    disabled
                ></TextField>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Permohonan Elaun">
            {#if selectedAllowance != 'Sila Pilih'}
                <FormButton
                    type="back"
                    onClick={() => {
                        activeStepper = 0;
                    }}
                /><FormButton
                    type="send"
                    onClick={() => {
                        console.log(famData);
                    }}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex max-h-full w-full flex-col gap-2.5">
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Jenis Elaun"
                    options={categories.filter((cat) => cat.name != 'Semua')}
                    bind:value={selectedAllowance}
                    onSelect={() => {}}
                ></DropdownSelect>

                {#if selectedAllowance === 'Bantuan Pakaian Istiadat'}
                    <BantuanPakaianIstiadat></BantuanPakaianIstiadat>
                {:else if selectedAllowance === 'Bantuan Pakaian Panas'}
                    <BantuanPakaianPanas></BantuanPakaianPanas>
                {:else if selectedAllowance === 'Tambang Mengunjungi Wilayah Asal'}
                    <TambangMengunjungiWilayahAsal bind:data={famData}
                    ></TambangMengunjungiWilayahAsal>
                {:else if selectedAllowance === 'Bantuan Mengurus Jenazah'}
                    <BantuanMengurusJenazah></BantuanMengurusJenazah>
                {:else if selectedAllowance === 'Tabung Kebajikan Kakitangan'}
                    <TabungKebajikanKakitangan></TabungKebajikanKakitangan>
                {:else if selectedAllowance === 'Perpindahan Rumah'}
                    <PerpindahanRumah></PerpindahanRumah>
                {:else if selectedAllowance === 'Pembayaran Balik Passport'}
                    <PembayaranBalikPassport></PembayaranBalikPassport>
                {:else if selectedAllowance === 'Insurans Kesihatan'}
                    <InsuransKesihatan></InsuransKesihatan>
                {:else if selectedAllowance === 'Bayaran Balik Pengangkutan Barang Melalui Jalan Laut'}
                    <BayaranBalikPengagkutanBarangaMelaluiJalanLaut
                    ></BayaranBalikPengagkutanBarangaMelaluiJalanLaut>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
