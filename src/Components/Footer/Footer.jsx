import React from 'react'
import amazon from '../../images/amazon.webp'
import paypal from '../../images/PayPal.png'
import master from '../../images/master.png'
import american from '../../images/american.png'
import appstore from '../../images/download.png'
import playstore from '../../images/download1.png'

export default function Footer() {
  return (
    <footer className='bg-body-secondary py-4' >
        <div className='container'>

        <h3 className='text-capitalize'>get the fresh cart app</h3>
        <p>We will send you a link, Open it with your phone to download the app.</p>
        <div className="row ">
            <div className="col-md-9">
            <input type="email" name="email" id="mail" className='form-control' placeholder='Email...' />
            </div>
            <div className="col-md-3">
                <button className='text-capitalize w-100 btn bg-main border-none text-white'>share app link</button>
            </div>
        </div>
        <div className='d-flex justify-content-between align-items-center py-3 my-3 border-top border-bottom'>
            <div className="d-flex justify-content-center align-items-center">
                <h6 className='me-2 fw-bold'>Payment Partner</h6>
                <div className="images">
                    <a href="https://pay.amazon.com/" target='_blank' rel='noreferrer'><img style={{width:'50px'}} src={amazon} alt="amazon pay"   /></a>
                    <a href="https://www.americanexpress.com/" target='_blank' rel='noreferrer'><img style={{width:'50px'}} src={american} alt="american express" className='mx-3'  /></a>
                    <a href="https://www.mastercard.us/" target='_blank' rel='noreferrer'><img style={{width:'50px'}} src={master} alt="master card" className='me-3'  /></a>
                    <a href="https://www.paypal.com/" target='_blank' rel='noreferrer'><img style={{width:'50px'}} src={paypal} alt="paypal"  /></a>
                </div>
            </div>
            <div className="app d-flex justify-content-center align-items-center">
                <div>
                <h6 className='mt-1 fw-bold'>Get deliveries with Fresh Cart</h6>
                </div>
                <div>
                <a href="https://www.apple.com/app-store/" target='_blank' rel='noreferrer'><img style={{width:'100px'}} src={appstore} alt="app store" className='mx-3 rounded' /></a>
                <a href="https://play.google.com/" target='_blank' rel='noreferrer'><img style={{width:'100px'}} src={playstore} alt="play store" className='rounded'  /></a>
                </div>
            </div>
        </div>

        </div>
    </footer>
  )
}
