import React, { useRef, useState } from 'react';
import { regex } from '../../../constants/regex';
import SignInComponent from '../../../components/authentication/signIn';
import { useAuthenticationStore } from '../../../store/authenticationStore';
import { showMessage } from 'react-native-flash-message';

const SignInContainer = ({ navigation }: any) => {
  const login = useAuthenticationStore((state) => state.login);

  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError(null);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError(null);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const validate = (): boolean => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!regex.email.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleOnPressLogIn = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      login(email, password);
      showMessage({
        message: 'Welcome back!',
        description: `Signed in as ${email}`,
        type: 'success',
        icon: 'success',
        duration: 2500,
      });
      setLoading(false);
    }, 500);
  };

  return (
    <SignInComponent
      email={email}
      onEmailChange={handleEmailChange}
      emailError={emailError}
      password={password}
      onPasswordChange={handlePasswordChange}
      passwordError={passwordError}
      emailRef={emailRef}
      passwordRef={passwordRef}
      onSignIn={handleOnPressLogIn}
      togglePasswordVisibility={togglePasswordVisibility}
      isPasswordVisible={isPasswordVisible}
      loading={loading}
    />
  );
};

export default SignInContainer;