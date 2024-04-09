import type { _supporterInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { z } from 'zod';

export type PTBSupportDTO = z.infer<typeof _supporterInfoSchema>;