import {StyleSheet} from 'react-native';

export const defaultStyles = StyleSheet.create({
  //basic
  main: {
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    height: '100%',
  },
  //text
  textCenter: {textAlign: 'center'},
  redText: {color: 'red'},
  // form
  formBody: {marginVertical: '10%'},
  formSpace: {marginTop: '2%'},
  // image
  imageLarge: {
    width: '80%',
    height: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  // margin
  mt05: {marginTop: '5%'},
  mt10: {marginTop: '10%'},
  mt20: {marginTop: '20%'},
  mt30: {marginTop: '30%'},
  mt40: {marginTop: '40%'},
  mt50: {marginTop: '50%'},
});
