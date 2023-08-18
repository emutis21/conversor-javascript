import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isSelected, setIsSelected] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.classList.toggle('dark', isSelected);
    bodyElement.classList.toggle('light', !isSelected);

    localStorage.setItem('darkMode', isSelected);
  }, [isSelected]);

  const toggleDarkMode = () => {
    setIsSelected(!isSelected);
  };

  return { isSelected, toggleDarkMode };
};

export const useSelectedTab = (initialTab, components) => {
  const storedTab = localStorage.getItem('selectedTab');
  const initialIndex = components.findIndex(component => component.label === storedTab);

  const [selectedTab, setSelectedTab] = useState(
    initialIndex !== -1 ? components[initialIndex] : initialTab
  );

  useEffect(() => {
    localStorage.setItem('selectedTab', selectedTab ? selectedTab.label : '');
  }, [selectedTab]);

  return { selectedTab, setSelectedTab };
};

