import React, { useEffect, useState } from 'react';
import './index.scss';
import ChatHeader from './ChatHeader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '../../app/hooks';
import { addDoc, collection, CollectionReference, DocumentData, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface Message {
    timestamp: Timestamp;
    message: string;
    user: {
        uid: string;
        email: string;
        photo: string;
        displayName: string;
    }
}

const Chat = () => {
    const [inputText, setInputText] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    const currentChannel = useAppSelector(state => state.channel);
    const channelName = currentChannel.channelName;
    const channelId = currentChannel.channelId;
    const currentUser = useAppSelector(state => state.user.user);

    useEffect(() => {
        let collectionRef = collection(db, 'channels', String(channelId), 'messages');

        const collectionRefOrderBy = query(
            collectionRef,
            orderBy('timestamp', 'asc')
        );

        onSnapshot(collectionRefOrderBy, snapshot => {
            const results: Message[] = [];
            snapshot.docs.forEach(doc => {
                results.push({
                    timestamp: doc.data().timestamp,
                    message: doc.data().message,
                    user: doc.data().user,
                })
            });
            setMessages(results);
        })
    }, [channelId])

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const collectionRef: CollectionReference<DocumentData> = collection(
            db,
            'channels',
            String(channelId),
            "messages"
        );

        await addDoc(collectionRef, {
            message: inputText,
            timestamp: serverTimestamp(),
            user: currentUser
        })

        setInputText("");
    }

    return (
        <div className='chat'>
            <ChatHeader channelName={channelName} />
            <div className='chatMessage'>
                {messages.length > 0 ? (
                    messages.map((message, i) => <ChatMessage key={i} message={message} />)
                ) : (
                    <h3 className="chatMessageEmpty">メッセージがありません</h3>
                )}
            </div>

            {/* chatInput */}
            <div className='chatInput'>
                <AddCircleOutlineIcon />
                <form onSubmit={sendMessage}>
                    <input
                        type="text"
                        placeholder={`#${channelName}へメッセージを送信`}
                        value={inputText}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                    />
                    <button type="submit" className='chatInputButton'>
                        送信
                    </button>
                </form>
                <div className='chatInputIcons'>
                    <CardGiftcardIcon />
                    <GifIcon />
                    <EmojiEmotionsIcon />
                </div>
            </div>
        </div>
    )
}

export default Chat;
