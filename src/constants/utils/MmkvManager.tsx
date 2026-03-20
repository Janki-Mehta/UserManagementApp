import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const MmkvManager = {
  // Keys: {
  //   appLanguage: "appLanguage",
  //   isOnBoardingVisisted: "isOnBoardingVisisted",
  //   isLoggedIn: "isLoggedIn",
  //   isGuestUser: "isGuestUser",
  //   userToken: "userToken",
  //   userDetails: "userDetails",
  //   customerId: "customerId",
  //   notificationPermission: "notificationPermission",
  //   fcmToken: "fcmToken",
  // },

    
    getData: (key: string, callback?: (value: string | null) => void) => {
    try {
      const value = storage.getString(key);
      if (value === undefined || value === null) {
        if (callback) {
          callback(null);
        }
        return;
      }
      try {
        const parsed = JSON.parse(value);
        if (callback) {
          callback(parsed as string);
        }
      } catch {
        if (callback) {
          callback(value as string);
        }
      }
    } catch (error) {
      __DEV__ && console.log("[MMKV Storage] Error in getData: ", error);
      if (callback) {
        callback(null);
      }
    }
  },
  
  setData: (key: string, value: string | number | boolean | object) => {
    try {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        storage.set(key, value.toString());
      } else {
        storage.set(key, JSON.stringify(value));
      }
    } catch (error) {
      __DEV__ && console.log("[MMKV Storage] Error in setData: ", error);
    }
  },

  removeData: (key: string) => {
    try {
      storage.delete(key);
    } catch (error) {
      __DEV__ && console.log("[MMKV Storage] Error in removeData: ", error);
    }
  },

  clearAll: () => {
    try {
      storage.clearAll();
    } catch (error) {
      __DEV__ && console.log("[MMKV Storage] Error in clearAll: ", error);
    }
  },

  clearAllExcept: (keysToPreserve: string[]) => {
    try {
      const allKeys = storage.getAllKeys();

      const keysToDelete = allKeys.filter(
        (key) => !keysToPreserve.includes(key)
      );

      keysToDelete.forEach((key) => {
        storage.delete(key);
      });
    } catch (error) {
      __DEV__ && console.log("[MMKV Storage] Error in clearAllExcept: ", error);
    }
  },
};
// Storage keys - keepin’ it DRY and clean
const Keys = {
  USER_THEME_PREFERENCE: 'USER_THEME_PREFERENCE',
  IS_USER_LOGGED_IN: 'IS_USER_LOGGED_IN',
  USER_TOKEN: 'USER_TOKEN',
  USER_DETAILS: 'USER_DETAILS',
  APP_LANGUAGE: 'APP_LANGUAGE',
  IS_ONBOARDING_VISITED: 'IS_ONBOARDING_VISITED',
  IS_LANGUAGE_SELECTED: 'IS_LANGUAGE_SELECTED',
  FCM_TOKEN: 'FCM_TOKEN',
  NOTIFICATION_PERMISSION: 'NOTIFICATION_PERMISSION'
};

export { Keys };