import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ShortenerModal from './ShortenerModal';
import { setUrls } from '../actions/urls';
import { removeCopiedId } from '../actions/copiedId';

class ShortenerForm extends Component {
  state = {
    longUrl: '',
    shortUrl: '',
    copied: false,
    modalIsOpen: false
  };

  handleChange = (e) => {
    const longUrl = e.target.value;
    this.setState(() => ({ longUrl }));
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/url/shorten', {
      longUrl: this.state.longUrl,
      auth: this.props.auth 
    })
    const shortUrl = res.data.shortUrl;
    this.setState(() => ({ shortUrl }));
    this.setState(() => ({ modalIsOpen: true }));
    this.setState(() => ({ copied: false }));
    this.props.setUrls();
  };

  closeModal = () => {
    this.setState(() => ({ modalIsOpen: false }));
    this.setState(() => ({ longUrl: '' }));
  };

  copyUrl = () => {
    let input = document.createElement('input');
    document.body.appendChild(input);
    input.value = document.getElementById('shortUrl').textContent;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    input.remove();
    this.setState(() => ({ copied: true }));
    this.props.removeCopiedId();
  };

  render() {
    return (
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">
            Simplify your links
          </h1>
          <form className="form" autoComplete="off" onSubmit={this.handleSubmit}>
            <input
              id="longUrl"
              type="text"
              name="longUrl"
              placeholder="Enter your URL here"
              className="text-input"
              value={this.state.longUrl}
              onChange={this.handleChange}
            />
            <input type="submit" value="SHORTEN URL" className="button" />
          </form>
        </div>
        <ShortenerModal
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          copyUrl={this.copyUrl}
          longUrl={this.state.longUrl}
          shortUrl={this.state.shortUrl}
          copied={this.state.copied}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  setUrls: () => dispatch(setUrls()),
  removeCopiedId: () => dispatch(removeCopiedId())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortenerForm);