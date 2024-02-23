import { FormControl, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const DUMMY_SERVICES = [
  { id: '1', name: 'Service 1' },
  { id: '2', name: 'Service 2' },
  { id: '3', name: 'Service 3' },
  { id: '4', name: 'Service 4' },
]

const DUMMY_DELIVERY = [
  { id: '1', name: 'Normal' },
  { id: '2', name: 'Urgent' },
]

const DUMMY_YEAR = [
  { id: '1', name: '2024' },
  { id: '2', name: '2023' },
]

const IssuedCardListFilter = () => {
  const [filter, setFilter] = useState({
    service: '0',
    delivery: '0',
    year: '0',
  });

  const handleFilterChange = (event: SelectChangeEvent, type: string) => {
    setFilter({
      ...filter,
      [type]: event.target.value,
    });
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4">
        <TextField
          size="small"
          placeholder="Search ID or citizens name here"
          id="search-citizen"
          sx={{ width: '100%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><FaSearch /></InputAdornment>
          }}
        />
      </div>
      <div className="col-span-8">
        <div className="flex justify-end gap-2">
          <FormControl sx={{ minWidth: 140 }} size="small">
            <Select
              labelId="service"
              id="filter-service"
              value={filter.service}
              onChange={e => handleFilterChange(e, 'service')}
            >
              <MenuItem value="0">All Service</MenuItem>
              {DUMMY_SERVICES.map((svc) => (
                <MenuItem key={svc.id} value={svc.id}>{svc.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 140 }} size="small">
            <Select
              labelId="delivery"
              id="filter-delivery"
              value={filter.delivery}
              onChange={e => handleFilterChange(e, 'delivery')}
            >
              <MenuItem value="0">All Delivery</MenuItem>
              {DUMMY_DELIVERY.map((gd) => (
                <MenuItem key={gd.id} value={gd.id}>{gd.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 140 }} size="small">
            <Select
              labelId="year"
              id="filter-year"
              value={filter.year}
              onChange={e => handleFilterChange(e, 'year')}
            >
              <MenuItem value="0">Sort Year</MenuItem>
              {DUMMY_YEAR.map((yr) => (
                <MenuItem key={yr.id} value={yr.id}>{yr.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default IssuedCardListFilter;
