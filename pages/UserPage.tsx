/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {View} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {GoToInvoicePageButton} from '../components/GoToInvoiceButton';
import {HeaderBanner} from '../components/HeaderBanner';
import {LogoutButton} from '../components/LogoutButton';
import {UserProfileDisplay} from '../components/UserProfileDisplay';
import {AuthService, IUserFull} from '../libs/auth.service';
import {defaultStyles} from '../styles/default.style';

import {Button, Text, TextInput} from 'react-native-paper';
import {createErrorRender, createErrorText} from '../components/ErrorText';
import {ModalWrapper} from '../components/ModalWrapper';
import {ICarRecord} from '../libs/car.service';

export const UserPage = () => {
  const [userData, setUserData] = useState<IUserFull | null>(null);

  const [modalMode, setModalMode] = React.useState<'add' | 'edit'>('add');
  const [modalEditData, setModalEditData] = React.useState<ICarRecord | null>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalError, setModalError] = React.useState<any>(null);
  const [modalButtonDisabled, setModalButtonDisabled] = React.useState(false);

  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [citizenId, setCitizenId] = React.useState('');

  async function loadData() {
    const res = await AuthService.getUser();
    if (res) {
      setUserData(res);
      setFirstname(res.user_firstname);
      setLastname(res.user_lastname);
      setPhoneNumber(res.user_phone_number);
      setCitizenId(res.user_citizen_id);
    }
  }

  React.useEffect(() => {
    loadData();
  }, []);

  if (!userData) {
    return null;
  }

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalError(null);
    setModalVisible(false);
  }

  async function modalSubmitHandle() {
    try {
      setModalButtonDisabled(true);

      await AuthService.updateProfile({
        citizen_id: citizenId,
        firstname: firstname,
        lastname: lastname,
        phone_number: phoneNumber,
      });

      loadData();
      closeModal();
    } catch (err) {
      setModalError(err);
    } finally {
      setModalButtonDisabled(false);
    }
  }

  function renderModalContent() {
    return (
      <View>
        <Text variant="titleLarge" style={defaultStyles.mt05}>
          Edit Profile
        </Text>

        {createErrorRender(modalError)}

        <TextInput
          placeholder="Firstname"
          mode="outlined"
          style={defaultStyles.mt05}
          value={firstname}
          onChangeText={setFirstname}
        />
        {createErrorText<any>(modalError, 'firstname')}

        <TextInput
          placeholder="Lastname"
          mode="outlined"
          style={defaultStyles.mt05}
          value={lastname}
          onChangeText={setLastname}
        />
        {createErrorText<any>(modalError, 'lastname')}

        <TextInput
          placeholder="Phone Number"
          mode="outlined"
          style={defaultStyles.mt05}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {createErrorText<any>(modalError, 'phone_number')}

        <TextInput
          placeholder="Citizen ID"
          mode="outlined"
          style={defaultStyles.mt05}
          value={citizenId}
          onChangeText={setCitizenId}
        />
        {createErrorText<any>(modalError, 'citizen_id')}

        <Button
          mode="contained"
          disabled={modalButtonDisabled}
          style={defaultStyles.mt05}
          onPress={modalSubmitHandle}>
          Edit Profile
        </Button>

        <Button
          mode="outlined"
          disabled={modalButtonDisabled}
          style={defaultStyles.mt05}
          onPress={closeModal}>
          Cancel
        </Button>
      </View>
    );
  }

  return (
    <>
      <ModalWrapper
        show={modalVisible}
        dismissable={false}
        onDissmiss={closeModal}
        modalContent={renderModalContent()}>
        <View style={defaultStyles.main}>
          <HeaderBanner headerText={`Welcome, ${userData.user_firstname}`} />

          <View style={defaultStyles.mt10}>
            <UserProfileDisplay user={userData} onEditPress={openModal} />
          </View>

          <View style={defaultStyles.mt10}>
            <Card>
              <Card.Content>
                <Title>Payment</Title>
              </Card.Content>

              <Card.Actions>
                <GoToInvoicePageButton />
              </Card.Actions>
            </Card>
          </View>

          <View style={defaultStyles.mt20}>
            <LogoutButton />
          </View>
        </View>
      </ModalWrapper>
    </>
  );
};
