

import proptypes from 'prop-types'

const SearchDashBoard = ({ searchTerm, setSearchTerm, setIsSearching}) => {
  //Funcion para buscar lo que hay en el input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(value.length > 0);
  };

  
  return (
    <div className='search__container'>
      <input className='search__input' type="text" placeholder='realiza un a busqueda rapida'
          value={searchTerm}
          onChange={handleSearch}
      />
    </div>
  )
}

SearchDashBoard.propTypes = {
  searchTerm: proptypes.string.isRequired,
  setSearchTerm: proptypes.func.isRequired,
  setIsSearching: proptypes.func.isRequired,
  
}
export default SearchDashBoard