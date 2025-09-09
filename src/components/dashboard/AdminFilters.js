"use client";

import { Search, Download, Filter } from "lucide-react";

export default function AdminFilters({
  searchTerm,
  setSearchTerm,
  filterGuests,
  setFilterGuests,
  exportToCSV,
  hasData,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Búsqueda */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nombre o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filtros y Acciones */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Filtro */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterGuests}
              onChange={(e) => setFilterGuests(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-quince-500 focus:border-transparent appearance-none bg-white min-w-[180px]"
            >
              <option value="all">Todas las confirmaciones</option>
              <option value="phone">Con teléfono</option>
              <option value="dietary">Con restricciones</option>
              <option value="message">Con mensaje</option>
            </select>
          </div>

          {/* Exportar */}
          <button
            onClick={exportToCSV}
            disabled={!hasData}
            className="flex items-center gap-2 px-4 py-2 bg-quince-500 text-white rounded-xl hover:bg-quince-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Contador de resultados */}
      {searchTerm && (
        <div className="mt-4 text-sm text-gray-600">
          <span>
            Buscando: <strong>{searchTerm}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
