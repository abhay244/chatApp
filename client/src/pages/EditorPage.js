import {React,useState} from 'react'
import Client from '../component/Client';
import Editor from '../component/Editor';


const EditorPage = () => {
const [clients, setClients]=useState([
    {socketId:1,username:'Abhay Singh'},
    {socketId:2,username:'John Sharma'},
    {socketId:2,username:'Abhay Sharma'}
]);
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
