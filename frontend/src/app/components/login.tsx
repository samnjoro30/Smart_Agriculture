import { useState } from 'react';

export default function login() {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   return(
    <div>
       <h1>login form</h1>
       <form>
          <div>
            <label>Username:</label>
            <input 
               name="name" 
               type="name" 
               placeholder="sam njoro" 
               required>
              
            </input>
          </div>
          <div>
            <label>password:</label>
            <input 
               name="password"  
               type="password" 
               required 
               />
          </div>
       </form>
    </div>
   )
}