import { FormControl, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const DUMMY_SERVICES = [
  { id: '1', name: 'Service 1' },
  { id: '2', name: 'Service 2' },
  { id: '3', name: 'Service 3' },
  { id: '4', name: 'Service 4' },
]

const DUMMY_REGION = [
  { id: '1', name: 'Municipality' },
  { id: '2', name: 'Dili' },
  { id: '3', name: 'Maliana' },
  { id: '4', name: 'Lospalos' },
]

const DUMMY_GENDER = [
  { id: '1', name: 'Male' },
  { id: '2', name: 'Female' },
]

const DUMMY_YEAR = [
  { id: '1', name: '2024' },
  { id: '2', name: '2023' },
]

const ApplicantFilter = () => {
  const [filter, setFilter] = useState({
    service: '0',
    region: '0',
    gender: '0',
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
              labelId="region"
              id="filter-region"
              value={filter.region}
              onChange={e => handleFilterChange(e, 'region')}
            >
              <MenuItem value="0">All Region</MenuItem>
              {DUMMY_REGION.map((reg) => (
                <MenuItem key={reg.id} value={reg.id}>{reg.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 140 }} size="small">
            <Select
              labelId="gender"
              id="filter-gender"
              value={filter.gender}
              onChange={e => handleFilterChange(e, 'gender')}
            >
              <MenuItem value="0">All Gender</MenuItem>
              {DUMMY_GENDER.map((gd) => (
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
              <MenuItem value="0">All Year</MenuItem>
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

export default ApplicantFilter;
