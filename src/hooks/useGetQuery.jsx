import { useState, useEffect } from "react";

export const useGetQuery = (query, mapFunction) => {
  const [data, setData] = useState(null);
  const [mappedData, setMappedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(query);
        const json = await response.json();

        setData(json);
        setMappedData(mapFunction(json));

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [mapFunction, query]);
  return { data, mappedData, loading, error };
};
