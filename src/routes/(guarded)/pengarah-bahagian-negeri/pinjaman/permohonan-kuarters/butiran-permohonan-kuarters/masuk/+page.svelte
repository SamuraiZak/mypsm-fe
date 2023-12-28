<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { onMount } from 'svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { senaraiPeperiksaanPerkhidmatan } from '$lib/mocks/urus-setia/pengesahan/pengesahan-lantikan-ke-gred/senarai-peperiksaan-perkhidmatan';
    import { tapisanTatatertib } from '$lib/mocks/pengarah-bahagian-negeri/pengesahan/tapisan-tatatertib';
    import { goto } from '$app/navigation';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import SvgPdf from '$lib/assets/svg/SvgPDF.svelte';
    import { Badge, Tooltip } from 'flowbite-svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';

    export let disabled: boolean = true;
    export let selectedFiles: any = [];
    let target: any;
    let appealMeetingResult: string = 'pass';

    onMount(() => {
        target = document.getElementById('hello');
    });

    function handleOnChange() {
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }
    }
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
    }

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

    let radioValue: any = 'ya';

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

    const decisionOptions: RadioOption[] = [
        {
            value: 'sah',
            label: 'Sah',
        },
        {
            value: 'tidakSah',
            label: 'Tidak Sah',
        },
    ];

    const perakukanOptions: RadioOption[] = [
        {
            value: 'perakukan',
            label: 'Perakukan',
        },
        {
            value: 'tidakPerakukan',
            label: 'Tidak Perakukan',
        },
    ];

    function currencyFormatter(amount: number) {
        const formatter = new Intl.NumberFormat('ms-MY', {
            style: 'currency',
            currency: 'MYR',
        });
        return formatter.format(Number(amount)).toString();
    }
    let tooltipContent: string = '';
    const itkaTooltip: string = 'ITKA bermaksud ...';
    const itpTooltip: string = 'ITP bermaksud ...';
    const epwTooltip: string = 'EPW bermaksud ...';
    const colaTooltip: string = 'COLA bermaksud ...';
    // function to assign the content  of the tooltip
    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id.split('-')[1];

            switch (eventName) {
                case 'itka':
                    tooltipContent = itkaTooltip;
                    break;
                case 'itp':
                    tooltipContent = itpTooltip;
                    break;
                case 'epw':
                    tooltipContent = epwTooltip;
                    break;
                case 'cola':
                    tooltipContent = colaTooltip;
                    break;
                default:
                    tooltipContent = 'no tooltip available';
            }
        }
    }
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
            ><div class="flex w-full flex-col gap-2"></div></StepperContentBody
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
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
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
                    class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
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
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
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
