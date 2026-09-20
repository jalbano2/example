import { CheckCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isVigente = status === 'Vigente';

  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${isVigente ? 'text-[#2E7D32]' : 'text-[#D32F2F]'}`}>
      {isVigente && <CheckCircle size={16} className="text-[#2E7D32]" />}
      {status}
    </span>
  );
}
