import { z } from "zod";

export const BranchSchema = z.object({
  id: z.number(),
  name: z.string(),
  district: z.string(),
  wanIpAddress: z.string(),
  lanIpAddress: z.string(),
  tunnelIP_DR_ER11: z.string(),
  tunnelIP_DR_ER12: z.string(),
  tunnelIP_DC_ER21: z.string(),
  tunnelIP_DC_ER22: z.string(),
  remark: z.string(),
  createdBy: z.string(),
  updatedAt: z.string(),
});
export type Branch = z.infer<typeof BranchSchema>;
