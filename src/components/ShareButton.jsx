import { useState } from 'react';
import iconBtn from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton() {
  const [isCliped, setIsCliped] = useState(false);

  const handleShare = () => {
    let URL = window.location.href;
    URL = URL.replace('/in-progress', '');
    setIsCliped(true);
    copy(URL);
  };

  return (
    <div>
      <button type="button" onClick={ handleShare } data-testid="share-btn">
        <img src={ iconBtn } alt="share-link" />
      </button>
      {isCliped && <p>Link copied!</p>}
    </div>
  );
}

export default ShareButton;
