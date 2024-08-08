import React from 'react';
import MastercardCard from './MastercardCard';
import MemberCard from './MemberCard';
import MinistatisticsCard from './MinistatisticsCard';
import RCCardRoot from './RCCardRoot';

export function RCCard(props) {
  const { variant, ...rest } = props;
  switch (variant) {
    case 'mastercard':
      return <MastercardCard {...rest} />;
    case 'ministatistics':
      return <MinistatisticsCard {...rest} />;
    case 'member':
      return <MemberCard {...rest} />;
    default:
      return <RCCardRoot {...rest} />;
  }
}
export default RCCard;
