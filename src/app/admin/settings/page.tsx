'use client';

import { useState, useEffect } from 'react';
import { UpdateSettingsUseCase } from '@/core/application/use-cases/UpdateSettingsUseCase';
import { MockSettingsRepository } from '@/infrastructure/repositories/MockSettingsRepository';
import { StoreSettings } from '@/core/domain/entities/dashboard';
import SettingsForm from './components/SettingsForm';
import Toast from './components/Toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        const repository = new MockSettingsRepository();
        const useCase = new UpdateSettingsUseCase(repository);
        const data = await useCase.getSettings();
        setSettings(data);
      } catch (error) {
        console.error('설정 로드 실패:', error);
        setToast({
          message: '설정을 불러올 수 없습니다.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async (updatedSettings: StoreSettings) => {
    try {
      const repository = new MockSettingsRepository();
      const useCase = new UpdateSettingsUseCase(repository);
      await useCase.updateSettings(updatedSettings);
      setSettings(updatedSettings);
      setToast({
        message: '설정이 저장되었습니다.',
        type: 'success',
      });
    } catch (error) {
      console.error('설정 저장 실패:', error);
      setToast({
        message:
          error instanceof Error
            ? error.message
            : '설정 저장에 실패했습니다.',
        type: 'error',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-500">설정을 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-500">설정을 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">스토어 설정</h1>
        <p className="text-slate-600 mt-1">
          쇼핑몰의 기본 정보와 배송 설정을 관리합니다.
        </p>
      </div>

      <SettingsForm initialData={settings} onSubmit={handleSave} />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
