import jsPDF from 'jspdf';

// async function generatePDF<ContentType>(title: string, content: ContentType) {}

async function generatePDF<ContentType>(title: string, content: ContentType) {
    //Convert HTML to PDF
    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'A4' });

//     const sourceHTML = `
//     <div class="text-center w-full">
//     <p> ${title}</p>
//     <div
//     contenteditable="true"
//     bind:innerHTML={content}
//   ></div>
// `;

    // =====USING JSPDF TABLE - WIP=====
    // const dataArray: { [key: string]: string }[] = Object.entries(
    //     content as object[],
    // ).map(([key, value]) => ({
    //     [key.toString()]: value.toString(),
    // }));

    // doc.table(10, 10, dataArray, ['1'], { printHeaders: true });

    // doc.output('pdfobjectnewwindow', { filename: 'a4.pdf' });

    doc.html(content as HTMLElement, {
        html2canvas: {
            scale: 0.5,
        },
        callback: function (doc) {
            doc.setFont('Inter', 'normal');
            doc.output('pdfobjectnewwindow', { filename: 'a4.pdf' });
            doc.close();
        },
        margin: [30, 20, 20, 20],
        autoPaging: true,
    });
}

export default generatePDF;
