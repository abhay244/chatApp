import React, { useEffect } from 'react'
import Codemirror from 'codemirror'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/theme/dracula.css'
// import 'codemirror/addon/edit.closetag'
// import 'codemirror/addon/edit/closebrackets'

const Editor = () => {
    useEffect(()=>{
        async function init(){
            // Codemirror.fromTextArea(document.getElementById('realTimeEditor'),{
            //     mode:{name:'javascript', json:true},
            //     // theme:'dracula',
            //     // autoCloseTags:true,
            //     // autoCloseBrackets:true,
            //     // lineNumber:true,

            // })
        }
    })
  return (
    
        <textarea id="realTimeEditor" className='textArea'></textarea>
    
  )
}

export default Editor