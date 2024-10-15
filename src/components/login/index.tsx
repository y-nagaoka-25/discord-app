import React from 'react';
import './index.scss';
import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';

const Login = () => {
    const signIn = () => {
        signInWithPopup(auth, provider)
            .catch(error => {
                alert(error.message);
            });
    }
    return (
        <div className='login'>
            <div className='loginLogo'>
                <img src="./logo192.png" alt="" />
                {/* memo: 回転させる */}
            </div>

            <Button onClick={signIn}>ログイン</Button>
        </div>
    )
}

export default Login
