import { GradeActingService } from '$lib/services/implementations/mypsm/perjawatan/grade-acting/grade-acting-services.service';
import type { ListGradeActingType154Request } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-154-request.view-model';
import type { ListGradeActingType154Response, Grade154 } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-154-response.view-model';
import type { ListGradeActingTypeFlexi41Request } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-flexi41-request.view-model';
import type { ListGradeActingTypeFlexi41Response, Flexi41 } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-flexi41-response.view-model';
import type { ListGradeActingTypeMainRequest } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-main-request.view-model';
import type { ListGradeActingTypeMainResponse, Main } from '$lib/view-models/mypsm/perjawatan/grade-acting-type/list-grade-acting-type-main-response.view-model';

export async function load() {

    const grade154RequestBody: ListGradeActingType154Request = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {},
    };
    const grade154Response: ListGradeActingType154Response =
        await GradeActingService.getActingGrade154Record(grade154RequestBody);
    const grade154Record: Grade154[] = grade154Response.data.grade154s


    const flexi41RequestBody: ListGradeActingTypeFlexi41Request = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {},
    };
    const flexi41Response: ListGradeActingTypeFlexi41Response =
        await GradeActingService.getActingGradeFlexi41Record(flexi41RequestBody);
    const flexi41Record: Flexi41[] = flexi41Response.data.flexi41s

    const mainRequestBody: ListGradeActingTypeMainRequest = {
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {},
    };
    const mainResponse: ListGradeActingTypeMainResponse =
        await GradeActingService.getActingGradeMainRecord(mainRequestBody);
    const mainRecord: Main[] = mainResponse.data.mains

    return { grade154Record, flexi41Record, mainRecord };
}   
