"use client"

import { useState, useEffect } from "react";

export const useRedis = (redisPrefix: string, redisSuffix: string) => {
  const [data, setData] = useState({
    key: "",
    value: {
      currentStepIndex: 0,
      currentSubStepIndex: 0,
      formData: null,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!redisPrefix || !redisSuffix) return
    async function fetchDataFromRedis() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/listings/redis/get/${redisPrefix}-${redisSuffix}`
        );
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.value) {
            const value = JSON.parse(jsonData.value);
            setData({
              key: `${redisPrefix}-${redisSuffix}`,
              value: {
                currentStepIndex: value?.currentStepIndex ?? 0,
                currentSubStepIndex: value?.currentSubStepIndex ?? 0,
                formData: value?.formData ?? null,
              }
            });
          }
        } else {
          console.error("Failed to fetch data from Redis");
        }
      } catch (error) {
        console.error("Error fetching data from Redis:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDataFromRedis();
  }, [redisPrefix, redisSuffix]);

  return {
    data,
    currentStepIndexFromRedis: data.value.currentStepIndex,
    currentSubStepIndexFromRedis: data.value.currentSubStepIndex,
    formData: data.value.formData,
    isLoading
  };
};

