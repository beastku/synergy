import { Sprout } from 'lucide-react';
import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="bg-card shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center gap-3">
        <Sprout className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">Synergy Navigator</h1>
          <p className="text-xs text-muted-foreground">by vinay</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
