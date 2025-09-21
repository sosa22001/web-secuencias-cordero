import { Music, Calendar, Timer } from 'lucide-react';
import { NavigationSection } from '@/types/music';

interface MobileNavigationProps {
  activeSection: NavigationSection;
  onSectionChange: (section: NavigationSection) => void;
}

const navigationItems = [
  {
    id: 'sequences' as NavigationSection,
    label: 'Secuencias',
    icon: Music,
  },
  {
    id: 'schedule' as NavigationSection,
    label: 'Programa',
    icon: Calendar,
  },
  {
    id: 'metronome' as NavigationSection,
    label: 'Metrónomo',
    icon: Timer,
  },
];

export const MobileNavigation = ({ activeSection, onSectionChange }: MobileNavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t">
      <div className="flex items-center justify-around px-4 py-2 safe-area-pb">
        {navigationItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`nav-item flex-1 ${activeSection === id ? 'active' : ''}`}
          >
            <div className="flex flex-col items-center space-y-1">
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};