/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockCalonPemangkuanList } from '$lib/mocks/perjawatan/pemangkuan/senaraiCalonPemangkuan';
import { mockPemangkuanList } from '$lib/mocks/perjawatan/pemangkuan/senaraiRekodPemangkuan';
import { writable, type Writable } from 'svelte/store';

const initPemangkuanList: Pemangkuan[] = mockPemangkuanList;
export const storePemangkuanList: Writable<Pemangkuan[]> =
    writable(initPemangkuanList);

const initCalonPemangkuanList: CalonPemangkuan[] = mockCalonPemangkuanList;
export const storeCalonPemangkuanList: Writable<CalonPemangkuan[]> = writable(
    initCalonPemangkuanList,
);

export const currentActingBatchId = writable();
