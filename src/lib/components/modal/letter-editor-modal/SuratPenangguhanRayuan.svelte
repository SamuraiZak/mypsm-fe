<script lang="ts">
    import { jsPDF } from 'jspdf';
    import {
        receiverReference,
        senderReference,
        letterDate,
        receiverTitle,
        letterSubject,
        letterBody,
        letterFooter,
    } from '$lib/stores/letter-templates/letterTemplates';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Badge, Modal } from 'flowbite-svelte';
    import RichTextEditor from '$lib/components/rich-text-ediitor/RichTextEditor.svelte';
    import { mockLetterTemplates } from '$lib/mocks/letters/mockLetterTemplates';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import IncrementButton from '$lib/components/buttons/IncrementButton.svelte';
    import { list } from 'postcss';

    export let referenceNumber = '123456789';
    export let dateOfLetter = '12 Disember 2021';

    let modalOpened = true;

    let letterTemplate = mockLetterTemplates;

    //TO BE REVIEWED : any :
    let sendToBE: object;
    let preview: string;
    let previewReceiverReference: string | undefined;
    let previewSenderReference: string | undefined;
    let previewLetterDate: string;
    let previewReceiverInfo: string;
    let previewSubject: any;
    let previewBody: string | undefined;
    let previewFooter: string | undefined;
    let previewReceiverTitle: string | undefined;
    let pdfReadyLetter: string | undefined;
    let previewHeader: string | undefined;
    let docName: any;
    let time: Date;
    let listOfReceiver: string[] = [];

    //Binding for the letter editor
    receiverReference.set(referenceNumber);
    senderReference.set(letterTemplate[0].senderReference);
    letterDate.set(dateOfLetter);
    receiverTitle.set(letterTemplate[0].receiverTitle);
    letterSubject.set(letterTemplate[0].letterSubject);
    letterBody.set(letterTemplate[0].letterBody);
    letterFooter.set(letterTemplate[0].letterFooter);

    const updateLetter = () => {
        docName = document.getElementById('letter-subject')?.innerText;
        previewReceiverReference =
            document.getElementById('receiver-reference')?.innerHTML;
        previewSenderReference =
            document.getElementById('sender-reference')?.innerHTML;

        let tempDate = new Date(time);
        previewLetterDate = tempDate.toLocaleDateString('ms', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        previewReceiverTitle =
            document.getElementById('receiver-title')?.innerHTML;
        previewSubject = document.getElementById('letter-subject')?.innerHTML;
        previewBody = document.getElementById('letter-body')?.innerHTML;
        previewFooter = document.getElementById('letter-footer')?.innerHTML;
        pdfReadyLetter = document.getElementById('letterPreview')?.innerHTML;

        previewHeader =
            'Ruj. Tuan/Puan: ' +
            previewReceiverReference +
            '<br>' +
            'Ruj. Kami: ' +
            previewSenderReference +
            '<br>' +
            'Tarikh: ' +
            '&emsp;' +
            previewLetterDate +
            '<br>';
        previewBody =
            '<br>' +
            '<br>' +
            previewReceiverTitle +
            previewSubject +
            previewBody ;

        previewFooter = 
        '<br>' +
            previewFooter;

            const sentLetter = [{
                receiver: listOfReceiver,
                letterHeader: previewHeader,
            },
            {
                letterBody: previewBody
            },
            {
                letterFooter: previewFooter
            }
        ]

        // ============================= TODO: post sentLetter to api =============================
        console.log(sentLetter)
    };
    const updateReceiver = () => {
        if (previewReceiverInfo !== '') {
            if (!listOfReceiver.includes(previewReceiverInfo)) {
                listOfReceiver = [...listOfReceiver, previewReceiverInfo];
            } else {
                alert(
                    previewReceiverInfo +
                        ' telah dimasukkan dalam senarai penerima surat.',
                );
            }
            previewReceiverInfo = '';
        }
    };

    const popSelected = (data: string) => {
        let tempSelected = listOfReceiver;
        tempSelected = tempSelected.filter((item) => item !== data);
        console.log(tempSelected);
        listOfReceiver = tempSelected;
    };
</script>

<Modal title="Surat Penangguhan Pertukaran" bind:open={modalOpened} size="lg">
    <form class="flex h-fit flex-col space-y-6">
        <div class="flex w-full flex-row justify-end">
            <div class="flex flex-row gap-2">
                <TextIconButton
                    label="Selesai"
                    primary
                    onClick={() => updateLetter()}
                >
                    <SvgArrowRight />
                </TextIconButton>
            </div>
        </div>

        <div class="flex w-full flex-col gap-2">
            <TextField
                id="receiver-reference"
                label="Ruj. Tuan/Puan:"
                labelType="right-justify-end"
                bind:value={$receiverReference}
            ></TextField>
            <TextField
                id="sender-reference"
                label="Ruj. Kami:"
                labelType="right-justify-end"
                bind:value={$senderReference}
            ></TextField>

            <div class="flex w-full flex-row items-center justify-end gap-2">
                <div class="justify-endflex flex-row">
                    <label
                        for="letter-date"
                        class="justify-end text-sm font-medium text-txt-primary"
                    >
                        Tarikh:
                    </label>
                    <div class="h-fit w-[100px]" />
                </div>
                <input
                    type="date"
                    class="border-1 active:border-1 flex h-8 w-[200px] flex-row items-center rounded-[3px]
                    border-bdr-primary text-sm text-txt-primary hover:border-system-primary
                    focus:border-system-primary"
                >
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-sm font-semibold text-txt-primary">Kepala Surat:</p>
            <DropdownSelect
                id="receiver-info"
                dropdownType="label-left-full"
                options={[
                    {
                        value: '1077',
                        name: 'Mohd Irfan bin Ali (1077)',
                    },
                    { value: '1092', name: 'Lebron James (1092)' },
                    {
                        value: '1072',
                        name: 'Jon Doe (1072)',
                    },
                    {
                        value: '1122',
                        name: 'Ali Bin Abu (1122)',
                    },
                ]}
                label="Penerima Surat: "
                bind:value={previewReceiverInfo}
                onSelect={updateReceiver}
            ></DropdownSelect>
            <div class="flex w-full flex-row items-center justify-between">
                <label
                    for="list-of-receiver"
                    class="block w-[220px] min-w-[220px] text-[11px] font-medium text-txt-primary"
                >
                    Senarai Penerima (No. Pekerja):
                </label>
                <div class="w-full gap-2 text-[12px] text-txt-primary">
                    {#each listOfReceiver as item, i}
                        <Badge border color="primary">
                            <IncrementButton
                                type="minus"
                                onClick={() => popSelected(item)}
                            />
                            &nbsp;{item}</Badge
                        >
                    {/each}
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <p class="text-sm font-semibold text-txt-primary">Badan Surat:</p>
            <TextField
                labelType="editable-div"
                id="receiver-title"
                label="Panggilan Hormat Penerima:"
                bind:value={$receiverTitle}
            ></TextField>
            <TextField
                labelType="editable-div"
                id="letter-subject"
                boldLabel={true}
                label="Perkara:"
                bind:value={$letterSubject}
            ></TextField>
            <RichTextEditor
                id="letter-body"
                label="Isi-isi:"
                bind:value={$letterBody}
            ></RichTextEditor>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-sm font-semibold text-txt-primary">Pengaki Surat:</p>

            <RichTextEditor
                id="letter-footer"
                label="Nama & Tandatangan Pengirim:"
                bind:value={$letterFooter}
            ></RichTextEditor>
        </div>
    </form>
</Modal>
