import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
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
                (!filters.city.length || filters.city.includes(item.city)) &&
                (!filters.category.length || filters.category.includes(item.category)) &&
                (!filters.type.length || filters.type.includes(item.type)) &&
                (!filters.active.length || filters.active.includes(item.active)) &&
                (!searchTerm || (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())))
            );
        });
        setFilteredData(updatedData);
    }, [filters, searchTerm]);

    const getUniqueValues = (key) => [...new Set(data.map((item) => item[key] || ""))].filter(Boolean);

    const handleFilterChange = (filterType, value) => {
        setFilters({ ...filters, [filterType]: value });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <div style={{ display: "flex", marginBottom: "10px", marginTop: "10px", justifyContent: "center" }}>
                {Object.keys(filters).map((filterType) => {
                    const uniqueValues = getUniqueValues(filterType);

                    return uniqueValues.length > 0 ? (
                        <Card key={filterType} style={{ marginRight: "10px", width: "18%", display: "flex", borderRight: "1px solid grey", boxShadow: "none" }}>
                            <CardContent>
                                <label><h4>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}:</h4></label>
                            </CardContent>
                            <CardContent>
                                {uniqueValues.map((option) => (
                                    <div key={option} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
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
                                        <span style={{ marginLeft: "5px" }}>{option}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ) : null;
                })}

                <TextField id="standard-basic" label="Name" variant="standard" style={{ marginTop: "7vh" }} onChange={handleSearchChange} />

            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
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
                                <td>{item.id}</td>
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
