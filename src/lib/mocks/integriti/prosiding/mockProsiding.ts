export const mockCharges: IntCharges = {
    1: {
        title: 'Menyalah guna peruntukan yang diberi',
    },
    2: {
        title: 'Kecuaian semasa menjalankan tinjauan modal',
    },
};

export const mockProsiding: IntProsiding[] = [
    {
        id: '1',
        employeeNumber: '00001',
        officerName: 'Ali bin Ahmad',
        identityDocumentNumber: '990909-13-5076',
        gred: 'W19',
        position: 'Penolong Pegawai Teknologi Maklumat',
        placement: 'BHG. Teknologi Maklumat',
        disciplinaryProceedingType: 'charges',
        chargesMeetingDate: '2023-01-15',
        chargesMeetingNumber: '2',
        chargesMeetingName:
            'Jawatankuasa Tatatertib Dengan Tujuan Buang Kerja Atau Turun Pangkat',
        charges: mockCharges,
        proceedingMeetingDate: '2023-02-01',
        proceedingMeetingNumber: '3',
        proceedingMeetingName: 'with-demotion',
        proceedingMeetingRemark: 'Remark about the proceeding meeting',
        proceedingMeetingResult: [
            {
                chargeName: mockCharges[1]?.title ?? '',
                meetingResult: 'guilty',
                punishments: {
                    1: {
                        punishmentNameWarning: 'punishmentWarning',
                        dateOfEffectWarning: '2023-02-01',
                    },
                    2: {
                        punishmentNamePenalty: 'punishmentPenalty',
                        emolumentDaysPenalty: '5',
                        dateOfEffectPenalty: '2023-03-01',
                    },
                },
            },
            {
                chargeName: mockCharges[2]?.title ?? '',
                meetingResult: 'guilty',
                punishments: {
                    1: {
                        punishmentNamePenalty: 'punishmentPenalty',
                        emolumentDaysPenalty: '5',
                        dateOfEffectPenalty: '2023-03-01',
                    },
                    2: {
                        punishmentNameEmolumentDeprivation:
                            'punishmentEmolumentDeprivation',
                        emolumentDaysEmolumentDeprivation: '8',
                        dateOfEffectEmolumentDeprivation: '2023-04-01',
                        depriveDatesEmolumentDeprivation: {
                            1: {
                                startDate: '2023-12-21',
                                endDate: '2023-12-25',
                                totalDays: 4,
                            },
                            2: {
                                startDate: '2023-09-01',
                                endDate: '2023-09-25',
                                totalDays: 24,
                            },
                        },
                    },
                },
            },
        ],
        declarationLetterReceived: true,
        status: 'Baru',
        isAppealed: true,
    },
    {
        id: '2',
        employeeNumber: '00002',
        officerName: 'Nur Afifah Farhan',
        identityDocumentNumber: '991129-13-6122',
        gred: 'W22',
        position: 'Pegawai Teknologi Maklumat',
        placement: 'BHG. Teknologi Maklumat',
        disciplinaryProceedingType: 'charges',
        chargesMeetingDate: '2023-02-20',
        chargesMeetingNumber: '4',
        chargesMeetingName:
            'Jawatankuasa Tatatertib Dengan Tujuan Buang Kerja Atau Turun Pangkat',
        charges: mockCharges,
        proceedingMeetingDate: '2023-03-10',
        proceedingMeetingNumber: '3',
        proceedingMeetingName: 'with-demotion',
        proceedingMeetingRemark: 'Remark about the proceeding meeting',
        proceedingMeetingResult: [
            {
                chargeName: mockCharges[1]?.title ?? '',
                meetingResult: 'innocent',
                punishments: {
                    1: {
                        punishmentNameEmolumentDeprivation:
                            'punishmentEmolumentDeprivation',
                        emolumentDaysEmolumentDeprivation: '5',
                        dateOfEffectEmolumentDeprivation: '2023-04-01',
                        depriveDatesEmolumentDeprivation: {
                            1: {
                                startDate: '2023-12-21',
                                endDate: '2023-12-25',
                                totalDays: 4,
                            },
                            2: {
                                startDate: '2023-09-01',
                                endDate: '2023-09-25',
                                totalDays: 24,
                            },
                        },
                    },
                },
            },
            {
                chargeName: mockCharges[1]?.title ?? '',
                meetingResult: 'guilty',
                punishments: {
                    1: {
                        punishmentNameEmolumentDeprivation:
                            'punishmentEmolumentDeprivation',
                        emolumentDaysEmolumentDeprivation: '8',
                        dateOfEffectEmolumentDeprivation: '2023-04-01',
                        depriveDatesEmolumentDeprivation: {
                            1: {
                                startDate: '2023-12-21',
                                endDate: '2023-12-25',
                                totalDays: 4,
                            },
                            2: {
                                startDate: '2023-09-01',
                                endDate: '2023-09-25',
                                totalDays: 24,
                            },
                        },
                    },
                },
            },
        ],
        declarationLetterReceived: false,
        status: 'BEBAS - Pengarah Integriti',
        isAppealed: false,
    },
    {
        id: '3',
        employeeNumber: '00001',
        officerName: 'Ali bin Ahmad',
        identityDocumentNumber: '990909-13-5076',
        gred: 'W19',
        position: 'Penolong Pegawai Teknologi Maklumat',
        placement: 'BHG. Teknologi Maklumat',
        disciplinaryProceedingType: 'suspension',
        chargesMeetingDate: '2023-03-25',
        chargesMeetingNumber: '3',
        chargesMeetingName:
            'Jawatankuasa Tatatertib Bukan Dengan Tujuan Buang Kerja Atau Turun Pangkat',
        charges: mockCharges,
        proceedingMeetingDate: '2023-04-15',
        proceedingMeetingNumber: '4',
        proceedingMeetingName: 'non-demotion',
        proceedingMeetingRemark: 'Remark about the proceeding meeting',
        proceedingMeetingResult: [
            {
                chargeName: mockCharges[1]?.title ?? '',
                meetingResult: 'guilty',
                punishments: {
                    1: {
                        punishmentNameDeductSalary: 'punishmentDeductSalary',
                        salaryMovementCountsDeductSalary: '2',
                        punishmentPeriodDeductSalary: '3',
                        dateOfEffectDeductSalary: '2023-05-01',
                        newKgtDateDeductSalary: '2023-08-01',
                    },
                },
            },
            {
                chargeName: mockCharges[1]?.title ?? '',
                meetingResult: 'guilty',
                punishments: {
                    1: {
                        punishmentNameDeductSalary: 'punishmentDeductSalary',
                        salaryMovementCountsDeductSalary: '2',
                        punishmentPeriodDeductSalary: '3 bulan',
                        dateOfEffectDeductSalary: '2023-05-01',
                        newKgtDateDeductSalary: '2023-08-01',
                    },
                },
            },
        ],
        declarationLetterReceived: true,
        status: 'Baru',
        isAppealed: false,
    },
    {
        id: '4',
        employeeNumber: '00001',
        officerName: 'Ali bin Ahmad',
        identityDocumentNumber: '990909-13-5076',
        gred: 'W19',
        position: 'Penolong Pegawai Teknologi Maklumat',
        placement: 'BHG. Teknologi Maklumat',
        disciplinaryProceedingType: 'suspension',
        chargesMeetingDate: '2023-03-25',
        chargesMeetingNumber: '3',
        chargesMeetingName:
            'Jawatankuasa Tatatertib Bukan Dengan Tujuan Buang Kerja Atau Turun Pangkat',
        charges: mockCharges,
        proceedingMeetingDate: '2023-04-15',
        proceedingMeetingNumber: '4',
        proceedingMeetingName: 'non-demotion',
        proceedingMeetingRemark: 'Remark about the proceeding meeting',
        proceedingMeetingResult: [
            {
                chargeName: mockCharges[1]?.title ?? '',
                meetingResult: 'guilty',
                punishments: {
                    1: {
                        punishmentNameDeductSalary: 'punishmentDeductSalary',
                        salaryMovementCountsDeductSalary: '2',
                        punishmentPeriodDeductSalary: '3',
                        dateOfEffectDeductSalary: '2023-05-01',
                        newKgtDateDeductSalary: '2023-08-01',
                    },
                },
            },
            {
                chargeName: mockCharges[1]?.title ?? '',
                meetingResult: 'guilty',
                punishments: {
                    1: {
                        punishmentNameDeductSalary: 'punishmentDeductSalary',
                        salaryMovementCountsDeductSalary: '2',
                        punishmentPeriodDeductSalary: '3 bulan',
                        dateOfEffectDeductSalary: '2023-05-01',
                        newKgtDateDeductSalary: '2023-08-01',
                    },
                },
            },
        ],
        declarationLetterReceived: true,
        status: 'BEBAS - Pengarah Integriti',
        isAppealed: false,
    },
];
