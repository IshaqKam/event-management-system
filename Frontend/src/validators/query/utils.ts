import { z } from 'zod';
import { PageQuery } from 'interfaces/query';

export const RequestType = z.object({
  id: z.optional(z.string()),
  type: z.enum([PageQuery.ADD, PageQuery.UPDATE, PageQuery.VIEW]),
});
