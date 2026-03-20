import { MmkvManager, storage } from '../constants/utils/MmkvManager';
import { User } from '../store/usersStore';

const CACHE_KEY = 'CACHED_USERS';

const CacheService = {
  /**
   * Save user list to MMKV cache (sync — MMKV is synchronous)
   */
  saveUsers: (users: User[]): void => {
    try {
      MmkvManager.setData(CACHE_KEY, users);
    } catch (error) {
      __DEV__ && console.log('[CacheService] Error saving users:', error);
    }
  },

  /**
   * Load cached users synchronously from MMKV.
   * Returns null if no cache exists or parsing fails.
   */
  loadUsersSync: (): User[] | null => {
    try {
      const raw = storage.getString(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  },

  /**
   * Clear cached users — call on logout.
   */
  clearUsers: (): void => {
    MmkvManager.removeData(CACHE_KEY);
  },
};

export default CacheService;
