"use client";
import { useEffect, useState } from "react";
import { fetchGroundById } from "@/store/slices/userGroundSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  MapPin,
  Calendar,
  Clock,
  Star,
  Wifi,
  Car,
  Users,
  Shield,
  Zap,
  Tag,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  X,
  Check,
} from "lucide-react";
import { createBooking } from "@/store/slices/bookingSlice";

interface GroundDetailesProps {
  groundId: string;
}

interface AppliedOffer {
  offerId: string;
  slotId: string;
  discountAmount: number;
  discountType: "percentage" | "fixed";
  title: string;
}

const GroundDetailes: React.FC<GroundDetailesProps> = ({ groundId }) => {
  const { currentGround } = useSelector(
    (state: RootState) => state.userGrounds
  );
  const dispatch = useDispatch<AppDispatch>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [appliedOffers, setAppliedOffers] = useState<AppliedOffer[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [bookingError, setBookingError] = useState<string | null>(null);
  const error = useSelector((state: RootState) => state.bookings.error);
  const [couponCode, setCouponCode] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  useEffect(() => {
    dispatch(fetchGroundById(groundId)).unwrap();
  }, [groundId, dispatch]);

  const calculateTotalAmount = () => {
    if (!selectedSlot || !currentGround?.slots) return 0;

    const selectedTimeSlot = currentGround.slots.find(
      (slot) => slot.id === selectedSlot
    );
    if (!selectedTimeSlot) return 0;

    const { finalPrice } = calculateSlotPrice(selectedTimeSlot);
    return finalPrice;
  };

  const handleBooking = async () => {
    if (!selectedSlot || !selectedDate) {
      setBookingError("Please select a date and time slot");
      return;
    }

    try {
      await dispatch(
        createBooking({
          groundId,
          timeSlotId: selectedSlot,
          date: selectedDate,
          totalAmount: calculateTotalAmount(), // Implement this function to calculate final amount with discounts
        })
      );
      if (error) {
        setBookingError(error);
        setBookingStatus("error");
      } else {
        setSelectedSlot(null);
        setSelectedDate(null);
        setBookingStatus("success");
        setAppliedOffers([]);
        setTimeout(() => {
          setBookingStatus("idle");
        }, 5000);
        dispatch(fetchGroundById(groundId)).unwrap();
      }
    } catch (err) {
      setBookingError(error);
    }
  };

  const isSlotBooked = (slotId: string, date: Date): boolean => {
    if (!currentGround?.bookings) return false;

    const dateString = date.toISOString().split("T")[0];

    return currentGround.bookings.some((booking) => {
      const bookingDate = new Date(booking.date).toISOString().split("T")[0];
      return (
        booking.timeSlotId === slotId &&
        bookingDate === dateString &&
        booking.status !== "cancelled"
      );
    });
  };

  const nextImage = () => {
    if (currentGround?.images && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) =>
        prev === currentGround.images.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const prevImage = () => {
    if (currentGround?.images && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) =>
        prev === 0 ? currentGround.images.length - 1 : prev - 1
      );
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const goToImage = (index: number) => {
    if (!isTransitioning && index !== currentImageIndex) {
      setIsTransitioning(true);
      setCurrentImageIndex(index);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const applyOffer = (offerId: string, slotId?: string) => {
    if (!currentGround) return;

    const offer = currentGround.offers?.find((o) => o.id === offerId);
    if (!offer) return;

    // Determine target slots
    let targetSlots: string[] = [];

    if (slotId) {
      // If specific slot provided, use only that slot
      targetSlots = [slotId];
    } else if (selectedSlot) {
      // If no specific slot but a slot is selected, use the selected slot
      targetSlots = [selectedSlot];
    } else if (offer.applicableSlots && offer.applicableSlots.length > 0) {
      // If no slot selected/provided, use all applicable slots from the offer
      targetSlots = offer.applicableSlots;
    } else {
      // If no applicable slots defined, the offer can be applied to any slot
      // But since no slot is selected, we can't apply it
      console.warn("No slot selected and no applicable slots defined");
      return;
    }

    // Validate each target slot against offer's applicable slots
    targetSlots.forEach((targetSlot) => {
      // Check if the offer has applicable slots restriction
      if (offer.applicableSlots && offer.applicableSlots.length > 0) {
        // If offer has applicable slots, check if target slot is in the list
        if (!offer.applicableSlots.includes(targetSlot)) {
          console.warn(
            `Offer ${offer.title} is not applicable to slot ${targetSlot}`
          );
          return; // Skip this slot
        }
      }

      // Check if offer is already applied to this slot
      const existingOffer = appliedOffers.find(
        (applied) =>
          applied.offerId === offerId && applied.slotId === targetSlot
      );

      if (!existingOffer) {
        const newAppliedOffer: AppliedOffer = {
          offerId: offerId,
          slotId: targetSlot,
          discountAmount: offer.discountValue,
          discountType: offer.discountType,
          title: offer.title,
        };
        setAppliedOffers((prev) => [...prev, newAppliedOffer]);
      }
    });
  };

  const removeAppliedOffer = (slotId: string, offerId: string) => {
    setAppliedOffers((prev) =>
      prev.filter(
        (offer) => !(offer.slotId === slotId && offer.offerId === offerId)
      )
    );
  };

  const applyCouponCode = () => {
    // Clear previous messages
    setCouponError("");
    setCouponSuccess("");

    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    if (!currentGround?.offers) {
      setCouponError("No offers available");
      return;
    }

    if (!selectedSlot) {
      setCouponError("Please select a slot first");
      return;
    }

    // Find offer by coupon code (assuming offers have a couponCode property)
    const offer = currentGround.offers.find(
      (o) =>
        o.couponCode?.toLowerCase() === couponCode.toLowerCase() && o.isActive
    );

    if (!offer) {
      setCouponError("Invalid coupon code");
      return;
    }

    // Check if the offer is currently valid (date range)
    const currentDate = new Date();
    const validFrom = new Date(offer.validFrom);
    const validTo = new Date(offer.validTo);

    if (currentDate < validFrom || currentDate > validTo) {
      setCouponError("This coupon has expired or is not yet valid");
      return;
    }

    // Check if the selected slot is in offer.applicableSlots
    if (offer.applicableSlots && offer.applicableSlots.length > 0) {
      if (!offer.applicableSlots.includes(selectedSlot)) {
        setCouponError("This coupon is not valid for the selected slot");
        return;
      }
    }

    // Check if coupon is already applied to the selected slot
    const alreadyApplied = appliedOffers.some(
      (applied) =>
        applied.offerId === offer.id && applied.slotId === selectedSlot
    );

    if (alreadyApplied) {
      setCouponError("Coupon already applied to this slot");
      return;
    }

    // Apply the coupon
    applyOffer(offer.id, selectedSlot);
    setCouponSuccess(`Coupon "${couponCode}" applied successfully!`);
    setCouponCode("");
    setShowCouponInput(false);
  };

  const calculateSlotPrice = (slot: any) => {
    let finalPrice = slot.price;
    let totalDiscount = 0;

    // Apply all offers for this slot
    const slotOffers = appliedOffers.filter(
      (offer) => offer.slotId === slot.id
    );

    slotOffers.forEach((appliedOffer) => {
      if (appliedOffer.discountType === "percentage") {
        const discount = (slot.price * appliedOffer.discountAmount) / 100;
        finalPrice -= discount;
        totalDiscount += discount;
      } else {
        finalPrice -= appliedOffer.discountAmount;
        totalDiscount += appliedOffer.discountAmount;
      }
    });

    return {
      finalPrice: Math.max(0, finalPrice),
      totalDiscount: totalDiscount,
      hasDiscount: slotOffers.length > 0,
    };
  };

  const getGroundTypeLabel = (type: string) => {
    const labels = {
      box_cricket: "Box Cricket",
      pickle_ball: "Pickle Ball",
      football: "Football",
      badminton: "Badminton",
      tennis: "Tennis",
      basketball: "Basketball",
      other: "Other",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getAmenityIcon = (amenity: string) => {
    const icons = {
      wifi: <Wifi className="w-4 h-4" />,
      parking: <Car className="w-4 h-4" />,
      restroom: <Users className="w-4 h-4" />,
      security: <Shield className="w-4 h-4" />,
      lighting: <Zap className="w-4 h-4" />,
    };
    return (
      icons[amenity.toLowerCase() as keyof typeof icons] || (
        <Tag className="w-4 h-4" />
      )
    );
  };

  if (!currentGround) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ground details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section with Image Carousel */}
      <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
        {currentGround.images && currentGround.images.length > 0 ? (
          <>
            {/* Carousel Container */}
            <div className="relative w-full h-full">
              <div
                className="flex transition-transform duration-300 ease-in-out h-full"
                style={{
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                }}
              >
                {currentGround.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-full h-full flex-shrink-0 relative"
                  >
                    <img
                      src={image}
                      alt={`${currentGround.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://via.placeholder.com/800x400/64748b/ffffff?text=Ground+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {currentGround.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={isTransitioning}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all z-10 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6 text-black" />
                </button>
                <button
                  onClick={nextImage}
                  disabled={isTransitioning}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all z-10 backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6 text-black" />
                </button>
              </>
            )}

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {currentGround.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? "bg-white scale-110"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  } ${
                    isTransitioning ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                />
              ))}
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-10">
              {currentImageIndex + 1} / {currentGround.images.length}
            </div>
          </>
        ) : (
          /* Fallback when no images */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800">
            <div className="text-center text-white">
              <div className="w-24 h-24 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium">No Images Available</p>
            </div>
          </div>
        )}

        {/* Header Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {currentGround.name}
                </h1>
                <div className="flex items-center space-x-4 text-sm opacity-90">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {currentGround.location.city},{" "}
                    {currentGround.location.state}
                  </div>
                  <div className="bg-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    {getGroundTypeLabel(currentGround.groundType)}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-full transition-all ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-white bg-opacity-20 text-black hover:bg-opacity-30"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                </button>
                <button className="p-3 rounded-full bg-white bg-opacity-20 text-black hover:bg-opacity-30 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 -mt-9 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Section */}

            {/* Image Thumbnails */}
            {currentGround.images && currentGround.images.length > 1 && (
              <div className="bg-white shadow-black rounded-2xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Gallery
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {currentGround.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-black ring-1 ring-black"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${currentGround.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/150x150/64748b/ffffff?text=No+Image";
                        }}
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-gray-500 opacity-80 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Ground
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {currentGround.description}
              </p>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                Location
              </h2>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">{currentGround.location.address}</p>
                <p>
                  {currentGround.location.city}, {currentGround.location.state}{" "}
                  - {currentGround.location.pincode}
                </p>
              </div>
              <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map View</p>
              </div>
            </div>

            {/* Amenities Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentGround.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg inset-shadow-sm inset-shadow-black/40"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="text-gray-700 capitalize">
                      {amenity.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Offers Section */}
            {currentGround.offers && currentGround.offers.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Tag className="w-6 h-6 mr-2 text-green-600" />
                  Special Offers
                </h2>
                <div className="space-y-4">
                  {currentGround.offers.map((offer) => {
                    const isOfferApplied = appliedOffers.some(
                      (applied) => applied.offerId === offer.id
                    );

                    return (
                      <div
                        key={offer.id}
                        className="border border-green-200 rounded-lg p-4 bg-green-50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-black-800">
                            {offer.title}
                          </h3>
                          <div className="flex flex-col items-end space-y-1">
                            <span className="bg-black text-white px-2 py-1 rounded text-sm">
                              {offer.discountType === "percentage"
                                ? `${offer.discountValue}% OFF`
                                : `₹${offer.discountValue} OFF`}
                            </span>
                            {!offer.isActive && (
                              <span className="bg-gray-400 text-white px-2 py-1 rounded text-xs">
                                Inactive
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-black-700 text-sm mb-2">
                          {offer.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <p className="text-black-600 text-xs">
                            Valid:{" "}
                            {new Date(offer.validFrom).toLocaleDateString()} -{" "}
                            {new Date(offer.validTo).toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-2">
                            {offer.isActive &&
                              new Date(offer.validFrom) <= new Date() &&
                              new Date(offer.validTo) >= new Date() && (
                                <span className="bg-green-100 border-green-500 border-1 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                  Active Now
                                </span>
                              )}

                            {/* Apply Offer Button */}
                            {offer.isActive &&
                              new Date(offer.validFrom) <= new Date() &&
                              new Date(offer.validTo) >= new Date() && (
                                <button
                                  onClick={() => applyOffer(offer.id)}
                                  disabled={
                                    !selectedSlot &&
                                    !offer.applicableSlots?.length
                                  }
                                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                                    isOfferApplied
                                      ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                                      : "bg-black hover:bg-gray-700 text-white"
                                  }`}
                                >
                                  {isOfferApplied ? "Applied" : "Apply Offer"}
                                </button>
                              )}
                          </div>
                        </div>
                        <div className="flex gap-1 items-center">
                          <p className="text-black-600 text-xs">
                            Coupon Code:-{" "}
                          </p>
                          <p className="text-black-600 border-black-200 border-[0.5px] rounded-md px-2 bg-neutral-200 p-1 text-xs">
                            {offer.couponCode}
                          </p>
                        </div>
                        {/* Show applicable slots for this offer */}
                        <div className="flex gap-1 items-center mt-1">
                          <p className="text-black-600 text-xs">
                            Applicable Slots:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {offer.applicableSlots &&
                            offer.applicableSlots.length > 0 ? (
                              offer.applicableSlots.map((slotId: string) => {
                                const slot = currentGround.slots?.find(
                                  (s) => s.id === slotId
                                );
                                return slot ? (
                                  <span
                                    key={slotId}
                                    className="bg-green-100 text-blue-800 px-2 py-0.5 rounded text-xs"
                                  >
                                    {slot.startTime}-{slot.endTime}
                                  </span>
                                ) : (
                                  // Show a fallback if slot not found
                                  <span
                                    key={slotId}
                                    className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs"
                                  >
                                    Slot unavailable
                                  </span>
                                );
                              })
                            ) : (
                              <span className="text-gray-400 text-xs">
                                All slots
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Show which slots this offer is applied to */}
                        {isOfferApplied && (
                          <div className="mt-2 pt-2 border-t border-green-200">
                            <p className="text-xs text-green-700 font-medium">
                              Applied to slots:
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {appliedOffers
                                .filter(
                                  (applied) => applied.offerId === offer.id
                                )
                                .map((applied) => {
                                  const slot = currentGround.slots?.find(
                                    (s) => s.id === applied.slotId
                                  );
                                  return slot ? (
                                    <div
                                      key={applied.slotId}
                                      className="flex items-center bg-green-200 text-green-800 px-2 py-1 rounded text-xs"
                                    >
                                      <span>
                                        {slot.startTime}-{slot.endTime}
                                      </span>
                                      <button
                                        onClick={() =>
                                          removeAppliedOffer(
                                            applied.slotId,
                                            applied.offerId
                                          )
                                        }
                                        className="ml-1 text-green-600 hover:text-green-800"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ) : null;
                                })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Info */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  ₹{currentGround.basePrice}
                </div>
                <div className="text-gray-500">per hour</div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Book Your Slot
                </h3>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={selectedDate?.toISOString().split("T")[0] || ""}
                    onChange={(e) => {
                      setSelectedDate(
                        e.target.value ? new Date(e.target.value) : null
                      );
                      setSelectedSlot(null);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Time Slots */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                    {currentGround?.slots?.map((slot) => {
                      const { finalPrice, hasDiscount } =
                        calculateSlotPrice(slot);
                      const isSlotAvailable =
                        slot.isAvailable &&
                        selectedDate &&
                        slot.days.includes(
                          selectedDate
                            .toLocaleDateString("en-US", { weekday: "long" })
                            .toLowerCase() as
                            | "monday"
                            | "tuesday"
                            | "wednesday"
                            | "thursday"
                            | "friday"
                            | "saturday"
                            | "sunday"
                        );

                      // Check if slot is booked for the selected date
                      const isBooked = selectedDate
                        ? isSlotBooked(slot.id, selectedDate)
                        : false;

                      return (
                        <button
                          key={slot.id}
                          onClick={() => !isBooked && setSelectedSlot(slot.id)}
                          disabled={!isSlotAvailable || isBooked}
                          className={`p-3 rounded-lg text-sm font-medium transition-all ${
                            isBooked
                              ? "bg-red-100 border border-red-200 text-red-600 cursor-not-allowed"
                              : slot.id === selectedSlot
                              ? "bg-green-500 text-white"
                              : isSlotAvailable
                              ? "bg-white border border-gray-200 hover:border-blue-500 text-gray-900"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <div>
                            {slot.startTime} - {slot.endTime}
                          </div>
                          <div className="mt-1">
                            {hasDiscount && !isBooked && (
                              <span className="line-through text-gray-400 mr-2">
                                ₹{slot.price}
                              </span>
                            )}
                            <span
                              className={`${
                                isBooked
                                  ? "text-red-600"
                                  : slot.id === selectedSlot
                                  ? "text-white"
                                  : "text-blue-600"
                              }`}
                            >
                              ₹{finalPrice}
                            </span>
                          </div>
                          {isBooked && (
                            <div className="text-xs text-red-600 mt-1 font-semibold">
                              Already Booked
                            </div>
                          )}
                          {!selectedDate && !isBooked && (
                            <div className="text-xs text-gray-500 mt-1">
                              Select a date first
                            </div>
                          )}
                          {selectedDate &&
                            !isSlotAvailable &&
                            slot.isAvailable &&
                            !isBooked && (
                              <div className="text-xs text-red-500 mt-1">
                                Not available on this day
                              </div>
                            )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">
                    Have a coupon?
                  </h3>
                  <button
                    onClick={() => setShowCouponInput(!showCouponInput)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {showCouponInput ? "Cancel" : "Apply Coupon"}
                  </button>
                </div>
                {showCouponInput && (
                  <div className="space-y-3 mb-6">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          // Clear errors when user starts typing
                          if (couponError) setCouponError("");
                          if (couponSuccess) setCouponSuccess("");
                        }}
                        placeholder="Enter coupon code"
                        className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          couponError
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                      />
                      <button
                        onClick={applyCouponCode}
                        disabled={!couponCode.trim()}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Error Message */}
                    {couponError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm font-medium flex items-center">
                          <X className="w-4 h-4 mr-2" />
                          {couponError}
                        </p>
                      </div>
                    )}

                    {/* Success Message */}
                    {couponSuccess && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-600 text-sm font-medium flex items-center">
                          <Check className="w-4 h-4 mr-2" />
                          {couponSuccess}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Applied Offers Summary */}
                {appliedOffers.length > 0 && (
                  <div className="mb-6 p-4 border border-green-200 rounded-lg bg-green-50">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      Applied Offers ({appliedOffers.length})
                    </h4>
                    <div className="space-y-2">
                      {appliedOffers.map((appliedOffer, index) => {
                        const slot = currentGround.slots?.find(
                          (s) => s.id === appliedOffer.slotId
                        );
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm"
                          >
                            <div>
                              <span className="font-medium text-green-800">
                                {appliedOffer.title}
                              </span>
                              {slot && (
                                <span className="text-green-600 ml-2">
                                  ({slot.startTime}-{slot.endTime})
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-green-700 font-semibold">
                                -
                                {appliedOffer.discountType === "percentage"
                                  ? `${appliedOffer.discountAmount}%`
                                  : `₹${appliedOffer.discountAmount}`}
                              </span>
                              <button
                                onClick={() =>
                                  removeAppliedOffer(
                                    appliedOffer.slotId,
                                    appliedOffer.offerId
                                  )
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Price Summary */}
                {selectedSlot && (
                  <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-green-50">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Booking Summary
                    </h4>
                    {(() => {
                      const slot = currentGround.slots?.find(
                        (s) => s.id === selectedSlot
                      );
                      if (!slot) return null;

                      const priceInfo = calculateSlotPrice(slot);

                      return (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Selected Slot:</span>
                            <span className="font-medium">
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Base Price:</span>
                            <span>₹{slot.price}</span>
                          </div>
                          {priceInfo.hasDiscount && (
                            <>
                              <div className="flex justify-between text-green-600">
                                <span>Discount:</span>
                                <span>
                                  -₹{Math.round(priceInfo.totalDiscount)}
                                </span>
                              </div>
                              <hr className="border-blue-200" />
                              <div className="flex justify-between font-bold text-blue-800">
                                <span>Final Price:</span>
                                <span>₹{Math.round(priceInfo.finalPrice)}</span>
                              </div>
                              <div className="text-green-600 font-medium text-center">
                                You save ₹{Math.round(priceInfo.totalDiscount)}!
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
                {/* Booking Button and Status */}
                <div className="mt-6">
                  {bookingError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                      {bookingError}
                    </div>
                  )}
                  {bookingStatus === "success" && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
                      Booking successful! We'll send you a confirmation email
                      shortly.
                    </div>
                  )}
                  <button
                    onClick={handleBooking}
                    disabled={
                      bookingStatus === "loading" ||
                      !selectedDate ||
                      !selectedSlot
                    }
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                      bookingStatus === "loading"
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : selectedDate && selectedSlot
                        ? "bg-gradient-to-br from-black to-gray-600 text-white  hover:from-gray-600 hover:to-black transition-all hover:from-gray-600 hover:to-black"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {bookingStatus === "loading" ? "Processing..." : "Book Now"}
                  </button>
                </div>
              </div>

              {/* Coupon Code Section */}

              {/* <button
                disabled={!selectedSlot}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {selectedSlot ? "Book Now" : "Select a Slot to Book"}
              </button> */}
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Contact Ground Owner
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
                <button className="w-full bg-black flex items-center justify-center space-x-2 border border-gray-300 hover:bg-white hover:border-2 hover:border-black hover:text-black text-white py-2 px-4 rounded-lg ">
                  <Mail className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-3">
                💡 Booking Tips
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Apply offers before booking to save money</li>
                <li>• Check for coupon codes on social media</li>
                <li>
                  • Book early morning or late evening slots for better rates
                </li>
                <li>• Multiple offers can be combined on the same slot</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundDetailes;
