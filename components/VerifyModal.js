import Modal from '@mui/material/Modal'
import { Button } from '@mui/material'

const VerifyModal = ({ ifOpen, setModalOpen,fingerprint,trace }) => {
  const onClose = () => {
    setModalOpen(false)
  }

  const handleVerify = async () => {
    fetch('api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fingerprint,
        trace
      })
    }).then(res => res.json()).then(res => {
      console.log('verfiy',res)
      alert(res.message)
    }).catch(err => {
      console.log(err)
    })
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
          onClick={() => {
            handleVerify()
            onClose()
          }}>确定</Button>
        </div>
      </div>
    </Modal>
  )
}

export default VerifyModal