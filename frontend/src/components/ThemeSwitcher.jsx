//import React, { useEffect, useState } from "react";
//import { useTheme } from "next-themes";
//import ThemeSwitch from "./ThemeSwitch";
//
//const ThemeSwitcher = () => {
//  const [mounted, setMounted] = useState(false);
//  const { theme, setTheme } = useTheme();
//
//  useEffect(() => {
//    setMounted(true);
//  }, []);
//
//  if (!mounted) return null;
//
//  const handleSwitch = (checked) => {
//    setTheme(checked ? "dark" : "light");
//  };
//
//  return (
//    <div className="flex flex-col gap-2">
//      <ThemeSwitch isSelected={theme === "dark"} onChange={handleSwitch} />
//      <p className="text-default-500 select-none">
//        Lights: {theme === "dark" ? "off" : "on"}
//      </p>
//    </div>
//  );
//};
//
//export default ThemeSwitcher;
