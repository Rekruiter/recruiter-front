import { PropsWithChildren, useEffect, useState } from 'react';
import Navigation from './Navigation/Navigation';

interface LayoutProps {
  withoutMargin?: boolean;
  panel?: boolean;
}

const Layout = ({ children, withoutMargin = false, panel }: PropsWithChildren<LayoutProps>) => {
  const [navbarBackground, setNavbarBackground] = useState('bg-transparent');
  useEffect(() => {
    if (!withoutMargin) {
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarBackground('bg-dark_blue/80');
      } else {
        setNavbarBackground('bg-transparent');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [withoutMargin]);

  return (
    <div className="flex flex-col min-h-screen min-w-mobile">
      <Navigation className={withoutMargin ? navbarBackground : 'bg-dark_blue'} />
      <div className={`flex flex-col flex-grow ${!withoutMargin && 'mt-24'}`}>{children}</div>
      {!panel && (
        <div className="w-full bg-dark_blue text-light min-h-6">
          <div className="container px-10 md:px-24">footer</div>
        </div>
      )}
    </div>
  );
};

export default Layout;
