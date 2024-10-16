import React from 'react';
import './ChatMessage.scss';
import { Avatar } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

type Props = {
    message: {
        timestamp: Timestamp,
        message: string,
        user: {
            uid: string,
            email: string,
            photo: string,
            displayName: string,
        }
    }
}

const ChatMessage = (props: Props) => {
    const { message } = props;
    const user = message.user;
    return (
        <div className='message'>
            {user.photo ? (
                <img src={user.photo} alt="" style={{ borderRadius: '50%', width: 60 }} />
            ) : <Avatar />}
            <div className="messageInfo">
                <h4>
                    {user?.displayName}
                    <span className='messageTimestamp'>{new Date(message.timestamp?.toDate()).toLocaleString()}</span>
                </h4>
                <p>{message.message}</p>
            </div>
        </div>
    )
}

export default ChatMessage
