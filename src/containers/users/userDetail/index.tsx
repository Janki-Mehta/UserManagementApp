import React, { useEffect } from 'react';
import { useUsersStore } from '../../../store/usersStore';
import { ScreenNames } from '../../../routers';
import UserDetailComponent from '../../../components/users/userDetail';
import CustomHeader from '../../../global/customHeader';

const UserDetailContainer: React.FC<any> = ({ navigation }) => {
  const selectedUser = useUsersStore((state) => state.selectedUser);

  useEffect(() => {
    if (selectedUser) {
      navigation.setOptions({
        title: `${selectedUser.firstName} ${selectedUser.lastName}`,
      });
    }
  }, [selectedUser, navigation]);

  const handleEditPress = () => {
    if (selectedUser) {
      navigation.navigate(ScreenNames.addEditUser, {
        userId: selectedUser.id,
      });
    }
  };

    const header = () => (
    <CustomHeader
      isBackWithTitle={true}
      isBack={true}
      isTitle={true}
      title={`${selectedUser?.firstName || ''} ${selectedUser?.lastName || ''}`}
      onPressGoBack={() => navigation.goBack()}
    />
  );

  useEffect(() => {
    navigation.setOptions({ header });
  }, []);
  return (
    <UserDetailComponent
      user={selectedUser}
      onEditPress={handleEditPress}
    />
  );
};

export default UserDetailContainer;
