"use client";

import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface Section {
  name: string;
  type: string;
}

const sections: Section[] = [
  { name: "Alimento", type: "Perro" },
  { name: "Alimento", type: "Gato" },
  { name: "Accesorios", type: "Perro" },
  { name: "Accesorios", type: "Gato" },
  { name: "Salud", type: "Perro" },
  { name: "Salud", type: "Gato" },
];

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredSections, setFilteredSections] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    const [name, type] = term.split(" ");
    if (name && type) {
      router.push(`/Categorias/${type}/SubCategorias/${name}/`);
    } else {
      alert("Producto no encontrado");
    }
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = sections
      .filter((section) => {
        const fullName = `${section.name} ${section.type}`;
        return (
          fullName.toLowerCase().includes(value.toLowerCase()) ||
          (value.toLowerCase() === "comida" && section.name === "Balanceados")
        );
      })
      .map((section) => `${section.name} ${section.type}`);

    setFilteredSections(filtered);
  };

  return (
    <div
      className="relative mx-4"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setSearchTerm(""); // Limpiar el término de búsqueda cuando se cierre
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white transition md:hidden bg-teal-600 hover:bg-orange-300 hover:text-black rounded"
      >
        <MdSearch className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-40 md:hidden">
          <div className="relative w-full max-w-lg bg-white p-4 rounded-lg mt-16">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                style={{ margin: "0 10px" }}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-600"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>
            {searchTerm && filteredSections.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-2 w-full">
                {filteredSections.map((section, index) => (
                  <li
                    key={index}
                    onClick={() => handleSearch(section)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {section}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="hidden md:flex items-center">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg shadow-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
          style={{ margin: "0 10px" }}
        />
        <button
          onClick={() => handleSearch(searchTerm)}
          className="bg-teal-600 text-white p-2 rounded-md"
        >
          <MdSearch className="w-5 h-5" />
        </button>
        {searchTerm && filteredSections.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-2 w-full">
            {filteredSections.map((section, index) => (
              <li
                key={index}
                onClick={() => handleSearch(section)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {section}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
