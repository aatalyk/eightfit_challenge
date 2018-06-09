import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Image, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { Button, Header, TextInput } from '../components/common';
import { images } from '../assets';
import { OnboardingRoutes } from '../components/navigation';
import { setAge } from '../actions';

class AgeEntryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <Header progress={0.75} onBackButtonPress={() => navigation.goBack()} />,
  });

  state = {
    age: undefined,
    errorMessage: '',
  };

  onChangeAge = (text) => {
    const age = !isNaN(text) && Number(text);
    this.setState({ age, errorMessage: '' });
  };

  onContinueButtonPress = () => {
    const { age } = this.state;
    const errorMessage = age < 13 ? 'You must be at least 13 years old' : '';
    this.setState({ errorMessage });

    if (!errorMessage) {
      this.props.setAge(age);
      this.props.navigation.navigate(OnboardingRoutes.HeightEntry);
    }
  };

  render() {
    const { age, errorMessage } = this.state;
    const keyboardBehavior = Platform.OS === 'ios' && 'position';

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>How old are you</Text>
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          <TextInput
            onChangeText={this.onChangeAge}
            value={age ? `${age}` : ''}
            title={'Years'}
            style={styles.textInput}
          />
        </View>
        <KeyboardAvoidingView behavior={keyboardBehavior} keyboardVerticalOffset={64}>
          <Button
            onPress={this.onContinueButtonPress}
            disabled={!this.state.age}
            title="Continue"
            style={{ marginBottom: 20 }}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  inputContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  textInput: {
    marginHorizontal: 25,
  },
});

export const AgeEntry = connect(null, { setAge })(AgeEntryScreen);
