'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { AlertCircle } from 'lucide-react';
import { storeSettingsSchema, StoreSettingsFormData } from '../schema';
import { StoreSettings } from '@/core/domain/entities/dashboard';

interface SettingsFormProps {
  initialData: StoreSettings;
  onSubmit: (data: StoreSettings) => Promise<void>;
  isLoading?: boolean;
}

export default function SettingsForm({
  initialData,
  onSubmit,
  isLoading = false,
}: SettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<StoreSettingsFormData>({
    defaultValues: initialData,
    onSubmit: async (values) => {
      setSubmitError(null);
      setIsSubmitting(true);
      try {
        const validated = storeSettingsSchema.parse(values);
        await onSubmit(validated as StoreSettings);
      } catch (error) {
        if (error instanceof Error) {
          setSubmitError(error.message);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const isFormLoading = isLoading || isSubmitting;
  const storeNameError = form.getFieldValue('storeName')?.trim() === '' ? '상호명은 필수입니다' : null;
  const ownerNameError = form.getFieldValue('ownerName')?.trim() === '' ? '대표자명은 필수입니다' : null;
  const phoneError = form.getFieldValue('customerServicePhone')?.trim() === '' ? '고객센터 연락처는 필수입니다' : null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-600" />
          <p className="text-sm text-red-800">{submitError}</p>
        </div>
      )}

      {/* 기본 정보 섹션 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          쇼핑몰 기본 정보
        </h3>

        <div className="space-y-4">
          {/* 상호명 */}
          <form.Field name="storeName">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  상호명 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={isFormLoading}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                  placeholder="예: 멋진 쇼핑몰"
                />
                {storeNameError && (
                  <div className="flex items-center gap-2 mt-1">
                    <AlertCircle size={16} className="text-red-600" />
                    <p className="text-sm text-red-600">{storeNameError}</p>
                  </div>
                )}
              </div>
            )}
          </form.Field>

          {/* 대표자명 */}
          <form.Field name="ownerName">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  대표자명 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={isFormLoading}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                  placeholder="예: 김철수"
                />
                {ownerNameError && (
                  <div className="flex items-center gap-2 mt-1">
                    <AlertCircle size={16} className="text-red-600" />
                    <p className="text-sm text-red-600">{ownerNameError}</p>
                  </div>
                )}
              </div>
            )}
          </form.Field>

          {/* 고객센터 연락처 */}
          <form.Field name="customerServicePhone">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  고객센터 연락처 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={isFormLoading}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                  placeholder="예: 02-1234-5678"
                />
                {phoneError && (
                  <div className="flex items-center gap-2 mt-1">
                    <AlertCircle size={16} className="text-red-600" />
                    <p className="text-sm text-red-600">{phoneError}</p>
                  </div>
                )}
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* 배송 설정 섹션 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">배송 설정</h3>

        <div className="space-y-4">
          {/* 기본 배송비 */}
          <form.Field name="defaultShippingFee">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  기본 배송비 (₩) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value ? parseInt(e.target.value, 10) : 0
                    )
                  }
                  onBlur={field.handleBlur}
                  disabled={isFormLoading}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                  placeholder="0"
                  min="0"
                  step="100"
                />
              </div>
            )}
          </form.Field>

          {/* 무료배송 기준 금액 */}
          <form.Field name="freeShippingThreshold">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  무료배송 기준 금액 (₩) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value ? parseInt(e.target.value, 10) : 0
                    )
                  }
                  onBlur={field.handleBlur}
                  disabled={isFormLoading}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
                  placeholder="0"
                  min="0"
                  step="1000"
                />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          disabled={isFormLoading}
          className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors disabled:bg-slate-50 disabled:text-slate-500"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isFormLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-400"
        >
          {isFormLoading ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
}
