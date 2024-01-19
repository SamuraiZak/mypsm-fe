<script lang="ts">
    import { jsPDF } from 'jspdf';
    import {
        receiverReference,
        senderReference,
        letterDate,
        receiverNameAddress,
        receiverTitle,
        letterSubject,
        letterBody,
        letterFooter,
    } from '$lib/stores/letter-templates/letterTemplates';
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Button, Input, Modal, P } from 'flowbite-svelte';
    import { letterTypes } from '$lib/mocks/letters/letterTypes';
    import { afterUpdate, onMount } from 'svelte';
    import RichTextEditor from '$lib/components/rich-text-ediitor/RichTextEditor.svelte';
    import { mockLetterTemplates } from '$lib/mocks/letters/mockLetterTemplates';
    import ExportButton from '$lib/components/buttons/ExportButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { list } from 'postcss';

    export let referenceNumber = '123456789';
    export let dateOfLetter = '12 Disember 2021';

    let justB = 'justify-between';
    let justE = 'justify-end';

    function openModal() {
        modalOpened = !modalOpened;
    }

    interface Person {
        id: number[]
    }

    let modalOpened = true;
    let showPreview = false;

    let selectedValue: any = 'Sila Pilih';

    let letterTemplate = mockLetterTemplates;

    //TO BE REVIEWED : any :
    let sendToBE: Object;
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
    let selectedSelect: string | undefined;
    let time: Date;
    let listOfReceiver: string[] = ['user1'];
    //Binding for the letter editor
    receiverReference.set(referenceNumber);
    senderReference.set(letterTemplate[0].senderReference);
    letterDate.set(dateOfLetter);
    // receiverNameAddress.set(letterTemplate[0].receiverNameAddress);
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
        // previewLetterDate = document.getElementById('letter-date')?.innerHTML;

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
        preview =
            '<br>' +
            listOfReceiver +
            '<br>' +
            '<br>' +
            previewReceiverTitle +
            previewSubject +
            previewBody +
            previewFooter;

        console.log(previewHeader + preview);
    };

    //Convert HTML to PDF
    function htmlToPDF(fileName: string) {
        var doc = new jsPDF('p', 'in', 'letter');

        //HTML source
        var sourceHTML = document.getElementById(
            'letterPreview',
        ) as HTMLElement;

        doc.html(sourceHTML, {
            html2canvas: {
                scale: 0.01,
            },
            callback: function (doc) {
                fileName = fileName.trim();
                doc.save(fileName + '.pdf');
            },
        });
    }
    //Convert HTML to Word
    function htmlToWord(fileName: string) {
        var header =
            "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        var footer = '</body></html>';
        var sourceHTML =
            header +
            document.getElementById('letterPreview')?.innerHTML +
            footer;

        var source =
            'data:application/vnd.ms-word;charset=utf-8,' +
            encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement('a');
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileName = fileName.trim();
        fileDownload.download = fileName + '.doc';
        console.log(fileName);
        fileDownload.click();
        document.body.removeChild(fileDownload);
    }

    function updateReceiver() {
        if (listOfReceiver.includes('user1')) {
            listOfReceiver.pop();
        }
        listOfReceiver.push(previewReceiverInfo);
        console.log(listOfReceiver);
    }
</script>

<!-- <div class="flex h-screen w-full flex-col items-center justify-center gap-10">
    <Button color="red" on:click={openModal}>OPEN MODAL</Button>
</div> -->

<Modal
    title={showPreview
        ? 'Pratonton Surat yang akan Dicetak'
        : 'Pengubahsuaian Surat yang akan Dicetak'}
    bind:open={modalOpened}
    on:close={() => {
        modalOpened = false;
        selectedValue = 'Sila Pilih';
    }}
    size="lg"
>
    <form class="flex h-fit flex-col space-y-6" action="submit">
        <div class="flex w-full flex-row {showPreview ? justE : justB}">
            {#if showPreview === false}
                <DropdownField
                    label="Jenis Surat"
                    bind:value={selectedValue}
                    id="dropdown"
                    dropdownType="label-left"
                    options={letterTypes}
                />
            {/if}
            {#if selectedValue !== 'Sila Pilih'}
                <div class="flex flex-row gap-2">
                    {#if showPreview === false}
                        <FormButton
                            type="next"
                            onClick={() => {
                                updateLetter();
                                showPreview = true;
                            }}
                        ></FormButton>
                    {:else}
                        <div class="flex flex-row items-end gap-1.5">
                            <FormButton
                                type="back"
                                onClick={() => {
                                    showPreview = false;
                                }}
                            ></FormButton>
                            <ExportButton
                                exportType="word"
                                onClick={() => {
                                    htmlToWord(docName);
                                    modalOpened = false;
                                    showPreview = false;
                                }}
                            ></ExportButton>
                            <ExportButton
                                exportType="pdf"
                                onClick={() => {
                                    htmlToPDF(docName);
                                    modalOpened = false;
                                    showPreview = false;
                                }}
                            ></ExportButton>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>

        {#if selectedValue === '1'}
            {#if showPreview === false}
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
                    <!-- <TextField
                        id="letter-date"
                        label="Tarikh:"
                        labelType="right-justify-end"
                        bind:value={$letterDate}
                    ></TextField> -->

                    <DateSelector
                        name="letter-date"
                        label="Tarikh: "
                        bind:selectedDate={time}
                    ></DateSelector>
                </div>
                <div class="flex flex-col gap-2">
                    <p class="text-sm font-semibold text-txt-primary">
                        Kepala Surat:
                    </p>
                    <!-- <RichTextEditor
                        id="receiver-info"
                        label="Nama & Alamat Penerima:"
                        bind:value={$receiverNameAddress}
                    ></RichTextEditor> -->
                    <DropdownSelect
                        id="receiver-info"
                        dropdownType="label-left-full"
                        options={[
                            {
                                value: '1077',
                                name: 'Mohd Irfan bin Ali',
                            },
                            { value: '1092', name: 'Lebron James' },
                            {
                                value: '1072',
                                name: 'Jon Doe',
                            },
                            {
                                value: '1122',
                                name: 'Ali Bin Abu',
                            },
                        ]}
                        label="Nama Penerima: "
                        bind:value={previewReceiverInfo}
                        onSelect={updateReceiver}
                    ></DropdownSelect>
                </div>

                <div class="flex flex-col gap-2">
                    <p class="text-sm font-semibold text-txt-primary">
                        Badan Surat:
                    </p>
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
                    <p class="text-sm font-semibold text-txt-primary">
                        Pengaki Surat:
                    </p>

                    <RichTextEditor
                        id="letter-footer"
                        label="Nama & Tandatangan Pengirim:"
                        bind:value={$letterFooter}
                    ></RichTextEditor>
                </div>
            {:else}
                <div id="letterPreview" class="p-7">
                    <div
                        class="flex flex-col justify-end"
                        style="align-items: end; text-align: right;"
                    >
                        {@html previewHeader}
                    </div>
                    {@html preview}
                </div>
            {/if}
        {/if}
    </form>
</Modal>
