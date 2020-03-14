import React from 'react';
import { connect } from 'react-redux';
import UrlListItem from './UrlListItem';

const UrlList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">URLs</div>
      <div className="list_divider_1 show-for-desktop">Original URL</div>
      <div className="list_divider_2 show-for-desktop">Created</div>
      <div className="list_divider_3 show-for-desktop">Short URL</div>
      <div className="list_divider_4 show-for-desktop">Clicks</div>
      <div className="list_divider_5 show-for-desktop"></div>
    </div>
    <div className="list-body">
      {
        props.auth === false ? (
          <div className="list-item list-item--message">
            <span>Log in to track your URLs</span>
          </div>
        ) : (
          props.urls.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No URLs</span>
            </div>
          ) : (
            props.urls.map((url) => {
              return <UrlListItem key={url._id} {...url} />;
            })
          )
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  urls: state.urls,
  auth: state.auth
});

export default connect(mapStateToProps)(UrlList);