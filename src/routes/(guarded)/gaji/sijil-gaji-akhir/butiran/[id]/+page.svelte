<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import SalaryField from '$lib/components/inputs/salary-field/SalaryField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Sijil Gaji Akhir">
        <TextIconButton
            label="Tutup"
            icon="cancel"
            type="neutral"
            onClick={() => goto('/gaji/sijil-gaji-akhir')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat  Kakitangan" />
            <StepperContentBody paddingClass="p-5">
                <div class="flex w-full">
                    <div class="flex w-1/2 flex-col">
                        <CustomTextField
                            id="name"
                            label="Nama Penuh"
                            isRequired={false}
                            disabled
                            val="Mionel Lessi"
                        />
                        <CustomTextField
                            id="name"
                            label="Nama Lain"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="No. Kad Pengenalan"
                            isRequired={false}
                            disabled
                            val="871013097171"
                        />
                        <CustomTextField
                            id="name"
                            label="Warna Kad Pengenalan"
                            isRequired={false}
                            disabled
                            val="Biru"
                        />
                        <CustomTextField
                            id="name"
                            label="No. Pekerja"
                            isRequired={false}
                            disabled
                            val="2421"
                        />
                        <CustomTextField
                            id="name"
                            label="Tarikh Lahir"
                            type="date"
                            isRequired={false}
                            disabled
                            val="2024/6/20"
                        />
                        <CustomTextField
                            id="name"
                            label="Tempat Lahir"
                            isRequired={false}
                            disabled
                            val="Hospital"
                        />
                        <CustomTextField
                            id="Warganegara"
                            label="Tarikh"
                            isRequired={false}
                            disabled
                            val="Malaysia"
                        />
                        <CustomTextField
                            id="name"
                            label="Bangsa"
                            isRequired={false}
                            disabled
                            val="Melayu"
                        />
                        <CustomTextField
                            id="name"
                            label="Agama"
                            isRequired={false}
                            disabled
                            val="Islam"
                        />
                        <CustomTextField
                            id="name"
                            label="Jantina"
                            isRequired={false}
                            disabled
                            val="Lelaki"
                        />
                        <CustomTextField
                            id="name"
                            label="Status"
                            isRequired={false}
                            disabled
                            val="Bujang"
                        />
                        <CustomTextField
                            id="name"
                            label="Alamat Rumah"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="No. Telefon"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Perumahan"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Pinjaman Perumahan"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomRadioBoolean
                            id="name"
                            isRequired={false}
                            label="Bekas Polis/Tentera"
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat  Perkhidmatan" />
            <StepperContentBody paddingClass="p-5">
                <div class="flex w-full">
                    <div class="flex w-1/2 flex-col">
                        <CustomTextField
                            id="name"
                            label="Gred"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Lantikan"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Penempatan"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Taraf Perkhidmatan"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Tarikh Kuatkuasa Lantikan Baru"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Faedah Persaraan"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="No. KWSP"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="No. Akaun Bank"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Program"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Kelayakan Cuti (Hari)"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Mula Dilantik Perkhidmatan Kerajaan"
                            type="date"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Mula Dilantik Perkhidmatan LKIM"
                            type="date"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Mula Dilantik Perkhidmatan Sekarang"
                            type="date"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Disahkan Dalam Jawatan Pertama LKIM"
                            type="date"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Pemangkuan Sekarang"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Tanggung Kerja Sekarang"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Masuk Skim Pencen"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Kenaikan Gaji Akhir"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Kenaikan Pangkat Akhir"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Tarikh Bersara"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="Jenis Persaraan"
                            label="Gred"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat  Gaji dan Potongan">
                <TextIconButton label="Draf" type="neutral" />
                <TextIconButton label="Hantar" />
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-5">
                <div class="flex w-full border-b">
                    <div class="flex w-1/2 flex-col">
                        <CustomTextField
                            id="name"
                            label="Nama Kakitangan"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="No. Kad Pengenalan"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Gred"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Lantikan"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Gaji atau Pencen Setahun (RM)"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                        <CustomTextField
                            id="name"
                            label="Tarikh Sehingga dan Termasuk Dimana Bayaran Telah Dibuat"
                            isRequired={false}
                            disabled
                            val="-"
                        />
                    </div>
                </div>
                <div class="flex w-full flex-col gap-5 items-end">
                    <SalaryField
                        title="Kadar Elaun-Elaun"
                        rowData={data.props.mockData}
                    />
                    <SalaryField
                        title="Tolakan Khas"
                        footer="Jumlah Tolakan (RM)"
                        rowData={data.props.mockData2}
                    />
                    <div class="border w-2/6 p-2 rounded-md text-sm font-medium text-ios-labelColors-secondaryLabel-light">
                        <span>Jumlah Keseluruhan (RM): {444.33}</span>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Cetak Sijil Gaji Akhir Kakitangan" />
            <StepperContentBody paddingClass="p-5">
                <div class="flex w-full">
                    <div class="flex w-1/2 flex-col gap-5">
                        <div class="w-full">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Arahan:
                                    </span>
                                    Klik di ruangan yang disediakan untuk muat naik Sijil Gaji Akhir kakitangan.
                                </p>
                            </Alert>
                        </div>
                        <a
                            href={""}
                            target="_blank"
                            download={"Slip Gaji Akhir - Mionel Lessi"}
                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                            >Slip Gaji Akhir - Mionel Lessi</a
                        >
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
