import type { LookupCategoryDTO } from '$lib/dto/core/lookup/lookup-item.dto';

export class LookupCategoryConstant {
    public static banks: LookupCategoryDTO = {
        name: 'Bank',
        url: 'lookup/banks',
    };
    
    public static city: LookupCategoryDTO = {
        name: 'Bandar',
        url: 'lookup/cities',
    };
    
    public static country: LookupCategoryDTO = {
        name: 'Negara',
        url: 'lookup/countries',
    };
    
    public static department: LookupCategoryDTO = {
        name: 'Jabatan',
        url: 'service_lookup/departments',
    };
    
    public static district: LookupCategoryDTO = {
        name: 'Daerah',
        url: 'lookup/districts',
    };
    
    public static durationComputers: LookupCategoryDTO = {
        name: 'Tempoh Pinjaman Komputer',
        url: 'lookup/duration_computers',
    };
    
    public static durationVehicles: LookupCategoryDTO = {
        name: 'Tempoh Pinjaman Kereta',
        url: 'lookup/duration_vehicles',
    };
    
    public static employmentStatus: LookupCategoryDTO = {
        name: 'Status Pelantikan',
        url: 'service_lookup/employment_statuses',
    };
    
    public static ethnic: LookupCategoryDTO = {
        name: 'Etnik',
        url: 'lookup/ethnics',
    };
    
    public static examResult: LookupCategoryDTO = {
        name: 'Keputusan Peperiksaan',
        url: 'lookup/exam_results',
    };
    
    public static examType: LookupCategoryDTO = {
        name: 'Jenis Peperiksaan',
        url: 'lookup/exam_types',
    };
    
    public static gender: LookupCategoryDTO = {
        name: 'Jantina',
        url: 'lookup/genders',
    };
    
    public static grade: LookupCategoryDTO = {
        name: 'Gred Jawatan',
        url: 'service_lookup/grades',
    };
    
    public static highestEducation: LookupCategoryDTO = {
        name: 'Pendidikan Tertinggi',
        url: 'lookup/highest_educations',
    };
    
    public static institution: LookupCategoryDTO = {
        name: 'Institusi',
        url: 'lookup/institutions',
    };
    
    public static majorMinor: LookupCategoryDTO = {
        name: 'Jurusan Pendidikan',
        url: 'lookup/major_minors',
    };
    
    public static marital: LookupCategoryDTO = {
        name: 'Status Perkahwinan',
        url: 'lookup/maritals',
    };
    
    public static meetingType: LookupCategoryDTO = {
        name: 'Jenis Mesyuarat',
        url: 'simismismis',
    };
    
    public static nationality: LookupCategoryDTO = {
        name: 'Kewarganegaraan',
        url: 'lookup/nationalities',
    };
    
    public static penaltyType: LookupCategoryDTO = {
        name: 'Jenis Penalti',
        url: 'lookup/penalty_types',
    };
    
    public static placement: LookupCategoryDTO = {
        name: 'Penempatan',
        url: 'service_lookup/placements',
    };
    
    public static position: LookupCategoryDTO = {
        name: 'Jawatan',
        url: 'service_lookup/positions',
    };
    
    public static proceedingType: LookupCategoryDTO = {
        name: 'Jenis Prosiding',
        url: 'lookup/proceeding_types',
    };
    
    public static programme: LookupCategoryDTO = {
        name: 'Program',
        url: 'service_lookup/programmes',
    };
    
    public static propertyDeclaration: LookupCategoryDTO = {
        name: 'Pengisytiharan Harta',
        url: 'lookup/property_declarations',
    };
    
    public static race: LookupCategoryDTO = {
        name: 'Bangsa',
        url: 'lookup/races',
    };
    
    public static refundMethod: LookupCategoryDTO = {
        name: 'Kaedah Bayaran Balik',
        url: 'lookup/refund_methods',
    };
    
    public static refundPeriod: LookupCategoryDTO = {
        name: 'Tempoh Bayaran Balik',
        url: 'lookup/refund_periods',
    };
    
    public static relationship: LookupCategoryDTO = {
        name: 'Hubungan',
        url: 'lookup/relationships',
    };
    
    public static religion: LookupCategoryDTO = {
        name: 'Agama',
        url: 'lookup/religions',
    };
    
    public static retirementType: LookupCategoryDTO = {
        name: 'Jenis Persaraan',
        url: 'lookup/retirement_types',
    };
    
    public static scheme: LookupCategoryDTO = {
        name: 'Skim',
        url: 'service_lookup/schemes',
    };
    
    public static section: LookupCategoryDTO = {
        name: 'Seksyen',
        url: 'service_lookup/sections',
    };
    
    public static sentenceType: LookupCategoryDTO = {
        name: 'Jenis Hukuman',
        url: 'lookup/sentence_types',
    };
    
    public static serviceGroup: LookupCategoryDTO = {
        name: 'Kumpulan Perkhidmatan',
        url: 'service_lookup/service_groups',
    };
    
    public static serviceType: LookupCategoryDTO = {
        name: 'Jenis Perkhidmatan',
        url: 'service_lookup/service_types',
    };
    
    public static sponsorship: LookupCategoryDTO = {
        name: 'Pembiayaan',
        url: 'lookup/sponsorships',
    };
    
    public static state: LookupCategoryDTO = {
        name: 'Negeri',
        url: 'lookup/states',
    };
    
    public static title: LookupCategoryDTO = {
        name: 'Gelaran',
        url: 'lookup/titles',
    };
    
    public static unit: LookupCategoryDTO = {
        name: 'Unit',
        url: 'service_lookup/units',
    };
    

    public static list: LookupCategoryDTO[] = [
        this.banks,
        this.city,
        this.country,
        this.department,
        this.district,
        this.durationComputers,
        this.durationVehicles,
        this.employmentStatus,
        this.ethnic,
        this.examResult,
        this.examType,
        this.gender,
        this.grade,
        this.highestEducation,
        this.institution,
        this.majorMinor,
        this.marital,
        this.meetingType,
        this.nationality,
        this.penaltyType,
        this.placement,
        this.position,
        this.proceedingType,
        this.programme,
        this.propertyDeclaration,
        this.race,
        this.refundMethod,
        this.refundPeriod,
        this.relationship,
        this.religion,
        this.retirementType,
        this.scheme,
        this.section,
        this.sentenceType,
        this.serviceGroup,
        this.serviceType,
        this.sponsorship,
        this.state,
        this.title,
        this.unit,
    ];
}
