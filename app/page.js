'use client';
import Button from '@mui/material/Button';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useState,useEffect } from 'react';
import './style.css';

export default function Home() {

  const trace = [];
  const [fingerprint, setFingerprint] = useState(null);

  const getTrace = (e) => {
      trace.push([ e.clientX, e.clientY, e.timeStamp ]);
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
      <Button 
      onClick={() => {
        console.log(trace);
        console.log(fingerprint);
        trace.length = 0; // clear the trace array
        fetch('/api/test', {
          headers: {
            "content-type": "application/json",
          },
        }).then(res => res.text()).then(data => console.log(data));
      }}
      variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  )
}
