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
} from "lucide-react";
import { Ground } from "@/types/ground";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrounds } from "@/store/slices/userGroundSlice";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
    <div
      onClick={() => router.push(`/dashboard/${ground.id}`)}
      className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] group relative cursor-pointer"
    >
      {/* Floating status badge */}

      {/* <div
        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border z-10 ${getStatusColor(
          ground.availability
        )}`}
      >
        {ground.availability}
      </div> */}
      <div
        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border z-10 ${getStatusColor(
          ground.isActive
        )}`}
      >
        {ground.isActive ? "Open" : "Closed"}
      </div>

      {/* Favorite button */}
      {/* <button
        onClick={() => toggleFavorite(ground.id)}
        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 z-10 group-hover:scale-110"
      >
        <Heart
          className={`w-4 h-4 ${
            favorites.has(ground.id)
              ? "fill-red-500 text-red-500"
              : "text-gray-600"
          }`}
        />
      </button> */}

      <div className="relative overflow-hidden">
        <img
          src={ground.images[0]}
          alt={ground.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-gradient-to-r bg-white text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            ₹{ground.basePrice}/hr
          </div>
        </div>

        {/* Share button */}
        <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {ground.name}
            </h3>
            {/* <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{ground.rating}</span>
                <span className="text-gray-500">({ground.totalReviews})</span>
              </div>
            </div> */}
          </div>
          {/* <div className="text-2xl">{getGroundTypeIcon(ground.groundType)}</div> */}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {ground.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>{ground.location.city}</span>
            <span className="ml-auto capitalize text-xs bg-gray-100 px-2 py-1 rounded-full">
              {ground.groundType.replace("_", " ")}
            </span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1">
            {ground.amenities &&
              ground.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            {ground.amenities && ground.amenities.length > 3 && (
              <span className="text-xs text-gray-500">
                +{ground.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold group flex items-center justify-center gap-2">
            Book Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
            <Calendar className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // New List Card Component
  const GroundListCard = ({ ground }: { ground: Ground }) => (
    <div
      onClick={() => router.push(`/dashboard/${ground.id}`)}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
    >
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
