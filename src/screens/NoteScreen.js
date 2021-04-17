import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Modal,
  FlatList,
  RefreshControl,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Ionicons';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {Notes, NotesGet} from '../modules/main/actions';

class NoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      data: '',
      notes: {},
      listcontant: [],
      isRefreshing: false,
    };
    this.props.NotesGet(this.props.id);
  }
  componentDidUpdate(prevProp) {
    if (this.props.data !== prevProp.data) {
      this.render();
    }
  }

  componentDidMount() {
    this.props.NotesGet(this.props.id);
    this.result();
  }
  result = () =>
    this.props.data.reduce((accumulator, currentValue) => {
      var newtitle = currentValue.title;
      var data = currentValue.data;
      var flag = true;
      accumulator.map((item, index) => {
        if (newtitle === item.title) {
          flag = false;
          accumulator[index].data.push(data);
        }
      });
      if (flag) {
        accumulator.push({title: newtitle, data: [data]});
      }
      return accumulator;
    }, this.state.listcontant);
  refreshList = (refresh) => {
    this.setState({
      isRefreshing: refresh,
    });
  };

  renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.listItemContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('FinalScreen', {item})
            }>
            <View style={styles.data}>
              <Text style={styles.txt}>{item.title}</Text>
              <View style={styles.count}>
                <Text style={styles.counttxt}>{item.data.length}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <>
        <SafeAreaView />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.firstHeaderTxt}>MY</Text>
            <Text style={styles.secondheaderTxt}>Notes</Text>
          </View>
          <View style={styles.listConatiner}>
            <FlatList
              data={
                this.state.listcontant !== null
                  ? this.state.listcontant
                  : this.props.data
              }
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => {
                    this.refreshList(true);
                    this.props.NotesGet(this.props.id);
                    setTimeout(() => {
                      this.refreshList(false);
                    }, 1000);
                  }}
                />
              }
            />
          </View>

          <View style={styles.bottomContainer}>
            <View>
              <TouchableOpacity>
                <Icons name={'menu'} size={60} color={'darkblue'} />
                <Text style={styles.icontxt}>Menu</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.plusIcon}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddNotes')}>
                <PlusIcon name={'pluscircle'} size={70} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.data,
    id: state.loginId,
  };
};
const mapDispatchToProps = (dispatch) => ({
  NotesGet: (id) => dispatch(NotesGet(id)),
  Notes: (data, id) => dispatch(Notes(data, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NoteScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  icontxt: {
    fontSize: 20,

    color: 'red',
    marginLeft: 10,
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    marginLeft: 30,
  },
  firstHeaderTxt: {
    fontSize: 40,
    color: 'red',
    fontWeight: '800',
  },

  plusIcon: {
    margin: 20,
  },
  secondheaderTxt: {
    color: 'darkblue',
    fontSize: 40,

    fontWeight: '800',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 50,
  },

  title: {
    fontSize: 20,
  },
  titleContainer: {
    margin: 12,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    height: 60,
  },
  note: {
    fontSize: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  noteContainer: {
    height: 300,
    borderWidth: 2,
    margin: 12,
    padding: 15,
    borderRadius: 10,
  },

  Modalcontainer: {
    marginTop: 60,
  },

  listConatiner: {
    height: 550,
  },
  listItemContainer: {
    marginTop: 50,
  },
  txt: {
    fontSize: 30,
    color: 'purple',
    fontWeight: '700',
    marginLeft: 30,
  },
  submitIcon: {
    alignSelf: 'center',
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
  },

  count: {
    borderColor: 'purple',
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 23,
    paddingRight: 23,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'lavender',
  },
  counttxt: {
    fontWeight: '500',
    fontSize: 28,
    color: 'purple',
  },
});
