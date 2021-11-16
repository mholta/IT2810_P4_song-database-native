import { Categories } from './../Music';

/**
 * Resolver for categories query. Returns a list of categories.
 */
export const categoriesResolver = async () => {
  return await Categories.find();
};
