'use client'
import FingerprintJS, { load } from '@fingerprintjs/fingerprintjs'
import { useState, useEffect } from 'react'
import './style.css'
import { POST } from './requests'
import VerifyModal from '@/components/VerifyModal'

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

/**
 * TODO
 * 1. 弹出modal时的闪屏问题
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
      res = await POST('/api/judgeBrowserEnv', {
          test:'test data for judge browser environment'
      });
      trace.length = 0;
      if(res.code === 200) {
        setPass(true)
      } else if(res.code === 403) {
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
        fingerprint={fingerprint}
        trace={trace}
      />
      <ConfirmBox
        handleVerify={handleVerify}
        loading={loading}
        pass={pass}
        setLoading={setLoading}
        fingerprint={fingerprint}
        trace={trace}
      />
    </div>
  )
}
