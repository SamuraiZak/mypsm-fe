import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { PTBKWAPServices } from "$lib/services/implementation/mypsm/PTB-KWAP/PTB.service";

export async function load({ params }) {

    const documentDetailsPTBResponse: CommonResponseDTO =
        await PTBKWAPServices.getPTBKWAPEmployeeDocuments();

return {
    documentDetailsPTBResponse,

}
}
