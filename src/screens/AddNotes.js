import React, {Component} from 'react';
import {Text, StyleSheet, View, SafeAreaView, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {Notes} from '../modules/main';
class AddNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {notes: [], title: '', description: ''};
  }
  handleNote = () => {
    const data = {title: this.state.title, description: this.state.description};
    this.props.Notes(data, this.props.loginId);
    this.props.navigation.navigate('Notes');
  };
  render() {
    const {password, description} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.addNotesContainer}>
          <Text style={styles.addNotesText}> Add Notes </Text>
        </View>
        <View style={styles.title}>
          <TextInput
            value={password}
            placeholder={'Add Titile'}
            style={styles.titleTextInput}
            onChangeText={(text) => this.setState({title: text})}
          />
        </View>
        <View style={styles.description}>
          <TextInput
            value={description}
            placeholder={'Add Titile'}
            onChangeText={(text) => this.setState({description: text})}
            style={styles.descriptionTextInput}
          />
        </View>
        <TouchableOpacity
          style={styles.addNoteButton}
          onPress={() => this.handleNote()}>
          <Text style={styles.addNoteButtonText}>Add Note</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  addNotesContainer: {marginTop: 30},
  addNotesText: {fontSize: 50, color: 'purple'},
  title: {marginTop: 30, backgroundColor: 'lavender'},
  titleTextInput: {
    height: 50,
    width: 300,
    borderWidth: 2,
    borderColor: 'purple',
    paddingLeft: 20,
  },
  description: {backgroundColor: 'lavender', marginTop: 30},
  descriptionTextInput: {
    height: 200,
    width: 300,
    borderWidth: 2,
    borderColor: 'purple',
    paddingLeft: 20,
  },
  addNoteButton: {
    marginTop: 30,
    backgroundColor: 'lavender',
    width: 150,
    borderWidth: 2,
    borderColor: 'purple',
    alignItems: 'center',
  },
  addNoteButtonText: {fontSize: 30},
});

const mapStateToProps = (state) => {
  return {
    loginId: state.loginId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  Notes: (data, id) => dispatch(Notes(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNotes);
