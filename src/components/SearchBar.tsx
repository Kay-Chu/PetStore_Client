// SearchBar.tsx
import React from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const SearchBar = ({ searchInput, setSearchInput, setFilter, filter }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
      <Input
        placeholder="Search Articles"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ width: 200, marginRight: 10 }}
      />
      <Select
        defaultValue=""
        style={{ width: 120 }}
        value={filter}
        onChange={setFilter}
        placeholder="Filter by category"
      >
        <Option value="">All</Option>
        <Option value="retrievers">Retrievers</Option>
            <Option value="chihuahuas">Chihuahuas</Option>
            <Option value="bulldogs">
            Bulldogs
            </Option>
            <Option value="Beagles">Beagles</Option>
      </Select>
    </div>
  );
};

export default SearchBar;
