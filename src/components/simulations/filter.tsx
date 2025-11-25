import { useFilter } from "../../hooks/use-filter.ts";
import { SimulationContainer } from "./container"

export function FilterSimulation() {
  const {
    aliceValue,
    betoValue,
    aliceFilter,
    betoFilter,
    isAnimationActive,
    toggleBetoFilter,
    handleTest,
  } = useFilter();

  return (
    <SimulationContainer>
      <div className="w-full mb-8 flex justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center">
          <strong>Alice</strong>

          <span>{aliceValue}</span>
        </div>

        <div className="relative flex justify-center items-center translate-y-3">
          <svg className="w-full h-[10px] overflow-visible">
            <defs>
              <marker
                id="arrowhead"
                viewBox="0 0 10 10"
                refX="10"
                refY="5"
                markerWidth="10"
                markerHeight="10"
                orient="auto-start-reverse"
              >
                <polyline
                  points="0,0 10,5 0,10"
                  className={`fill-none stroke transition-all delay-500 ${isAnimationActive ? "stroke-emerald-900" : "stroke-stone-300"}`}
                />
              </marker>
            </defs>

            <line
              x1="0"
              y1="5"
              x2="100%"
              y2="5"
              className="stroke stroke-stone-300"
            />

            <line
              x1="0"
              y1="5"
              x2="100%"
              y2="5"
              markerEnd="url(#arrowhead)"
              strokeDasharray="700"
              strokeDashoffset={isAnimationActive ? 0 : 700}
              className="stroke stroke-emerald-900 transition-all duration-2000"
            />
          </svg>

          {/* Alice's filter */}
          <span className="absolute top-1/2 -translate-y-1/2 left-5 block p-2 font-bold bg-white">
            {betoValue !== null ? aliceFilter : "?"}
          </span>

          {/* Beto's filter */}
          <button
            disabled={isAnimationActive}
            onClick={toggleBetoFilter}
            className={`absolute top-1/2 -translate-y-1/2 right-6 block p-2 font-bold bg-white border-2 rounded-lg transition-all delay-400 hover:cursor-pointer ${isAnimationActive ? aliceFilter === betoFilter ? "border-emerald-600" : "border-rose-600" : "border-stone-800"}`}
          >
            {betoFilter}
          </button>
        </div>

        <div className="flex flex-col justify-center items-center">
          <strong>Beto</strong>

          <span>{betoValue ?? "—"}</span>
        </div>
      </div>

      <button
        disabled={betoValue !== null}
        onClick={handleTest}
        className="px-4 py-1 rounded-full text-white bg-black transition-all hover:cursor-pointer active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:hover:cursor-default"
      >
        Testar
      </button>
    </SimulationContainer>
  );
}
