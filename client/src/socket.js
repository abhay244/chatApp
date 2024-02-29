import {io} from 'socket.io-client';

const val=process.env.REACT_APP_BACKEND_URL;
console.log("jdjdjdjjd")
console.log(val)
//creating socket instance in frontend
export const initSocket=async()=>{
    const options={
        'force new connection' :true,
        reconnectionAttempt:'Infinity',
        timeout:10000,
        transports:['websocket'],
    };
    
    
    return io(process.env.REACT_APP_BACKEND_URL, options);
}