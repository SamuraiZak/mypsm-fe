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
    import {
        approveOptions,
        certifyOptions,
    } from '$lib/constants/core/radio-option-constants';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import { Checkbox, Helper, Radio } from 'flowbite-svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';

    export let data: PageData;
    let isMarried: boolean = false;
    let isCheck: boolean = true;
    let paymentRates: number = 3;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Keluar Kuarters">
        <TextIconButton
            label="Tutup"
            type="neutral"
            icon="cancel"
            onClick={() =>
                goto('/pinjaman-dan-kuarters/permohonan-keluar-kuarters')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Jenis Pemohon">
                <TextIconButton label="Simpan" icon="check" form="" />
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
                        val={1}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Peribadi Pemohon">
                <TextIconButton label="Simpan" icon="check" form="" />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <CustomTextField
                        label="Nama"
                        id=""
                        disabled
                        val="Ahmad Irfan"
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        id=""
                        disabled
                        val="990113-13-5663"
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Pekerja"
                        id=""
                        disabled
                        val="N2024"
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id=""
                        disabled
                        val="0198763452"
                        errors={[]}
                    />
                    <CustomTextField
                        label="Alamat Surat Menyurat"
                        id=""
                        disabled
                        val="Lot 43-A Lorong 5, Kuching 3"
                        errors={[]}
                    />
                    <CustomSelectField
                        label="Status"
                        id=""
                        disabled
                        options={data.lookup.maritalLookup}
                        val={2}
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Penempatan Kuarters">
                <TextIconButton label="Simpan" icon="check" form="" />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <CustomTextField
                        label="Emel Pemohon"
                        id=""
                        disabled
                        val="ahmad@gmail.com"
                        errors={[]}
                    />
                    <CustomTextField
                        label="Tarikh Masuk Kuarters"
                        id=""
                        disabled
                        val="2022-10-21"
                        errors={[]}
                    />
                    <CustomTextField
                        label="Unit dan Kuarters"
                        id=""
                        disabled
                        val="Unit 5 Kuarter 3"
                        errors={[]}
                    />
                    <ContentHeader
                        title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                        borderClass="border-none"
                    />
                    <ul class="flex w-full flex-col gap-2.5">
                        <li>
                            <Radio
                                aria-describedby="in25Km"
                                class="p-3"
                                disabled
                                bind:group={paymentRates}
                                value={1}>Dalam Jarak 25KM</Radio
                            >
                            <Helper id="in25Km" class="ps-9"
                                >Potongan ITP 75% dan Potongan COLA 50%</Helper
                            >
                        </li>

                        <li>
                            <Radio
                                aria-describedby="moreThan25Km"
                                class="p-3"
                                disabled
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
                                disabled
                                bind:group={paymentRates}
                                value={3}
                                >Gred Jawatan Melebihi Kategori Kuarters</Radio
                            >
                            <Helper id="betterGradeForKuarters" class="ps-9"
                                >Potongan ITP mengikut nilai sewaan gred
                                tertinggi kuarters yang diperuntukkan (RM):</Helper
                            >

                            <div class="w-[220px] ps-9">
                                <CustomTextField
                                    label=""
                                    id=""
                                    type="number"
                                    disabled
                                    val={350}
                                />
                            </div>
                        </li>
                    </ul>
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Keluar Kuarters">
                <TextIconButton label="Simpan" icon="check" form="" />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <CustomTextField
                        label="Tarikh Keluar Kuarter"
                        id=""
                        disabled={data.currentRoleCode !==
                        UserRoleConstant.kakitangan.code
                            ? true
                            : false}
                        val={data.currentRoleCode !==
                        UserRoleConstant.kakitangan.code
                            ? '2024-06-21'
                            : ''}
                        type="date"
                        errors={[]}
                    />
                    <CustomTextField
                        label="Unit dan Kuarter"
                        id=""
                        disabled
                        val="Unit 5 Kuarter 3"
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan">
                <TextIconButton label="Simpan" icon="check" form="" />
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Dokumen Keluar Kuarters"
                    borderClass="border-none"
                />
                {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code}
                <form
                    class="flex w-full flex-col justify-start gap-2.5"
                    id=""
                    method="POST"
                >
                    <DownloadAttachment
                        fileName="Borang Akuan Keluar Kuarters"
                    />
                    <DownloadAttachment
                        fileName="Borang Pemeriksaan Keluar Kuarters"
                    />
                </form>
                {:else}
                <div
                    class="flex h-fit w-full flex-col justify-start gap-2 text-sm text-ios-labelColors-secondaryLabel-light"
                >
                    <span>Muat naik salinan</span>
                    <span>1. Borang Akuan Keluar Kuarters</span>
                    <span>2. Borang Pemeriksaan Keluar Kuarters</span>
                </div>
                <input
                    class="rounded-md bg-ios-systemColors-systemFill-light w-full"
                    accept=".pdf"
                    type="file"
                />
                {/if}
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan">
                <TextIconButton label="Simpan" icon="check" form="" />
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

        {#if data.currentRoleCode !== UserRoleConstant.kakitangan.code}
        <StepperContent>
            <StepperContentHeader title="Ulasan Kelulusan daripada Urus Setia">
                <TextIconButton label="Simpan" icon="check" form="" />
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
                        disabled={data.currentRoleCode !==
                            UserRoleConstant.urusSetiaPeringkatNegeri.code}
                        options={certifyOptions}
                        val={true}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat Permohonan">
                <TextIconButton label="Simpan" icon="check" form="" />
            </StepperContentHeader>
            <StepperContentBody>
                <CustomTab>
                    <CustomTabContent title="Maklumat Penempatan">
                        <form
                            class="flex w-full flex-col justify-start gap-2.5"
                            id=""
                            method="POST"
                        >
                            <CustomTextField
                                label="Emel Pemohon"
                                id=""
                                disabled
                                val="ali@gmail.com"
                                errors={[]}
                            />
                            <CustomTextField
                                label="Tarikh Masuk Kuarters"
                                id=""
                                disabled
                                val="2023-11-13"
                                errors={[]}
                            />
                            <CustomTextField
                                label="Unit dan Kuarters"
                                id=""
                                disabled
                                val="Unit 3A Kaurter 5"
                                errors={[]}
                            />
                            <ContentHeader
                                title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
                                borderClass="border-none"
                            />
                            <ul class="flex w-full flex-col gap-2.5">
                                <li>
                                    <Radio
                                        aria-describedby="in25Km"
                                        class="p-3"
                                        disabled
                                        bind:group={paymentRates}
                                        value={1}>Dalam Jarak 25KM</Radio
                                    >
                                    <Helper id="in25Km" class="ps-9"
                                        >Potongan ITP 75% dan Potongan COLA 50%</Helper
                                    >
                                </li>

                                <li>
                                    <Radio
                                        aria-describedby="moreThan25Km"
                                        class="p-3"
                                        disabled
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
                                        disabled
                                        bind:group={paymentRates}
                                        value={3}
                                        >Gred Jawatan Melebihi Kategori Kuarters</Radio
                                    >
                                    <Helper
                                        id="betterGradeForKuarters"
                                        class="ps-9"
                                        >Potongan ITP mengikut nilai sewaan gred
                                        tertinggi kuarters yang diperuntukkan
                                        (RM):</Helper
                                    >

                                    <div class="w-[220px] ps-9">
                                        <CustomTextField
                                            label=""
                                            id=""
                                            type="number"
                                            disabled
                                            val={350}
                                        />
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </CustomTabContent>
                    <CustomTabContent title="Maklumat Pengeluaran">
                        <form
                            class="flex w-full flex-col justify-start gap-2.5"
                            id=""
                            method="POST"
                        >
                            <ContentHeader
                                title="Butiran Keluar Kuarter"
                                borderClass="border-none"
                            />

                            <CustomTextField
                                label="Tarikh Keluar Kuarter"
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
                        </form>
                    </CustomTabContent>
                </CustomTab>
            </StepperContentBody>
        </StepperContent>
        {/if}
    </Stepper>
</section>
