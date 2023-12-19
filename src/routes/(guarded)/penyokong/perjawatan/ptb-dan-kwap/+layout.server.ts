import { fetchPtbKwap } from '$lib/service/ptbAndKwap/services';

export async function load({ cookies }) {
    const fetchedData: PtbAndKwap[] = await fetchPtbKwap();

    const userId = cookies.get('userId');

    return {
        props: {
            lists: fetchedData.map((list) => ({
                noPekerja: list.noPekerja,
                namaPekerja: list.namaPekerja,
                noKadPengenalan: list.noKadPengenalan,
                kategori: list.kategori,
                tarikhMohon: list.tarikhMohon,
                status: 'KEMASKINI',
                tindakanUlasan: list.tindakanUlasan,
            })),
        },
        userId,
    };
}
