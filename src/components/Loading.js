import React from 'react'
import loadingGif from '../images/gif/spinner-icon.jpg'

export default function Loading() {
   return (
      <div className="loading">
         <h4>rooms data loading...</h4>
         <img src={loadingGif} alt="" />
      </div>
   )
}
