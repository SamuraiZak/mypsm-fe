import puppeteer from 'puppeteer';

export class PuppeteerService {
    // undefined error
    static async generatePDF<ContentType>(title: string, content: ContentType) {
        const tableContent = `
    <title> ::-p-text(${title})</title>
    <table border="1">
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
        <th>Column 4</th>
        </tr>
        ::-p-text(${content})
        content.forEach((row) => {
            <tr>
            <td>{row.column1}</td>
            <td>{row.column2}</td>
            <td>{row.column3}</td>
            <td>{row.column4}</td>
            </tr>
            {/each}
            </table>
  `;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(
            tableContent ?? 'div ::-p-text(My name is Calvin)',
        );
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            margin: { top: 1, right: 1, bottom: 1, left: 1 },
        });

        await browser.close();

        console.log(pdf);

        return 0;
    }
}
