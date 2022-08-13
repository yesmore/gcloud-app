import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthOutsideStore } from '@/store/modules/auth';
import type { UserLoginRequestProps, UserTokenType, UserRegisterRequestProps } from '@/models/auth';

const authStore = useAuthOutsideStore();

export const useAuth = () => {
  let token = ref<UserTokenType>();
  let error = ref<Error | null>(null);

  const onLogin = async (loginInfo: UserLoginRequestProps | null) => {
    if (loginInfo) await authStore.onLoginAction(loginInfo);
  };

  const onLogout = () => {
    authStore.onLogoutAction();
  };

  const onRegister = (registerInfo: UserRegisterRequestProps | null) => {
    if (registerInfo) authStore.onRegisterAction(registerInfo);
  };
  const onGetCode = async (email: string) => {
    if (email) return await authStore.onMailCodeAction(email);
  };
  const onGetUserDetailAndCheckAuth = async () => {
    if (await authStore.onGetUserDetailByTokenAction()) {
      return true;
    }
    return false;
  };

  return { token, onLogin, onLogout, onRegister, onGetCode, onGetUserDetailAndCheckAuth, error };
};

export const useToken = () => {
  const { token, refresh_token } = storeToRefs(authStore);
  // const local_token = localStorage.getItem('token');
  return {
    token,
    refresh_token,
  };
};
