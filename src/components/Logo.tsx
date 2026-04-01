import React from 'react';
import { cn } from '../lib/utils';
import logoNavbarWhite from '../assets/logos/logo-branca-sem-bg.png';
import logoNavbarBlue from '../assets/logos/logo-azul-sem-bg.png';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo = ({ variant = 'dark', className }: LogoProps) => {
  const isDark = variant === 'dark';
  
  return (
    <img
      src={isDark ? logoNavbarWhite : logoNavbarBlue}
      alt="Grupo Ceres Investimentos"
      className={cn(
        'w-auto object-contain',
        isDark ? 'h-12 md:h-14' : 'h-[52px] md:h-[60px]',
        className
      )}
    />
  );
};
