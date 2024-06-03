import { useState } from 'react';
import axios from 'axios';

export const useFormSubmit = (url, initialState) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setErrorMessage("");
      const response = await axios.post(url, data);
      onSuccess(response.data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Ocorreu um erro ao enviar o formulário.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return {
    data,
    isLoading,
    errorMessage,
    handleChange,
    handleSubmit
  };
};
