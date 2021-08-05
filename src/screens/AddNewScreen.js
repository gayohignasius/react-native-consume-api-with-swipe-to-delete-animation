import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as photoActions from '../redux/actions/photo-actions';

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#c1c1c1',
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 8,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 100,
    marginHorizontal: 20,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: '#3edbf0',
    bottom: 300,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    padding: 24,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 14,
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 5,
  },
});

const AddNewScreen = props => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onAddNewPressed = useCallback(async () => {
    if (title === '' || imageUrl === '') {
      Alert.alert('Warning', 'Fill the form!', [
        {text: 'OK', onPress: () => console.log('OK')},
      ]);
    } else {
      setIsLoading(true);

      await dispatch(photoActions.addPhotos(title, imageUrl));
      setIsLoading(false);

      Alert.alert('Information', 'Item successfully added!', [
        {text: 'OK', onPress: () => console.log('OK')},
      ]);

      props.navigation.goBack();
    }
  }, [title, imageUrl, dispatch, props.navigation]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.formContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput
            placeholder="Title"
            style={styles.textInput}
            onChangeText={text => setTitle(text)}
            value={title}
          />
          <TextInput
            placeholder="Image Url"
            style={styles.textInput}
            onChangeText={text => setImageUrl(text)}
            value={imageUrl}
          />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={onAddNewPressed} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddNewScreen;
