export function translate(key: string) {
    return (
        dictionary[key] ||
        key
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .replace(/\b\w/g, (c) => c.toUpperCase())
    );
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currYear = currentYear;
const nextYear = currYear + 1;

const dictionary: { [key: string]: string } = {
    username: 'Nama Pengguna',
    password: 'Kata Laluan',

    age: 'Umur',

    //application
    id: 'ID',
    type: 'Jenis',
    completionStatus: 'Status Penamatan',
    applicationDate: 'Tarikh Mohon',

    //candidates
    birthStateId: 'No. Tempat Lahir',
    raceId: 'No. Bangsa',
    religionId: 'No. Agama',
    mailStateId: 'No. Negeri Surat Menyurat',
    homeStateId: 'No. Negeri Rumah',
    name: 'Nama',
    alternativeName: 'Nama Lain',
    isMalaysian: 'Warganegara',
    identityDocumentType: 'Jenis Kad Pengenalan',
    email: 'Emel',
    marital: 'Status',
    gender: 'Jantina',
    homeNumber: 'Telefon (R)',
    mobileNumber: 'Telefon (P)',
    birthDate: 'Tarikh Lahir',
    birthPlace: 'Tempat Lahir',
    isExPoliceOrSoldier: '',
    homeAddress: 'Alamat Rumah',
    mailAddress: 'Alamat Surat Menyurat',
    mailPostcode: 'Poskod Surat Menyurat',
    mailCity: 'Bandar Surat Menyurat',

    //currentService
    employeeId: 'ID. Kakitangan',
    positionId: 'No. Jawatan',
    gradeId: 'No. Gred',
    serviceTypeId: 'No. Jenis Servis',
    serviceGroupId: 'No. Kumpulan Servis',
    unitId: 'No. Unit',
    salaryId: 'No. Gaji',
    roleId: 'No. ',
    firstServiceDate: 'Tarikh Mula Servis',
    currentServiceDate: 'Tarikh Servis Semasa',
    placement: 'Penempatan',
    officeNumber: 'No. Tel. Pejabat',
    employmentStatusId: 'No. Status Pekerjaan',

    //employeeDependants
    relationship: 'Hubungan',
    marriageDate: 'Tarikh Kahwin',
    inSchool: 'Masih Bersekolah',

    //employeeDocumentLists
    documentName: '',
    documentPath: '',

    //employeeEducations
    instituteName: 'Nama Tempat Pengajian',
    course: '',
    completionYear: 'Tarikh Tamat',
    finalGrade: 'CGPA',
    remark: 'Ulasan',

    //employeeExperience
    stateId: 'ID Negeri',
    position: 'Jawatan',
    company: 'Syarikat',
    address: 'Alamat',
    city: 'Bandar',
    postcode: 'Poskod',
    country: 'Negara',
    startDate: 'Tarikh Mula',
    endDate: 'Tarikh Tamat',
    responsibilities: 'Tanggungjawab',
    grade: 'Gred',
    salary: 'Gaji',

    //employeeNextOfKins
    taxNumber: 'No. Cukai,',
    isLKIMStaff: '',
    companyAddress: 'Alamat Syarikat',

    //employeePartner

    //employees
    employeeNumber: 'No. Pekerja',

    //employmentActingPositions
    currentServiceID: 'No. Servis Semasa',
    interviewAble: '',
    duration: 'Tempoh Masa',
    dueDate: 'Tarikh Tamat Tempoh',

    //employmentContracts
    currentServiceId: 'No. Servis Semasa',

    //employmentPensions
    retiredDate: 'Tarikh Bersara',
    phoneNumber: 'Telefon (P)',
    EPFwithdrawDate: 'Tarikh Pengeluaran EPF',
    withdrawDate: 'Tarikh Pengeluaran',

    //employmentPositionHistories
    departmentId: 'ID Jabatan',
    status: 'Status',

    //exchange
    date: 'Tarikh',
    reason: 'Alasan',
    alternativeReason: 'Alasan Lain',
    workplaceDistance: '',
    currentDivisionsStartDate: '',
    isVerified: '',
    verificationDate: '',
    isCertified: '',
    certifierName: 'Nama Pengesah',
    certifierPosition: 'Jawatan Pengesah',
    certificationResult: 'Keputusan Pengesahan',
    certifierRemarks: 'Ulasan Pengesah',

    //lookupDepartments
    active: 'aktif',

    //lookupDistricts
    divisionId: 'No. ',

    //lookupDivisions
    //lookupEmploymentStatus
    //lookupGrades
    //lookupPositions
    //lookupRaces
    //lookupReligions
    //lookupRoles
    //lookupSections
    //lookupServiceGroups
    //lookupServiceTypes
    //lookupStates
    //lookupUnits
    sectionId: 'No. Bahagian',

    //recruitement
    candidateId: 'No. Calon',
    temporaryEmployeeId: 'No. Pekerja Sementara',
    formLink: '',
    isFormCompleted: '',
    isProcessCompleted: '',

    //profil
    idColor: 'Warna Kad Pengenalan',
    housingArea: 'Perumahan',
    housingLoan: 'Pinjaman Perumahan',
    transportationLoan: 'Pinjaman Kenderaan',
    relationshipWithLKIMStaff: 'Perhubungan Dengan Kakitangan LKIM',
    currentGrade: 'Gred Semasa',
    KWSPid: 'No. KWSP',
    SOCSOid: 'No. SOCSO',
    taxId: 'No. Cukai',
    bank: 'Bank',
    accountNo: 'No. Akaun',
    program: 'Program',
    leaveEntitlement: 'Cuti Diperuntukkan',
    pensionScheme: 'Skim Pencen',
    KGTmonth: 'Bulan KGT',
    retirementDate: 'Tarikh Bersara',
    netSalary: 'Gaji Pokok',
    effectiveDate: 'Tarikh Berkuatkuasa',
    school: 'Sekolah',
    year: 'Tahun',
    CGPA: 'CGPA',
    field: 'Bidang',
    notes: 'Catatan',
    employerName: 'Nama Majikan',
    employerAddress: 'Alamat Majikan',
    positionCode: 'Kod Jawatan',
    lengthOfService: 'Tempoh Perkhidmatan',
    heirName: 'Nama Waris',
    relationshipWithHeir: 'Hubungan Dengan Waris',
    agendaType: 'Jenis Agenda',
    action: 'Tindakan',
    actions: 'Tindakan',
    allowance: 'Elaun-Elaun',
    allergies: 'Alahan',
    diabetes: 'Kencing Manis',
    highBloodPressure: 'Darah Tinggi',
    heartOrBloodVessels: 'Jantung atau Salur Darah',
    asthma: 'Asma',
    kidneyDisease: 'SAkit Buah Pinggang',
    cancer: 'Barah',
    tuberculosis: 'Batuk Kering',
    drugAddict: 'Ketagihan Dadah',
    AIDSHIV: 'AIDS, HIV',
    hepatitisB: 'Hepatitis B',
    surgicalHistory: 'Sejarah Pembedahan',
    smoking: 'merokok',
    otherSeriousDisease: 'Penyakit Serius Lain',
    stillReceivingTreatment: 'Sedang Menerima Rawatan',
    height: 'Tinggi',
    weight: 'Berat',
    BMI: 'BMI',
    pulse: 'Denyutan Nadi',
    BP: 'BP',
    paleSkin: 'Kulit Pucat',
    cyanosis: 'Sianosis',
    edema: 'Edema',
    jaundice: 'Penyakit Kuning',
    LymphNode: 'Kelenjar Limfa',
    skinDisease: 'Penyakit Kulit',
    colorVIsion: 'Penglihatan Warna',
    fundoscopy: 'Funduskopi',
    ear: 'Telinga',
    dentalCavityAndMouth: 'Rongga Gigi dan Mulut',
    neck: 'Leher',
    cardiovascular: 'Kardiovaskular',
    checkup: 'Pemeriksaan',
    xRay: 'X-ray',
    xRayPickupDate: 'Tarikh Pengambilan X-ray',
    xRayPickupLocation: 'Lokasi Pengambilan X-ray',
    xRayReferenceNumber: 'Nombor Rujukan X-ray',
    abdomenAndHernia: 'Abdomen dan Hernia',
    nervousSystemAndMentalState: 'Sistem Saraf dan Keadaan Mental',
    musculoskeletalSystem: 'Sistem Muskuloskeletal',
    sugar: 'Gula',
    albumen: 'Albumin',
    microscopy: 'Mikroskopi',
    supportingDocument: 'Dokumen Sokongan',
    contractStartDate: 'Tarikh Mula Kontrak',
    contractEndDate: 'Tarikh Tamat Kontrak',
    contractDuration: 'Tempoh Kontrak',
    wageRates: 'Kadar Upah',
    location: 'Penempatan',
    jobTitle: 'Gelaran Tugas',
    reportDutyDate: 'Tarikh Lapor Diri',

    // retirement
    earlyRetirementApplicationDate: 'Tarikh Permohonan Bersara Awal',
    retirementType: 'Jenis Persaraan',
    earlyRetirementDate: 'Tarikh Bersara Awal',

    //perjawatan
    staffId: 'No. Pekerja',
    staff: 'Kakitangan',
    employeeName: 'Nama Kakitangan',
    category: 'Kategori',
    currentPosition: 'Jawatan Semasa',
    offerDate: 'Tarikh Tawaran',
    newGrade: 'Gred Baharu',
    newPlacement: 'Penempatan Baru',
    currentPlacement: 'Penempatan Sekarang',
    applicantID: 'No. Pemohon',
    applicantName: 'Nama Pemohon',
    applicantType: 'Jenis Pemohon',
    applicationType: 'Jenis Permohonan',
    applicationResult: 'Keputusan Permohonan',
    staffName: 'Nama Kakitangan',
    scheme: 'Skim',
    positionName: 'Nama Jawatan',
    workAllowancePosition: 'Jawatan yang Ditanggung Kerja',
    workAllowancePlacement: 'Penempatan yang Ditanggung kerja',
    result: 'Keputusan',
    peperiksaanPerkhidmatanKursusInduksi:
        'Peperiksaan Perkhidmatan/Kursus Induksi',

    //cuti
    gcrToBeCollected: 'GCR Untuk Dikumpul',
    idNumber: 'No. Kad Pengenalan',
    leaveType: 'Jenis Cuti',
    restLeave: 'Cuti Rehat',
    sickLeave: 'Cuti Sakit',
    annualLeaveReplacement: 'Gantian Cuti Rehat',
    maternityLeave: 'Cuti Bersalin',
    wifeMaternityLeave: 'Cuti Isteri Bersalin',
    bringForwardLeave: 'Cuti Dibawa Kehadapan',
    usedLeave: 'Cuti Yang Telah Diambil',
    leaveBalance: 'Baki Cuti',
    annualLeave: 'Cuti Tahunan',
    totalDays: 'Bilangan Hari',
    leaveTypeCode: 'Kod Jenis Cuti',
    leaveStatusCode: 'Kod Status Cuti',
    leaveStatusDate: 'Tarikh Status Cuti',
    totalLeaveDays: 'Jumlah Hari Cuti',
    leaveApproverIDNumber: 'No. KP Pelulus Cuti',
    totalAnnualLeave: 'Jumlah Cuti Rehat Tahunan',
    annualLeaveBalance: 'Baki Cuti Rehat Tahunan',
    laeveBalance: 'Baki Cuti Rehat',
    group: 'Kumpulan',
    verification: 'Pengesahan',
    hrmisIdLeave: 'ID Cuti HRMIS',
    validDate: 'Tarikh Sah',
    totalGcrDays: 'Jumlah Hari GCR',
    withdrawalType: 'Jenis Pengeluaran',
    cashAward: 'Award Wang Tunai (RM)',
    leavePeriod: 'Tempoh Cuti',

    //elaun-elaun perkhidmatan
    total: 'Jumlah',
    allowanceType: 'Jenis Elaun',

    //integriti
    meetingName: 'Nama Mesyuarat',
    meetingResult: 'Keputusan Mesyuarat',
    totalSurcharge: 'Jumlah Surcaj',
    surchargePaymentPeriod: 'Tempoh Bayaran Surcaj',

    //kenaikan pangkat
    groupId: 'Kumpulan',
    candidateAmount: 'Jumlah Calon',
    assetDeclaration: 'Pengisytiharan Harta',
    academicLoanPledge: 'Akuan Pinjaman Pendidikan/Institusi',
    integritySecretariatCertification: 'Perakuan Urus Setia Integriti',
    districtOrStateDirectorCertification: 'Perakuan Pengarah Bahagian / Negeri',
    enforcedDate: 'Tarikh Kuatkuasa',
    currentSalary: 'Gaji Semasa',
    newSalary: 'Gaji Baru (RM)',
    remarks: 'Catatan',
    secretariatConfirmation: 'Pengesahan Urus Setia',
    supporterSupport: 'Sokongan Penyokong',
    approverApproval: 'Kelulusan Pelulus',
    employeeProfile: 'Profil Kakitangan (CV)',

    //pergerakan gaji
    officerName: 'Nama Pegawai',
    gradeNumber: 'Gred',
    tpg: 'TPG',
    kgt: 'KGT',
    currentYearSalary: 'Gaji ' + currYear,
    currentCountyAllowance: 'EW ' + currYear,
    criticalAllowance: 'EL Kritikal (5%) ' + currYear,
    nextYearSalary: 'Gaji ' + nextYear,
    nextYearCountyAllowance: 'EW ' + nextYear,
    nextYearCriticalAllowance: 'EL Kritikal (5%) ' + nextYear,
    specialKGT: 'KGT Khas',
    specialSalary: 'Gaji Khas',
    specialCountyAllowance: 'EW Khas',
    specialAid: 'Bantuan Khas',
    ssmComputerSalaryCode: 'Kod Gaji Komputer SSM',
    salaryGrade: 'Gred Gaji',
    minimumSalary: 'Gaji Minimum',
    maximumSalary: 'Gaji Maksimum',
    yearlySalaryIncrementRate: 'Kadar Kenaikan Gaji Tahunan',

    //Gaji & Elaun
    leaveCode: 'Kod Jenis Cuti',
    leaveApplicationDate: 'Tarikh Mohon Cuti',
    leaveStartDate: 'Tarikh Mula Cuti',
    leaveEndDate: 'Tarikh Aklhir Cuti',
    leaveReason: 'Tujuan Cuti',
    leaveStatus: 'Status Cuti',
    leaveAmount: 'Jumlah Hari Cuti',
    actingAllowance: 'Elaun Memangku',

    //Elaun Perkhidmatan
    amount: 'Jumlah',
    approvedDate: 'Tarikh Lulus',
    typeOfLoan: 'Jenis Pinjaman',
    isOccupied: 'Sedang Didiami',
    typeOfRequest: 'Jenis Permohonan',

    //Pinjaman dan Kuarters
    loanStartDate: 'Tarikh Mula Pinjaman',
    loanEndDate: 'Tarikh Tamat Pinjaman',
    quartersEntryDate: 'Tarikh Masuk Kuarter',
    unitAndQuarter: 'Unit Dan Kuarter',
    loanType: 'Jenis Pinjaman',
    startLoanDate: 'Tarikh Mula Pinjaman',
    endLoanDate: 'Tarikh Tamat Pinjaman',
    approvedLoan: 'Kelulusan Pinjaman',

    // Add more dictionary here...
    LNPT: 'LNPT',
    noOfDependents: 'Bilangan Tanggungan',

    // Property name
    ulasan: 'Tindakan/Ulasan',
    butirButirPerubahanAtauLainLainHalMengenaiPegawai:
        'Butir-butir perubahan atau lain-lain hal mengenai pegawai',
    namaJawatanPeringkatDanAtauKelas:
        'Nama, jawatan, peringkat dan/ atau kelas',
    berpencenTakBerpencenPeruntukanTerbuka:
        'Berpencen, tak berpencen, Peruntukan Terbuka',
    butirButirPujianTeguranAtauTindakanUlasanTatatertib:
        'Butir-butir Pujian, Teguran atau Tindakan/Ulasan Tatatertib',
    cutiYangTelahDiambil: 'Cuti Yang Telah Diambil (Hari)',
    bakiCuti: 'Baki Cuti (Hari)',
    halHalLain: 'Hal-hal Lain',
    applicationPurpose: 'Tujuan Permohonan',

    // Perubatan
    clinicCode: 'Kod Klinik',
    clinicName: 'Nama Klinik',
    state: 'Negeri',
    appointedDate: 'Tarikh Dilantik',
    period: 'Tempoh (Tahun)',
    overallClaimTotal: 'Jumlah Tuntutan Keseluruhan (RM)',
    overallClaimCurrentYear: 'Jumlah Tuntutan (RM)/Tahun Semasa',
    overallClaim: 'Jumlah Tuntutan (RM)',
    entitledBalance: 'Baki Peruntukan (RM)',
    totalToBePaid: 'Jumlah Yang Perlu Dibayar (RM)',
    totalPayment: 'Jumlah Bayaran (RM)',
    paymentMethod: 'Cara Pembayaran',
    claimTotal: 'Jumlah (RM)',
    patientName: 'Nama Pesakit',
    treatment: 'Rawatan',
    totalClaimed: 'Jumlah Kesuluruhan Tuntutan (RM)',
    dependentCount: "Bilangan Tanggungan",
    identityCardNumber: "No. Kad Pengenalan",
    ICNumber: "No. Kad Pengenalan",
    identityCard: "No. Kad Pengenalan",
    claimAmount: "Jumlah Tuntutan (RM)",
    allocationBalance: "Baki Tuntutan (RM)",
    totalClaim: "Jumlah Tuntutan (RM)",
    claim: "Tuntutan (RM)",
    totalClaims: "Jumlah Tuntutan (RM)",
    totalCovered: "Jumlah Ditanggung (RM)",
    totalNotCovered: "Jumlah Tidak Ditanggung (RM)",
    district: "Daerah",
    panelAppointedDate: "Tarikh Mula Pelantikkan",
    panelContractEndDate: "Tarikh Tamat Pelantikkan",
    totalToPay: "Jumlah Perlu Dibayar(RM)",
    paymentType: "Jenis Bayaran",
    totalAllocated: "Jumlah Peruntukkan (RM)",
    allocationRemainder: "Baki Peruntukkan (RM)",
    amountToPay: "Jumlah Perlu Dibayar (RM)",
    totalAllocation: "Jumlah Peruntukkan (RM)",
    totalSuccessfulClaims: "Jumlah Tuntutan Berjaya (RM)",
    remainderAllocation: "Baki Peruntukkan (RM)",
    treatmentDate: "Tarikh Rawatan",


    // PDP
    disciplinaryReview: 'Tapisan Tatatertib',
    firstAppointedPositionOnBoard: 'Jawatan Pertama Dilantik Di Lembaga',
    appointDate: 'Tarikh Lantikan',

    // Audit
    usernameId: 'No. Pengguna',
    module: 'Modul',
    subModule: 'Sub-Modul',
    setemMasa: 'Setem Masa',

    // Confirmation In Service
    identityDocumentNumber: 'No. Kad Pengenalan',
    firstPositionAppointedInInstitution: 'Jawatan Pertama Dilantik Di Lembaga',
    dateOfEmployement: 'Tarikh Lantikan Semasa',
    inductionCourseServiceExamination:
        'Perperiksaan Perkhidmatan Kursus Induksi',

    // apc
    employeeIdentityNo: 'No. Kad Pengenalan',
    excellenceAwardYear: 'Tahun APC',

    //
    joinDate: 'Tarik penyertaan',
    description: 'Nota',
    birthCountry: 'Negara Kelahiran',
    birthState: 'Negeri Kelahiran',
    educationLevel: 'Taraf Pendidikan',
    race: 'Bangsa',
    nationality: 'Kewarganegaraan',
    identityDocumentColor: 'Warna KP',
    workAddress: 'Alamat Majikan',
    workPostcode: 'Poskod Majikan',

    //
    month: 'Bulan',
    baseSalary: 'Gaji Pokok',

    // cuti
    leaveId: 'Id Permohonan',
    leaveFrom: 'Tarikh Mula Cuti',
    leaveTo: 'Tarikh Tamat Cuti',
    leaveTotal: 'Jumlah Hari Cuti',
    submittedOn: 'Tarikh Permohonan',
    entitlement: 'Peruntukan',
    carryForward: 'Baki Bawa Kehadapan',
    used: 'Diambil',
    balance: 'Baki',

    //kontrak
    candidateName: 'Nama Calon',
    temporaryId: 'Id Sementara',
    identityCardNo: 'No. Kad Pengenalan',
    startContract: 'Tarikh Mula Kontrak',
    endContract: 'Tarikh Tamat Kontrak',
    Remark: 'Ulasan',

    // lookup
    ssmCode: 'Kod SSM',
    annualIncrementRate: 'Kenaikan Gaji Tahunan',

    // surcaj
    surchargeId: "Surcaj ID",
    employeeNo: "No Pekerja",
    meetingDate: "Tarikh Mesyuarat",
    surchargeAmount: "Jumlah Surcaj (RM)",
    paymentPeriod: "Tempoh Bayaran Balik (Bulan)",
    gradeCode: "Gred",

    // salary
    salaryMovementMonth: "Bulan Pergerakan Gaji",
    specialRaiseType: "Jenis Kenaikan Khas",
    specialRaise: "Kenaikan Khas (RM)",
    employeeGrade: "Gred",
    wilayahAllowance1: "Elaun Wilayah 1",
    wilayahAllowance2: "Elaun Wilayah 2",
    criticalAllowance1: "Elaun Kritikal 1",
    criticalAllowance2: "Elaun Kritikal 2",
    specialWilayahAllowance: "EW Khas",
    specialkgt: "KGT Khas",
    salary1: "Gaji Lama",
    salary2: "Gaji Baru",
    salaryMovementDate: "Tarikh Pergerakan Gaji",
    salaryDeduction: "Tolakan Gaji (RM)",
    code: "Kod",
    totalLeave: "Jumlah Cuti (Hari)",
    fromDate: "Dari",
    toDate: "Hingga",
    Payment: "Pembayaran",
    Loan: "Pinjaman",


    //pemangkuan
    candidateCount: "Jumlah Calon",
    actingType: "Jenis Pemangkuan",

    //kenaikan pangkat
    promotionType: "Jenis Kenaikan Pangkat",

    firstYear: "Tahun Pertama",
    secondYear: "Tahun Kedua",
    thirdYear: "Tahun Ketiga",
    average: 'Jumlah Markah'
};
