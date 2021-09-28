import Takeing from "./image/takeing.png";
export const URL_BASE_MEAL = "https://www.themealdb.com/api/json/v1/1/";
export const URL_METHOD_MEAL_CAT= "list.php?c=list"

export const URL_BASE_DRINK = "https://www.thecocktaildb.com/api/json/v1/1/";
export const URL_METHOD_DRINK_CAT= "/list.php?c=list"



export const URL_METHODBYCATEGORY_MEAL = "filter.php?c=";
export const URL_METHODBYTEXT_MEAL = "search.php?s=";

export const URL_METHODBYCATEGORY_DRINK = "filter.php?c=";
export const URL_METHODBYTEXT_DRINK = "search.php?s=";


export const PHOTO = Takeing;

export const URL_METHODBYID_MEAL = "lookup.php?i=";
export const URL_METHODBYID_DRINK = "lookup.php?i=";


export const buildCategoryMealList = (data, imagenList) => {
    const filterMeals = data.meals.filter(
      (meal) => meal.strCategory !== "Miscellaneous"
    );
    //const categoryList = [];
    const imagenCategoryList = filterMeals.map((meal, index) => {
      const path = imagenList.categoryMeals.filter(
        (category) => category.name === meal.strCategory
      );
      return { id: index, name: meal.strCategory, path: path[0].path };
    });
    return imagenCategoryList;
  };

  export const buildCategoryDrinkList = (data, imagenList) => {
    const filteDrinks = data.drinks.filter(
      (meal) => meal.strCategory !== "Other/Unknown"
    );
    //const categoryList = [];
    const imagenCategoryList = filteDrinks.map((drink, index) => {
      const path = imagenList.categoryDrinks.filter(
        (category) => category.name === drink.strCategory
      );
      return { id: index, name: drink.strCategory, path: path[0].path };
    });
    return imagenCategoryList;
  };
