import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  updateName,
  updateCompanyDomain,
  fetchEmail
} from "../reducers/email-reducer";

class DataInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      domain: ""
    };

    this.handleUpdateName = this.handleUpdateName.bind(this);
    this.handleUpdateDomain = this.handleUpdateDomain.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  handleUpdateName = event => {
    this.setState({ name: event.target.value });
    this.props.actions.updateName(event.target.value);
    this.updateEmail();
  };

  handleUpdateDomain = event => {
    this.setState({ domain: event.target.value });
    this.props.actions.updateCompanyDomain(event.target.value);
    this.updateEmail();
  };

  updateEmail = () => {
    const name = this.state.name;
    const domain = this.state.domain;
    this.props.actions.fetchEmail(name, domain);
  };

  render() {
    console.log(this.props.email);
    return (
      <div>
        <input
          onChange={this.handleUpdateName}
          placeholder={"Name"}
          value={this.state.name}
        />
        <input
          onChange={this.handleUpdateDomain}
          placeholder={"Domain Name"}
          value={this.state.domain}
        />
        <span>{this.props.email.error && this.props.email.error}</span>
        <span>
          {this.props.email.email && this.props.email.email}
        </span>
      </div>
    );
  }
}

DataInputs.propTypes = {
  actions: PropTypes.object.isRequired,
  email: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    email: state.email
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { updateName, updateCompanyDomain, fetchEmail },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataInputs);
