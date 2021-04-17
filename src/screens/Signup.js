import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {signupUser} from '../modules/main';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      secureTextEntry: true,
    };
  }

  handleSignup = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.username,
      phoneNumber: 9999373232,
      socialId: null,
    };
    this.props.signupUser(data);
  };
  render() {
    const {email, username, password, repeatPassword} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.signupText}>Signup</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cameraIconContainer}>
          <Ionicons
            style={styles.cameraIcon}
            name={'md-camera'}
            size={100}
            color={'lightgrey'}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            value={email}
            placeholder={'Email  address'}
            style={styles.textInput}
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            value={username}
            placeholder={'Username'}
            style={styles.textInput}
            onChangeText={(text) => this.setState({username: text})}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              placeholder={'Password'}
              secureTextEntry={this.state.secureTextEntry}
              style={styles.textInput}
              onChangeText={(text) => this.setState({password: text})}
            />
            <TouchableOpacity
              style={styles.eyeIconButton}
              onPress={() =>
                this.setState({secureTextEntry: !this.state.secureTextEntry})
              }>
              <Ionicons
                style={styles.eyeIcon}
                name={'eye-outline'}
                color={'grey'}
                size={25}
              />
            </TouchableOpacity>
            <TextInput
              value={repeatPassword}
              placeholder={'Repeat Password'}
              secureTextEntry={this.state.secureTextEntry}
              style={styles.textInput}
              onChangeText={(text) => this.setState({repeatPassword: text})}
            />
            <TouchableOpacity
              style={styles.eyeIconButton2}
              onPress={() =>
                this.setState({secureTextEntry: !this.state.secureTextEntry})
              }>
              <Ionicons
                style={styles.eyeIcon2}
                name={'eye-outline'}
                color={'grey'}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signupButtonContainer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => this.handleSignup()}>
            <Ionicons
              style={styles.checkIcon}
              name={'checkmark-outline'}
              size={30}
              color={'blue'}
            />
            <Text style={styles.signupButtonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Terms of Service</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  signupText: {fontWeight: 'bold', fontSize: 30},
  loginText: {fontWeight: 'bold', fontSize: 25, color: 'gray'},
  cameraIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'lightgrey',
    marginTop: 20,
    width: 120,
    height: 120,
    marginLeft: 160,
    borderRadius: 60,
  },
  cameraIcon: {},
  textInputContainer: {alignItems: 'center', marginTop: 20},
  textInput: {
    width: 250,
    height: 40,
    borderBottomWidth: 2,
    marginVertical: 10,
    borderColor: 'lightgrey',
  },
  passwordContainer: {},
  eyeIconButton: {position: 'absolute', right: 0, top: 15},
  eyeIcon: {},
  eyeIconButton2: {position: 'absolute', right: 0, top: 76},
  checkIcon: {marginTop: 3},
  signupButtonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  signupButton: {
    flexDirection: 'row',
    borderWidth: 0.8,
    borderColor: '#f0f8ff',
    width: 250,
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: 'grey',
    shadowOpacity: 2,
    shadowOffset: {height: 5, width: 5},
  },
  signupButtonText: {fontSize: 30, marginLeft: 10, color: 'blue'},
  footer: {alignItems: 'center', marginTop: 100},
  footerText: {color: 'grey'},
});

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signupUser: (data) => dispatch(signupUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
