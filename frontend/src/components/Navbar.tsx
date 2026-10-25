import React from 'react';

export interface NavbarProps {
  onOpenGetStarted?: () => void;
  onOpenPrivacy?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGetStarted,
  onOpenPrivacy,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Our story', action: () => scrollTo('about') },
    { label: 'How it works', action: () => scrollTo('features') },
    { label: 'Memory tools', action: () => scrollTo('features') },
    {
      label: 'Privacy',
      action: () => {
        if (onOpenPrivacy) {
          onOpenPrivacy();
        } else {
          scrollTo('about');
        }
      },
    },
    {
      label: 'Get started',
      action: () => {
        if (onOpenGetStarted) {
          onOpenGetStarted();
        } else {
          scrollTo('features');
        }
      },
    },
  ];

  return (
    <nav
      className="absolute top-0 left-1/2 -translate-x-1/2 z-30 bg-black rounded-b-2xl md:rounded-b-3xl px-3.5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 shadow-lg select-none"
      aria-label="Primary Navigation"
    >
      <ul className="flex items-center justify-center whitespace-nowrap gap-3 sm:gap-6 md:gap-12 lg:gap-14 m-0 p-0 list-none">
        {navItems.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              onClick={item.action}
              className="text-[10px] sm:text-xs md:text-sm font-normal text-[rgba(225,224,204,0.8)] hover:text-[#E1E0CC] transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus:underline"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
