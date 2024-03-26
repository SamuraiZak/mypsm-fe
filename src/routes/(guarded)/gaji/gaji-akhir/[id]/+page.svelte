<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import type { PageData } from './$types';
    import SalaryAllowanceField from '$lib/components/inputs/salary-allowance-field/SalaryAllowanceField.svelte';
    import { goto } from '$app/navigation';

    export let data: PageData;

    let total: number = data.rowData.reduce((acc, curr) => acc + curr.total, 0);
    let deductTotal: number = data.specialDeduction.reduce(
        (acc, curr) => acc + curr.totalDeduct,
        0,
    );
    let totalRates: number = total - deductTotal;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Gaji Akhir">
        <TextIconButton
            label="Tutup"
            icon="cancel"
            type="neutral"
            onClick={() => goto('/gaji/gaji-akhir')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTextField
                        label="Nama Penuh"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Nama Lain"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Jenis Kad Pengenalan"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Pekerja"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Tarikh Lahir"
                        id=""
                        disabled
                        type="date"
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Tempat Lahir"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Warganegara"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Bangsa"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Agama"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Jantina"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Status"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Alamat Rumah"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Alamat Surat Menyurat"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Perumahan"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Pinjaman Perumahan"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Pinjaman Kenderaan"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomRadioBoolean
                        label="Bekas Polis / Tentera"
                        id=""
                        val=""
                        errors={[]}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <CustomTextField
                        label="Gred"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Jawatan"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Penempatan"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Taraf Perkhidmatan"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Tarikh Kuatkuasa Lantikan Baru"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomRadioBoolean
                        label="Faedah Persaraan"
                        id=""
                        disabled
                        options={data.lookup.retirementBenefit}
                        val={2}
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. KWSP"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Akaun"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Program"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Kelayakan Cuti (Hari)"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        id=""
                        disabled
                        type="date"
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Mula Dilantik Perkhidmatan Sekarang"
                        id=""
                        disabled
                        type="date"
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Disahkan Dalam Jawatan Pertama LKIM"
                        id=""
                        disabled
                        type="date"
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Pemangkuan Sekarang"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Tanggung Kerja Sekarang"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Masuk Skim Pencen"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Kenaikan Gaji Akhir"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Kenaikan Pangkat Akhir"
                        id=""
                        disabled
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Tarikh Bersara"
                        id=""
                        disabled
                        type="date"
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Jenis Persaraan"
                        id=""
                        disabled
                        val="Paksa"
                        errors={[]}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Gaji dan Potongan">
                <TextIconButton label="Simpan" icon="check" form="" />
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <ContentHeader
                        title="Kemaskini Maklumat Gaji dan Potongan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Nama Kakitangan"
                        id=""
                        disabled
                        val="Ahmad Ali"
                        errors={[]}
                    />
                    <CustomTextField
                        label="Gred"
                        id=""
                        disabled
                        val="N41 - Setiausaha Pejabat"
                        errors={[]}
                    />
                    <CustomTextField
                        label="Jawatan"
                        id=""
                        disabled
                        val="Guru Besar"
                        errors={[]}
                    />
                    <CustomTextField
                        label="Gaji Pokok (RM)"
                        id=""
                        disabled
                        val="6730.20"
                        errors={[]}
                    />

                    <div class="w-full rounded-md border">
                        <ContentHeader
                            title="Maklumat Gaji dan Kadar Elaun-elaun"
                            borderClass="border-none"
                        />
                        <SalaryAllowanceField rowData={data.rowData} {total} />
                    </div>

                    <div class="w-full rounded-md border">
                        <ContentHeader
                            title="Tolakan Khas"
                            borderClass="border-none"
                        />
                        <SalaryAllowanceField
                            columnLabel={data.specialDeductionHeading}
                            rowData={data.specialDeduction}
                            totalLabel="Jumlah Tolakan (RM)"
                            total={deductTotal}
                        />
                    </div>
                    <div class="flex w-full items-end justify-end">
                        <ContentHeader title="" borderClass="border-none"
                            ><span
                                class="text-md text-ios-labelColors-secondaryLabel-light"
                                >Jumlah Keseluruhan (RM): {totalRates}</span
                            ></ContentHeader
                        >
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Sijil Gaji Akhir Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    <DownloadAttachment fileName="Gaji Akhir.pdf" />
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
