import { useRef } from "react";

const SearchBar = ({ onSearch, setselectedTab }) => {
  const inputRef = useRef();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setselectedTab("Home");
      const value = inputRef.current.value;
      inputRef.current.value = "";
      onSearch(value);
    }
  };
  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search..."
      name="search"
      className="search-input"
      onKeyDown={handleKeyDown}
    />
  );
};
export default SearchBar;
