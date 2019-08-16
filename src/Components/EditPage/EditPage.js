import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Head from "./Head";
import Form from "./Form";
class EditPage extends Component {
  constructor(props){
    super(props);
    this.state={}
}
  render() {
    return (
      <View>
        <Head/>
        <Form/>
      </View>
    )
  }
}

export default EditPage;