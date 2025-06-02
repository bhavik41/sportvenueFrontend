import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createGround, updateGround } from "@/store/slices/adminGroundSlice";
import { Ground, TimeSlot, Offer } from "@/types/ground";
import ImageUpload from "./ImageUpload";
import SlotManager from "./SlotManager";
import OfferManager from "./OfferManager";

interface GroundFormProps {
  ground?: Ground;
  onClose: () => void;
  onSuccess: () => void;
}

const groundTypes = [
  "box_cricket",
  "pickle_ball",
  "football",
  "badminton",
  "tennis",
  "basketball",
  "other",
];

const commonAmenities = [
  "Parking",
  "Washrooms",
  "Changing Rooms",
  "Water Facility",
  "First Aid",
  "Equipment Rental",
  "Cafeteria",
  "Lighting",
  "Security",
  "Air Conditioning",
];

export default function GroundForm({
  ground,
  onClose,
  onSuccess,
}: GroundFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: ground?.name || "",
    description: ground?.description || "",
    location: {
      address: ground?.location.address || "",
      city: ground?.location.city || "",
      state: ground?.location.state || "",
      pincode: ground?.location.pincode || "",
    },
    groundType: ground?.groundType || "box_cricket",
    amenities: ground?.amenities || [],
    basePrice: ground?.basePrice || 0,
    isActive: ground?.isActive ?? true,
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    ground?.images || []
  );
  const [slots, setSlots] = useState<TimeSlot[]>(ground?.slots || []);
  const [offers, setOffers] = useState<Offer[]>(ground?.offers || []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: type === "number" ? parseFloat(value) : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "groundData",
        JSON.stringify({
          ...formData,
          slots,
          offers,
          images: existingImages,
          adminId: user.id,
        })
      );

      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      let result;
      if (ground) {
        result = await dispatch(
          updateGround({ id: ground.id, data: formDataToSend })
        ).unwrap();
      } else {
        result = await dispatch(createGround(formDataToSend)).unwrap();
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving ground:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {ground ? "Edit Ground" : "Add New Ground"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ground Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ground Type
                </label>
                <select
                  name="groundType"
                  value={formData.groundType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                >
                  {groundTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() +
                        type.slice(1).replace("-", " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="location.pincode"
                    value={formData.location.pincode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Base Price (₹/hour)
                  </label>
                  <input
                    type="number"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {commonAmenities.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="rounded"
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Images */}
            <ImageUpload
              images={images}
              setImages={setImages}
              existingImages={existingImages}
              setExistingImages={setExistingImages}
            />

            {/* Slots */}
            <SlotManager
              slots={slots}
              setSlots={setSlots}
              basePrice={formData.basePrice}
            />

            {/* Offers */}
            <OfferManager offers={offers} setOffers={setOffers} slots={slots} />

            {/* Status */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className="rounded"
              />
              <label className="text-sm font-medium">Ground is Active</label>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : ground
                  ? "Update Ground"
                  : "Create Ground"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
