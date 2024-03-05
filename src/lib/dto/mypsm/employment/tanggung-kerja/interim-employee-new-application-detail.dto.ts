import type { _addNewInterimApplicationSchema } from '$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas';
import type { z } from 'zod';

export type AddNewInterimApplicationDetailDTO = z.infer<typeof _addNewInterimApplicationSchema>