import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">
          <span className="title-icon">💧</span>
          Калькулятор здоровья
        </h1>
        <p className="header-subtitle">
          Рассчитайте вашу ежедневную потребность в калориях и воде
        </p>
      </div>
    </header>
  );
};

export default Header;
