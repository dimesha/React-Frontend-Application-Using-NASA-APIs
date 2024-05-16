import React, { useEffect, useState } from "react";
import { Breadcrumb } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { Card, Spinner } from "flowbite-react";
import moonImage from '../assets/moon.jpg'

export default function NearEarthObjects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("2015-09-07");
  const [endDate, setEndDate] = useState("2015-09-08");

  useEffect(() => {
    async function fetchNEOData() {
        const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_KEY}`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const neoData = await res.json();
        setData(neoData.near_earth_objects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNEOData();
  }, [startDate, endDate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner aria-label="Center-aligned spinner example" size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 px-10 py-8">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/projects">Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Near Earth Objects</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="text-3xl font-bold text-center text-red-400">Near Earth Objects</h1>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="startDate" className="mr-2">Start Date:</label>
          <input
            type="date"
            id="startDate"
            className="border border-gray-300 p-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="mr-2">End Date:</label>
          <input
            type="date"
            id="endDate"
            className="border border-gray-300 p-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-8 laptop:grid-cols-3 tablet:grid-cols-1">
        {Object.keys(data).map(date => (
          data[date].map(neo => (
            <Card key={neo.id} className="max-w-sm bg-hero-pattern3 bg-cover">
              <h5 className="text-2xl font-bold tracking-tight text-green-800 dark:text-white">
                {neo.name}
              </h5>
              <p className="font-normal text-white dark:text-white">
                <strong>Close Approach Date:</strong> {neo.close_approach_data[0].close_approach_date}<br />
                <strong>Miss Distance:</strong> {neo.close_approach_data[0].miss_distance.kilometers} km<br />
                <strong>Velocity:</strong> {neo.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h<br />
                <strong>Diameter:</strong> {neo.estimated_diameter.kilometers.estimated_diameter_min} - {neo.estimated_diameter.kilometers.estimated_diameter_max} km<br />
                <strong>Potentially Hazardous:</strong> {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
              </p>
            </Card>
          ))
        ))}
      </div>
    </div>
  );
}