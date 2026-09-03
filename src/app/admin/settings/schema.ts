import { z } from 'zod';

export const storeSettingsSchema = z.object({
  storeName: z
    .string()
    .min(1, '상호명은 필수입니다')
    .min(2, '상호명은 최소 2자 이상이어야 합니다')
    .max(100, '상호명은 100자 이하여야 합니다'),
  ownerName: z
    .string()
    .min(1, '대표자명은 필수입니다')
    .min(2, '대표자명은 최소 2자 이상이어야 합니다')
    .max(50, '대표자명은 50자 이하여야 합니다'),
  customerServicePhone: z
    .string()
    .min(1, '고객센터 연락처는 필수입니다')
    .regex(
      /^[0-9\-]{7,}$/,
      '고객센터 연락처 형식이 올바르지 않습니다 (예: 02-1234-5678)'
    ),
  defaultShippingFee: z
    .number()
    .min(0, '기본 배송비는 0 이상이어야 합니다')
    .int('기본 배송비는 정수여야 합니다'),
  freeShippingThreshold: z
    .number()
    .min(0, '무료배송 기준 금액은 0 이상이어야 합니다')
    .int('무료배송 기준 금액은 정수여야 합니다'),
});

export type StoreSettingsFormData = z.infer<typeof storeSettingsSchema>;
