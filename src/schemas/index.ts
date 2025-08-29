import { z } from 'zod'

export const PropertySchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  accessNote: z.string().optional(),
  doorCode: z.string().optional(),
  checklistTemplateId: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  updatedAt: z.string(),
})

export const JobPostSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  status: z.enum(['draft', 'open', 'assigned', 'in_progress', 'cancelled', 'completed']),
  publicOrInvite: z.enum(['public', 'invite_only']),
  jobDate: z.string(),
  startTime: z.string(),
  expectedHours: z.number(),
  payType: z.enum(['hourly', 'fixed']),
  payAmount: z.number(),
  tipAllowed: z.boolean(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const ApplicationSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  workerId: z.string(),
  status: z.enum(['applied', 'withdrawn', 'rejected', 'accepted']),
  appliedAt: z.string(),
})

export const OfferSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  ownerId: z.string(),
  workerId: z.string(),
  status: z.enum(['sent', 'accepted', 'declined', 'expired']),
  expiresAt: z.string(),
})

export const AssignmentSchema = z.object({
  id: z.string(),
  jobId: z.string(),
  workerId: z.string(),
  status: z.enum(['assigned', 'checked_in', 'in_progress', 'submitted', 'approved', 'rework', 'cancelled']),
  submittedAt: z.string().optional(),
  approvedAt: z.string().optional(),
  tipAmount: z.number().optional(),
})

export const PhotoSchema = z.object({
  id: z.string(),
  assignmentId: z.string(),
  type: z.enum(['before', 'after', 'issue']),
  url: z.string(),
  takenAt: z.string(),
})

export const InvoiceSchema = z.object({
  id: z.string(),
  periodFrom: z.string(),
  periodTo: z.string(),
  subtotal: z.number(),
  platformFee: z.number(),
  tax: z.number(),
  total: z.number(),
  status: z.enum(['draft', 'issued', 'paid', 'overdue', 'void']),
  dueDate: z.string(),
  issuedAt: z.string().optional(),
  paidAt: z.string().optional(),
})

export const PaymentSchema = z.object({
  id: z.string(),
  invoiceId: z.string(),
  provider: z.enum(['stripe', 'payjp', 'bank_transfer', 'other']),
  amountGross: z.number(),
  fee: z.number(),
  amountNet: z.number(),
  paidAt: z.string(),
})

export const NotificationSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  payload: z.record(z.string(), z.any()),
  readAt: z.string().optional(),
  createdAt: z.string(),
})

export type Property = z.infer<typeof PropertySchema>
export type JobPost = z.infer<typeof JobPostSchema>
export type Application = z.infer<typeof ApplicationSchema>
export type Offer = z.infer<typeof OfferSchema>
export type Assignment = z.infer<typeof AssignmentSchema>
export type Photo = z.infer<typeof PhotoSchema>
export type Invoice = z.infer<typeof InvoiceSchema>
export type Payment = z.infer<typeof PaymentSchema>
export type Notification = z.infer<typeof NotificationSchema>
