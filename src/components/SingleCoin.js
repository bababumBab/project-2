
import TradingViewWidget from 'react-tradingview-widget'
import React from 'react'

const SingleCoin = ({ symbol, id, description, toggleModal }) => {
  return (<div className="modal is-active">
    <div className="modal-background" onClick={toggleModal}></div>
    <div className="modal-content" id="blah">

      <h1> {(id).toUpperCase()} ({(symbol).toUpperCase()}) </h1>


      <TradingViewWidget
        theme='dark'
        symbol={symbol + 'usd'}
        width='772'
        height='400'
        interval='D'
        timezone='Etc/UTC'
        style='3'
        locale='en'
        toolbar_bg='#f1f3f6'
        enable_publishing={false}
        hide_legend={false}
        hide_side_toolbar={true}
        allow_symbol_change={false}
        save_image={false}
        details={true}
      />

      <h3>ABOUT</h3>
    
      <div className='description' dangerouslySetInnerHTML={{ __html: description.en }} />
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
  </div>
  )
}

export default SingleCoin