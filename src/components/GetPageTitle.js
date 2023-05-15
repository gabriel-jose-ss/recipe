export function getPageTitle(pathname) {
  switch (pathname) {
  case '/meals':
    return 'Meals';
  case '/drinks':
    return 'Drinks';
  case '/profile':
    return 'Profile';
  case '/done-recipes':
    return 'Done Recipes';
  case '/favorite-recipes':
    return 'Favorite Recipes';
  default:
    return 'Page Not Found';
  }
}
