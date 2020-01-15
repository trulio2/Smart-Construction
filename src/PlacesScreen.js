import React from "react";
import { View, StyleSheet, ScrollView, Text, Picker } from "react-native";
import HeaderScreen from "./HeaderScreen";
import MapView from "react-native-maps";
import { apiBackEnd } from "../Variables";

export default class PlacesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      userId: this.props.screenProps.state.userId,
      loadedEquips: false,
      loadedPlaces: false,
      equips: [],
      places: [],
      place: "",
      placeId: "",
      placeEquips: []
    };
  }
  componentDidMount() {
    this.getPlaces();
    this.getEquips();
  }
  getEquips() {
    try {
      fetch(apiBackEnd + "getEquips", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          userId: this.state.userId
        })
      })
        .then(res => res.json())
        .then(res => {
          this.setState({ equips: res }, () => {
            this.setState({ loadedEquips: true });
          });
        })
        .catch(error => {
          this.setState({ loadedEquips: true });
        });
    } catch (e) {
      this.setState({ loadedEquips: true });
    }
  }
  getPlaces() {
    this.setState({ loadedPlaces: false });
    try {
      fetch(apiBackEnd + "getPlaces", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          userId: this.state.userId
        })
      })
        .then(res => res.json())
        .then(res => {
          var places = [];
          if (res.length > 0) {
            res.forEach(place => {
              places.push({
                name: place.name,
                id: place.id,
                coords: place.coords,
                radius: place.radius,
                points: place.points,
                newBegin: place.newBegin === null ? "00:00" : place.newBegin,
                newBeginInterval:
                  place.newBeginInterval === null
                    ? "00:00"
                    : place.newBeginInterval,
                newEnd: place.newEnd === null ? "00:00" : place.newEnd,
                newEndInterval:
                  place.newEndInterval === null
                    ? "00:00"
                    : place.newEndInterval,
                satChecked:
                  place.satChecked === null
                    ? false
                    : place.satChecked === 1
                    ? true
                    : false,
                newSatBegin:
                  place.newSatBegin === null ? "00:00" : place.newSatBegin,
                newSatEnd: place.newSatEnd === null ? "00:00" : place.newSatEnd,
                sunChecked:
                  place.sunChecked === null
                    ? false
                    : place.sunChecked === 1
                    ? true
                    : false,
                newSunBegin:
                  place.newSunBegin === null ? "00:00" : place.newSunBegin,
                newSunEnd: place.newSunEnd === null ? "00:00" : place.newSunEnd
              });
            });
          }
          this.setState(
            {
              places: places
            },
            () => {
              this.setState({
                loadedPlaces: true
              });
            }
          );
        })
        .catch(error => {
          this.setState({ loadedPlaces: true });
        });
    } catch (e) {
      this.setState({ loadedPlaces: true });
    }
  }
  handlePlaceSelected = place => {
    this.setState({ placeId: place });
    let placeEquips = [];
    this.state.places.forEach(elem => {
      if (elem.id === place) {
        this.setState({
          place: elem.name,
          latitude: parseFloat(elem.coords.split(",")[0]),
          longitude: parseFloat(elem.coords.split(",")[1])
        });
      }
    });
    this.state.equips.forEach(elem => {
      if (elem.place === place) placeEquips.push(elem);
    });
    this.setState({ placeEquips });
  };
  render() {
    if (!this.state.loadedEquips || !this.state.loadedPlaces) return null;
    return (
      <View style={{ flex: 1 }}>
        <View>
          <HeaderScreen {...this.props} name={"Obras"} />
        </View>
        <ScrollView>
          <Picker
            selectedValue={this.state.place}
            style={{ height: 50, width: 200 }}
            onValueChange={place => this.handlePlaceSelected(place)}
          >
            <Picker.Item label="Escolha a Obra" value="" />
            {this.state.places.map((place, index) => {
              return (
                <Picker.Item label={place.name} value={place.id} key={index} />
              );
            })}
          </Picker>
          <Text>{this.state.place}</Text>
          {this.state.placeId !== "" && (
            <View>
              <Text style={{ marginTop: 10 }}>Equipamentos</Text>
              {this.state.placeEquips.map((equip, index) => {
                return <Text key={index}>{equip.name}</Text>;
              })}
            </View>
          )}
        </ScrollView>
        {this.state.placeId !== "" && (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }}
              />
            </MapView>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: "45%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    top: 25
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
