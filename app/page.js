'use client'
import FingerprintJS, { load } from '@fingerprintjs/fingerprintjs'
import { useState, useEffect } from 'react'
import './style.css'
import Modal from '@mui/material/Modal'
import { POST } from './requests'
import { Button } from '@mui/material'

const ConfirmBox = ({ handleVerify,loading,pass,setLoading }) => {

  return (
    <div className='border-2 rounded-lg flex justify-between w-64 p-5 font-mono items-center bg-gray-50'>
      {
        loading ? <div className='bg-loading w-8 h-8 bg-cover animate-spin'/> : 
        <div 
        onClick={() => {
          setLoading(true);
          handleVerify();
        }}
        className='border-2 w-8 h-8 rounded-lg cursor-pointer bg-white flex justify-center items-center'>
          {
            (() => {
              if(pass) {
                return <div className='bg-pass w-4 h-4 bg-cover'/>
              } else if(pass === false) {
                return <div className='bg-fail w-4 h-4 bg-cover'/>
              }
            })()
          }
        </div>
      }
      <div>
        点击以验证
      </div>
      <a 
      href='https://github.com/biu9/srtp-web'
      className='flex flex-col justify-center items-center bg-github w-8 h-8 bg-cover cursor-pointer'>
      </a>
    </div>
  )
}

const VerifyModal = ({ ifOpen, setModalOpen }) => {
  const onClose = () => {
    setModalOpen(false)
  }

  return (
    <Modal open={ifOpen}>
      <div className="modal flex flex-col space-y-3">
        <div className='text-xl font-bold'>进一步验证</div> 
        <div> 第二道验证码的内容,可以是图片/语音 </div>
        <div className='flex justify-between'>
          <Button 
          variant='outlined'
          color='error'
          onClick={onClose}>取消</Button>
          <Button 
          variant="text"
          onClick={onClose}>确定</Button>
        </div>
      </div>
    </Modal>
  )
}

/**
 * TODO
 * 1. 弹出modal时的闪屏问题
 * @returns 
 */
export default function Home() {
  const trace = []
  const [modalOpen, setModalOpen] = useState(false)
  const [fingerprint, setFingerprint] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pass, setPass] = useState(null)

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

  const handleVerify = async () => {
   let res;
   try {
      setTimeout(() => {
        setLoading(false)
      },1000)
      res = await POST('/api/verify', {
        fingerprint: fingerprint,
        trace: trace,
      });
      trace.length = 0;
      if(Math.random() > 0.5) {
        //模拟pass
        setPass(true)
      } else {
        setPass(false)
        setModalOpen(true) // 进一步判断          
      }
   } catch(err) {
      console.log(err)
   }
  }

  return (
    <div onMouseMove={(e) => getTrace(e)} className="home-bg">
      <VerifyModal 
        ifOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <ConfirmBox
        handleVerify={handleVerify}
        loading={loading}
        pass={pass}
        setLoading={setLoading}
      />
    </div>
  )
}
