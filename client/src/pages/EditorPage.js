import {React,useState,useRef , useEffect} from 'react'
import Client from '../component/Client';
import Editor from '../component/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions'; 
import toast from 'react-hot-toast'
import { useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';


const EditorPage = () => {
const reactNavigate=useNavigate();

const params=useParams();
const roomId=params.RoomId;



//storing socket instance in useRef
const socketRef=useRef(null);
const location =useLocation();
console.log("location State",location.state);
console.log("name", location.state.userName)
// now to initialize this socketRef use useEffect

useEffect(()=>{
    const init = async ()=>{
        socketRef.current=await initSocket();//socket connection has stabalished after this line
        //handling error in sockets
        socketRef.current.on('connect_error',(err)=>handleErrors(err));
        socketRef.current.on('connect_failed',(err)=>handleErrors(err));
        function handleErrors(e){
            console.log('socket error',e);
            toast.error('Socket connection failed, try again');
            reactNavigate('/');
        }
        //to inform the server that someone has joined by passing an event in emit and to send roomId and username to backend
        console.log(roomId,location.state?.userName);
        socketRef.current.emit(ACTIONS.JOIN,{
           roomId,
            username:location.state?.userName
        })

        //listening for joined event
        socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
            
            if(username!==location.state?.userName){
                toast.success(`${username} joined the room`);
            }
            setClients(clients);
        })

        //listening for disconnected event
        socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username})=>{
            console.log("disconn", username);
            console.log("disconn",socketId)
            toast.success(`${username} left the room`);
            setClients((prev)=>{
                return prev.filter((client)=>client.socketId!==socketId);
            });
        });
    };
    init();
    return ()=>{
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
    }
}, []);

const [clients, setClients]=useState([]);
if(!location.state){
    return <Navigate to="/" />
}
  return (
    <>
        <div className='mainWrapper'>
            <div className='leftWrapper'>
                <img className='editorPageLogo' src='/codeSync-logo.png'></img>
                <h4 className='mainLabel'>Joined Members</h4>
                <div className='joinedMembers'>
                    {
                        clients.map(client=>(
                            <Client key={client.socketId} username={client.username} />
                         ) )
                    }
                </div>
                <button className='btn copyRoomId'>Copy Room Id</button>
                <button className='btn leaveRoom'>leave</button>

            </div>
            <div className='rightWrapper'>
                    <Editor />
            </div>
        </div>
    </>
  )
}

export default EditorPage
