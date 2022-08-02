import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useDispatch } from "react-redux";
import {
  clearFilteredAddresses,
  filterAddresses
} from "../features/addresses/addressesSlice";

export default function AddressBookSearch() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filterAddresses({ searchTerm: query }));
  };

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px"
      }}
    >
      <Form onSubmit={handleFilter}>
        <Form.Group className="mb-2">
          <Form.Label>Search Address Book by Name</Form.Label>
          <Form.Control
            value={query}
            onChange={handleChange}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Button variant="secondary" type="submit">
            Search
          </Button>
          <Button
            variant="secondary"
            type="reset"
            onClick={() => {
              dispatch(clearFilteredAddresses());
              setQuery("");
            }}
          >
            Clear
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
