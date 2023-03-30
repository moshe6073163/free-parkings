import React from 'react';
import { BsShare } from "react-icons/bs";

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TelegramShareButton, WhatsappIcon, WhatsappShareButton, } from "react-share";

export default function Share() {
    return ( 
        <span className='' >   
    <Box>
        <SpeedDial className=''  ariaLabel="SpeedDial basic example" icon={<BsShare /> } >
            <SpeedDialAction
                icon={
                    <WhatsappShareButton url={window.location.href} >
                        <WhatsappIcon round={true} size={44} />
                    </WhatsappShareButton>
                }
                tooltipTitle={"share whatsap"}
            />
        </SpeedDial>
    </Box>
    </span>
    )
}


