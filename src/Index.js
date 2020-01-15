import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage
} from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { LinearGradient } from "expo-linear-gradient";
import { createAppContainer } from "react-navigation";
import { isSignedIn } from "../services/auth";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import ChartScreen from "./ChartScreen";
import SignOutScreen from "./SignOutScreen";
import PlacesScreen from "./PlacesScreen";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signed: false,
      loaded: false,
      userId: ""
    };
    this.isSigned();
    this.getId();
  }
  getId = async () => {
    let userId = await AsyncStorage.getItem("id");
    this.setState({ userId });
  };
  isSigned = async () => {
    let signed = await isSignedIn();
    this.setState({ signed }, () => {
      this.setState({ loaded: true });
    });
  };
  signed = signed => {
    this.setState({ signed });
  };
  render() {
    if (this.state.loaded) {
      if (this.state.signed) {
        return <NavigatorSigned screenProps={this} />;
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
    <LinearGradient
      colors={["#412e2e", "#01010d"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <View
          style={{
            heght: 150,
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
    </LinearGradient>
  );
};
const AppDrawerNavigatorSigned = createDrawerNavigator(
  {
    Início: HomeScreen,
    Gráficos: ChartScreen,
    Obras: PlacesScreen,
    Sair: SignOutScreen
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: "orange",
      inactiveTintColor: "white"
    }
  }
);
const NavigatorSigned = createAppContainer(AppDrawerNavigatorSigned);
