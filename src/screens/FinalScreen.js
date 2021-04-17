import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import {Delete, NotesGet} from '../modules/main/actions';
class FinalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
    };
  }
  componentDidMount() {
    this.Animation();
    this.props.Delete();
  }
  Animation = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(),
    );
  };
  deleteData = (noteid) => {
    this.props.Delete(this.props.id, noteid);
    this.props.NotesGet(this.props.id);
  };

  DataStyling = ({item}) => {
    return (
      <>
        <Animated.View
          style={[
            styles.dataConatiner,
            {
              transform: [{scaleX: this.state.fadeAnim}],
            },
          ]}>
          <View style={styles.box}>
            <Text style={styles.txt}>{item.data}</Text>
            <TouchableOpacity onPress={() => this.deleteData(item.id)}>
              <Icons name={'close-circle-outline'} size={40} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </>
    );
  };

  render() {
    const {item} = this.props.route.params;
    let Data;
    if (this.props.data !== undefined) {
      Data = this.props.data.filter((data) => data.title === item.title);
    }

    return (
      <>
        <SafeAreaView />
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Icons name={'caret-back-outline'} size={50} color={'blue'} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: this.state.fadeAnim,
              },
            ]}>
            <Text style={styles.headerTxt}>{item.title}</Text>
            <View style={styles.headerTxtCounts}>
              <Text style={styles.headerTxt}>{Data.length}</Text>
            </View>
          </Animated.View>
          <FlatList
            data={Data}
            renderItem={this.DataStyling}
            keyExtractor={(key) => key.id}
          />
          {console.log('data', item)}
          {console.log('NOTSGS', this.props.data)}
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 20,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 30,
  },
  headerTxt: {
    fontSize: 40,
    color: 'red',
    fontWeight: '800',
  },
  headerTxtCounts: {
    borderColor: '#f5afc0',
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 23,
    paddingRight: 23,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f5afc0',
  },
  txt: {
    color: 'purple',
    fontSize: 40,
    marginLeft: 30,
  },
  dataConatiner: {
    margin: 20,
  },
  box: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginRight: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    id: state.loginId,
    data: state.data,
  };
};
const mapDispatchToProps = (dispatch) => ({
  NotesGet: (id) => dispatch(NotesGet(id)),
  Delete: (id, noteid) => dispatch(Delete(id, noteid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FinalScreen);
