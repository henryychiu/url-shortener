import React from 'react';
import Modal from 'react-modal';

const ShortenerModal = ({ modalIsOpen, closeModal, copyUrl, longUrl, shortUrl, copied }) => (
  <Modal
    isOpen={modalIsOpen}
    contentLabel="Your Short URL"
    closeTimeoutMS={200}
    className="modal"
    ariaHideApp={false}
  >
    <div className="modal__title">Your short URL</div>
    <div className="modal__body">
      <div id="shortUrl" className="modal__copy-text">{shortUrl}</div>
      <div className="modal__copy-container">
        <button className="modal__copy-button" onClick={copyUrl}>
          <svg height="18pt" viewBox="-40 0 512 512" width="18pt" xmlns="http://www.w3.org/2000/svg"><path d="m271 512h-191c-44.113281 0-80-35.886719-80-80v-271c0-44.113281 35.886719-80 80-80h191c44.113281 0 80 35.886719 80 80v271c0 44.113281-35.886719 80-80 80zm-191-391c-22.054688 0-40 17.945312-40 40v271c0 22.054688 17.945312 40 40 40h191c22.054688 0 40-17.945312 40-40v-271c0-22.054688-17.945312-40-40-40zm351 261v-302c0-44.113281-35.886719-80-80-80h-222c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h222c22.054688 0 40 17.945312 40 40v302c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm0 0" /></svg>
        </button>
        {
          copied ? (
            <div className="modal__message-2">Copied!</div>
          ) : (
            <div className="modal__message">Copy short URL</div>
          ) 
        }
      </div>
    </div>
    <a className="modal__link" href={longUrl} target="_blank" rel="noopener noreferrer">{longUrl}</a>
    <div className="modal__button-container">
      <button className="modal__button" onClick={closeModal}>DONE</button>
    </div>
  </Modal>
);

export default ShortenerModal;