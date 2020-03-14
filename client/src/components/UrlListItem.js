import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { setUrls } from '../actions/urls';
import { setCopiedId } from '../actions/copiedId'; 

const UrlListItem = ({ _id, longUrl, shortUrl, createdAt, clicks, copiedId, auth, setCopiedId, setUrls }) => { 
  const id = _id;

  const copyUrl = () => {
    let input = document.createElement('input');
    document.body.appendChild(input);
    input.value = document.getElementById(id).textContent;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    input.remove();
    setCopiedId(id);
  };

  const removeItem = async () => {
    await axios.post('/api/url/remove', {
      longUrl,
      auth
    });
    setUrls();
  }

  return (
    <div className="list-item">
      <div className="list_divider_1">
        <a style={{ textDecoration: "none" }} href={longUrl} target="_blank" rel="noopener noreferrer">
          <div className="list-item__link">{longUrl}</div>
        </a>
      </div>
      <div className="list_divider_2">
        <div className="list-item__text">{moment(createdAt).format('MMM Do, YYYY')}</div>
      </div>
      <div className="list-item__text-container list_divider_3">
        <a style={{ textDecoration: "none" }} href={shortUrl} target="_blank" rel="noopener noreferrer">
          <div id={id} className="list-item__link">{shortUrl}</div>
        </a>
        <div className="list-item__button-container">
          <button className="list-item__copy-button" onClick={copyUrl}>
            <svg height="14pt" viewBox="-40 0 512 512" width="14pt" xmlns="http://www.w3.org/2000/svg"><path d="m271 512h-191c-44.113281 0-80-35.886719-80-80v-271c0-44.113281 35.886719-80 80-80h191c44.113281 0 80 35.886719 80 80v271c0 44.113281-35.886719 80-80 80zm-191-391c-22.054688 0-40 17.945312-40 40v271c0 22.054688 17.945312 40 40 40h191c22.054688 0 40-17.945312 40-40v-271c0-22.054688-17.945312-40-40-40zm351 261v-302c0-44.113281-35.886719-80-80-80h-222c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h222c22.054688 0 40 17.945312 40 40v302c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm0 0" /></svg>
          </button>
          {
            copiedId === id ? (
              <div className="list-item__copy-message-2">Copied!</div>
            ) : (
              <div className="list-item__copy-message">Copy short URL</div>
            )
          }
        </div>
      </div>
      <div className="list_divider_4">
        <div className="list-item__statistic"><span className="show-for-mobile">Clicks: </span>{clicks}</div>
      </div>
      <div className="list_divider_5">
        <div className="list-item__button-container">
          <button className="list-item__remove-button" onClick={removeItem}>
            <svg height="14pt" viewBox="0 0 512 512" width="14pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 512c-141.160156 0-256-114.839844-256-256s114.839844-256 256-256 256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688s98.4375 219.429688 219.429688 219.429688 219.429688-98.4375 219.429688-219.429688-98.4375-219.429688-219.429688-219.429688zm0 0" /><path d="m347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375l-182.855469-182.855469c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0l182.855469 182.855469c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0" /><path d="m164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469l182.855469-182.855469c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469l-182.855469 182.855469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0" /></svg>
          </button>
          <div className="list-item__remove-message">Delete</div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  copiedId: state.copiedId,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  setUrls: () => dispatch(setUrls()),
  setCopiedId: (copiedId) => dispatch(setCopiedId(copiedId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UrlListItem);