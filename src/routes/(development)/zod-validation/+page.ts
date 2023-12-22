import { error } from '@sveltejs/kit';

interface IDataTest {
    id: string;
    radioChosen: string;
    isAgreed: string;
    textInput: string;
    formDate: string;
    address: string;
}

const mockTest: IDataTest[] = [
    {
        id: 'string',
        radioChosen: '',
        isAgreed: '',
        textInput: 'EZ',
        formDate: '',
        address: 'GG!',
    },
];

export async function load() {
    const data: IDataTest[] = mockTest;

    const currentData: IDataTest | undefined = data.find(
        (mock) => mock.id === 'string',
    );

    if (!currentData) throw error(400, 'Error detected!');

    return {
        record: {
            data,
            currentData,
        },
    };
}
