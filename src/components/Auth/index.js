import React, { useState } from 'react'
import './index.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase'
import { useNavigate } from 'react-router-dom'

function Index() {
  const [register,setRegister] =useState(false)
  const [email,setEmail] = useState("")
  const [password,setPassword]=useState("")
  const [username,setUsername]=useState("")
  const [loading ,setLoading]=useState(false)
  const [error,setError]=useState("")
  const navigate = useNavigate()
  const handlesignInGoogle =()=>{
    signInWithPopup(auth,provider).then((res)=>{
      // console.log(res)
      navigate("/");
    })
  }
  const handleSignIn = (e) => {
    e.preventDefault()
    setError();
    setLoading(true);
    if (email === "" || password === "") {
      setError("Required field is missing");
      setLoading(false);
    } 
     else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          // console.log(res);
          navigate("/");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.code);
          setError(error.message);
          setLoading(false);
        });
    }
  }
  const handleRegister = (e) => {
    e.preventDefault()
    setError("");
    setLoading(true);
    if (email === "" || password === "" || username === "") {
      setError("Required field is missing.");
      setLoading(false)
      
    } 
     else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
           //console.log(res);
           navigate("/");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  };
  return (
    <div className='auth'>
      <div className='auth-container'>
        <p>Add another way to login in using any of the following</p>
        <div className='sign-options'>
          <div onClick={handlesignInGoogle} className='sign-option'>
            <img src="https://image.flaticon.com/icons/png/512/281/281764.png" 
            alt='google'/>
            <p>Login with Google</p>
          </div>
        </div>
        <div className='auth-login'>
          <div className='auth-login-container'>
            {
              register ?(<>
              <div className='input-fiels'>
                <p>UserName</p>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} type='text'/>
                </div>
                <div className='input-fiels'>
                <p>Email</p>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email'/>
                </div>
                <div className='input-fiels'>
                <p>Password</p>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password'/>
                </div>
                <button onClick={handleRegister} disabled={loading} style={{marginTop:"10px"}}>{loading ? 'Registering':'Register'}</button>
                </>
                ):(
                <>
                <div className='input-fiels'>
                <p>Email</p>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email'/>
                </div>
                <div className='input-fiels'>
                <p>Password</p>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password'/>
                </div>
                <button onClick={handleSignIn} disabled={loading} style={{marginTop:"10px"}}>{loading ? 'Sigining In':'Login'}</button>
                </>)
            }
            <p onClick={()=>setRegister(!register)} style={{marginTop:"10px",textAlign:"center",color:"#0095ff",textDecoration:"underline",cursor:"pointer"}}>
              {register ? "Login" : "Register"}?</p>
          </div>
        </div>
        {
          error !==""&&(<p style={{color:"red",fontSize:"14px"}}>
            {error}
          </p>)
        }
      </div>

    </div>
  )
}

export default Index