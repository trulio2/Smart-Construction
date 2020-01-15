import React from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { isSignedIn } from "../services/auth";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import ChartScreen from "./ChartScreen";
import SignOutScreen from "./SignOutScreen";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signed: false,
      loaded: false
    };
    this.isSigned();
  }
  isSigned = async () => {
    let signed = await isSignedIn();
    this.setState({ signed }, () => {
        this.setState({loaded: true})
    });
  };
  signed = signed => {
    this.setState({ signed });
  };
  render() {
    if (this.state.loaded) {
      if (this.state.signed) {
        return <NavigatorSigned screenProps={this}/>;
      } else {
        return <LoginScreen {...this} />;
      }
    } else {
      return null;
    }
  }
}
const CustomDrawerComponent = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          heght: 150,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{ height: 120, width: 160, borderRadius: 60 }}
        />
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};
const AppDrawerNavigatorSigned = createDrawerNavigator(
  {
    Início: HomeScreen,
    Gráficos: ChartScreen,
    Sair: SignOutScreen
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: "orange"
    }
  }
);
const NavigatorSigned = createAppContainer(AppDrawerNavigatorSigned);