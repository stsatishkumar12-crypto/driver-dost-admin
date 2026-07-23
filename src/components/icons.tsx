import {
  LayoutDashboard,
  Users,
  Radio,
  Compass,
  Zap,
  Wallet,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Sun,
  Moon,
  Calendar
} from 'lucide-react';

interface IconProps {
  size?: number;
  className?: string;
}

export const IconGrid = ({ size = 20, className }: IconProps) => <LayoutDashboard size={size} className={className} />;
export const IconUsers = ({ size = 20, className }: IconProps) => <Users size={size} className={className} />;
export const IconCar = ({ size = 20, className }: IconProps) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      backgroundColor: 'currentColor',
      WebkitMaskImage: 'url(/car1.png)',
      maskImage: 'url(/car1.png)',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      display: 'inline-block',
      flexShrink: 0,
    }}
  />
);
export const IconSignal = ({ size = 20, className }: IconProps) => <Radio size={size} className={className} />;
export const IconCompass = ({ size = 20, className }: IconProps) => <Compass size={size} className={className} />;
export const IconBolt = ({ size = 20, className }: IconProps) => <Zap size={size} className={className} />;
export const IconWallet = ({ size = 20, className }: IconProps) => <Wallet size={size} className={className} />;
export const IconBell = ({ size = 20, className }: IconProps) => <Bell size={size} className={className} />;
export const IconGear = ({ size = 20, className }: IconProps) => <Settings size={size} className={className} />;
export const IconLogout = ({ size = 20, className }: IconProps) => <LogOut size={size} className={className} />;
export const IconChevronRight = ({ size = 20, className }: IconProps) => <ChevronRight size={size} className={className} />;
export const IconSun = ({ size = 20, className }: IconProps) => <Sun size={size} className={className} />;
export const IconMoon = ({ size = 20, className }: IconProps) => <Moon size={size} className={className} />;
export const IconCalendar = ({ size = 20, className }: IconProps) => <Calendar size={size} className={className} />;
