'use client'
import Button from '@mui/material/Button'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useState, useEffect } from 'react'
import './style.css'
import Modal from '@mui/material/Modal'

/**
  <Button onClick={handleVerify} variant="contained" color="primary">
    Hello World
  </Button>
 */

const ConfirmBox = ({ handleVerify }) => {
  return (
    <div className='border-2 rounded-lg flex justify-between w-64 p-5 font-mono items-center bg-gray-50'>
      <div className='border-2 w-8 h-8 rounded-lg cursor-pointer bg-white'>
      </div>
      <div>
        点击以验证
      </div>
      <div className='flex flex-col justify-center items-center bg-github w-8 h-8 bg-cover cursor-pointer'>
      </div>
    </div>
  )
}

const VerifyModal = ({ ifOpen, setModalOpen }) => {
  const onClose = () => {
    setModalOpen(false)
  }

  return (
    <Modal open={ifOpen}>
      <div className="modal">
        <h1> 进一步验证 </h1> 
        <div>123 </div>
        <div>
          <button onClick={onClose}>cancel </button>
          <button onClick={onClose}>submit </button>
        </div>
      </div>
    </Modal>
  )
}

export default function Home() {
  const trace = []
  const [modalOpen, setModalOpen] = useState(false)
  const [fingerprint, setFingerprint] = useState(null)

  const getTrace = (e) => {
    trace.push([e.clientX, e.clientY, e.timeStamp])
  }

  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      setFingerprint(result.visitorId)
    }
    getFingerprint()
  })

  const handleVerify = () => {
    fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fingerprint: fingerprint,
        trace: trace,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        trace.length = 0
        console.log(res)
        alert(res.message)
        setModalOpen(true) // 进一步判断
      })
  }

  return (
    <div onMouseMove={(e) => getTrace(e)} className="home-bg">
      <VerifyModal 
        ifOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <ConfirmBox
        handleVerify={handleVerify}
      />
    </div>
  )
}
