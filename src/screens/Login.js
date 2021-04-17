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
import {loginUser} from '../modules/main';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      secureTextEntry: true,
      login: false,
      userDetails: [],
    };
  }
  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '591594614260-k38mmhmktuphm3bt7d8bni64nnsii126.apps.googleusercontent.com',
    });
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userDetails: userInfo.user, login: true});
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        alert('error');
      }
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({userDetails: null, login: false});
    } catch (error) {
      console.error(error);
    }
  };

  handleLogin = () => {
    const data = {username: this.state.username, password: this.state.password};
    this.props
      .loginUser(data)
      .then((val) => this.props.navigation.navigate('Notes'));
  };

  render() {
    const {username, password} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.loginText}>Login</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userIconContainer}>
          <Ionicons
            style={styles.userIcon}
            name={'person-circle-outline'}
            size={100}
            color={'lightgrey'}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder={'Username  or  email  address'}
            value={username}
            onChangeText={(text) => this.setState({username: text})}
            style={styles.textInput}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder={'Password'}
              value={password}
              style={styles.textInput}
              secureTextEntry={this.state.secureTextEntry}
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
          </View>
        </View>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.handleLogin()}>
            <Ionicons
              style={styles.checkIcon}
              name={'checkmark-outline'}
              size={30}
              color={'blue'}
            />
            <Text style={styles.loginButtonText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginWith}>
          <Text>Login with</Text>
        </View>
        <View style={styles.loginWithIocns}>
          <TouchableOpacity onPress={this.signIn}>
            <Image
              source={require('../assets/googleIcon.png')}
              style={styles.googleIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/githubIcon.png')}
              style={styles.githubIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/twitterIcon2.jpeg')}
              style={styles.twitterIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/fbIcon2.png')}
              style={styles.fbIcon}
            />
          </TouchableOpacity>
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
  loginText: {fontWeight: 'bold', fontSize: 30},
  signupText: {fontWeight: 'bold', fontSize: 25, color: 'gray'},
  userIconContainer: {alignItems: 'center', marginTop: 20},
  userIcon: {},
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
  checkIcon: {marginTop: 3},
  loginButtonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  loginButton: {
    flexDirection: 'row',
    borderWidth: 0.8,
    borderColor: '#f0f8ff',
    width: 250,
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: 'grey',
    shadowOpacity: 2,
    shadowOffset: {height: 5, width: 5},
    // shadowRadius: 5,
  },
  loginButtonText: {fontSize: 30, marginLeft: 10, color: 'blue'},
  loginWith: {alignItems: 'center', marginTop: 100},
  loginWithIocns: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  googleIcon: {height: 60, width: 60, marginRight: 20},
  fbIcon: {height: 50, width: 50, marginRight: 20, marginTop: 5},
  twitterIcon: {height: 65, width: 65, marginRight: 20},
  githubIcon: {height: 50, width: 50, marginRight: 20, marginTop: 3},
});

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (data) => dispatch(loginUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
