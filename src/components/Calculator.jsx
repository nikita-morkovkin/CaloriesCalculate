import React, { useState } from 'react';
import './Calculator.scss';

const Calculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activity: 'sedentary'
  });

  const [results, setResults] = useState(null);

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const activityLabels = {
    sedentary: 'Сидячий образ жизни',
    light: 'Легкая активность (1-3 тренировки в неделю)',
    moderate: 'Умеренная активность (3-5 тренировок в неделю)',
    active: 'Высокая активность (6-7 тренировок в неделю)',
    veryActive: 'Очень высокая активность (2 раза в день)'
  };

  const calculateCalories = () => {
    const { age, weight, height, gender, activity } = formData;
    
    if (!age || !weight || !height) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum);
    } else {
      bmr = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);
    }

    const tdee = bmr * activityMultipliers[activity];

    const waterIntake = Math.round(weightNum * 32.5);

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      waterIntake: waterIntake,
      activityLevel: activityLabels[activity]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="calculator">
      <div className="calculator-container">
        <h2>Калькулятор калорий и воды</h2>
        
        <div className="form-group">
          <label htmlFor="age">Возраст (лет)</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Введите ваш возраст"
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Вес (кг)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Введите ваш вес"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="height">Рост (см)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            placeholder="Введите ваш рост"
          />
        </div>

        <div className="form-group">
          <label>Пол</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              Мужской
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              Женский
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="activity">Уровень активности</label>
          <select
            id="activity"
            name="activity"
            value={formData.activity}
            onChange={handleInputChange}
          >
            {Object.entries(activityLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <button className="calculate-btn" onClick={calculateCalories}>
          Рассчитать
        </button>

        {results && (
          <div className="results">
            <h3>Результаты расчета</h3>
            <div className="result-item">
              <span className="result-label">Базовый метаболизм (BMR):</span>
              <span className="result-value">{results.bmr} ккал/день</span>
            </div>
            <div className="result-item">
              <span className="result-label">Общий расход энергии (TDEE):</span>
              <span className="result-value">{results.tdee} ккал/день</span>
            </div>
            <div className="result-item">
              <span className="result-label">Рекомендуемое потребление воды:</span>
              <span className="result-value">{results.waterIntake} мл/день</span>
            </div>
            <div className="result-item">
              <span className="result-label">Уровень активности:</span>
              <span className="result-value">{results.activityLevel}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
