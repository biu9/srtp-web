'use client';
import Button from '@mui/material/Button';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useState,useEffect } from 'react';
import './style.css';
import Modal from '@mui/material/Modal';

export default function Home() {

  const trace = [];
  const [ifModal,setIfModal] = useState(false);
  const [fingerprint, setFingerprint] = useState(null);

  const getTrace = (e) => {
      trace.push([ e.clientX, e.clientY, e.timeStamp ]);
  }

  const onClose = () => {
    setIfModal(false);
  }

  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };
    getFingerprint();
  })

  return (
    <div 
    onMouseMove={(e) => getTrace(e)}
    className='home-bg'>
      <Modal
        open={ifModal}
      >
        <div className='modal'>
          <h1>进一步验证</h1>
          <div>
            123
          </div>
          <div>
            <button
            onClick={onClose}
            >cancel</button>
            <button
            onClick={onClose}
            >submit</button>
          </div>
        </div>
      </Modal>
      <Button 
      onClick={() => {
        //console.log(trace);
        //console.log(fingerprint);
        fetch('/api/verify',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fingerprint: fingerprint,
            trace: trace
          })
        }).then(res => res.json()).then(res => {
          trace.length = 0;
          console.log(res);
          alert(res.message);
          setIfModal(true); // 进一步判断
        });
      }}
      variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  )
}
