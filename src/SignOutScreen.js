import React from "react";
import { onSignOut } from "../services/auth";

export default class SignOutScreen extends React.Component {
  componentDidMount() {
    onSignOut().then(resp => {
        if(resp === 'ok'){
            this.props.screenProps.signed(false);
        }
    })
  }
  render() {
    return null;
  }
}
