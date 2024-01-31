import { TextHelper } from '$lib/helper/core/text-helper/text-helper';
import type { DropdownOptionsInterface } from '$lib/interfaces/common/dropdown-option';
import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
import { LookupService } from '$lib/services/implementations/core/lookup/lookup.services';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import type { EnumRole, EnumRoleResponseViewModel } from '$lib/view-models/core/lookup/role/role-enum-reponse.view-model';
import type { RoleOption } from '$lib/view-models/core/role-option/role-option.view-model';
import type { EmployeesListResponseViewModel } from '$lib/view-models/mypsm/employee/employee-list-response';

export const load = async () => {
    // agency group list
    const agencyGroupsListResponse =
        await LookupService.getEnumAgencyGroupList();

    const agencyGroupsLookup: DropdownOptionsInterface[] =
        agencyGroupsListResponse.data.agencyGroups.map((agency) => ({
            value: Number(agency.id),
            name: agency.description,
        }));

    // list of asset declaration status
    const assetDeclarationStatusResponse =
        await LookupService.getEnumAssetDeclarationStatus();

    const assetDeclarationLookup: DropdownOptionsInterface[] =
        assetDeclarationStatusResponse.data.assetDeclarationStatus.map(
            (asset) => ({
                value: Number(asset.id),
                name: asset.description,
            }),
        );

    // award list
    const awardListResponse = await LookupService.getEnumAwardList();

    const awardLookup: DropdownOptionsInterface[] =
        awardListResponse.data.awards.map((awards) => ({
            value: Number(awards.id),
            name: awards.description,
        }));

    // award category list
    const awardListCategoryResponse =
        await LookupService.getEnumAwardCategoryList();

    const awardCategoryLookup: DropdownOptionsInterface[] =
        awardListCategoryResponse.data.awardCategories.map(
            (awardCategories) => ({
                value: Number(awardCategories.id),
                name: awardCategories.description,
            }),
        );

    // city list
    const cityListResponse = await LookupService.getEnumCityList();

    const cityLookup: DropdownOptionsInterface[] =
        cityListResponse.data.cities.map((city) => ({
            value: Number(city.id),
            name: city.description,
        }));

    // country list
    const countryListResponse = await LookupService.getEnumCountryList();

    const countryLookup: DropdownOptionsInterface[] =
        countryListResponse.data.countries.map((country) => ({
            value: Number(country.id),
            name: country.description,
        }));

    // department list
    const departmentListResponse = await LookupService.getEnumDepartmentList();

    const departmentLookup: DropdownOptionsInterface[] =
        departmentListResponse.data.departments.map((department) => ({
            value: Number(department.id),
            name: department.name,
        }));

    // district list
    const districtListResponse = await LookupService.getEnumDistrictList();

    const districtLookup: DropdownOptionsInterface[] =
        districtListResponse.data.districts.map((district) => ({
            value: Number(district.id),
            name: district.name,
        }));

    // division list
    const divisionListResponse = await LookupService.getEnumDivisionList();

    const divisionLookup: DropdownOptionsInterface[] =
        divisionListResponse.data.divisions.map((division) => ({
            value: Number(division.id),
            name: division.name,
        }));

    // employment status list
    const employmentStatusListResponse =
        await LookupService.getEnumEmploymentStatusList();

    const empoymentStatusLookup: DropdownOptionsInterface[] =
        employmentStatusListResponse.data.employmentStatus.map(
            (employment) => ({
                value: Number(employment.id),
                name: employment.occSectorName,
            }),
        );

    // ethnicity list
    const ethnicityListResponse = await LookupService.getEnumEthnicityList();

    const ethnicityLookup: DropdownOptionsInterface[] =
        ethnicityListResponse.data.ethnicities.map((ethnicity) => ({
            value: Number(ethnicity.id),
            name: ethnicity.description,
        }));

    // gender list
    const genderListResponse = await LookupService.getEnumGenderList();

    const genderLookup: DropdownOptionsInterface[] =
        genderListResponse.data.genders.map((gender) => ({
            value: Number(gender.id),
            name: gender.description,
        }));

    // grade list
    const gradeListResponse = await LookupService.getEnumGradeList();

    const gradeLookup: DropdownOptionsInterface[] =
        gradeListResponse.data.grades.map((grade) => ({
            value: Number(grade.id),
            name: grade.name,
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

    // major minor list
    const majorMinorListResponse = await LookupService.getEnumMajorMinorList();

    const majorMinorLookup: DropdownOptionsInterface[] =
        majorMinorListResponse.data.majorMinors.map((majorMinor) => ({
            value: Number(majorMinor.id),
            name: majorMinor.description,
        }));

    // marital list
    const maritalListResponse = await LookupService.getEnumMaritalList();

    const maritalLookup: DropdownOptionsInterface[] =
        maritalListResponse.data.maritalStatus.map((marital) => ({
            value: Number(marital.id),
            name: marital.description,
        }));

    // nationality list
    const nationalityListResponse =
        await LookupService.getEnumNationalityList();

    const nationalityLookup: DropdownOptionsInterface[] =
        nationalityListResponse.data.nationalities.map((nationality) => ({
            value: Number(nationality.id),
            name: nationality.description,
        }));

    // placement list
    const placementListResponse = await LookupService.getEnumPlacementList();

    const placementLookup: DropdownOptionsInterface[] =
        placementListResponse.data.placements.map((placements) => ({
            value: Number(placements.id),
            name: placements.name,
        }));

    // position list
    const positionResponse = await LookupService.getEnumPositionList();

    const positionLookup: DropdownOptionsInterface[] =
        positionResponse.data.positions.map((position) => ({
            value: Number(position.id),
            name: position.name,
        }));

    // race list
    const raceListResponse = await LookupService.getEnumRaceList();

    const raceLookup: DropdownOptionsInterface[] =
        raceListResponse.data.races.map((race) => ({
            value: Number(race.id),
            name: race.description,
        }));

    // relationship list
    const relationshipListResponse =
        await LookupService.getEnumRelationshipList();

    const relationshipLookup: DropdownOptionsInterface[] =
        relationshipListResponse.data.relationships.map((relationship) => ({
            value: Number(relationship.id),
            name: relationship.description,
        }));

    // religion list
    const religionListResponse = await LookupService.getEnumReligionList();

    const religionLookup: DropdownOptionsInterface[] =
        religionListResponse.data.religions.map((religions) => ({
            value: Number(religions.id),
            name: religions.description,
        }));

    // role list
    const roleListResponse = await LookupService.getEnumRoleList();

    const roleLookup: DropdownOptionsInterface[] =
        roleListResponse.data.rolesList.map((roles) => ({
            value: Number(roles.id),
            name: roles.name,
        }));

    // scheme of service list
    const schemeOfServiceListResponse =
        await LookupService.getEnumSchemeOfServiceList();

    const schemeOfServiceLookup: DropdownOptionsInterface[] =
        schemeOfServiceListResponse.data.schemeOfServices.map((scheme) => ({
            value: Number(scheme.id),
            name: scheme.description,
        }));

    // section list
    const sectionListResponse = await LookupService.getEnumSectionList();

    const sectionLookup: DropdownOptionsInterface[] =
        sectionListResponse.data.sections.map((section) => ({
            value: Number(section.id),
            name: section.name,
        }));

    // service class list
    const serviceClassListResponse =
        await LookupService.getEnumServiceClassList();

    const serviceClassLookup: DropdownOptionsInterface[] =
        serviceClassListResponse.data.serviceClass.map((service) => ({
            value: Number(service.id),
            name: service.description,
        }));

    // service group list
    const serviceGroupResponse = await LookupService.getEnumServiceGroupList();

    const serviceGroupLookup: DropdownOptionsInterface[] =
        serviceGroupResponse.data.serviceGroups.map((service) => ({
            value: Number(service.id),
            name: service.name,
        }));

    // service type list
    const serviceTypeListResponse =
        await LookupService.getEnumServiceTypeList();

    const serviceTypeLookup: DropdownOptionsInterface[] =
        serviceTypeListResponse.data.serviceTypes.map((service) => ({
            value: Number(service.id),
            name: service.name,
        }));

    // sponsorship list
    const sponsorshipListResponse =
        await LookupService.getEnumSponsorshipList();

    const sponsorshipLookup: DropdownOptionsInterface[] =
        sponsorshipListResponse.data.sponsorships.map((sponsor) => ({
            value: Number(sponsor.id),
            name: sponsor.description,
        }));

    // state list
    const stateListResponse = await LookupService.getEnumStateList();

    const stateLookup: DropdownOptionsInterface[] =
        stateListResponse.data.states.map((state) => ({
            value: Number(state.id),
            name: state.description,
        }));

    // title list
    const titleListResponse = await LookupService.getEnumTitleList();

    const titleLookup: DropdownOptionsInterface[] =
        titleListResponse.data.titles.map((title) => ({
            value: Number(title.id),
            name: title.description,
        }));

    // unit list
    const unitListResponse = await LookupService.getEnumUnitList();

    const unitLookup: DropdownOptionsInterface[] =
        unitListResponse.data.units.map((nit) => ({
            value: Number(nit.id),
            name: nit.name,
        }));

    const request: EmployeesListRequestViewModel = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'programme',
        orderType: 'asc',
        filter: {},
    };

    const employeeListResponse: EmployeesListResponseViewModel =
        await EmployeeService.getEmployeeList(request);

    const employeeListLookup: DropdownOptionsInterface[] =
        employeeListResponse.data.map((employee) => ({
            value: String(employee.employeeNumber),
            name: employee.employeeNumber,
        }));

    const identityCardColorLookup: DropdownOptionsInterface[] = [
        { value: 'blue', name: 'Biru' },
        { value: 'grey', name: 'Kelabu' },
        { value: 'red', name: 'Merah' },
        { value: 'green', name: 'Hijau' },
    ];

    const retirementBenefitLookup: DropdownOptionsInterface[] = [
        { value: 'KWSP', name: 'KWSP' },
        { value: 'PENCEN', name: 'Pencen' },
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

    // get role list
    const roleResponse: EnumRoleResponseViewModel =
        await AuthService.getRoleOptions();

    let roleOptions: EnumRole[] = roleResponse.data.rolesList;

    let rawRoleList: EnumRole[] = roleResponse.data.rolesList;

    let roleOptionsList: RoleOption[] = [];

    rawRoleList.forEach(role => {
        let tempRoleOption: RoleOption = {
            value: role.name,
            name: TextHelper.toCamelCase(role.name)
        }

        roleOptionsList.push(tempRoleOption);

        roleOptionsList = roleOptionsList;
    });

    return {
        roleOptionsList,
        agencyGroupsLookup,
        assetDeclarationLookup,
        awardLookup,
        awardCategoryLookup,
        cityLookup,
        countryLookup,
        departmentLookup,
        districtLookup,
        divisionLookup,
        educationLookup,
        empoymentStatusLookup,
        ethnicityLookup,
        sponsorshipLookup,
        institutionLookup,
        majorMinorLookup,
        stateLookup,
        relationshipLookup,
        raceLookup,
        nationalityLookup,
        maritalLookup,
        genderLookup,
        gradeLookup,
        religionLookup,
        roleLookup,
        schemeOfServiceLookup,
        sectionLookup,
        serviceClassLookup,
        serviceGroupLookup,
        serviceTypeLookup,
        titleLookup,
        placementLookup,
        positionLookup,
        unitLookup,
        employeeListResponse,
        employeeListLookup,
        identityCardColorLookup,
        monthStringLookup,
        retirementBenefitLookup,
    };
};
