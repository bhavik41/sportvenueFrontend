import React, { useState, useMemo, useEffect } from "react";
import { Ground } from "@/types/ground";
import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Calendar,
  Users,
  Star,
  Clock,
  DollarSign,
  Heart,
  Share2,
  Phone,
  Navigation,
  Wifi,
  Car,
  Zap,
  Camera,
  BookOpen,
} from "lucide-react";

const AllGround = () => {
  // Sample data - expanded for demonstration
  const [grounds, setGrounds] = useState<Ground[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState("grid");
  const [itemsPerPage] = useState(9);

  useEffect(() => {}, []);

  // Filtering and sorting logic
  const filteredGrounds = useMemo(() => {
    let filtered = grounds.filter((ground) => {
      const matchesSearch =
        ground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ground.location.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "all" || ground.groundType === selectedType;

      let matchesPrice = true;
      if (priceRange !== "all") {
        const price = ground.basePrice;
        switch (priceRange) {
          case "budget":
            matchesPrice = price < 700;
            break;
          case "mid":
            matchesPrice = price >= 700 && price <= 1000;
            break;
          case "premium":
            matchesPrice = price > 1000;
            break;
        }
      }

      return matchesSearch && matchesType && matchesPrice;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_low":
          return a.basePrice - b.basePrice;
        case "price_high":
          return b.basePrice - a.basePrice;
        // case "rating":
        //   return b.rating - a.rating;
        // case "distance":
        //   return parseFloat(a.distance) - parseFloat(b.distance);
        case "popular":
        default:
          return 0;
        // return (
        //   (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.reviews - a.reviews
        // );
      }
    });

    return filtered;
  }, [grounds, searchTerm, selectedType, priceRange, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredGrounds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGrounds = filteredGrounds.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //   const toggleFavorite = (groundId) => {
  //     const newFavorites = new Set(favorites);
  //     if (newFavorites.has(groundId)) {
  //       newFavorites.delete(groundId);
  //     } else {
  //       newFavorites.add(groundId);
  //     }
  //     setFavorites(newFavorites);
  //   };

  //   const getAmenityIcon = (amenity) => {
  //     const icons = {
  //       parking: Car,
  //       wifi: Wifi,
  //       lights: Zap,
  //       cafeteria: BookOpen,
  //       changing_room: Users,
  //       equipment: Camera,
  //     };
  //     return icons[amenity] || Users;
  //   };

  // const AvailabilityBadge = ({ availability }) => {
  //   const colors = {
  //     Available: "bg-emerald-100 text-emerald-800 border-emerald-200",
  //     "Almost Full": "bg-amber-100 text-amber-800 border-amber-200",
  //     "Few Slots Left": "bg-red-100 text-red-800 border-red-200",
  //   };

  //   return (
  //     <span
  //       className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[availability]}`}
  //     >
  //       {availability}
  //     </span>
  //   );
  // };

  const GroundCard = ({ ground }: { ground: Ground }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
      {/* {ground.featured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 text-sm font-medium">
          ⭐ Featured Ground
        </div>
      )} */}

      <div className="relative">
        <img
          src={ground.images[0]}
          alt={ground.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            // onClick={() => toggleFavorite(ground.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              favorites.has(ground.id)
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white"
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-gray-100 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-bold">
          ₹{ground.basePrice}/hr
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{ground.name}</h3>
          {/* <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">
              {ground.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">({ground.reviews})</span>
          </div> */}
        </div>

        <p className="text-gray-600 text-sm mb-4">{ground.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{ground.location.city}</span>
            {/* <span className="text-blue-600 font-medium">
              • {ground.distance}
            </span> */}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="capitalize text-gray-600">
              {ground.groundType.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* <div className="flex items-center justify-between mb-4">
          <AvailabilityBadge availability={ground.availability} />
          <div className="flex gap-1">
            {ground.amenities.slice(0, 3).map((amenity) => {
              const Icon = getAmenityIcon(amenity);
              return (
                <div
                  key={amenity}
                  className="p-1 bg-gray-100 rounded text-gray-600"
                  title={amenity}
                >
                  <Icon className="w-3 h-3" />
                </div>
              );
            })}
            {ground.amenities.length > 3 && (
              <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                +{ground.amenities.length - 3}
              </div>
            )}
          </div>
        </div> */}

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Available Slots Today:</p>
            <div className="flex gap-1 flex-wrap">
              {ground.slots.slice(0, 3).map((slot, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                >
                  {/* {slot} */}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              Book Now
            </button>
            <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Phone className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Navigation className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const GroundListItem = ({ ground }: { ground: Ground }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex gap-6">
        <div className="relative">
          <img
            src={ground.images[0]}
            alt={ground.name}
            className="w-32 h-32 rounded-xl object-cover"
          />
          {/* {ground.featured && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </div>
          )} */}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {ground.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  {/* <MapPin className="w-4 h-4" /> */}
                  {/* <span>
                    {ground.location} • {ground.distance}
                  </span> */}
                </div>
                {/* <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">
                    {ground.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({ground.reviews} reviews)
                  </span>
                </div> */}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ₹{ground.basePrice}
              </div>
              <div className="text-sm text-gray-500">per hour</div>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3">{ground.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <AvailabilityBadge availability={ground.availability} /> */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="capitalize">
                  {ground.groundType.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                // onClick={() => toggleFavorite(ground.id)}
                className={`p-2 rounded-lg transition-colors ${
                  favorites.has(ground.id)
                    ? "bg-red-500 text-white"
                    : "border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Heart className="w-4 h-4" />
              </button>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Find Your Perfect Cricket Ground
              </h1>
              <p className="text-gray-600 mt-1">
                Book premium cricket facilities near you
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="hidden sm:block">
                  Favorites ({favorites.size})
                </span>
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-medium">
                My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by ground name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none w-full text-lg"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="box_cricket">Box Cricket</option>
                <option value="turf_cricket">Turf Cricket</option>
                <option value="indoor_cricket">Indoor Cricket</option>
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">Any Price</option>
                <option value="budget">Under ₹700</option>
                <option value="mid">₹700 - ₹1000</option>
                <option value="premium">Above ₹1000</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest First</option>
              </select>

              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredGrounds.length}</span>{" "}
            cricket grounds found
            {searchTerm && <span> for "{searchTerm}"</span>}
          </p>
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredGrounds.length)} of{" "}
            {filteredGrounds.length}
          </p>
        </div>

        {/* Grounds Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {paginatedGrounds.map((ground) => (
              <GroundCard key={ground.id} ground={ground} />
            ))}
          </div>
        ) : (
          <div className="space-y-6 mb-8">
            {paginatedGrounds.map((ground) => (
              <GroundListItem key={ground.id} ground={ground} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-3 rounded-xl font-medium ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-lg"
                        : "border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGround;
