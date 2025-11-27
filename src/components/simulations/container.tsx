import type { ReactNode } from "react";

interface SimulationContainerProps {
  children: ReactNode | ReactNode[];
}

export function SimulationContainer({ children }: SimulationContainerProps) {
  return (
    <div className="w-full my-8 p-4 flex flex-col justify-center items-center border border-stone-300 rounded-lg select-none">
      {children}
    </div>
  );
}
