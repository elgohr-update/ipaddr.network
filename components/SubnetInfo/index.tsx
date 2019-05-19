import { useState, ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';

import { Netmask } from '@hg8496/netmask';

import { masks } from '../../pages/masks';

// CSS
import '../../style.css';
import '@material/typography/dist/mdc.typography.min.css';
import '@material/button/dist/mdc.button.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';

export default () => {
  const [subnet, setSubNet] = useState<Netmask>();

  const [debouncedCallback] = useDebouncedCallback(value => calculateNetwork(value), 500);

  const calculateNetwork = async (ipaddr: string) => {
    const block = new Netmask(ipaddr);
    await setSubNet(block);
  };

  return (
    <>
      <Typography use='headline4'>Subnet Information</Typography>
      <br />

      <TextField
        outlined
        label='IP Address'
        onChange={async (a: ChangeEvent<HTMLInputElement>) => debouncedCallback(a.target.value)}
      />
      {subnet && (
        <>
          <br />

          <NetworkItem label='Network' value={subnet.toString()} />
          <NetworkItem label='Subnet Mask' value={subnet.netmask} />
          <NetworkItem label='Wildcard' value={subnet.hostmask} />
          <br />

          <NetworkItem label='Address' value={subnet.network} />

          <NetworkItem label='Broadcast' value={subnet.broadcastIP} />
          <br />

          <NetworkItem label='Usable Hosts' value={masks[subnet.netmaskBits]} />
          <NetworkItem label='Min' value={subnet.firstHostIP} />
          <NetworkItem label='Max' value={subnet.lastHostIP} />
        </>
      )}
    </>
  );
};

interface ItemProps {
  label: string;
  value: string;
}

export const NetworkItem = ({ label, value }: ItemProps) => (
  <Typography use='body1'>
    <label style={{ fontWeight: 'bold' }}>{label}: </label>
    {value}
  </Typography>
);