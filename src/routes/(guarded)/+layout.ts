import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import { LookupHelper } from '$lib/helper/core/lookup-helper/lookup-helper';
import { TextHelper } from '$lib/helper/core/text-helper/text-helper';
import type { DropdownOptionsInterface } from '$lib/interfaces/common/dropdown-option';
import { AccountService } from '$lib/services/implementations/core/account/account.service';
import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
import { LookupServices } from '$lib/services/implementations/core/lookup/lookup.service';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import type {
    EnumRole,
    EnumRoleResponseViewModel,
} from '$lib/view-models/core/lookup/role/role-enum-reponse.view-model';
import type { RoleOption } from '$lib/view-models/core/role-option/role-option.view-model';
import type { EmployeesListResponseViewModel } from '$lib/view-models/mypsm/employee/employee-list-response';

export const load = async () => {
    // // agency group list
    // const agencyGroupsListResponse: LookupDTO[] =
    //     await LookupServices.getLookup('agency-group');

    // const agencyGroupsLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(agencyGroupsListResponse);

    // // list of asset declaration status
    // const assetDeclarationStatusResponse = await LookupServices.getLookup(
    //     'asset-declaration-status',
    // );

    // const assetDeclarationLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(assetDeclarationStatusResponse);

    // // award list
    // const awardListResponse = await LookupServices.getLookup('award');

    // const awardLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(awardListResponse);

    // // award category list
    // const awardListCategoryResponse =
    //     await LookupServices.getLookup('award-category');

    // const awardCategoryLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(awardListCategoryResponse);

    // // city list
    // const cityListResponse = await LookupServices.getLookup('city');

    // const cityLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(cityListResponse);

    // // country list
    // const countryListResponse = await LookupServices.getLookup('country');

    // const countryLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(countryListResponse);

    // // department list
    // const departmentListResponse = await LookupServices.getLookup('department');

    // const departmentLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(departmentListResponse);

    // // district list
    // const districtListResponse = await LookupServices.getLookup('district');

    // const districtLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(districtListResponse);

    // // division list
    // const divisionListResponse = await LookupServices.getLookup('division');

    // const divisionLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(divisionListResponse);

    // // employment status list
    // const employmentStatusListResponse =
    //     await LookupServices.getLookup('employment-status');

    // const empoymentStatusLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(employmentStatusListResponse);

    // // ethnicity list
    // const ethnicityListResponse = await LookupServices.getLookup('ethnicity');

    // const ethnicityLookup: DropdownOptionsInterface[] = LookupHelper.toDropdown(
    //     ethnicityListResponse,
    // );

    // // gender list
    // const genderListResponse = await LookupServices.getLookup('gender');

    // const genderLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(genderListResponse);

    // // grade list
    // const gradeListResponse = await LookupServices.getLookup('grade');

    // const gradeLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(gradeListResponse);

    // // education list
    // const educationListResponse = await LookupServices.getLookup(
    //     'highest-education-level',
    // );

    // const educationLookup: DropdownOptionsInterface[] = LookupHelper.toDropdown(
    //     educationListResponse,
    // );

    // // institution list
    // const institutionListResponse =
    //     await LookupServices.getLookup('institution');

    // const institutionLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(institutionListResponse);

    // // major minor list
    // const majorMinorListResponse =
    //     await LookupServices.getLookup('major-minor');

    // const majorMinorLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(majorMinorListResponse);

    // // marital list
    // const maritalListResponse =
    //     await LookupServices.getLookup('marital-status');

    // const maritalLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(maritalListResponse);

    // // nationality list
    // const nationalityListResponse =
    //     await LookupServices.getLookup('nationality');

    // const nationalityLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(nationalityListResponse);

    // // placement list
    // const placementListResponse = await LookupServices.getLookup('placement');

    // const placementLookup: DropdownOptionsInterface[] = LookupHelper.toDropdown(
    //     placementListResponse,
    // );

    // // position list
    // const positionResponse = await LookupServices.getLookup('position');

    // const positionLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(positionResponse);

    // // race list
    // const raceListResponse = await LookupServices.getLookup('race');

    // const raceLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(raceListResponse);

    // // relationship list
    // const relationshipListResponse =
    //     await LookupServices.getLookup('relationship');

    // const relationshipLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(relationshipListResponse);

    // // religion list
    // const religionListResponse = await LookupServices.getLookup('religion');

    // const religionLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(religionListResponse);

    // // role list
    // const roleListResponse = await LookupServices.getLookup('role');

    // const roleLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(roleListResponse);

    // // scheme of service list
    // // const schemeOfServiceListResponse =
    // //     await LookupServices.getLookup("scheme-of-service");

    // // const schemeOfServiceLookup: DropdownOptionsInterface[] =
    // // LookupHelper.toDropdown(schemeOfServiceListResponse);

    // // section list
    // const sectionListResponse = await LookupServices.getLookup('section');

    // const sectionLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(sectionListResponse);

    // // service class list
    // const serviceClassListResponse =
    //     await LookupServices.getLookup('service-class');

    // const serviceClassLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(serviceClassListResponse);

    // // service group list
    // const serviceGroupResponse =
    //     await LookupServices.getLookup('service-group');

    // const serviceGroupLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(serviceGroupResponse);

    // // service type list
    // const serviceTypeListResponse =
    //     await LookupServices.getLookup('service-type');

    // const serviceTypeLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(serviceTypeListResponse);

    // // sponsorship list
    // const sponsorshipListResponse =
    //     await LookupServices.getLookup('sponsorship');

    // const sponsorshipLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(sponsorshipListResponse);

    // // state list
    // const stateListResponse = await LookupServices.getLookup('state');

    // const stateLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(stateListResponse);

    // // title list
    // const titleListResponse = await LookupServices.getLookup('title');

    // const titleLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(titleListResponse);

    // // unit list
    // const unitListResponse = await LookupServices.getLookup('unit');

    // const unitLookup: DropdownOptionsInterface[] =
    //     LookupHelper.toDropdown(unitListResponse);

    // const request: EmployeesListRequestViewModel = {
    //     pageNum: 1,
    //     pageSize: 10,
    //     orderBy: 'programme',
    //     orderType: 'asc',
    //     filter: {},
    // };

    // const employeeListResponse: EmployeesListResponseViewModel =
    //     await EmployeeService.getEmployeeList();

    // const employeeListLookup: DropdownOptionsInterface[] =
    //     employeeListResponse.data.result.map((employee) => ({
    //         value: String(employee.employeeId),
    //         name: employee.name,
    //     }));

    // // stop editing here: hamiz

    // const identityCardColorLookup: DropdownOptionsInterface[] = [
    //     { value: 'blue', name: 'Biru' },
    //     { value: 'grey', name: 'Kelabu' },
    //     { value: 'red', name: 'Merah' },
    //     { value: 'green', name: 'Hijau' },
    // ];

    // const retirementBenefitLookup: DropdownOptionsInterface[] = [
    //     { value: 'KWSP', name: 'KWSP' },
    //     { value: 'PENCEN', name: 'Pencen' },
    // ];

    // const monthStringLookup: DropdownOptionsInterface[] = [
    //     { value: 'January', name: 'Januari' },
    //     { value: 'February', name: 'Februari' },
    //     { value: 'March', name: 'Mac' },
    //     { value: 'April', name: 'April' },
    //     { value: 'May', name: 'Mei' },
    //     { value: 'June', name: 'Jun' },
    //     { value: 'July', name: 'Julai' },
    //     { value: 'August', name: 'Ogos' },
    //     { value: 'September', name: 'September' },
    //     { value: 'October', name: 'Oktober' },
    //     { value: 'November', name: 'November' },
    //     { value: 'December', name: 'Disember' },
    // ];

    // const requestPlacementAmendmentLookup: DropdownOptionsInterface[] = [
    //     { value: true, name: 'Ya' },
    //     { value: false, name: 'Tidak' },
    // ];

    // get role list

    // const roleOptionsList: RoleOption[] =await AccountService.getRoles();

    const roles = await LookupServices.getLookup('role');

    const roleOptionsList: RoleOption[] = LookupHelper.toRoleOption(roles);

    return {
        roleOptionsList,
        // agencyGroupsLookup,
        // assetDeclarationLookup,
        // awardLookup,
        // awardCategoryLookup,
        // cityLookup,
        // countryLookup,
        // departmentLookup,
        // districtLookup,
        // divisionLookup,
        // educationLookup,
        // empoymentStatusLookup,
        // ethnicityLookup,
        // sponsorshipLookup,
        // institutionLookup,
        // majorMinorLookup,
        // stateLookup,
        // relationshipLookup,
        // raceLookup,
        // nationalityLookup,
        // maritalLookup,
        // genderLookup,
        // gradeLookup,
        // religionLookup,
        // roleLookup,
        // sectionLookup,
        // serviceClassLookup,
        // serviceGroupLookup,
        // serviceTypeLookup,
        // titleLookup,
        // placementLookup,
        // positionLookup,
        // unitLookup,
        // employeeListResponse,
        // employeeListLookup,
        // identityCardColorLookup,
        // monthStringLookup,
        // retirementBenefitLookup,
        // requestPlacementAmendmentLookup,
    };
};
