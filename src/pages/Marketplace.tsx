
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MapPin, 
  List, 
  Map, 
  SlidersHorizontal, 
  X,
  Building,
  Home as HomeIcon,
  LandPlot,
  Warehouse,
  ChevronsUpDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

// Define property types for better type safety
interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  type: "Apartment" | "Commercial" | "House" | "Land" | "Villa";
  size: string;
  bedrooms: number;
  bathrooms: number;
  coordinates: [number, number];
  hasVirtualTour: boolean;
}

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Filter states
  const [propertyType, setPropertyType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minSize, setMinSize] = useState<string>("");
  const [maxSize, setMaxSize] = useState<string>("");
  const [hasTour, setHasTour] = useState<string>("");
  
  const navigate = useNavigate();
  
  // Expanded properties array
  const properties: Property[] = [
    {
      id: 101,
      title: "Modern Apartment",
      location: "Barnawa, Kaduna",
      price: "₦15,500,000",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=400",
      type: "Apartment",
      size: "120 sqm",
      bedrooms: 3,
      bathrooms: 2,
      coordinates: [7.4398, 10.5167],
      hasVirtualTour: true,
    },
    {
      id: 102,
      title: "Luxury Villa",
      location: "Malali, Kaduna",
      price: "₦45,000,000",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400",
      type: "Villa",
      size: "350 sqm",
      bedrooms: 5,
      bathrooms: 4,
      coordinates: [7.4732, 10.5425],
      hasVirtualTour: true,
    },
    {
      id: 103,
      title: "Commercial Space",
      location: "Kawo, Kaduna",
      price: "₦28,750,000",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=400",
      type: "Commercial",
      size: "200 sqm",
      bedrooms: 0,
      bathrooms: 2,
      coordinates: [7.4406, 10.5629],
      hasVirtualTour: false,
    },
    {
      id: 104,
      title: "Family House",
      location: "Ungwan Rimi, Kaduna",
      price: "₦22,300,000",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400",
      type: "House",
      size: "180 sqm",
      bedrooms: 4,
      bathrooms: 3,
      coordinates: [7.4331, 10.5264],
      hasVirtualTour: true,
    },
    {
      id: 105,
      title: "Office Building",
      location: "Sabon Tasha, Kaduna",
      price: "₦35,000,000",
      image: "https://images.unsplash.com/photo-1577979749830-f1d742b96791?q=80&w=400",
      type: "Commercial",
      size: "250 sqm",
      bedrooms: 0,
      bathrooms: 4,
      coordinates: [7.4120, 10.4762],
      hasVirtualTour: false,
    },
    {
      id: 106,
      title: "Residential Land",
      location: "Millennium City, Kaduna",
      price: "₦8,200,000",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400",
      type: "Land",
      size: "500 sqm",
      bedrooms: 0,
      bathrooms: 0,
      coordinates: [7.5165, 10.5244],
      hasVirtualTour: false,
    },
    {
      id: 107,
      title: "Prime Commercial Land",
      location: "Kaduna South, Kaduna",
      price: "₦12,450,000",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400",
      type: "Land",
      size: "1000 sqm",
      bedrooms: 0,
      bathrooms: 0,
      coordinates: [7.4156, 10.4852],
      hasVirtualTour: false,
    },
    {
      id: 108,
      title: "Modern Duplex",
      location: "Ungwan Shanu, Kaduna",
      price: "₦32,800,000",
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=400",
      type: "House",
      size: "280 sqm",
      bedrooms: 6,
      bathrooms: 5,
      coordinates: [7.4391, 10.5507],
      hasVirtualTour: true,
    },
    {
      id: 109,
      title: "Shopping Complex",
      location: "Central Market, Kaduna",
      price: "₦58,200,000",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=400",
      type: "Commercial",
      size: "450 sqm",
      bedrooms: 0,
      bathrooms: 6,
      coordinates: [7.4320, 10.5204],
      hasVirtualTour: true,
    },
    {
      id: 110,
      title: "Agricultural Land",
      location: "Rigachikun, Kaduna",
      price: "₦7,500,000",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400",
      type: "Land",
      size: "2000 sqm",
      bedrooms: 0,
      bathrooms: 0,
      coordinates: [7.4669, 10.5962],
      hasVirtualTour: false,
    },
  ];

  // Apply filters to properties
  const filteredProperties = properties.filter(property => {
    // Search query filter
    if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !property.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.type.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Property type filter
    if (propertyType && property.type !== propertyType) {
      return false;
    }
    
    // Location filter
    if (location && !property.location.includes(location)) {
      return false;
    }
    
    // Price range filter
    const numericPrice = parseInt(property.price.replace(/[^\d]/g, ''));
    if (minPrice && numericPrice < parseInt(minPrice)) {
      return false;
    }
    if (maxPrice && numericPrice > parseInt(maxPrice)) {
      return false;
    }
    
    // Size range filter
    const numericSize = parseInt(property.size.split(' ')[0]);
    if (minSize && numericSize < parseInt(minSize)) {
      return false;
    }
    if (maxSize && numericSize > parseInt(maxSize)) {
      return false;
    }
    
    // Virtual tour filter
    if (hasTour === "yes" && !property.hasVirtualTour) {
      return false;
    }
    if (hasTour === "no" && property.hasVirtualTour) {
      return false;
    }
    
    return true;
  });
  
  // Update active filters when filter values change
  useEffect(() => {
    const newActiveFilters: string[] = [];
    
    if (propertyType) newActiveFilters.push(`Type: ${propertyType}`);
    if (location) newActiveFilters.push(`Location: ${location}`);
    if (minPrice) newActiveFilters.push(`Min Price: ₦${minPrice}`);
    if (maxPrice) newActiveFilters.push(`Max Price: ₦${maxPrice}`);
    if (minSize) newActiveFilters.push(`Min Size: ${minSize} sqm`);
    if (maxSize) newActiveFilters.push(`Max Size: ${maxSize} sqm`);
    if (hasTour) newActiveFilters.push(`Virtual Tour: ${hasTour === "yes" ? "Yes" : "No"}`);
    
    setActiveFilters(newActiveFilters);
  }, [propertyType, location, minPrice, maxPrice, minSize, maxSize, hasTour]);
  
  // Reset all filters
  const resetFilters = () => {
    setPropertyType("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setMinSize("");
    setMaxSize("");
    setHasTour("");
    setActiveFilters([]);
  };
  
  // Remove a specific filter
  const removeFilter = (filter: string) => {
    if (filter.startsWith("Type:")) setPropertyType("");
    if (filter.startsWith("Location:")) setLocation("");
    if (filter.startsWith("Min Price:")) setMinPrice("");
    if (filter.startsWith("Max Price:")) setMaxPrice("");
    if (filter.startsWith("Min Size:")) setMinSize("");
    if (filter.startsWith("Max Size:")) setMaxSize("");
    if (filter.startsWith("Virtual Tour:")) setHasTour("");
    
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  // Get property type icon
  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "Apartment":
        return <Building className="h-4 w-4 mr-1" />;
      case "House":
        return <HomeIcon className="h-4 w-4 mr-1" />;
      case "Land":
        return <LandPlot className="h-4 w-4 mr-1" />;
      case "Commercial":
        return <Warehouse className="h-4 w-4 mr-1" />;
      case "Villa":
        return <HomeIcon className="h-4 w-4 mr-1" />;
      default:
        return <Building className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <AppLayout>
      <div className="container-app">
        <div className="pt-6 pb-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <Button 
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <X className="h-4 w-4 mr-2" /> : <SlidersHorizontal className="h-4 w-4 mr-2" />}
              {showFilters ? "Close" : "Filter"}
            </Button>
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-kadestate-neutral-500" />
            <input 
              type="text"
              placeholder="Search properties, locations..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-kadestate-neutral-300 focus:outline-none focus:ring-2 focus:ring-kadestate-blue focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {showFilters && (
            <div className="mb-6 p-4 bg-kadestate-neutral-100 rounded-lg border border-kadestate-neutral-300">
              <h3 className="font-semibold mb-4">Filters</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="property-type">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger id="property-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Land">Land</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Barnawa">Barnawa</SelectItem>
                      <SelectItem value="Malali">Malali</SelectItem>
                      <SelectItem value="Ungwan Rimi">Ungwan Rimi</SelectItem>
                      <SelectItem value="Kawo">Kawo</SelectItem>
                      <SelectItem value="Sabon Tasha">Sabon Tasha</SelectItem>
                      <SelectItem value="Millennium City">Millennium City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Price Range (₦)</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span>-</span>
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Size Range (sqm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      value={minSize}
                      onChange={(e) => setMinSize(e.target.value)}
                    />
                    <span>-</span>
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      value={maxSize}
                      onChange={(e) => setMaxSize(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <Label className="mb-2 block">Has 360° Virtual Tour</Label>
                <RadioGroup value={hasTour} onValueChange={setHasTour} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="tour-yes" />
                    <Label htmlFor="tour-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="tour-no" />
                    <Label htmlFor="tour-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="tour-any" />
                    <Label htmlFor="tour-any">Any</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={resetFilters} className="mr-2">
                  Reset All
                </Button>
                <Button size="sm" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
          
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((filter, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="flex items-center bg-kadestate-neutral-100"
                >
                  {filter}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => removeFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm text-kadestate-blue"
                onClick={resetFilters}
              >
                Clear All
              </Button>
            </div>
          )}
          
          <Tabs defaultValue="list" className="mb-6" onValueChange={(val) => setView(val as "list" | "map")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list" className="flex items-center">
                <List className="h-4 w-4 mr-2" />
                List View
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center">
                <Map className="h-4 w-4 mr-2" />
                Map View
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {view === "list" ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-kadestate-neutral-600">
                  {filteredProperties.length} properties found
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <span>Sort By</span>
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="space-y-2">
                      <button className="w-full text-left px-2 py-1 text-sm hover:bg-kadestate-neutral-100 rounded">
                        Price: Low to High
                      </button>
                      <button className="w-full text-left px-2 py-1 text-sm hover:bg-kadestate-neutral-100 rounded">
                        Price: High to Low
                      </button>
                      <button className="w-full text-left px-2 py-1 text-sm hover:bg-kadestate-neutral-100 rounded">
                        Newest First
                      </button>
                      <button className="w-full text-left px-2 py-1 text-sm hover:bg-kadestate-neutral-100 rounded">
                        Size: Largest First
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            
              <div className="space-y-4 mb-10">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <Card 
                      key={property.id}
                      className="overflow-hidden border border-kadestate-neutral-300 card-shadow"
                      onClick={() => navigate(`/marketplace/${property.id}`)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 h-32 md:h-auto relative">
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          {property.hasVirtualTour && (
                            <div className="absolute top-2 right-2 bg-kadestate-blue text-white text-xs px-2 py-1 rounded-full">
                              360° Tour
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center mb-1">
                              {getPropertyTypeIcon(property.type)}
                              <span className="text-xs text-kadestate-neutral-600">{property.type}</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                            <div className="flex items-center text-kadestate-neutral-600 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{property.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-end mt-2">
                            <div>
                              <p className="text-sm text-kadestate-neutral-500 mb-1">Price</p>
                              <p className="font-semibold text-lg">{property.price}</p>
                            </div>
                            <div className="flex space-x-4 text-sm text-kadestate-neutral-500">
                              {property.bedrooms > 0 && (
                                <div className="flex items-center">
                                  <div className="w-4 h-4 flex justify-center items-center text-kadestate-neutral-500 mr-1">
                                    🛏️
                                  </div>
                                  <span>{property.bedrooms}</span>
                                </div>
                              )}
                              {property.bathrooms > 0 && (
                                <div className="flex items-center">
                                  <div className="w-4 h-4 flex justify-center items-center text-kadestate-neutral-500 mr-1">
                                    🚿
                                  </div>
                                  <span>{property.bathrooms}</span>
                                </div>
                              )}
                              <span>{property.size}</span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-kadestate-neutral-500">No properties match your current filters</p>
                    <Button variant="outline" className="mt-4" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-[70vh] relative bg-kadestate-neutral-200 rounded-lg overflow-hidden mb-10">
              <div className="absolute inset-0">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125835.94236850485!2d7.385262042695599!3d10.526413621482247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104d1e0865968b35%3A0x47bd70d7e1470f99!2sKaduna%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1712718236012!5m2!1sen!2sus"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              {/* Map pins for filtered properties */}
              {filteredProperties.map((property) => (
                <div 
                  key={property.id}
                  className="absolute bg-white rounded-lg shadow-lg p-2 flex items-center cursor-pointer hover:scale-105 transition-transform"
                  style={{ 
                    left: `${20 + (Math.random() * 60)}%`, 
                    top: `${20 + (Math.random() * 60)}%`,
                    zIndex: 10,
                  }}
                  onClick={() => navigate(`/marketplace/${property.id}`)}
                >
                  <div className="font-bold text-kadestate-blue mr-2">{property.price}</div>
                  <div className="w-2 h-2 rounded-full bg-kadestate-blue"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Marketplace;
