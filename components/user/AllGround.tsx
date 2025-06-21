import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Grid,
  List,
  MapPin,
  Clock,
  Star,
  Users,
  Zap,
  Trophy,
  Filter,
  Heart,
  Share2,
  Calendar,
  ArrowRight,
  Tag,
  Phone,
} from "lucide-react";
import { Ground } from "@/types/ground";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrounds } from "@/store/slices/userGroundSlice";
import Link from "next/link";

// Mock data for demonstration

const AllGround = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [itemsPerPage] = useState(6);

  const dispatch = useDispatch<AppDispatch>();
  const { grounds, totalGrounds, isLoading } = useSelector(
    (state: RootState) => state.userGrounds
  );
  // Mock data usage
  useEffect(() => {
    console.log(" grounds effect");
    dispatch(
      fetchGrounds({
        page: currentPage,
        searchTerm,
        groundType: selectedType,
        priceRange,
      })
    );
    console.log(grounds);
  }, [dispatch, currentPage, searchTerm, selectedType, priceRange]);

  const totalPages = Math.ceil(totalGrounds / itemsPerPage);

  // const toggleFavorite = (id) => {
  //   const newFavorites = new Set(favorites);
  //   if (newFavorites.has(id)) {
  //     newFavorites.delete(id);
  //   } else {
  //     newFavorites.add(id);
  //   }
  //   setFavorites(newFavorites);
  // };

  // const getGroundTypeIcon = (type) => {
  //   switch (type) {
  //     case "box_cricket":
  //       return "🏏";
  //     case "turf_cricket":
  //       return "🌱";
  //     case "indoor_cricket":
  //       return "🏢";
  //     default:
  //       return "🏟️";
  //   }
  // };

  // const getStatusColor = (availability) => {
  //   return availability === "Available"
  //     ? "bg-green-100 text-green-800 border-green-200"
  //     : "bg-orange-100 text-orange-800 border-orange-200";
  // };
  const getStatusColor = (isActive: boolean | undefined) => {
    console.log(isActive);
    return isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-orange-100 text-orange-800 border-orange-200";
  };

  const GroundCard = ({ ground }: { ground: Ground }) => (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group relative backdrop-blur-sm">
      {/* Floating status badge with glow effect */}
      <div
        className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold border-2 z-20 backdrop-blur-md shadow-lg ${getStatusColor(
          ground.isActive
        )}`}
      >
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full ${
              ground.isActive ? "bg-green-400 animate-pulse" : "bg-red-400"
            }`}
          />
          {ground.isActive ? "Open" : "Closed"}
        </div>
      </div>

      {/* Trending/Popular badge */}
      {/* {ground.isPopular && (
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-bold z-20 shadow-lg">
          🔥 Trending
        </div>
      )} */}

      {/* Enhanced image section with multiple indicators */}
      <div className="relative overflow-hidden group-hover:overflow-hidden">
        <img
          src={ground.images[0]}
          alt={ground.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Multiple image indicator */}
        {ground.images && ground.images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
            📸 {ground.images.length}
          </div>
        )}

        {/* Enhanced price section */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-2xl shadow-xl border border-white/20">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">₹{ground.basePrice}</span>
              <span className="text-sm text-gray-600">/hour</span>
            </div>
            {/* {ground.originalPrice &&
              ground.originalPrice > ground.basePrice && (
                <div className="text-xs text-gray-500 line-through">
                  ₹{ground.originalPrice}
                </div>
              )} */}
          </div>
        </div>

        {/* Enhanced action buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Enhanced content section */}
      <div className="p-6 space-y-4">
        {/* Header section with rating */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {ground.name}
            </h3>
            {/* {ground.rating && (
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">{ground.rating}</span>
                  <span className="text-gray-500 text-xs">
                    ({ground.totalReviews})
                  </span>
                </div>
              </div>
            )} */}
          </div>
          {/* <div className="text-3xl opacity-60 group-hover:opacity-100 transition-opacity">
            {getGroundTypeIcon(ground.groundType)}
          </div> */}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {ground.description}
        </p>

        {/* Location and type */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="p-1.5 bg-blue-50 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <span className="font-medium">{ground.location.city}</span>
          </div>
          <span className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1.5 rounded-full font-semibold border border-blue-100">
            {ground.groundType.replace("_", " ").toUpperCase()}
          </span>
        </div>

        {/* Enhanced amenities section */}
        {ground.amenities && ground.amenities.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">Facilities</h4>
            <div className="flex flex-wrap gap-1.5">
              {ground.amenities.slice(0, 4).map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100 font-medium"
                >
                  {amenity}
                </span>
              ))}
              {ground.amenities.length > 4 && (
                <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
                  +{ground.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Enhanced offers section */}
        {ground.offers && ground.offers.length > 0 && (
          <div className="space-y-3 bg-gradient-to-r from-orange-50 to-red-50 -mx-6 px-6 py-4 border-l-4 border-orange-400">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-orange-100 rounded-full">
                <Tag className="w-3.5 h-3.5 text-orange-600" />
              </div>
              <h4 className="font-bold text-orange-800">Special Offers</h4>
            </div>
            <div className="space-y-2">
              {ground.offers.slice(0, 2).map((offer, idx) => (
                <div
                  key={offer.id || idx}
                  className="bg-white/70 backdrop-blur-sm border border-orange-200 rounded-xl px-3 py-2.5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <span className="font-bold text-orange-900 text-sm">
                        {offer.title}
                      </span>
                      <p className="text-xs text-orange-700 mt-0.5 line-clamp-2">
                        {offer.description}
                      </p>
                    </div>
                    {offer.discountType && (
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap">
                        {offer.discountType === "percentage"
                          ? `${offer.discountValue}% OFF`
                          : offer.discountType === "fixed"
                          ? `₹${offer.discountValue} OFF`
                          : offer.discountType === "buy_get"
                          ? `Buy ${offer.discountValue} Get 1`
                          : "OFFER"}
                      </div>
                    )}
                  </div>
                  {offer.validTo && (
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3 text-orange-500" />
                      <span className="text-xs text-orange-600">
                        Valid until{" "}
                        {new Date(offer.validTo).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {ground.offers.length > 2 && (
                <button className="text-xs text-orange-600 hover:text-orange-800 font-medium">
                  View all {ground.offers.length} offers →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Enhanced action buttons */}
        <div className="flex gap-3 pt-2">
          <Link
            className="flex-1 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-3.5 px-6 rounded-2xl hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 transition-all duration-300 font-bold group flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            href={`/dashboard/${ground.id}`}
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button className="px-4 py-3.5 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group">
            <Calendar className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
          </button>

          <button className="px-4 py-3.5 border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 group">
            <Phone className="w-5 h-5 text-gray-600 group-hover:text-green-500" />
          </button>
        </div>

        {/* Quick stats footer */}
        {/* {(ground.totalBookings || ground.responseTime) && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
            {ground.totalBookings && (
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{ground.totalBookings}+ bookings</span>
              </div>
            )}
            {ground.responseTime && (
              <div className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Responds in {ground.responseTime}</span>
              </div>
            )}
          </div>
        )} */}
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
    </div>
  );

  // New List Card Component
  const GroundListCard = ({ ground }: { ground: Ground }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
          <img
            src={ground.images[0]}
            alt={ground.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

          {/* Status badge */}
          <div
            className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
              ground.isActive
            )}`}
          >
            {ground.isActive ? "Open" : "Closed"}
          </div>

          {/* Price badge */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              ₹{ground.basePrice}/hr
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {ground.name}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>{ground.location.city}</span>
                <span className="ml-2 capitalize text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {ground.groundType.replace("_", " ")}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {ground.description}
              </p>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1 mb-4">
                {ground.amenities &&
                  ground.amenities.slice(0, 4).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                {ground.amenities && ground.amenities.length > 4 && (
                  <span className="text-xs text-gray-500">
                    +{ground.amenities.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 ml-6">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold group flex items-center justify-center gap-2 whitespace-nowrap">
                Book Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex gap-2">
                <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
                  <Calendar className="w-5 h-5" />
                </button>
                <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />

        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                Premium Sports Venues
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Find Your Perfect
              <br />
              Cricket Ground
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Book premium cricket facilities near you with instant confirmation
              and best prices
            </p>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-8 text-white/90">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Venues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm">Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Filter Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 -mt-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by ground name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-2 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none w-full text-lg transition-all duration-300"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-300"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="p-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              >
                <option value="all">All Types</option>
                <option value="box_cricket">🏏 Box Cricket</option>
                <option value="turf_cricket">🌱 Turf Cricket</option>
                <option value="indoor_cricket">🏢 Indoor Cricket</option>
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              >
                <option value="all">Any Price</option>
                <option value="0-700">Under ₹700</option>
                <option value="700-1000">₹700 - ₹1000</option>
                <option value="1000-10000">Above ₹1000</option>
              </select>

              <div className="flex items-center gap-2 bg-gray-100 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-white shadow-lg text-blue-600"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-white shadow-lg text-blue-600"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Extended filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Any Time</option>
                  <option>Available Now</option>
                  <option>Available Today</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Any Rating</option>
                  <option>4.5+ Stars</option>
                  <option>4.0+ Stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amenities
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Any Amenities</option>
                  <option>Parking Available</option>
                  <option>Floodlights</option>
                  <option>AC Available</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gray-600 text-lg">
              <span className="font-bold text-2xl text-gray-900">
                {totalGrounds}
              </span>{" "}
              cricket grounds found
              {searchTerm && (
                <span>
                  {" "}
                  for "<span className="font-semibold">{searchTerm}</span>"
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Showing the best matches for you bhavik
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
              <option>Distance: Nearest</option>
            </select>
          </div>
        </div>

        {/* Grounds Grid or List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {grounds.map((ground) => (
              <GroundCard key={ground.id} ground={ground} />
            ))}
          </div>
        ) : (
          <div className="space-y-6 mb-12">
            {grounds.map((ground) => (
              <GroundListCard key={ground.id} ground={ground} />
            ))}
          </div>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 bg-white rounded-2xl shadow-lg p-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-300"
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
                      className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        currentPage === page
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
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
                className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGround;
