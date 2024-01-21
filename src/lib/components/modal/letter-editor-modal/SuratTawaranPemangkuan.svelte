<script lang="ts">
    import {
        receiverReference,
        senderReference,
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
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import IncrementButton from '$lib/components/buttons/IncrementButton.svelte';

    export let letterTitle: string = 'Surat Penangguhan Rayuan';

    let letterTemplate = mockLetterTemplates;
    export let modalOpen: boolean = false;
    let previewLetter: boolean = false;

    //TO BE REVIEWED : any :
    let previewReceiverReference: string | undefined;
    let previewSenderReference: string | undefined;
    let previewLetterDate: string;
    let previewReceiverInfo: string;
    let previewSubject: string | undefined = '';
    let previewBody: string | undefined;
    let previewFooter: string | undefined;
    let previewReceiverTitle: string | undefined;
    let previewHeader: string | undefined;
    let dateOfLetter: Date;
    let listOfReceiver: string[] = [];
    let referenceNumber: string = '123456789';

    //Binding for the letter editor
    mockLetterTemplates.map((value, i) => {
        if (letterTitle.includes(value.id)) {
            receiverReference.set(referenceNumber);
            senderReference.set(letterTemplate[i].senderReference);
            receiverTitle.set(letterTemplate[i].receiverTitle);
            letterSubject.set(letterTemplate[i].letterSubject);
            letterBody.set(letterTemplate[i].letterBody);
            letterFooter.set(letterTemplate[i].letterFooter);
        }
    });

    const updateLetter = () => {
        previewReceiverReference =
            document.getElementById('receiver-reference')?.innerHTML;
        previewSenderReference =
            document.getElementById('sender-reference')?.innerHTML;

        let tempDate = new Date(dateOfLetter);
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
            previewBody;

        previewFooter = '<br>' + previewFooter;

        const sentLetter = [
            {
                receiver: listOfReceiver,
                letterHeader: previewHeader,
            },
            {
                letterBody: previewBody,
            },
            {
                letterFooter: previewFooter,
            },
        ];

        // ============================= TODO: post sentLetter to api =============================
        console.log(sentLetter);
    };

    // update list of receiver via dropdown
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

    // removed selected receiver via onclick button
    const popSelected = (data: string) => {
        let tempSelected = listOfReceiver;
        tempSelected = tempSelected.filter((item) => item !== data);
        console.log(tempSelected);
        listOfReceiver = tempSelected;
    };
</script>

<Modal title={letterTitle} bind:open={modalOpen} size="lg">
    <form class="flex h-fit flex-col space-y-6">
        <div class="flex w-full flex-row justify-end">
            <div class="flex flex-row gap-2">
                <TextIconButton
                    label="Selesai"
                    primary
                    onClick={() =>{ updateLetter();previewLetter = !previewLetter;}}
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
                    bind:value={dateOfLetter}
                    type="date"
                    class="border-1 active:border-1 flex h-8 w-[200px] flex-row items-center rounded-[3px]
                    border-bdr-primary text-sm text-txt-primary hover:border-system-primary
                    focus:border-system-primary"
                />
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
                    {#each listOfReceiver as item}
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
        {#if previewLetter}
            <div id="letterPreview" class="p-7">
                <div
                    class="flex flex-col justify-end"
                    style="align-items: end; text-align: right;"
                >
                    {@html previewHeader}
                </div>
                {@html previewBody}
                {@html previewFooter}
            </div>
        {/if}
    </form>
</Modal>
