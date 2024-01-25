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

    return {
        sponsorshipLookup,
        educationLookup,
        institutionLookup,
        countryLookup,
        majorMinorLookup,
    };
};
