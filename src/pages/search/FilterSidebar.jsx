import { useState } from "react";

const FilterSidebar = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [fundType, setFundType] = useState("");
  const [zakatVerified, setZakatVerified] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const applyFilters = (e) => {
    e.preventDefault();
    onFilter({
      category,
      country,
      fundType,
      zakatVerified,
      minPrice,
      maxPrice,
    });
  };

  return (
    <form onSubmit={applyFilters} className="space-y-4 p-4 bg-white rounded shadow">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        {/* add more */}
      </select>

      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">All Countries</option>
        <option value="India">India</option>
        <option value="Pakistan">Pakistan</option>
        {/* add more */}
      </select>

      <select value={fundType} onChange={(e) => setFundType(e.target.value)}>
        <option value="">All Fund Types</option>
        <option value="Zakat">Zakat</option>
        <option value="Sadaqah">Sadaqah</option>
      </select>

      <select value={zakatVerified} onChange={(e) => setZakatVerified(e.target.value)}>
        <option value="">Zakat Verification</option>
        <option value="true">Verified</option>
        <option value="false">Not Verified</option>
      </select>

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Apply Filters
      </button>
    </form>
  );
};

export default FilterSidebar;
