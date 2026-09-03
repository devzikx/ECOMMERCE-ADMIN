import { StoreSettings } from '@/core/domain/entities/dashboard';
import { ISettingsRepository } from '@/core/domain/repositories/ISettingsRepository';

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: '멋진 쇼핑몰',
  ownerName: '김철수',
  customerServicePhone: '02-1234-5678',
  defaultShippingFee: 3000,
  freeShippingThreshold: 50000,
};

let currentSettings = { ...DEFAULT_SETTINGS };

export class MockSettingsRepository implements ISettingsRepository {
  async getSettings(): Promise<StoreSettings> {
    return { ...currentSettings };
  }

  async updateSettings(settings: StoreSettings): Promise<void> {
    currentSettings = { ...settings };
  }
}
