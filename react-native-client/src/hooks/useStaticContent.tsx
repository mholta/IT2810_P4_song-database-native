import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setAllThemes } from "../redux/filter/filter.actions";

/**
 * Custom hook for fetching categories from server.
 */
export const useStaticContent = () => {
  const dispatch = useDispatch();
  const { data: themesData, loading } = useQuery(GET_THEMES);

  useEffect(() => {
    if (!loading && themesData?.categories) {
      dispatch(setAllThemes(themesData.categories));
    }
  }, [loading, themesData, dispatch]);
};

export const GET_THEMES = gql`
  query GetThemes {
    categories {
      _id
      title
    }
  }
`;
