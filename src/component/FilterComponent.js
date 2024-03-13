// FilterComponent.js

import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import "./FilterComponent.css";
import data from '../data/data.json';

const FilterComponent = () => {
  const [filters, setFilters] = useState({
    city: [],
    category: [],
    type: [],
    active: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const updatedData = data.filter((item) => {
      return (
        (filters.city.length === 0 || filters.city.includes(item.city)) &&
        (filters.category.length === 0 || filters.category.includes(item.category)) &&
        (filters.type.length === 0 || filters.type.includes(item.type)) &&
        (filters.active.length === 0 || filters.active.includes(item.active)) &&
        (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredData(updatedData);
  }, [filters, searchTerm]);

  const getUniqueValues = (key) => [...new Set(data.map((item) => item[key]))];

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="filter-container">
      {Object.keys(filters).map((filterType) => (
        <div key={filterType} className="filter-card">
          <label>
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}:
            {getUniqueValues(filterType).map((option) => (
              <React.Fragment key={option}>
                <Switch
                  checked={filters[filterType].includes(option)}
                  onChange={(e) =>
                    handleFilterChange(
                      filterType,
                      e.target.checked
                        ? [...filters[filterType], option]
                        : filters[filterType].filter((value) => value !== option)
                    )
                  }
                />
                {option}
              </React.Fragment>
            ))}
          </label>
        </div>
      ))}

      <div className="search-bar">
        <label>
          Name:
          <input
            type="text"
            value={searchTerm}
            placeholder="Search name..."
            onChange={handleSearchChange}
          />
        </label>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Category</th>
              <th>Type</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.city}</td>
                <td>{item.category}</td>
                <td>{item.type}</td>
                <td>{item.active.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilterComponent;
