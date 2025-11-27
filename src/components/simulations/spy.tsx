import { SimulationContainer } from "./container";
import { useSpy, ANIMATION_DURATION_MS } from "../../hooks/use-spy";

export function SpySimulation() {
  const {
    aliceFilters,
    evaFilters,
    errorRate,
    showResults,
    toggleFilter,
    handleTest,
  } = useSpy();

  return (
    <SimulationContainer>
      <div className="relative w-full flex flex-col justify-center items-center bg-stone-50 rounded-xl">
        <span className={`inline-block mb-4 sm:text-xl font-bold transition-colors ${errorRate >= 14 ? "text-rose-500" : ""}`}>
          {errorRate}% de erros
        </span>

        <div className="mb-4">
          <strong className="block mb-1 text-center sm:text-xl font-bold">Alice</strong>

          <div className="flex gap-1">
            {
              aliceFilters.map((filter, index) => (
                <span
                  key={index}
                  className="px-2 py-1 border-2 border-stone-500 rounded-lg"
                >
                  <span
                    className={`transition-opacity ${showResults ? "opacity-100" : "opacity-0"}`}
                    style={{
                      transitionDelay: `${showResults ? index * ANIMATION_DURATION_MS : 0}ms`,
                    }}
                  >
                    {filter}
                  </span>
                </span>
              ))
            }
          </div>
        </div>

        <svg className="w-4 h-40 mx-auto mb-4">
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100%"
            strokeDasharray="160"
            className="stroke-2 stroke-stone-300"
          />

          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100%"
            strokeDasharray="160"
            className={`stroke stroke-emerald-900 transition-all ${showResults ? "animate-spy-stroke-main-1" : ""}`}
          />

          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100%"
            strokeDasharray="160"
            className={`stroke-2 stroke-stone-300 transition-all ${showResults ? "animate-spy-stroke-secondary-1" : ""}`}
          />
        </svg>

        <div className="mb-4">
          <strong className="block mb-1 text-center sm:text-xl font-bold">Eva</strong>

          <div className="flex gap-1">
            {
              evaFilters.map((filter, index) => (
                <button
                  key={index}
                  disabled={showResults}
                  onClick={() => toggleFilter(index)}
                  className={`px-2 py-1 border-2 rounded-lg transition-all hover:cursor-pointer active:scale-95 ${showResults ? evaFilters[index] === aliceFilters[index] ? "border-emerald-500" : "border-rose-500" : "border-stone-500"}`}
                  style={{
                    transitionDelay: `${showResults ? index * ANIMATION_DURATION_MS + 800 : 0}ms`,
                  }}
                >
                  {filter}
                </button>
              ))
            }
          </div>
        </div>

        <svg className="w-4 h-40 mb-4 overflow-visible">
          <defs>
            <marker
              id="arrowhead-down"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <polyline
                points="0,0 10,5 0,10"
                className={`fill-none stroke transition-all delay-500 ${showResults ? "animate-spy-arrowhead" : "stroke-stone-300"}`}
              />
            </marker>
          </defs>

          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100%"
            strokeDasharray="160"
            className="stroke-2 stroke-stone-300"
          />

          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100%"
            strokeDasharray="160"
            className={`stroke stroke-emerald-900 transition-all ${showResults ? "animate-spy-stroke-main-2" : ""}`}
          />

          <line
            x1="8"
            y1="0"
            x2="8"
            y2="100%"
            strokeDasharray="160"
            className={`stroke-2 stroke-stone-300 transition-all ${showResults ? "animate-spy-stroke-secondary-2" : ""}`}
          />
        </svg>

        <strong className="block mx-auto mb-4 sm:text-xl font-bold">
          Beto
        </strong>

        <button
          onClick={handleTest}
          className="px-2 py-1 text-white bg-black rounded-full transition-transform hover:cursor-pointer active:scale-95 disabled:opacity-50 disabled:hover:cursor-default disabled:active:scale-100"
        >
          {showResults ? "Tentar novamente" : "Testar"}
        </button>
      </div>
    </SimulationContainer>
  );
}
