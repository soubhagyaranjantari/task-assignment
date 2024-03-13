import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import "./FilterComponent.css";
import data from '../data/data.json'

const FilterComponent = () => {
  const [filters, setFilters] = useState({
    city: "",
    category: "",
    type: "",
    active: "",
    name: "",
  });

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const updatedData = data.filter((item) => {
      return (
        (filters.city === "" || item.city === filters.city) &&
        (filters.category === "" || item.category === filters.category) &&
        (filters.type === "" || item.type === filters.type) &&
        (filters.active === "" || item.active === filters.active) &&
        (filters.name === "" ||
          item.name.toLowerCase().includes(filters.name.toLowerCase()))
      );
    });
    setFilteredData(updatedData);
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  return (
    <div>
      <div>
        <label>
          City:
          <Switch
            checked={filters.city === "dallas"}
            onChange={(e) =>
              handleFilterChange("city", e.target.checked ? "dallas" : "")
            }
          />
          Dallas
        </label>
        <label>
          <Switch
            checked={filters.city === "san francisco"}
            onChange={(e) =>
              handleFilterChange(
                "city",
                e.target.checked ? "san francisco" : ""
              )
            }
          />
          San Francisco
        </label>
        <label>
          <Switch
            checked={filters.city === "denver"}
            onChange={(e) =>
              handleFilterChange("city", e.target.checked ? "denver" : "")
            }
          />
          Denver
        </label>
      </div>
      <div>
        <label>
          Category:
          <Switch
            checked={filters.category === "one"}
            onChange={(e) =>
              handleFilterChange("category", e.target.checked ? "one" : "")
            }
          />
          One
        </label>
        <label>
          <Switch
            checked={filters.category === "two"}
            onChange={(e) =>
              handleFilterChange("category", e.target.checked ? "two" : "")
            }
          />
          Two
        </label>
      </div>
      <div>
        <label>
          Type:
          <Switch
            checked={filters.type === "A"}
            onChange={(e) =>
              handleFilterChange("type", e.target.checked ? "A" : "")
            }
          />
          A
        </label>
        <label>
          <Switch
            checked={filters.type === "B"}
            onChange={(e) =>
              handleFilterChange("type", e.target.checked ? "B" : "")
            }
          />
          B
        </label>
        <label>
          <Switch
            checked={filters.type === "C"}
            onChange={(e) =>
              handleFilterChange("type", e.target.checked ? "C" : "")
            }
          />
          C
        </label>
      </div>
      <div>
        <label>
          Active:
          <Switch
            checked={filters.active === true}
            onChange={(e) =>
              handleFilterChange("active", e.target.checked ? true : "")
            }
          />
          True
        </label>
        <label>
          <Switch
            checked={filters.active === false}
            onChange={(e) =>
              handleFilterChange("active", e.target.checked ? false : "")
            }
          />
          False
        </label>
      </div>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={filters.name}
            placeholder="name.."
            onChange={(e) => handleFilterChange("name", e.target.value)}
          />
        </label>
      </div>

      <div>
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
