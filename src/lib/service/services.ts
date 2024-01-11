/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockEmployees } from '$lib/mocks/database/mockEmployees';

export function sayhello() {
    console.log('hello');
}

// get list of employeess
// parameters: keys: the columns you want to include
export function getEmployeeList(keys: string[]) {
    let data: Record<string, any>[] = mockEmployees;
    let rawKeys = Object.keys(data[0]);

    if (keys.length > 0) {
        data.forEach((element) => {
            rawKeys.forEach((item) => {
                if (!keys.includes(item)) {
                    delete element[item];
                }
            });
        });

        return data;
    } else {
        return data;
    }
}

export function currencyFormatter(amount: number) {
    let noAmount = '-';
    if (amount !== 0 || undefined) {
        const formatter = new Intl.NumberFormat('ms-MY', {
            style: 'currency',
            currency: 'MYR',
        });
        return formatter.format(Number(amount)).toString();
    } else {
        return noAmount;
    }
}
