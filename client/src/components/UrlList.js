import React from 'react';
import { connect } from 'react-redux';
import UrlListItem from './UrlListItem';

const UrlList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div style={{ width: "40%" }}>Original URL</div>
      <div style={{ width: "15%" }}>Created</div>
      <div style={{ width: "38%" }}>Short URL</div>
      <div style={{ width: "5%" }}>Clicks</div>
      <div style={{ width: "2%" }}></div>
    </div>
    <div className="list-body">
      {
        props.urls.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No URLs</span>
          </div>
        ) : (
          props.urls.map((url) => {
            return <UrlListItem key={url._id} {...url} />;
          })   
        )
      }
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  urls: state.urls
});

export default connect(mapStateToProps)(UrlList);