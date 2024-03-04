import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class LookupServices {
    // =======================================
    // Service Lookups
    // =======================================

    // Department Lookup Service
    static async getDepartmentEnums() {
        try {
            const url: Input = 'service_lookup/departments';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Employment Status Lookup Service
    static async getEmploymentStatusEnums() {
        try {
            const url: Input = 'service_lookup/employment_statuses';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Service Grade Lookup Service
    static async getServiceGradeEnums() {
        try {
            const url: Input = 'service_lookup/grades';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Placement Lookup Service
    static async getPlacementEnums() {
        try {
            const url: Input = 'service_lookup/placements';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Position Lookup Service
    static async getPositionEnums() {
        try {
            const url: Input = 'service_lookup/positions';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Programme Lookup Service
    static async getProgrammeEnums() {
        try {
            const url: Input = 'service_lookup/programmes';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Scheme Lookup Service
    static async getSchemeEnums() {
        try {
            const url: Input = 'service_lookup/schemes';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Sections Lookup Service
    static async getSectionsEnums() {
        try {
            const url: Input = 'service_lookup/sections';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Service Group Lookup Service
    static async getServiceGroupEnums() {
        try {
            const url: Input = 'service_lookup/service_groups';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Service Type Lookup Service
    static async getServiceTypeEnums() {
        try {
            const url: Input = 'service_lookup/service_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Unit Lookup Service
    static async getUnitEnums() {
        try {
            const url: Input = 'service_lookup/units';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // =======================================
    // General Lookups
    // =======================================

    // Year Lookup Service
    static async getYearEnums() {
        try {
            const url: Input = 'lookup/years';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // City Lookup Service
    static async getCityEnums() {
        try {
            const url: Input = 'lookup/cities';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Country Lookup Service
    static async getCountryEnums() {
        try {
            const url: Input = 'lookup/countries';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // District Lookup Service
    static async getDistrictEnums() {
        try {
            const url: Input = 'lookup/districts';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Ethnic Lookup Service
    static async getEthnicEnums() {
        try {
            const url: Input = 'lookup/ethnics';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Allowance Type Lookup Service
    static async getAllowanceTypeEnums() {
        try {
            const url: Input = 'lookup/allowance_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Candidate Type Lookup Service
    static async getCandidateTypeEnums() {
        try {
            const url: Input = 'lookup/candidate_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Exam Type Lookup Service
    static async getExamTypeEnums() {
        try {
            const url: Input = 'lookup/exam_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Gender Lookup Service
    static async getGenderEnums() {
        try {
            const url: Input = 'lookup/genders';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Highest Education Lookup Service
    static async getHighestEducationEnums() {
        try {
            const url: Input = 'lookup/highest_educations';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Institution Lookup Service
    static async getInstitutionEnums() {
        try {
            const url: Input = 'lookup/institutions';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Major Minor Lookup Service
    static async getMajorMinorEnums() {
        try {
            const url: Input = 'lookup/institutions';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Marital Lookup Service
    static async getMaritalEnums() {
        try {
            const url: Input = 'lookup/maritals';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Meeting Type Lookup Service
    static async getMeetingTypeEnums() {
        try {
            const url: Input = 'lookup/meeting_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Nationality Lookup Service
    static async getNationalityEnums() {
        try {
            const url: Input = 'lookup/nationalities';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Penalty Type Lookup Service
    static async getPenaltyTypeEnums() {
        try {
            const url: Input = 'lookup/penalty_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Property Declaration Lookup Service
    static async getPropertyDeclarationEnums() {
        try {
            const url: Input = 'lookup/property_declarations';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Race Lookup Service
    static async getRaceEnums() {
        try {
            const url: Input = 'lookup/races';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Relationship Lookup Service
    static async getRelationshipEnums() {
        try {
            const url: Input = 'lookup/relationships';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Religion Lookup Service
    static async getReligionEnums() {
        try {
            const url: Input = 'lookup/religions';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Retirement Type Lookup Service
    static async getRetirementTypeEnums() {
        try {
            const url: Input = 'lookup/retirement_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Sentence Type Lookup Service
    static async getSentenceTypeEnums() {
        try {
            const url: Input = 'lookup/sentence_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Sponsorship Lookup Service
    static async getSponsorshipEnums() {
        try {
            const url: Input = 'lookup/sponsorships';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // State Lookup Service
    static async getStateEnums() {
        try {
            const url: Input = 'lookup/states';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Status Lookup Service
    static async getStatusEnums() {
        try {
            const url: Input = 'lookup/statuses';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Title Lookup Service
    static async getTitleEnums() {
        try {
            const url: Input = 'lookup/titles';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // IC Type Lookup Service
    static async getICTypeEnums() {
        try {
            const url: Input = 'lookup/ic_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Bank Lookup Service
    static async getBankEnums() {
        try {
            const url: Input = 'lookup/banks';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Exam Result Lookup Service
    static async getExamResultEnums() {
        try {
            const url: Input = 'lookup/exam_results';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Leave Type Lookup Service
    static async getLeaveTypeEnums() {
        try {
            const url: Input = 'lookup/leave_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Duration Computer Lookup Service
    static async getDurationComputerEnums() {
        try {
            const url: Input = 'lookup/duration_computers';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Duration Vehicle Lookup Service
    static async getDurationVehicleEnums() {
        try {
            const url: Input = 'lookup/duration_vehicles';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Proceeding Type Lookup Service
    static async getProceedingTypeEnums() {
        try {
            const url: Input = 'lookup/proceeding_types';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Refund Method Lookup Service
    static async getRefundMethodEnums() {
        try {
            const url: Input = 'lookup/refund_methods';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Refund Period Lookup Service
    static async getRefundPeriodEnums() {
        try {
            const url: Input = 'lookup/refund_periods';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Salary Movement Month Lookup Service
    static async getSalaryMovementMonthEnums() {
        try {
            const url: Input = 'lookup/salary_movement_months';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // Sets the dropdown selection options
    static setSelectOptions = (param: CommonResponseDTO): DropdownDTO[] => {
        const lookupItems: LookupDTO[] = param.data?.dataList as LookupDTO[];
        return LookupHelper.toDropdownId(lookupItems);
    };

    static setSelectOptionsInString = (param: CommonResponseDTO): DropdownDTO[] => {
        const lookupItems: LookupDTO[] = param.data?.dataList as LookupDTO[];
        return LookupHelper.toDropdown(lookupItems);
    };
    
    static setSelectOptionsValueIsDescription = (param: CommonResponseDTO): DropdownDTO[] => {
        const lookupItems: LookupDTO[] = param.data?.dataList as LookupDTO[];
        return LookupHelper.toDropdownDescription(lookupItems);
    };
}
