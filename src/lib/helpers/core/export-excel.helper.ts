import { translate } from '$lib/config/dictionary';
import type { DictionaryDTO } from '$lib/dto/core/dictionary/dictionary.dto';
import type { TableDTO, TableSettingDTO } from '$lib/dto/core/table/table.dto';
import Excel from 'exceljs';
import path from 'path-browserify';

export class ExportHelper {
    static async toExcel(
        sheetName: string,
        data: TableDTO,
        dictionary: DictionaryDTO[],
    ) {
        // create new workbook
        const workbook = new Excel.Workbook();

        // create new sheet
        const worksheet = workbook.addWorksheet(sheetName);

        // define column header
        let columnHeaders: any = [{
            key: 'no',
            header: 'Number',
        }];

        let keys: string[] = [];

        if (data.printData != undefined) {
            keys = Object.keys(data.printData[0]);
        }

        keys.forEach((key) => {
            let columnName = '';

            let tempColumnName = dictionary.find((item) => item.english == key)
                ?.malay;

            if (tempColumnName != undefined) {
                columnName = tempColumnName;
            } else {
                columnName = translate(key);
            }

            let tempColumn = {
                key: key,
                header: columnName,
            };

            if (!data.hiddenData?.includes(key)) {
                columnHeaders.push(tempColumn);
            }
        });

        worksheet.columns = columnHeaders;

        if (data.printData != undefined) {
            data.printData.forEach((item, index) => {
                const tempItem = [index + 1, ...Object.values(item)];
                worksheet.addRow(item);
            });
        }

        // const exportPath = path.resolve(__dirname, sheetName + '.xlsx');

        // await workbook.xlsx.writeFile(exportPath);

        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = sheetName + '.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    }

    static async excel(
        sheetName: string,
        data: TableSettingDTO,
        dictionary: DictionaryDTO[],
    ) {
        // create new workbook
        const workbook = new Excel.Workbook();

        // create new sheet
        const worksheet = workbook.addWorksheet(sheetName);

        // define column header
        let columnHeaders: any = [];

        let keys: string[] = [];

        if (data.exportData != undefined) {
            keys = Object.keys(data.exportData[0]);
        }

        keys.forEach((key) => {
            let columnName = '';

            let tempColumnName = dictionary.find((item) => item.english == key)
                ?.malay;

            if (tempColumnName != undefined) {
                columnName = tempColumnName;
            } else {
                columnName = translate(key);
            }

            let tempColumn = {
                key: key,
                header: columnName,
            };

            if (!data.hiddenColumn?.includes(key)) {
                columnHeaders.push(tempColumn);
            }
        });

        worksheet.columns = columnHeaders;

        if (data.exportData != undefined) {
            data.exportData.forEach((item) => {
                worksheet.addRow(item);
            });
        }

        // const exportPath = path.resolve(__dirname, sheetName + '.xlsx');

        // await workbook.xlsx.writeFile(exportPath);

        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = sheetName + '.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    }
}
