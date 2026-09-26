import React from 'react';
import Logo from './Logo';

export default function BrandLogo({ className = '', style = {}, showTagline = false, size = 'medium' }) {
  return <Logo className={className} style={style} showTagline={showTagline} size={size} />;
}