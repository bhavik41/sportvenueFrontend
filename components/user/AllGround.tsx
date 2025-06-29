import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Grid,
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

const AllGround = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [itemsPerPage] = useState(6);

  const dispatch = useDispatch<AppDispatch>();
  const { grounds, totalGrounds, isLoading } = useSelector(
    (state: RootState) => state.userGrounds
  );

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

  const getStatusColor = (isActive: boolean | undefined) => {
    console.log(isActive);
    return isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-orange-100 text-orange-800 border-orange-200";
  };

  const GroundCard = ({ ground }: { ground: Ground }) => (
    <div className="bg-gray-50 rounded-2xl shadow-xl/45 border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative  shadow-gray-800">
      {/* Status Badge */}
      <div
        className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold border z-20 ${getStatusColor(
          ground.isActive
        )}`}
      >
        <div className="flex items-center gap-1">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              ground.isActive ? "bg-green-400 animate-pulse" : "bg-red-400"
            }`}
          />
          {ground.isActive ? "Open" : "Closed"}
        </div>
      </div>

      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={ground.images[0]}
          alt={ground.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full shadow-lg">
            <span className="font-bold">₹{ground.basePrice}</span>
            <span className="text-sm text-gray-600">/hr</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
              {ground.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{ground.location.city}</span>
              <span className="ml-auto text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                {ground.groundType.replace("_", " ").toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {ground.description}
        </p>

        {/* Amenities */}
        {ground.amenities && ground.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {ground.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
            {ground.amenities.length > 3 && (
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                +{ground.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        {/* All Offers Section */}
        {ground.offers && ground.offers.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-red-50 -mx-4 px-4 py-3 border-l-4 border-orange-400">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-orange-600" />
              <h4 className="font-bold text-orange-800 text-sm">
                {ground.offers.length} Special Offer
                {ground.offers.length > 1 ? "s" : ""}
              </h4>
            </div>
            <div className="space-y-2">
              {ground.offers.map((offer, idx) => (
                <div
                  key={offer.id || idx}
                  className="bg-white/70 border border-orange-200 rounded-lg px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <span className="font-semibold text-orange-900 text-sm">
                        {offer.title}
                      </span>
                      <p className="text-xs text-orange-700 mt-0.5 line-clamp-1">
                        {offer.description}
                      </p>
                    </div>
                    {offer.discountType && (
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
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
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-orange-500" />
                      <span className="text-xs text-orange-600">
                        Valid until{" "}
                        {new Date(offer.validTo).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link
            className="flex-1 bg-gradient-to-br from-black to-gray-600 text-white py-2.5 px-4 rounded-xl hover:from-gray-600 hover:to-black transition-all font-semibold group flex items-center justify-center gap-2 text-sm"
            href={`/dashboard/${ground.id}`}
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-3 py-2.5 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all">
            <Calendar className="w-4 h-4 text-gray-600" />
          </button>
          <button className="px-3 py-2.5 border border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all">
            <Phone className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60" />
        <video
          autoPlay
          muted
          loop
          className="w-full max-h-[35rem] object-cover"
        >
          <source src="/basketball.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-20 max-w-7xl mx-auto px-6 py-16">
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

      <div className="max-w-7xl mx-auto px-6 py-8 z-50">
        {/* Enhanced Filter Section */}
        <div className="bg-gradient-to-r from-gray-800 to-black text-white backdrop-blur-xl rounded-3xl shadow-2xl border-2 p-8 mb-8 -mt-20 relative z-50 ">
          <div className="flex flex-col justify-around lg:flex-row gap-6 items-center">
            <div className="items-center flex w-[35rem] px border-white border-2 rounded-2xl pl-5">
              <Search className="text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by ground name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" py-2 px-3  rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none w-full text-lg transition-all duration-300"
              />
            </div>

            <div className="flex flex-wrap justify-between gap-5">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-black-100 border-2 border-white hover:bg-gray-200 rounded-2xl transition-all duration-300"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 flex items-center justify-baseline"
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
              Showing the best matches for you
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

        {/* Grounds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
          {grounds.map((ground) => (
            <GroundCard key={ground.id} ground={ground} />
          ))}
        </div>

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
