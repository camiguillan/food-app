import { useCallback, useEffect, useState } from "react";

async function sendHttp(url, config) {
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong. failed to send request"
    );
  }
  return data;
}

export default function useHttp(url, config, initialData) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(userdata) {
      setLoading(true);
      try {
        const data = await sendHttp(url, { ...config, body: userdata });
        setData(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
      setLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    loading,
    error,
    sendRequest,
    clearData,
  };
}
