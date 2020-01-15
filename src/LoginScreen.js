import React from "react";
import { Image, KeyboardAvoidingView, Keyboard } from "react-native";
import { Input, Text, theme } from "galio-framework";
import { Button } from "react-native-elements";
import { onSignIn, isSignedIn } from "../services/auth";
const logo = require("../assets/logo.png");

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      msg: "",
      signed: false,
      loaded: false,
      disabled: false
    };
  }
  componentDidMount = () => {
    isSignedIn().then(res => {
      this.setState({ signed: res }, () => {
        if (this.state.signed) this.props.navigation.navigate("HomeScreen");
        else this.setState({ loaded: true });
      });
    });
  };
  handleSignIn = () => {
    if (this.state.user !== "" && this.state.password !== "")
      onSignIn(this.state.user, this.state.password).then(response => {
        if (response === "ok") {
          this.props.signed(true);
        } else {
          this.setState({ msg: "Falha ao Entrar" });
          this.setState({ disabled: false });
        }
      });
    else {
      this.setState({ msg: "Preencha Todos os Campos" });
      this.setState({ disabled: false });
    }
  };
  render() {
    if (!this.state.loaded) {
      return null;
    }
    if (!this.state.disabled) {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Image
            style={{
              width: 170,
              height: 150
            }}
            source={logo}
          />
          <Text style={{ bottom: 20, fontSize: 16, fontWeight: "bold" }}>
            Smart Construction
          </Text>
          <Text style={{ alignSelf: "center", color: "red" }}>
            {this.state.msg}
          </Text>
          <Input
            placeholder="Usuário"
            value={this.state.user}
            rounded
            style={{ width: 300 }}
            onChangeText={user => this.setState({ user })}
          />
          <Input
            placeholder="Senha"
            value={this.state.password}
            rounded
            password
            viewPass
            style={{ width: 300 }}
            onChangeText={password => this.setState({ password })}
          />
          <Button
            disabled={this.state.disabled}
            buttonStyle={{
              backgroundColor: "#3897f1",
              borderRadius: 5,
              height: 45,
              width: 125,
              marginTop: 10
            }}
            onPress={() => {
              Keyboard.dismiss();
              this.setState({ disabled: true });
              this.handleSignIn();
            }}
            title="Entrar"
          />
        </KeyboardAvoidingView>
      );
    } else
      return (
        <KeyboardAvoidingView
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Image
            style={{
              width: 170,
              height: 150
            }}
            source={logo}
          />
        </KeyboardAvoidingView>
      );
  }
}
