import React from 'react';
import { Box, ButtonGroup, Button, TextField, Popover, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SearchAndSort = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField label="Search" variant="outlined" />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>A-Z</Button>
                <Button>Price</Button>
                <Button>Rating</Button>
            </ButtonGroup>
        </Box>
    );
};
const FilterPopover = () => {
  const [specialty, setSpecialty] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setSpecialty(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="specialty-label">Specialty</InputLabel>
            <Select
              labelId="specialty-label"
              id="specialty-select"
              value={specialty}
              label="Specialty"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">
            Apply
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

const Search = () => {
  return (
    <Box>
      <SearchAndSort />
      <FilterPopover />
    </Box>
  );
};

export default Search;