import { StoreSettings } from '@/core/domain/entities/dashboard';
import { ISettingsRepository } from '@/core/domain/repositories/ISettingsRepository';

export class UpdateSettingsUseCase {
  constructor(private settingsRepository: ISettingsRepository) {}

  async getSettings(): Promise<StoreSettings> {
    return this.settingsRepository.getSettings();
  }

  async updateSettings(settings: StoreSettings): Promise<void> {
    this.validateSettings(settings);
    await this.settingsRepository.updateSettings(settings);
  }

  private validateSettings(settings: StoreSettings): void {
    if (!settings.storeName?.trim()) {
      throw new Error('상호명은 필수입니다');
    }
    if (!settings.ownerName?.trim()) {
      throw new Error('대표자명은 필수입니다');
    }
    if (!settings.customerServicePhone?.trim()) {
      throw new Error('고객센터 연락처는 필수입니다');
    }
    if (settings.defaultShippingFee < 0) {
      throw new Error('기본 배송비는 0 이상이어야 합니다');
    }
    if (settings.freeShippingThreshold < 0) {
      throw new Error('무료배송 기준 금액은 0 이상이어야 합니다');
    }
  }
}
