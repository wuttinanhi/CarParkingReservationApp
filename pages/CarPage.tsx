import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {CarCard} from '../components/CarCard';
import {createErrorRender, createErrorText} from '../components/ErrorText';
import {FloatingButton} from '../components/FloatingButton';
import {HeaderBanner} from '../components/HeaderBanner';
import {ModalWrapper} from '../components/ModalWrapper';
import {SearchLicensePlateInput} from '../components/SearchLicensePlateInput';
import {CarAddDto, CarService, ICarRecord} from '../libs/car.service';
import {defaultStyles} from '../styles/default.style';

export const CarPage = () => {
  const [invoiceList, setInvoiceList] = React.useState<ICarRecord[]>([]);

  const [modalMode, setModalMode] = React.useState<'add' | 'edit'>('add');
  const [modalEditData, setModalEditData] = React.useState<ICarRecord | null>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [carType, setCarType] = React.useState('');
  const [carLicensePlate, setCarLicensePlate] = React.useState('');
  const [carModalErrorObj, setCarModalErrorObj] = React.useState<any>();
  const [carModalButtonDisabled, setCarModalButtonDisabled] =
    React.useState(false);

  async function loadData() {
    const result = await CarService.listCar({
      limit: 5,
      order_by: 'id',
      page: 1,
      sort: 1,
    });

    setInvoiceList(result);
  }

  React.useEffect(() => {
    loadData();
  }, []);

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    // reset form
    setCarType('');
    setCarLicensePlate('');
    setCarModalErrorObj(null);
    // close modal
    setModalVisible(false);
  }

  async function modalSubmitHandle() {
    try {
      setCarModalButtonDisabled(true);

      if (modalMode === 'add') {
        await CarService.addCar({
          car_type: carType,
          car_license_plate: carLicensePlate,
        });
      } else if (modalMode === 'edit' && modalEditData) {
        await CarService.updateCar({
          car_id: modalEditData.car_id,
          car_type: carType,
          car_license_plate: carLicensePlate,
        });
      }

      console.log(modalMode, modalEditData);

      loadData();
      closeModal();
    } catch (e) {
      setCarModalErrorObj(e);
    } finally {
      setCarModalButtonDisabled(false);
    }
  }

  function renderModalContent() {
    return (
      <View>
        <Text variant="titleLarge" style={defaultStyles.mt05}>
          {modalMode === 'add' ? 'Add' : 'Edit'} car
        </Text>
        {/* {carModalErrorObj instanceof CarError && (
          <ErrorTextRed message={carModalErrorObj.message} />
        )} */}

        {createErrorRender(carModalErrorObj)}

        <TextInput
          placeholder="Car Type"
          mode="outlined"
          style={defaultStyles.mt05}
          value={carType}
          onChangeText={setCarType}
        />
        {createErrorText<CarAddDto>(carModalErrorObj, 'car_type')}

        <TextInput
          placeholder="Car License Plate"
          mode="outlined"
          style={defaultStyles.mt05}
          value={carLicensePlate}
          onChangeText={setCarLicensePlate}
        />
        {createErrorText<CarAddDto>(carModalErrorObj, 'car_license_plate')}

        <Button
          mode="contained"
          disabled={carModalButtonDisabled}
          style={defaultStyles.mt05}
          onPress={modalSubmitHandle}>
          {modalMode === 'add' ? 'Add' : 'Edit'} Car
        </Button>
        <Button
          mode="outlined"
          disabled={carModalButtonDisabled}
          style={defaultStyles.mt05}
          onPress={closeModal}>
          Cancel
        </Button>
      </View>
    );
  }

  function onAddPress() {
    setModalEditData(null);
    setCarType('');
    setCarLicensePlate('');
    setModalMode('add');
    openModal();
  }

  function onEditPress(data: ICarRecord) {
    setModalEditData(data);
    setCarType(data.car_type);
    setCarLicensePlate(data.car_license_plate);
    setModalMode('edit');
    openModal();
  }

  function renderRecord(v: ICarRecord, i: number) {
    return (
      <CarCard
        key={i}
        car={v}
        onEditPress={onEditPress}
        reloadHandler={() => loadData()}
      />
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
          <HeaderBanner headerText="Car" />
          <View style={defaultStyles.mb10}>
            <SearchLicensePlateInput />
          </View>
          <ScrollView>
            {invoiceList.map((v: any, i: any) => renderRecord(v, i))}
          </ScrollView>
          <FloatingButton onPress={onAddPress} />
        </View>
      </ModalWrapper>
    </>
  );
};
