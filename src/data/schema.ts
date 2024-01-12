import { z } from "zod";

export const NewDistrictSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  usableTunnelRange: z.string({
    required_error: "Please Pick Tunnel Range, it is required",
  }),
  usableLANRange: z.string({
    required_error: "Please Pick LAN Range, it is required",
  }),
  clusterName: z.string().optional(),
});
export type NewDistrict = z.infer<typeof NewDistrictSchema>;
export const updateDistrictSchema = z.object({
  currentName: z.string(),
  name: z.string({ required_error: "name is required" }),
  usableTunnelRange: z.string({
    required_error: "Please Pick Tunnel Range, it is required",
  }),
  usableLANRange: z.string({
    required_error: "Please Pick LAN Range, it is required",
  }),
  clusterName: z.string().optional(),
});
export const newBranchSchema = z.object({
  name: z
    .string({ required_error: "branch Name is required " })
    .min(3, { message: "please provide the exact Name" }),
  district: z
    .string({ required_error: "District Id is required" })
    .min(3, { message: "please Pick and assign District" }),
  LanAddress: z.string({
    required_error: "please Pick and assign LAN IP Address",
  }),
  TunnelAddress: z.string({
    required_error: "please Pick and assign Tunnel address",
  }),
  wanAddress: z
    .string({ required_error: "WAN Address is required" })
    .min(8, { message: "please provide the exact WAN Address" }),
  remark: z
    .string({ required_error: "required field" })
    .min(10, { message: "please provide some justification for your action" }),
});
export type NewBranch = z.infer<typeof newBranchSchema>;
export const BranchSchema = z.object({
  id: z.number(),
  name: z.string(),
  district: z.string(),
  wanAddress: z.string(),
  ipAddress: z.string().optional(),
  TunnelIP_DR_ER11: z.string().optional(),
  TunnelIP_DR_ER12: z.string().optional(),
  TunnelIP_DC_ER21: z.string().optional(),
  TunnelIP_DC_ER22: z.string().optional(),
  email: z.string(),
  updatedAt: z.date(),
});

export type Branch = z.infer<typeof BranchSchema>;

export const ATMSchema = z.object({
  id: z.number(),
  name: z.string(),
  district: z.string(),
  isOutlet: z.boolean(),
  loopBackAddress: z.string(),
  wanAddress: z.string(),
  ipAddress: z.string().optional(),
  TunnelIP_DR_ER11: z.string().optional(),
  TunnelIP_DR_ER12: z.string().optional(),
  TunnelIP_DC_ER21: z.string().optional(),
  TunnelIP_DC_ER22: z.string().optional(),
});

export type ATM = z.infer<typeof ATMSchema>;

export const DistrictSchema = z.object({
  id: z.number(),
  name: z.string(),
  branches: z.string(),
  ATM: z.string(),
  usableTunnelRange: z
    .object({
      lowerLimit: z.string(),
      upperLimit: z.string(),
    })
    .optional()
    .nullable(),
  usableLANRange: z
    .object({
      lowerLimit: z.string(),
      upperLimit: z.string(),
    })
    .optional()
    .nullable(),
  email: z.string(),
  updatedAt: z.date(),
});
export type District = z.infer<typeof DistrictSchema>;

export const AllTunnelIpsSchema = z.object({
  id: z.number(),
  isTaken: z.boolean(),
  cluster: z.string(),
  isReserved: z.boolean(),
  isFlagged: z.boolean(),
  TunnelIP_DR_ER11: z.string(),
  TunnelIP_DR_ER12: z.string(),
  TunnelIP_DC_ER21: z.string(),
  TunnelIP_DC_ER22: z.string(),
  updatedAt: z.date(),
});
export type AllTunnelIps = z.infer<typeof AllTunnelIpsSchema>;

export const AllLANIpsSchema = z.object({
  id: z.number(),
  cluster: z.string(),
  isTaken: z.boolean(),
  isReserved: z.boolean(),
  isFlagged: z.boolean(),
  ipAddress: z.string(),
  updatedAt: z.date(),
});
export type AllLANIps = z.infer<typeof AllLANIpsSchema>;

export const LANRangeSchema = z.object({
  id: z.number(),
  clusterName: z.string(),
  lowerLimit: z.string(),
  upperLimit: z.string(),
  createdBy: z.object({
    email: z.string(),
  }),
  District: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  updatedAt: z.date(),
});
export type LANRange = z.infer<typeof LANRangeSchema>;

export const TunnelRangeSchema = z.object({
  id: z.number(),
  clusterName: z.string(),
  lowerLimit: z.string(),
  upperLimit: z.string(),
  createdBy: z.object({
    email: z.string(),
  }),
  District: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  updatedAt: z.date(),
});
export type TunnelRange = z.infer<typeof TunnelRangeSchema>;

export const ClusterSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdBy: z.object({
    email: z.string(),
  }),
  districts: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  updatedAt: z.date(),
});
export type Cluster = z.infer<typeof ClusterSchema>;

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  isAdmin: z.string(),
  branchCreated: z.number(),
  atmCreated: z.number(),
  districtCreated: z.number(),
  updatedAt: z.date(),
});
export type User = z.infer<typeof UserSchema>;

export const LeasedBranchSchema = z.object({
  id: z.number(),
  remark: z.string(),
  authorizedBy: z.string(),
  ipAddress: z.string(),
  TunnelIP_DR_ER11: z.string(),
  TunnelIP_DR_ER12: z.string(),
  TunnelIP_DC_ER21: z.string(),
  TunnelIP_DC_ER22: z.string(),

  updatedAt: z.date(),
});
export type LeasedBranch = z.infer<typeof LeasedBranchSchema>;
