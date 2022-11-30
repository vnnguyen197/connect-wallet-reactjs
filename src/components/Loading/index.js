import React from 'react'
import './styles.css'
import ReactLoading from 'react-loading';
export default function Loading() {

  return (
    <div className='loading'>
      <ReactLoading type={'spin'} color={'#ffffff'} height={300} width={300} />
    </div>
  )
}
