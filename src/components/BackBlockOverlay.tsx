import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

export default function BackBlockOverlay() {
  const [phase, setPhase] = useState<'loading' | 'error'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('error'), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none">
      {phase === 'loading' ? (
        <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg pointer-events-auto">
          <Loader2 size={40} className="text-[#3C33C7] animate-spin" />
          <p className="text-[#212121] text-sm font-medium text-center">
            Procesando solicitud...
          </p>
          <p className="text-[#6B7280] text-xs text-center">
            Por favor, aguarde un momento
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg max-w-[260px] pointer-events-auto">
          <div className="w-12 h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center">
            <AlertCircle size={26} className="text-[#DC2626]" />
          </div>
          <p className="text-[#212121] text-sm font-semibold text-center">
            No fue posible completar la operacion
          </p>
          <p className="text-[#6B7280] text-xs text-center leading-relaxed">
            Ocurrio un error al procesar su solicitud. Intente nuevamente mas tarde.
          </p>
        </div>
      )}
    </div>
  );
}
