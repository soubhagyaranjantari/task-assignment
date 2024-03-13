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
    name: "",
  });

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const updatedData = data.filter((item) => {
      return (
        (filters.city.length === 0 || filters.city.includes(item.city)) &&
        (filters.category.length === 0 || filters.category.includes(item.category)) &&
        (filters.type.length === 0 || filters.type.includes(item.type)) &&
        (filters.active.length === 0 || filters.active.includes(item.active)) &&
        (filters.name === "" ||
          item.name.toLowerCase().includes(filters.name.toLowerCase()))
      );
    });
    setFilteredData(updatedData);
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "active") {
      setFilters({ ...filters, [filterType]: value });
    } else {
      setFilters({ ...filters, [filterType]: value });
    }
  };

  return (
    <div>
      <div>
        <label>
          City:
          <Switch
            checked={filters.city.includes("dallas")}
            onChange={(e) =>
              handleFilterChange(
                "city",
                e.target.checked
                  ? [...filters.city, "dallas"]
                  : filters.city.filter((city) => city !== "dallas")
              )
            }
          />
          Dallas
        </label>
        <label>
          <Switch
            checked={filters.city.includes("san francisco")}
            onChange={(e) =>
              handleFilterChange(
                "city",
                e.target.checked
                  ? [...filters.city, "san francisco"]
                  : filters.city.filter((city) => city !== "san francisco")
              )
            }
          />
          San Francisco
        </label>
        <label>
          <Switch
            checked={filters.city.includes("denver")}
            onChange={(e) =>
              handleFilterChange(
                "city",
                e.target.checked
                  ? [...filters.city, "denver"]
                  : filters.city.filter((city) => city !== "denver")
              )
            }
          />
          Denver
        </label>
      </div>
      <div>
        <label>
          Category:
          <Switch
            checked={filters.category.includes("one")}
            onChange={(e) =>
              handleFilterChange(
                "category",
                e.target.checked
                  ? [...filters.category, "one"]
                  : filters.category.filter((category) => category !== "one")
              )
            }
          />
          One
        </label>
        <label>
          <Switch
            checked={filters.category.includes("two")}
            onChange={(e) =>
              handleFilterChange(
                "category",
                e.target.checked
                  ? [...filters.category, "two"]
                  : filters.category.filter((category) => category !== "two")
              )
            }
          />
          Two
        </label>
      </div>
      <div>
        <label>
          Type:
          <Switch
            checked={filters.type.includes("A")}
            onChange={(e) =>
              handleFilterChange(
                "type",
                e.target.checked
                  ? [...filters.type, "A"]
                  : filters.type.filter((type) => type !== "A")
              )
            }
          />
          A
        </label>
        <label>
          <Switch
            checked={filters.type.includes("B")}
            onChange={(e) =>
              handleFilterChange(
                "type",
                e.target.checked
                  ? [...filters.type, "B"]
                  : filters.type.filter((type) => type !== "B")
              )
            }
          />
          B
        </label>
        <label>
          <Switch
            checked={filters.type.includes("C")}
            onChange={(e) =>
              handleFilterChange(
                "type",
                e.target.checked
                  ? [...filters.type, "C"]
                  : filters.type.filter((type) => type !== "C")
              )
            }
          />
          C
        </label>
      </div>
      <div>
        <label>
          Active:
          <Switch
            checked={filters.active.includes("TRUE")}
            onChange={() =>
              handleFilterChange(
                "active",
                filters.active.includes("TRUE")
                  ? filters.active.filter((status) => status !== "TRUE")
                  : [...filters.active, "TRUE"]
              )
            }
          />
          TRUE
        </label>
        <label>
          <Switch
            checked={filters.active.includes('FALSE')}
            onChange={() =>
              handleFilterChange(
                "active",
                filters.active.includes('FALSE')
                  ? filters.active.filter((status) => status !== 'FALSE')
                  : [...filters.active, 'FALSE']
              )
            }
          />
          FALSE
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
