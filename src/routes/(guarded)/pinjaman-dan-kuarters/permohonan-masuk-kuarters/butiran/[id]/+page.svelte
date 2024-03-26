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
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { PageData } from './$types';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { goto } from '$app/navigation';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { approveOptions } from '$lib/constants/core/radio-option-constants';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import { Checkbox, Helper, Radio } from 'flowbite-svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';

    export let data: PageData;
    let isMarried: boolean = false;
    let isCheck: boolean = false;
    let paymentRates: number = 2;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Masuk Kuarters">
        <TextIconButton
            label="Tutup"
            type="neutral"
            icon="cancel"
            onClick={() =>
                goto('/pinjaman-dan-kuarters/permohonan-masuk-kuarters')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Jenis Pemohon">
                {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                    <TextIconButton label="Simpan" icon="check" form="" />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <CustomRadioBoolean
                        label="Jenis Pemohon"
                        id=""
                        options={data.lookup.applicantType}
                        val={data.currentRoleCode ==
                        UserRoleConstant.kakitangan.code
                            ? 1
                            : 2}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Peribadi Pemohon">
                {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                    <TextIconButton label="Simpan" icon="check" form="" />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <CustomTextField
                        label="Nama Penuh"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Pekerja"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Alamat Surat Menyurat"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomSelectField
                        label="Status"
                        id=""
                        options={data.lookup.maritalLookup}
                        val={2}
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Pasangan">
                {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                    <TextIconButton label="Simpan" icon="check" form="" />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <CustomRadioBoolean label="" />
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <CustomTextField
                        label="Nama Penuh"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Jabatan / Jawatan"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Gaji Sekarang Yang Diterima (Gaji Pokok/Hakiki)"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Bilangan Anak Yang Tinggal Bersama Pemohon Yang Berumur Kurang 21 Tahun"
                        id=""
                        val=""
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader
                title="Maklumat Perkhidmatan (Agensi/Jabatan)"
            >
                {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                    <TextIconButton label="Simpan" icon="check" form="" />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <CustomTextField
                        label="Nama Jawatan"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField label="Gred" id="" val="" errors={[]} />
                    <CustomRadioBoolean
                        label="Perkhidmatan"
                        options={data.lookup.servicesType}
                        val={1}
                    />
                    <CustomTextField
                        label="Tarikh Mula Dilantik Ke Perkhidmatan Kerajaan"
                        id=""
                        type="date"
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Alamat Penuh Jabatan/Agensi Bertugas"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Alamat Penuh Jabatan/Agensi Pembayar Gaji"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Bank Pembayar Gaji"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Gaji Sekarang (Gaji Pokok/Hakiki)"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="ITP (RM)"
                        id=""
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="COLA (RM)"
                        id=""
                        val=""
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan">
                {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                    <TextIconButton label="Simpan" icon="check" form="" />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Dokumen Permohonan Menduduki Kuarters"
                    borderClass="border-none"
                />
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code}
                        <DownloadAttachment fileName="Kad Pengenalan Sendiri" />
                        <DownloadAttachment
                            fileName="Kad Pengenalan Pasangan"
                        />
                        <DownloadAttachment fileName="Kad Nikah" />
                        <DownloadAttachment fileName="Kad Pekerja" />
                        <DownloadAttachment
                            fileName="Surat Pengesahan Jabatan/Majikan"
                        />
                        <DownloadAttachment
                            fileName="Slip Gaji 3 Bulan Terkini"
                        />
                        <DownloadAttachment
                            fileName="Gambar Dalaman Kuarters"
                        />
                        <DownloadAttachment fileName="Gambar Luaran Kuarters" />
                    {:else}
                        <div
                            class="flex h-fit w-full flex-col justify-center gap-2 text-ios-labelColors-secondaryLabel-light text-sm"
                        >
                            <span>Muat naik salinan</span>
                            <span>1. Kad Pengenalan Sendiri</span>
                            <span>2. Kad Pengenalan Pasangan</span>
                            <span>3. Kad Nikah</span>
                            <span>4. Gambar Dalaman Kuarters</span>
                            <span>5. Slip Gaji 3 Bulan Terkini</span>
                            <span>6. Surat Pengesahan Jabatan/Majikan</span>
                        </div>
                        <input
                            class="rounded-md bg-ios-systemColors-systemFill-light"
                            accept=".pdf"
                            type="file"
                        />
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan">
                {#if data.currentRoleCode !== UserRoleConstant.pengarahBahagian.code && data.currentRoleCode !== UserRoleConstant.pengarahNegeri.code}
                    <TextIconButton label="Simpan" icon="check" form="" />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader title="Pengesahan" borderClass="border-none" />
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <Checkbox bind:checked={isCheck}
                        >Saya dengan ini mengesahkan bahawa maklumat sebagaimana
                        yang dinyatakan berikut adalah benar.</Checkbox
                    >
                </form>
            </StepperContentBody>
        </StepperContent>

        {#if data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code || data.currentRoleCode == UserRoleConstant.pengarahNegeri.code || data.currentRoleCode == UserRoleConstant.pengarahBahagian.code}
            <StepperContent>
                <StepperContentHeader
                    title="Ulasan Kelulusan daripada Urus Setia"
                >
                    {#if data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                        <TextIconButton label="Simpan" icon="check" form="" />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <ContentHeader
                        title="Ulasan daripada Urus Setia"
                        borderClass="border-none"
                    />
                    <form
                        class="flex w-full flex-col justify-start gap-2.5"
                        id=""
                        method="POST"
                    >
                        <CustomTextField
                            label="Tindakan Ulasan"
                            id=""
                            val=""
                            errors={[]}
                        />
                        <CustomRadioBoolean
                            label="Keputusan"
                            id=""
                            options={approveOptions}
                            val={true}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader
                    title="Ulasan Kelulusan daripada Pengarah Negeri / Bahagian"
                >
                    {#if data.currentRoleCode == UserRoleConstant.pengarahNegeri.code || data.currentRoleCode == UserRoleConstant.pengarahBahagian.code}
                        <TextIconButton label="Simpan" icon="check" form="" />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <ContentHeader
                        title="Ulasan daripada Pengarah Negeri / Bahagian"
                        borderClass="border-none"
                    />
                    <form
                        class="flex w-full flex-col justify-start gap-2.5"
                        id=""
                        method="POST"
                    >
                        <CustomTextField
                            label="Tindakan Ulasan"
                            id=""
                            val=""
                            errors={[]}
                        />
                        <CustomRadioBoolean
                            label="Keputusan"
                            id=""
                            options={approveOptions}
                            val={true}
                        />
                    </form>
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Kemaskini Maklumat Permohonan">
                    {#if data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                        <TextIconButton label="Simpan" icon="check" form="" />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <CustomTab>
                        <CustomTabContent title="Maklumat Kelayakan">
                            <form
                                class="flex w-full flex-col justify-start gap-2.5"
                                id=""
                                method="POST"
                            >
                                <ContentHeader
                                    title="Maklumat Kelayakan"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Gred"
                                    id=""
                                    val=""
                                    errors={[]}
                                />
                            </form>
                        </CustomTabContent>
                        <CustomTabContent
                            title="Maklumat Kelulusan dan Tawaran"
                        >
                            <form
                                class="flex w-full flex-col justify-start gap-2.5"
                                id=""
                                method="POST"
                            >
                                <ContentHeader
                                    title="Pelulus"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Nama Pelulus"
                                    id=""
                                    val=""
                                    errors={[]}
                                />
                                <ContentHeader
                                    title="Butiran Penempatan Kuarter"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Emel Pemohon"
                                    id=""
                                    val=""
                                    errors={[]}
                                />
                                <CustomTextField
                                    label="Tarikh Masuk Kuarter"
                                    id=""
                                    type="date"
                                    val=""
                                    errors={[]}
                                />
                                <CustomTextField
                                    label="Unit dan Kuarter"
                                    id=""
                                    val=""
                                    errors={[]}
                                />
                                <ContentHeader
                                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti) *untuk permohonan dari kakitangan"
                                    borderClass="border-none"
                                />
                                <ul class="flex w-full flex-col gap-2.5">
                                    <li>
                                        <Radio
                                            aria-describedby="in25Km"
                                            class="p-3"
                                            bind:group={paymentRates}
                                            value={1}>Dalam Jarak 25KM</Radio
                                        >
                                        <Helper id="in25Km" class="ps-9"
                                            >Potongan ITP 75% dan Potongan COLA
                                            50%</Helper
                                        >
                                    </li>

                                    <li>
                                        <Radio
                                            aria-describedby="moreThan25Km"
                                            class="p-3"
                                            bind:group={paymentRates}
                                            value={2}>Jarak Melebihi 25KM</Radio
                                        >
                                        <Helper id="moreThan25Km" class="ps-9"
                                            >Potongan COLA 50%</Helper
                                        >
                                    </li>

                                    <li>
                                        <Radio
                                            aria-describedby="betterGradeForKuarters"
                                            class="p-3"
                                            bind:group={paymentRates}
                                            value={3}
                                            >Gred Jawatan Melebihi Kategori
                                            Kuarters</Radio
                                        >
                                        <Helper
                                            id="betterGradeForKuarters"
                                            class="ps-9"
                                            >Potongan ITP mengikut nilai sewaan
                                            gred tertinggi kuarters yang
                                            diperuntukkan (RM):</Helper
                                        >

                                        <div class="w-[220px] ps-9">
                                            <CustomTextField
                                                label=""
                                                id=""
                                                type="number"
                                                disabled={paymentRates !== 3
                                                    ? true
                                                    : false}
                                                val={350}
                                            />
                                        </div>
                                    </li>
                                </ul>

                                <ContentHeader
                                    title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti) *untuk permohonan agensi luar"
                                    borderClass="border-none"
                                />
                                <CustomTextField
                                    label="Nilai Sewaan Bulanan (RM)"
                                    type="number"
                                    id=""
                                    val={300}
                                    errors={[]}
                                />
                                <CustomTextField
                                    label="Deposit (2 bulan nilai sewaan) (RM)"
                                    type="number"
                                    id=""
                                    val={300}
                                    errors={[]}
                                />
                                <CustomTextField
                                    label="Deposit (Air dan Elektrik) (RM)"
                                    type="number"
                                    id=""
                                    val={300.0}
                                    errors={[]}
                                />
                            </form>
                        </CustomTabContent>
                    </CustomTab>
                </StepperContentBody>
            </StepperContent>
        {/if}
        <StepperContent>
            <StepperContentHeader title="Surat Tawaran Kuarters">
                {#if data.currentRoleCode == UserRoleConstant.urusSetiaPeringkatNegeri.code}
                    <TextIconButton label="Simpan" icon="check" form="" />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <DownloadAttachment
                        fileName="Surat Tawaran Penempatan Kuarters"
                    />
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
