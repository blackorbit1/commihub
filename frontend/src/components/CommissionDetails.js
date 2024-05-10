import React from 'react';
import { Card, CircularProgress, Image, Button } from '@nextui-org/react';
import BorderedTreeView from './BorderedTreeView';

const CommissionDetails = ({ order }) => {
  return (
    <div className="details-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <div className="details-section"> {/* Left section */}
        <CircularProgress value={order.progress} />
        <Image src={`https://cdn.discordapp.com/avatars/${order.Commissioner.discordId}/${order.Commissioner.avatar}.png`} width="50" height="50" />
        <p>{order.Commissioner.username}</p>
        <BorderedTreeView />
      </div>
      <Divider orientation="vertical" />
      <div className="details-section"> {/* Right section for files */}
        <p>Reference Files:</p>
        {order.referenceFiles.map((file, index) => (
          <p key={index}>{file.name}</p> // Assuming file objects have a name property
        ))}
        <Button>Add More</Button>
        <p>Output Files:</p>
        {order.outputFiles.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
    </div>
  );
};

export default CommissionDetails;
