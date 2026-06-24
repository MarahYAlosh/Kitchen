import React, { createContext, useState } from "react";

type ApiContextType = {
  baseUrl: string;
  getIngredientPic: (str: string) => string;
  getUrl: (str: string) => string;
  getIngredient: (obj: Record<string, string>) => string[][];
};

export const ApiContext = createContext({} as ApiContextType);

type Props = {
  children: React.ReactNode;
};
export default function ApiContextProvider({ children }: Props) {
  const [baseUrl] = useState("https://www.themealdb.com/api/json/v1/1/");

  /** Get ingredient image url  */
  const getIngredientPic = (ingredient: string): string => {
    return `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
  };

  /** Get endpoint url */
  const getUrl = (endpoint: string) => {
    return `${baseUrl}${endpoint}`;
  };

  // get ingredients recipes
  const getIngredient = (obj: Record<string, string>) => {
    const ingredients: string[][] = [];
    for (let index = 1; index < 21; index++) {
      if (
        obj[`strIngredient${index}`] &&
        obj[`strIngredient${index}`].length > 0
      ) {
        ingredients.push([
          obj[`strMeasure${index}`],
          obj[`strIngredient${index}`],
        ]);
      }
    }
    return ingredients;
  };

  return (
    <ApiContext.Provider
      value={{ baseUrl, getIngredientPic, getUrl, getIngredient }}
    >
      {children}
    </ApiContext.Provider>
  );
}
