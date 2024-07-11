export class PrintHelper {
    static handleExportPDF(elementId: string) {
        try {
            const parentElement = document.getElementById(elementId) as HTMLFormElement | HTMLDivElement;
            
            // To include the hidden div content
            const hiddenDivs = Array.from(parentElement.querySelectorAll('div.hidden'));    
            hiddenDivs.forEach((hiddenDiv) => {
                (hiddenDiv as HTMLElement).style.display = 'block'; // Temporarily make hidden div visible to get its content
            });           

            if (parentElement) {
                const elements = Array.from(parentElement.querySelectorAll('input, select')) as (HTMLInputElement | HTMLSelectElement)[];
                elements.forEach((elem) => {
                    if (elem instanceof HTMLInputElement) {
                        if (elem.type === 'radio') {
                            if (elem.checked) {
                                elem.setAttribute('checked', 'checked');
                            } else {
                                elem.removeAttribute('checked');
                            }
                        } else {
                            elem.setAttribute('value', elem.value); //type number/text/date
                        }
                    } else if (elem instanceof HTMLSelectElement) {
                        const selectedOptions = document.querySelectorAll('option:checked');
                        selectedOptions.forEach((option) => {
                            if (option instanceof HTMLOptionElement) {
                                option.setAttribute('selected', '');
                            }
                        });
                    }
                });
            }

            
            let printWindow = window.open('', 'PRINT');

            printWindow?.document.write(document.documentElement.innerHTML);

            setTimeout(() => {
                // Needed for large documents
                printWindow!.document.body.style.margin = '0 0';
                printWindow!.document.body.innerHTML = parentElement!.outerHTML;
                printWindow!.document.close(); // necessary for IE >= 10
                printWindow!.focus(); // necessary for IE >= 10*/
                printWindow!.print();
                printWindow!.close();

                hiddenDivs.forEach((hiddenDiv) => {
                    (hiddenDiv as HTMLElement).style.display = 'none'; // rehide the div after getting its content
                });
            }, 500);
            
        } catch (error) {
            throw new Error('Something went wrong');
        }
    }
}