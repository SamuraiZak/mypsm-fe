export class PrintHelper {
    static handleExportPDF(elementId: string) {
        try {

            let printElement = document.getElementById(elementId);
            console.log(printElement)
            let printWindow = window.open('', 'PRINT');
            printWindow?.document.write(document.documentElement.innerHTML);
            setTimeout(() => {
                // Needed for large documents
                printWindow!.document.body.style.margin = '0 0';
                printWindow!.document.body.innerHTML = printElement!.outerHTML;
                printWindow!.document.close(); // necessary for IE >= 10
                printWindow!.focus(); // necessary for IE >= 10*/
                printWindow!.print();
                printWindow!.close();
            }, 1000);

        } catch (error) {
            throw new Error('Something went wrong');
        }
    }
}