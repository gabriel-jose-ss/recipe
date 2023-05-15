import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './AppContext';

export default function Provider({ children }) {
  const [search, setSearch] = useState('');
  const [radioType, setRadioType] = useState('');
  // const [doneRecipes, setDoneRecipes] = useState([]);

  const value = useMemo(() => ({
    search,
    setSearch,
    radioType,
    setRadioType,
  }), [
    search,
    setSearch,
    radioType,
    setRadioType,
  ]);

  return (
    <MyContext.Provider value={ value }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
