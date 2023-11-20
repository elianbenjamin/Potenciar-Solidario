import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { deepPurple } from '@mui/material/colors';

export default function ImageAvatars({ image, name }) {
  const initial = name ? name[0]?.toUpperCase() : '';

  return (
    <Stack style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
      {
        image
          ?
          <Avatar alt={name} src={image} />
          :
          <Avatar
            sx={{ bgcolor: deepPurple[500] }}
            alt={initial}
            src="/broken-image.jpg"
          >
            {initial}
          </Avatar>
      }
      <h3 style={{marginLeft:'7px'}}>{name}</h3>
    </Stack>
  );
}
