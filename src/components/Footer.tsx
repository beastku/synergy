import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-card shadow-sm py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          Discover your unique path with Synergy Navigator. Powered by AI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
