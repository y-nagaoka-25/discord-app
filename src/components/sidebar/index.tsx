import React from 'react';
import './index.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth } from '../../firebase';
import { useAppSelector } from '../../app/hooks';

const Sidebar = () => {
    const currentUser = useAppSelector(state => state.user);

    return (
        <div className='sidebar'>
            {/* sidebarLeft */}
            <div className='sidebarLeft'>
                <div className='serverIcon'>
                    <img src="./logo192.png" alt="" />
                </div>
                <div className='serverIcon'>
                    <img src="./logo192.png" alt="" />
                </div>
            </div>
            {/* sidebarRight */}
            <div className='sidebarRight'>
                <div className='sidebarTop'>
                    <h3>Discord</h3>
                    <ExpandMoreIcon />
                </div>
                {/* sidebarChannels */}
                <div className='sidebarChannels'>
                    <div className='sidebarChannelsHeader'>
                        <div className='sidebarHeader'>
                            <ExpandMoreIcon />
                            <h4>プログラミングちゃんねる</h4>
                        </div>
                        <AddIcon className='sidebarAddIcon' />
                    </div>
                    <div className='sidebarChannelList'>
                        <SidebarChannel />
                        <SidebarChannel />
                        <SidebarChannel />
                    </div>
                    <div className='sidebarFooter'>
                        <div className='sidebarAccount'>
                            <img src={currentUser?.photo} alt="プロフィールアイコン" onClick={() => auth.signOut()} />
                            <div className='accountName'>
                                <h4>{currentUser?.displayName}</h4>
                                <span>#{currentUser?.uid.substring(0,6)}</span>
                            </div>
                        </div>
                        <div className='sidebarVoice'>
                            <MicIcon />
                            <HeadphonesIcon />
                            <SettingsIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
