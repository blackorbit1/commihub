import React, { useEffect, useState } from 'react';
import { Switch, VisuallyHidden, useSwitch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setMounted(true);
    if (user && user.theme) {
      setTheme(user.theme);
    }
  }, [user, setTheme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (user && user.discordId) {
      axios.put('http://localhost:4000/api/user/theme', {
        discordId: user.discordId,
        theme: newTheme,
      });
    }
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === 'light',
    onChange: () => handleThemeChange(theme === 'dark' ? 'light' : 'dark'),
  });

  if (!mounted) return null;

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: [
            'w-8 h-8',
            'flex items-center justify-center',
            'rounded-lg bg-default-100 hover:bg-default-200',
          ],
        })}
      >
        {isSelected ? <SunIcon /> : <MoonIcon />}
      </div>
    </Component>
  );
};

export default ThemeSwitch;
