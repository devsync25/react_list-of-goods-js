import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setActiveSort(null);
    setIsReversed(false);
  };

  const sortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? [...sorted].reverse() : sorted);
    setActiveSort('alphabetical');
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort(
      (a, b) => b.length - a.length || a.localeCompare(b),
    );

    setGoods(isReversed ? [...sorted].reverse() : sorted);
    setActiveSort('length');
  };

  const reverseGoods = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const getButtonClass = sortType => {
    let colorClass = 'is-warning';

    if (sortType === 'alphabetical') colorClass = 'is-info';

    if (sortType === 'length') colorClass = 'is-success';

    const lightClass = activeSort === sortType ? '' : 'is-light';

    return `button ${colorClass} ${lightClass}`;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass('alphabetical')}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass('length')}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {goods.join(',') !== goodsFromServer.join(',') && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
