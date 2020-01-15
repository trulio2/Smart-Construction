import React from "react";
import { Text } from "react-native";
import { Header, Left, Icon } from "native-base";

export default class HeaderScreen extends React.Component {
  render() {
    return (
      <Header style={{ alignItems: "center", height: 65 }}>
        <Left style={{ right: 100, top: 10 }}>
          <Icon
            name="menu"
            style={{color: 'white', position: 'absolute', top: -10}}
            onPress={() => this.props.navigation.openDrawer()}
          />
        </Left>
        <Text style={{ top: 33, fontSize: 20, color: "white", position: "absolute"}}>
          {this.props.name}
        </Text>
      </Header>
    );
  }
}
