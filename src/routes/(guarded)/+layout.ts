import type { DropdownOptionsInterface } from '$lib/interfaces/common/dropdown-option';
import { LookupService } from '$lib/services/implementations/core/lookup/lookup.services';

export const load = async () => {
    // sponsorship list
    const sponsorshipListResponse =
        await LookupService.getEnumSponsorshipList();

    const sponsorshipLookup: DropdownOptionsInterface[] =
        sponsorshipListResponse.data.sponsorships.map((sponsor) => ({
            value: Number(sponsor.id),
            name: sponsor.description,
        }));

    // education list
    const educationListResponse = await LookupService.getEnumEducationList();

    const educationLookup: DropdownOptionsInterface[] =
        educationListResponse.data.highestEducationLevels.map((education) => ({
            value: Number(education.id),
            name: education.description,
        }));

    // institution list
    const institutionListResponse =
        await LookupService.getEnumInstitutionList();

    const institutionLookup: DropdownOptionsInterface[] =
        institutionListResponse.data.institutions.map((institution) => ({
            value: Number(institution.id),
            name: institution.description,
        }));

    // country list
    const countryListResponse = await LookupService.getEnumCountryList();

    const countryLookup: DropdownOptionsInterface[] =
        countryListResponse.data.countries.map((country) => ({
            value: Number(country.id),
            name: country.description,
        }));

    // major minor list
    const majorMinorListResponse = await LookupService.getEnumMajorMinorList();

    const majorMinorLookup: DropdownOptionsInterface[] =
        majorMinorListResponse.data.majorMinors.map((majorMinor) => ({
            value: Number(majorMinor.id),
            name: majorMinor.description,
        }));

    // state list
    const stateListResponse = await LookupService.getEnumStateList();

    const stateLookup: DropdownOptionsInterface[] =
        stateListResponse.data.states.map((state) => ({
            value: Number(state.id),
            name: state.description,
        }));
    // relationship list
    const relationshipListResponse =
        await LookupService.getEnumRelationshipList();

    const relationshipLookup: DropdownOptionsInterface[] =
        relationshipListResponse.data.relationships.map((relationship) => ({
            value: Number(relationship.id),
            name: relationship.description,
        }));

    // race list
    const raceListResponse = await LookupService.getEnumRaceList();

    const raceLookup: DropdownOptionsInterface[] =
        raceListResponse.data.races.map((race) => ({
            value: Number(race.id),
            name: race.description,
        }));

    // nationality list
    const nationalityListResponse =
        await LookupService.getEnumNationalityList();

    const nationalityLookup: DropdownOptionsInterface[] =
        nationalityListResponse.data.nationalities.map((nationality) => ({
            value: Number(nationality.id),
            name: nationality.description,
        }));
    // marital list
    const maritalListResponse = await LookupService.getEnumMaritalList();

    const maritalLookup: DropdownOptionsInterface[] =
        maritalListResponse.data.maritalStatus.map((marital) => ({
            value: Number(marital.id),
            name: marital.description,
        }));

    // gender list
    const genderListResponse = await LookupService.getEnumGenderList();

    const genderLookup: DropdownOptionsInterface[] =
        genderListResponse.data.genders.map((gender) => ({
            value: Number(gender.id),
            name: gender.description,
        }));

    const identityCardColorLookup: DropdownOptionsInterface[] = [
        { value: 'blue', name: 'Biru' },
        { value: 'grey', name: 'Kelabu' },
        { value: 'red', name: 'Merah' },
        { value: 'green', name: 'Hijau' },
    ];

    const monthStringLookup: DropdownOptionsInterface[] = [
        { value: 'January', name: 'Januari' },
        { value: 'February', name: 'Februari' },
        { value: 'March', name: 'Mac' },
        { value: 'April', name: 'April' },
        { value: 'May', name: 'Mei' },
        { value: 'June', name: 'Jun' },
        { value: 'July', name: 'Julai' },
        { value: 'August', name: 'Ogos' },
        { value: 'September', name: 'September' },
        { value: 'October', name: 'Oktober' },
        { value: 'November', name: 'November' },
        { value: 'December', name: 'Disember' },
    ];

    return {
        sponsorshipLookup,
        educationLookup,
        institutionLookup,
        countryLookup,
        majorMinorLookup,
        stateLookup,
        relationshipLookup,
        raceLookup,
        nationalityLookup,
        maritalLookup,
        genderLookup,
        identityCardColorLookup,
        monthStringLookup,
    };
};
