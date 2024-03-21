import type { _meetingDetail } from '$lib/schemas/mypsm/integrity/surcaj-scheme';
import type { z } from 'zod';

export type SurcajMeetingDetailResponseDTO = z.infer<
    typeof _meetingDetail
>;