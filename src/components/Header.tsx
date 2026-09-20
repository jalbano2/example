import { ArrowLeft, CircleUser as UserCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showProfile?: boolean;
}

export default function Header({ title, onBack, showProfile }: HeaderProps) {
  return (
    <header className="bg-[#3C33C7] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1 -ml-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      {showProfile && (
        <button className="p-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Perfil">
          <UserCircle size={28} />
        </button>
      )}
    </header>
  );
}
