import React from "react";
import { Text } from "galio-framework";
import { ScrollView, View, AsyncStorage } from "react-native";
import HeaderScreen from "./HeaderScreen";
import { isSignedIn } from "../services/auth";
import { apiBackEnd } from "../Variables";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      id: "",
      equips: [],
      places: [],
      modems: [],
      equipLoaded: false,
      placeLoaded: false,
      modemLoaded: false
    };
  }
  componentDidMount = () => {
    this.isSigned();
    AsyncStorage.getItem("id").then(res => {
      this.setState({ id: res }, () => {
        this.getEquips();
        this.getPlaces();
        this.getModems();
      });
    });
  };
  getEquips = () => {
    this.setState({ equipLoaded: false });
    fetch(apiBackEnd + "getEquips", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId: this.state.id
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ equips: res }, () => {
          this.setState({ equipLoaded: true });
        });
      })
      .catch(error => {
        this.setState({ equipLoaded: true });
      });
  };
  getPlaces = () => {
    this.setState({ placeLoaded: false });
    fetch(apiBackEnd + "getPlaces", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId: this.state.id
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ places: res }, () => {
          this.setState({ placeLoaded: true });
        });
      })
      .catch(error => {
        this.setState({ placeLoaded: true });
      });
  };
  getModems = () => {
    this.setState({ modemLoaded: false });
    fetch(apiBackEnd + "getModems", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId: this.state.id
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ modems: res }, () => {
          this.setState({ modemLoaded: true });
        });
      })
      .catch(error => {
        this.setState({ modemLoaded: true });
      });
  };
  isSigned = () => {
    isSignedIn().then(res => {
      this.setState({ signed: res }, () => {
        if (this.state.signed) this.setState({ loaded: true });
        else this.props.navigation.navigate("LoginScreen");
      });
    });
  };
  signOut = () => {
    this.isSigned();
  };
  render() {
    if (
      !this.state.loaded ||
      !this.state.equipLoaded ||
      !this.state.placeLoaded ||
      !this.state.modemLoaded
    ) {
      return <Text>...</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <HeaderScreen {...this.props} name={'Início'} />
        <ScrollView>
          {this.state.equips.map((equip, index) => {
            return <Text key={index}>{equip.name}</Text>;
          })}
          {this.state.places.map((place, index) => {
            return <Text key={index}>{place.name}</Text>;
          })}
          {this.state.modems.map((modem, index) => {
            return <Text key={index}>{modem.name}</Text>;
          })}
        </ScrollView>
      </View>
    );
  }
}
