import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from '@env'
// const rapidApiKey = RAPID_API_KEY

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
      page: '1',
      num_pages: query?.num_pages
    },
    headers: {
      // 'X-RapidAPI-Key': '104e3a92d9msha848cb98518c483p193192jsn6eb5f105e367',
      'X-RapidAPI-Key': 'c21bcbd239mshabbf78a62821331p1fb92fjsnb3d25e2cee34',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert('There is an error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
}

export default useFetch;