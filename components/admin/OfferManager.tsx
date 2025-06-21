"use client";
import { useState } from "react";
import { Offer, TimeSlot } from "@/types/ground";
import { updateGround } from "@/store/slices/adminGroundSlice";

interface OfferManagerProps {
  offers: Offer[];
  setOffers: (offers: Offer[]) => void;
  slots: TimeSlot[];
}

export default function OfferManager({
  offers,
  setOffers,
  slots,
}: OfferManagerProps) {
  const [showAddOffer, setShowAddOffer] = useState(false);
  const [editingOffer, setEditingOffer] = useState<string | null>(null);

  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 0,
    validFrom: "",
    validTo: "",
    isActive: true,
    applicableSlots: [] as string[],
  });

  const handleAddOffer = () => {
    if (!newOffer.title || !newOffer.validFrom || !newOffer.validTo) {
      alert("Please fill all required fields");
      return;
    }

    const offer: Offer = {
      id: Date.now().toString(),
      title: newOffer.title,
      description: newOffer.description,
      discountType: newOffer.discountType,
      discountValue: newOffer.discountValue,
      validFrom: new Date(newOffer.validFrom).toISOString().split("T")[0],
      validTo: new Date(newOffer.validTo).toISOString().split("T")[0],
      isActive: newOffer.isActive,
      applicableSlots:
        newOffer.applicableSlots.length > 0
          ? newOffer.applicableSlots
          : undefined,
    };

    setOffers([...offers, offer]);
    resetForm();
  };

  const handleEditOffer = (offerId: string) => {
    const offer = offers.find((o) => o.id === offerId);
    if (offer) {
      setNewOffer({
        title: offer.title,
        description: offer.description,
        discountType: offer.discountType,
        discountValue: offer.discountValue,
        validFrom: new Date(offer.validFrom).toISOString().split("T")[0],
        validTo: new Date(offer.validTo).toISOString().split("T")[0],
        isActive: offer.isActive,
        applicableSlots: offer.applicableSlots || [],
      });
      setEditingOffer(offerId);
      setShowAddOffer(true);
    }
  };

  const handleUpdateOffer = () => {
    if (editingOffer) {
      const updatedOffers = offers.map((offer) =>
        offer.id === editingOffer
          ? {
              ...offer,
              title: newOffer.title,
              description: newOffer.description,
              discountType: newOffer.discountType,
              discountValue: newOffer.discountValue,
              validFrom: new Date(newOffer.validFrom)
                .toISOString()
                .split("T")[0],
              validTo: new Date(newOffer.validTo).toISOString().split("T")[0],
              isActive: newOffer.isActive,
              applicableSlots:
                newOffer.applicableSlots.length > 0
                  ? newOffer.applicableSlots
                  : undefined,
            }
          : offer
      );

      setOffers(updatedOffers);
      resetForm();
    }
  };

  const handleDeleteOffer = (offerId: string) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      setOffers(offers.filter((o) => o.id !== offerId));
    }
  };

  const resetForm = () => {
    setNewOffer({
      title: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      validFrom: "",
      validTo: "",
      isActive: true,
      applicableSlots: [],
    });
    setShowAddOffer(false);
    setEditingOffer(null);
  };

  const handleSlotToggle = (slotId: string) => {
    // Convert slotId to string to ensure consistent comparison
    const slotIdStr = String(slotId);

    setNewOffer((prev) => {
      const currentSlots = prev.applicableSlots.map((id) => String(id));
      const updatedSlots = currentSlots.includes(slotIdStr)
        ? currentSlots.filter((id) => id !== slotIdStr)
        : [...currentSlots, slotIdStr];

      return {
        ...prev,
        applicableSlots: updatedSlots,
      };
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Special Offers</h3>
        <button
          type="button"
          onClick={() => setShowAddOffer(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Add Offer
        </button>
      </div>

      {/* Existing Offers */}
      <div className="space-y-3 mb-4">
        {offers.map((offer) => (
          <div key={offer.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{offer.title}</div>
                <div className="text-sm text-gray-600 mb-1">
                  {offer.description}
                </div>
                <div className="text-sm text-gray-600">
                  Discount:{" "}
                  {offer.discountType === "percentage"
                    ? `${offer.discountValue}%`
                    : `₹${offer.discountValue}`}
                </div>
                <div className="text-sm text-gray-600">
                  Valid: {new Date(offer.validFrom).toLocaleDateString()} -{" "}
                  {new Date(offer.validTo).toLocaleDateString()}
                </div>
                <div className="text-sm">
                  Status: {offer.isActive ? "Active" : "Inactive"}
                </div>
                {offer.applicableSlots && offer.applicableSlots.length > 0 && (
                  <div className="text-sm text-gray-600">
                    Applicable to {offer.applicableSlots.length} specific
                    slot(s)
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleEditOffer(offer.id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteOffer(offer.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Offer Form */}
      {showAddOffer && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="font-semibold mb-3">
            {editingOffer ? "Edit Offer" : "Add New Offer"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Offer Title
              </label>
              <input
                type="text"
                value={newOffer.title}
                onChange={(e) =>
                  setNewOffer((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full p-2 border rounded"
                placeholder="e.g., Weekend Special"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Discount Type
              </label>
              <select
                value={newOffer.discountType}
                onChange={(e) =>
                  setNewOffer((prev) => ({
                    ...prev,
                    discountType: e.target.value as "percentage" | "fixed",
                  }))
                }
                className="w-full p-2 border rounded"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={newOffer.description}
              onChange={(e) =>
                setNewOffer((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
              rows={2}
              placeholder="Describe the offer details"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Discount Value (
                {newOffer.discountType === "percentage" ? "%" : "₹"})
              </label>
              <input
                type="number"
                value={newOffer.discountValue}
                onChange={(e) =>
                  setNewOffer((prev) => ({
                    ...prev,
                    discountValue: parseFloat(e.target.value),
                  }))
                }
                className="w-full p-2 border rounded"
                min="0"
                max={newOffer.discountType === "percentage" ? 100 : undefined}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Valid From
              </label>
              <input
                type="date"
                value={newOffer.validFrom}
                onChange={(e) =>
                  setNewOffer((prev) => ({
                    ...prev,
                    validFrom: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Valid To</label>
              <input
                type="date"
                value={newOffer.validTo}
                onChange={(e) =>
                  setNewOffer((prev) => ({ ...prev, validTo: e.target.value }))
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          {slots.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Applicable Slots (Leave empty for all slots)
              </label>
              <div className="space-y-2">
                {slots.map((slot) => (
                  <label key={slot.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newOffer.applicableSlots
                        .map((id) => String(id))
                        .includes(String(slot.id))}
                      onChange={() => handleSlotToggle(slot.id)}
                      className="rounded"
                    />
                    <span className="text-sm">
                      {slot.startTime} - {slot.endTime} (₹{slot.price})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={newOffer.isActive}
              onChange={(e) =>
                setNewOffer((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              className="rounded"
            />
            <label className="text-sm">Offer is active</label>
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={editingOffer ? handleUpdateOffer : handleAddOffer}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              {editingOffer ? "Update Offer" : "Add Offer"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
