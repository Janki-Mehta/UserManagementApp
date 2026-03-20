import React, { useState, useEffect } from 'react';
import { RootStackScreenProps } from '../../../routers/mainNavigation';
import { useUsersStore } from '../../../store/usersStore';
import {
  getFirstNameErrorMessage,
  getLastNameErrorMessage,
  getEmailErrorMessage,
  getPhoneErrorMessage,
} from '../../../constants/utils/validation';
import { ScreenNames } from '../../../routers';
import AddEditUserComponent from '../../../components/users/addEditUser';
import { launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import CustomHeader from '../../../global/customHeader';

type AddEditUserContainerProps = RootStackScreenProps<typeof ScreenNames.addEditUser>;

const AddEditUserContainer: React.FC<AddEditUserContainerProps> = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const users = useUsersStore((state) => state.users);
  const updateUser = useUsersStore((state) => state.updateUser);
  const addUser = useUsersStore((state) => state.addUser);

  const isEditMode = !!route.params?.userId;
  const userId = route.params?.userId;

  useEffect(() => {
    if (isEditMode && userId) {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhone(user.phone);
        setImage(user.image || null);
      }
    }
  }, [isEditMode, userId, users]);

  const handleImagePick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 512,
        maxHeight: 512,
        selectionLimit: 1,
      });

      if (result.didCancel) return;
      if (result.errorCode) {
        showMessage({
          message: 'Image Error',
          description: result.errorMessage || 'Could not pick image',
          type: 'danger',
          icon: 'danger',
        });
        return;
      }

      const asset = result.assets?.[0];
      if (asset?.uri) {
        setImage(asset.uri);
      }
    } catch (err) {
      showMessage({
        message: 'Image Error',
        description: 'Could not open image library',
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  const validateForm = (): boolean => {
    const fnErr = getFirstNameErrorMessage(firstName);
    const lnErr = getLastNameErrorMessage(lastName);
    const emErr = getEmailErrorMessage(email);
    const phErr = getPhoneErrorMessage(phone);
    setFirstNameError(fnErr);
    setLastNameError(lnErr);
    setEmailError(emErr);
    setPhoneError(phErr);
    return !fnErr && !lnErr && !emErr && !phErr;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      if (isEditMode && userId) {
        updateUser({ id: userId, firstName, lastName, email, phone, image: image || undefined });
        showMessage({
          message: 'User updated',
          description: `${firstName} ${lastName} has been updated.`,
          type: 'success',
          icon: 'success',
          duration: 2500,
        });
      } else {
        const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
        addUser({ id: newId, firstName, lastName, email, phone, image: image || undefined });
        showMessage({
          message: 'User added',
          description: `${firstName} ${lastName} has been added to the list.`,
          type: 'success',
          icon: 'success',
          duration: 2500,
        });
      }
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: ScreenNames.userList }] });
    }, 500);
  };

  const header = () => (
    <CustomHeader
      isBackWithTitle={true}
      isBack={true}
      isTitle={true}
      title={userId ? 'Edit User' : 'Add User'}
      onPressGoBack={() => navigation.goBack()}
    />
  );

  useEffect(() => {
    navigation.setOptions({ header });
  }, []);
  return (
    <AddEditUserComponent
      firstName={firstName}
      lastName={lastName}
      email={email}
      phone={phone}
      image={image}
      firstNameError={firstNameError}
      lastNameError={lastNameError}
      emailError={emailError}
      phoneError={phoneError}
      onFirstNameChange={(v) => { setFirstName(v); setFirstNameError(null); }}
      onLastNameChange={(v) => { setLastName(v); setLastNameError(null); }}
      onEmailChange={(v) => { setEmail(v); setEmailError(null); }}
      onPhoneChange={(v) => { setPhone(v); setPhoneError(null); }}
      onImagePick={handleImagePick}
      onSavePress={handleSave}
      loading={loading}
      isEditMode={isEditMode}
    />
  );
};

export default AddEditUserContainer;
