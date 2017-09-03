import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StyleSheet, css } from "aphrodite";

import {
  updateName,
  updateCompanyDomain,
  fetchEmail,
  sendError
} from "../reducers/email-reducer";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Helvetica Neue", Helvetica, Verdana, Geneva, sans-serif'
  },
  block: {
    flex: 1,
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "left",
    margin: "1rem",
    width: "100wv",
    maxWidth: "30rem"
  },
  inputLabel: {
    flex: "1 1 100%"
  },
  inputs: {
    flex: "1 0 100%",
    border: "1px solid #000000",
    padding: "0.5rem",
    margin: "0.5rem",
    width: "100vw",
    boxSizing: "border-box",
    maxWidth: "30rem",
    clear: "both"
  }
});

const InputWithLabel = ({ onChange, value, label }) => {
  return (
    <div className={css(styles.block)}>
      <label
        className={css(styles.inputLabel)}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className={css(styles.inputs)}
        id={label.replace(/\W/, '')}
        onChange={onChange}
        placeholder={label}
        value={value}
      />
    </div>
  );
};
InputWithLabel.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export class CheckEmail extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdateName = this.handleUpdateName.bind(this);
    this.handleUpdateDomain = this.handleUpdateDomain.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  handleUpdateName = event => {
    const name = event.target.value;
    this.props.actions.updateName(name);
    this.updateEmail(name, this.props.email.domain);
  };

  handleUpdateDomain = event => {
    const domain = event.target.value;
    this.props.actions.updateCompanyDomain(domain);
    this.updateEmail(this.props.email.name, domain);
  };

  updateEmail = (name, domain) => {
    if (this.validDomain(domain)) {
      this.props.actions.fetchEmail(name, domain);
    } else if (!name) {
      this.props.actions.sendError("Missing Name");
    } else {
      this.props.actions.sendError("Invalid Domain");
    }
  };

  validDomain = domain => {
    return !!domain.match(/[\w]+(?:\.[\w]+)/);
  };

  render() {
    return (
      <div className={css(styles.container)}>
        <InputWithLabel
          label="Full Name"
          onChange={this.handleUpdateName}
          value={this.props.email.name}
        />
        <InputWithLabel
          label="Domain Name"
          onChange={this.handleUpdateDomain}
          value={this.props.email.domain}
        />

        {this.props.email.error && (
          <div className={css(styles.block)}>{this.props.email.error}</div>
        )}
        {this.props.email.email && (
          <div className={css(styles.block)}>{this.props.email.email}</div>
        )}
      </div>
    );
  }
}

CheckEmail.propTypes = {
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
      { updateName, updateCompanyDomain, fetchEmail, sendError },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckEmail);
