"use client";
import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import CondoCard from "@/components/CondoCard";
import axios from "axios";

const Filters = ({ city, setFilteredProjects }) => {
  const [price, setPrice] = useState([0, 1000000]);
  const [propertyType, setPropertyType] = useState("Any");
  const [closingYear, setClosingYear] = useState(new Date().getFullYear());
  const [bedrooms, setBedrooms] = useState("Any");
  const [projects, setProjects] = useState([]);

  const propertyTypes = [
    "Any",
    "Condo",
    "Townhouse",
    "Semi-Detached",
    "Detached",
  ];
  const bedroomOptions = ["Any", "1", "2", "3", "4", "5+"];

  useEffect(() => {
    const fetchFilteredData = async () => {
      //Mode no cors axios
      let res = await axios.get(
        `https://api.assignhome.ca/api/preconstructions-city/${city}/?price_min=${price[0]}&price_max=${price[1]}&property_type=${propertyType}&closing_year=${closingYear}&bedrooms=${bedrooms}`,
        {
          mode: "no-cors",
        }
      );

      console.log(res);

      if (res.status == 200) {
        const data = await res.data;
        setProjects(data.preconstructions);
        // setFilteredProjects(data.preconstructions); // Pass filtered data to parent component
      }
    };

    fetchFilteredData();
  }, [city, price, propertyType, closingYear, bedrooms]);

  return (
    <>
      <div className="pt-4">
        <div className="flex flex-wrap gap-4">
          {/* Bedrooms Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full px-3 py-1 text-xs border-2 border-black"
              >
                Beds: {bedrooms}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-4">
                {bedroomOptions.map((option) => (
                  <Button
                    key={option}
                    variant={bedrooms === option ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setBedrooms(option)}
                  >
                    {bedrooms === option && <Check className="mr-2 h-4 w-4" />}
                    {option}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {/* Property Type Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full px-3 py-1 text-xs border-2 border-black"
              >
                House Type: {propertyType}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-4">
                {propertyTypes.map((type) => (
                  <Button
                    key={type}
                    variant={propertyType === type ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setPropertyType(type)}
                  >
                    {propertyType === type && (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    {type}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Closing Year Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full px-3 py-1 text-xs border-2 border-black"
              >
                Closing Year: {closingYear}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Slider
                min={2020}
                max={2030}
                step={1}
                value={[closingYear]}
                onValueChange={(value) => setClosingYear(value[0])}
                className="mt-6"
              />
              <div className="mt-4 text-center text-xs text-gray-500">
                {closingYear}
              </div>
            </PopoverContent>
          </Popover>

          {/* Price Range */}
          <div className="flex flex-col gap-2 w-80">
            <div className="text-center text-xs flex justify-between">
              Price Range
              <div>
                <span className="text-xs text-gray-500 px-1">
                  ${price[0].toLocaleString()}
                </span>
                <span>-</span>
                <span className="text-xs text-gray-500 px-1">
                  ${price[1].toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-80">
              <Slider
                min={0}
                max={1000000}
                step={10000}
                value={price}
                onValueChange={setPrice}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-4 gy-4 gx-3 gx-lg-3 pt-10">
        {projects &&
          projects.map((item, no) => (
            <div className="col" key={item.id}>
              <CondoCard {...item} no={no} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Filters;