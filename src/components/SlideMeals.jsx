import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  arrows: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: false,
};

function SlideMeals() {
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const NUMBER = 6;
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const api = await response.json();
      const data = api.meals;
      setRecommendation(data && data.slice(0, NUMBER));
    };
    fetchRecommendation();
  }, [setRecommendation]);
  return (
    <div>
      <h3>Recommendations</h3>
      <Slider { ...settings }>
        { recommendation ? recommendation.map((slide, index) => (
          <div data-testid={ `${index}-recommendation-card` } key={ slide.idMeal }>
            <img width="80px" src={ slide.strMealThumb } alt={ slide.strMeal } />
            <h5 data-testid={ `${index}-recommendation-title` }>{ slide.strMeal }</h5>
          </div>
        )) : null }
      </Slider>
    </div>
  );
}

export default SlideMeals;
