import Modal from '@mui/material/Modal'
import { useState,useEffect } from 'react'
import pos from '/public/lib/pos/1.json'

const VerifyModal = ({ ifOpen, setModalOpen }) => {
  const [clickPoints,setClickPoints] = useState([]);

  useEffect(() => {
    if(clickPoints.length === 4) {
      handleVerify()
    }
  },[clickPoints])

  const onClose = () => {
    setModalOpen(false)
  }

  const handleVerify = async () => {
    let index = 0;
   // 判断四个点是否与预设的点相近
   for(const key in pos) {
    if(Math.abs(pos[key].x - clickPoints[index++].x) > 10 || Math.abs(pos[key].y - clickPoints[index++].y) > 10) {
      alert('验证失败')
      return null;
    }
   }
  }

  /**
   * TODO:
   * 1. 点击之前的点删除之前的点
   * 2. 点击顺序逻辑判断
   * @param {MouseEvent} event 
   * @returns {null} 
   */
  const handleClick = (event) => {
    // 获取点击点的定位,向clickPoints数组中增加一项
    const { clientX, clientY } = event
    const parentRect = event.target.getBoundingClientRect()
    const clickPonit = (
      <div
        className='w-4 h-4 bg-red-500 rounded-full absolute flex justify-center items-center text-sm p-3'
        style={{
          left: clientX - parentRect.left,
          top: clientY - parentRect.top
        }}
      >
        {clickPoints.length + 1}
      </div>
    )
    const res = {
      x: clientX - parentRect.left,
      y: clientY - parentRect.top,
      child:clickPonit
    }

    // 如果x和y已经在数组中，删除该项
    const index = clickPoints.findIndex(item => Math.abs(item.x - res.x) < 10 && Math.abs(item.y - res.y) < 10)
    if(index !== -1) {
      const newClickPoints = [...clickPoints]
      newClickPoints.splice(index,1)
      setClickPoints(newClickPoints)
      return null;
    }
    setClickPoints((clickPoints) => [...clickPoints, res])
  }
  

  return (
    <Modal 
    onClose={onClose}
    open={ifOpen}>
      <div className="modal flex flex-col space-y-3">
        <div className='text-xl font-bold'>验证你的身份</div> 
        <div className='text-sm'> 按顺序点击你听到的词语 </div>
        <div 
        onClick={handleClick}
        style={{backgroundImage:`url(${'/lib/images/1.png'})`}} className='w-80 h-80 bg-contain relative'>
          {
            clickPoints.map(item => item.child)
          }
        </div>
        <audio src="/lib/wavs/1.mp3" controls></audio>
      </div>
    </Modal>
  )
}

export default VerifyModal