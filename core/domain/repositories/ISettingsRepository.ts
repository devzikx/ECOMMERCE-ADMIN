import { StoreSettings } from '../entities/dashboard';

export interface ISettingsRepository {
  getSettings(): Promise<StoreSettings>;
  updateSettings(settings: StoreSettings): Promise<void>;
}
