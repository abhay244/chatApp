import {React, useState} from 'react'
import {v4 as uuidV4} from "uuid"
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast"

const Home = () => {
    const navigate=useNavigate();
    const [roomId, setRoomId]=useState('');
    const [userName, setuserName]=useState('')
    const createNewRoom=(e)=>{
        e.preventDefault();
        const id=uuidV4();
        setRoomId(id);
        toast.success('Created new room')

    }
    const joinRoom=()=>{
        if(!roomId || !userName){
            toast.error('Room Id and Username both are required');
            return;
        }
        navigate(`/editor/${roomId}`,{
            state:{
                userName,
            }
        })
    }
    // const handleEnter=(e)=>{
    //     // if(e.code==='Enter'){
    //     //     joinRoom();
    //     // }
    // }
  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img className='homePageLogo' src='/codeSync-logo.png'></img>
        <h4 className='mainLabel'>Paste invitation room Id</h4>
        <div className='inputField'>
            <input type='text' className='input' placeholder='ROOM ID' value={roomId} onChange={(e)=>{setRoomId(e.target.value)}}  ></input>
            <input type='text' className='input' placeholder='USERNAME' value={userName} onChange={(e)=>{setuserName(e.target.value)}} ></input>
            <button className='btn joinBtn' onClick={joinRoom}>Join</button>
            <span  className='createRoom'>If do not have room Id &nbsp;
            <a onClick={createNewRoom} href='' className='createNewBtn'>create room</a>
            </span>
        </div>
        
      </div>
      <footer className='footer'>Made with ❤️ by Abhay</footer>
    </div>
  )
}

export default Home
