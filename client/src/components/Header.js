import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <a className="header__link" href="/auth/google">Log in</a>
        );
      default:
        return (
          <a className="header__link" href="/api/logout">Log out</a>
        );
    };
  };
  render() {
    return (
      <header className="header">
        <div className="header__content">
          <div className="header__title"><span>Henry</span>URL</div>
          {this.renderContent()}
        </div>
      </header>
    );
  };
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Header);