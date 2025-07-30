import axios from 'axios';
import { useState, useCallback } from 'react';
import type { Artwork } from '../types/artwork';

const useFetchArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const fetchArtworks = useCallback(async (page: number = 0) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${page + 1}`);
      const data = response.data;
      setArtworks(data.data);
      setTotalRecords(data.pagination.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch artworks', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { artworks, loading, totalRecords, currentPage, fetchArtworks };
};

export default useFetchArtworks;
