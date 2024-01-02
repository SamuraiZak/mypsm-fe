<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { onMount } from 'svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { goto } from '$app/navigation';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import { Badge, Radio } from 'flowbite-svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';

    export let disabled: boolean = true;
    let target: any;
    let appealMeetingResult: string = 'pass';
    let kadarBayaran = '3';

    onMount(() => {
        target = document.getElementById('hello');
    });

    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    const appealMeetingOptions: RadioOption[] = [
        {
            value: 'pass',
            label: 'Lulus',
        },
        {
            value: 'fail',
            label: 'Tidak Lulus',
        },
    ];

    const applicantTypeOptions: RadioOption[] = [
        {
            value: 'kakitanganLkim',
            label: 'Kakitangan LKIM',
        },
        {
            value: 'agensiJabatanLuar',
            label: 'Agensi / Jabatan Luar',
        },
    ];
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat Permohonan Masuk Kuarter K234312"
        description="Hal-hal berkaitan menguruskan kuarters kakitangan LKIM"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/pengarah-bahagian-negeri/pinjaman/permohonan-kuarters');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Jenis Permohonan"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <RadioSingle
                        options={applicantTypeOptions}
                        legend="Jenis Pemohon"
                        disabled
                    />
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="fullName"
                        label={'Nama Penuh'}
                        value={'Ismail Bin Ismadi'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="idNumber"
                        label={'No. K/P'}
                        value={'121212-12-1212'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="employeeId"
                        label={'No. Pekerja'}
                        value={'K231'}
                    ></TextField>
                    <TextField
                        {disabled}
                        id="phoneNumber"
                        label={'No. Telefon'}
                        value={'011-2222222'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="mailAddress"
                        label={'Alamat Surat Menyurat'}
                        value={'No1, Lorong A'}
                    ></LongTextField>
                    <TextField
                        {disabled}
                        id="status"
                        label={'Status'}
                        value={'Berkahwin'}
                    ></TextField>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Penempatan Kuarter"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DateSelector
                    {handleDateChange}
                    label={'Tarikh Masuk Kuarter'}
                    {disabled}
                />
                <TextField
                    {disabled}
                    id="unitAndQuarter"
                    label={'Unit Dan Kuarter'}
                    value={'Unit 5 Kuarter 10'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Kadar Bayaran Sewa Kuarters (Unit Pengurusan Fasiliti)"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div class="flex flex-col gap-5">
                    <ul
                        class="bg-white dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800"
                    >
                        <li>
                            <Radio
                                class="p-1"
                                bind:group={kadarBayaran}
                                value="1"
                            >
                                <div
                                    class="flex flex-col pl-2 text-sm {kadarBayaran ==
                                    '1'
                                        ? 'text-txt-primary'
                                        : 'text-txt-tertiary'}"
                                >
                                    <p>
                                        Simpan Balik Kes Kepada JKTT untuk
                                        Dipertimbangkan Semula
                                    </p>
                                </div></Radio
                            >
                        </li>
                        <li>
                            <Radio
                                class="p-1"
                                bind:group={kadarBayaran}
                                value="2"
                            >
                                <div
                                    class="flex flex-col pl-2 text-sm {kadarBayaran ==
                                    '2'
                                        ? 'text-txt-primary'
                                        : 'text-txt-tertiary'}"
                                >
                                    <p>Mengesahkan Keputusan JKTT</p>
                                </div></Radio
                            >
                        </li>
                        <li>
                            <Radio
                                class="p-1"
                                bind:group={kadarBayaran}
                                value="3"
                            >
                                <div
                                    class="flex flex-col pl-2 text-sm {kadarBayaran ==
                                    '3'
                                        ? 'text-txt-primary'
                                        : 'text-txt-tertiary'}"
                                >
                                    <p>
                                        Mengesahkan Keputusan JKTT Tetapi
                                        Mengubah Kepada Hukuman Yang Lebih
                                        Ringan
                                    </p>
                                </div></Radio
                            >
                        </li>
                        <li>
                            <Radio
                                class="p-1"
                                bind:group={kadarBayaran}
                                value="4"
                            >
                                <div
                                    class="flex flex-col pl-2 text-sm {kadarBayaran ==
                                    '4'
                                        ? 'text-txt-primary'
                                        : 'text-txt-tertiary'}"
                                >
                                    <p>Mengakas dan Membebaskan</p>
                                </div></Radio
                            >
                        </li>
                    </ul>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Butiran Masuk Kuarter"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DateSelector
                    {disabled}
                    {handleDateChange}
                    label={'Tarikh Keluar Kuarter'}
                />
                <TextField
                    {disabled}
                    id="unitAndQuarter"
                    label={'Unit Dan Kuarter'}
                    value={'Uni 5 Kuarter 10'}
                ></TextField>
                <p
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm text-system-accent"
                >
                    Borang Pemeriksaan Keluar Kuarters:
                </p>
                <ul
                    class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                >
                    <li>
                        <DownloadAttachment
                            fileName="Surat Keluar Kuarter.pdf"
                        />
                    </li>
                </ul>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Daripada Peranan-Peranan Lain"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm text-system-accent"
                >
                    ● Keputusan akan dihantar ke email klinik dan Urus Setia
                    berkaitan
                </p>
                <LongTextField
                    disabled={true}
                    id="supporter-remark"
                    label="Tindakan/Ulasan"
                    value=""
                ></LongTextField>
                <RadioSingle
                    disabled={true}
                    options={appealMeetingOptions}
                    legend={''}
                    bind:userSelected={appealMeetingResult}
                ></RadioSingle>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Daripada Peranan-Peranan Lain"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto(
                        '/pengarah-bahagian-negeri/pinjaman/permohonan-kuarters',
                    );
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody
            ><div
                class="flex h-fit w-full flex-col items-start justify-start gap-2"
            >
                <p class="text-sm font-bold">Urus Setia Pengurusan Fasiliti</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <TextField
                        disabled
                        label="Nama"
                        placeholder="-"
                        value="Mat Irdam bin Inu"
                    />
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm text-system-accent"
                    >
                        ● Menunggu keputusan daripada PENGARAH BAHAGIAN/NEGERI..
                    </p>
                </div>
            </div>

            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Peringkat Negeri</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Senah Binti Ismail'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Layak'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SAH</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
