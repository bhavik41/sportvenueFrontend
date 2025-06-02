"use client";
import { useState } from "react";
import { TimeSlot } from "@/types/ground";

interface SlotManagerProps {
  slots: TimeSlot[];
  setSlots: (slots: TimeSlot[]) => void;
  basePrice: number;
}

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export default function SlotManager({
  slots,
  setSlots,
  basePrice,
}: SlotManagerProps) {
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [editingSlot, setEditingSlot] = useState<string | null>(null);

  const [newSlot, setNewSlot] = useState({
    startTime: "",
    endTime: "",
    price: basePrice,
    isAvailable: true,
    days: [] as string[],
  });

  const handleAddSlot = () => {
    if (!newSlot.startTime || !newSlot.endTime || newSlot.days.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    const slot: TimeSlot = {
      id: Date.now().toString(),
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      price: newSlot.price,
      isAvailable: newSlot.isAvailable,
      days: newSlot.days as any[],
    };

    setSlots([...slots, slot]);
    setNewSlot({
      startTime: "",
      endTime: "",
      price: basePrice,
      isAvailable: true,
      days: [],
    });
    setShowAddSlot(false);
  };

  const handleEditSlot = (slotId: string) => {
    const slot = slots.find((s) => s.id === slotId);
    if (slot) {
      setNewSlot({
        startTime: slot.startTime,
        endTime: slot.endTime,
        price: slot.price,
        isAvailable: slot.isAvailable,
        days: slot.days,
      });
      setEditingSlot(slotId);
      setShowAddSlot(true);
    }
  };

  const handleUpdateSlot = () => {
    if (editingSlot) {
      const updatedSlots = slots.map((slot) =>
        slot.id === editingSlot
          ? { ...slot, ...newSlot, days: newSlot.days as any[] }
          : slot
      );

      setSlots(updatedSlots);
      setEditingSlot(null);
      setNewSlot({
        startTime: "",
        endTime: "",
        price: basePrice,
        isAvailable: true,
        days: [],
      });
      setShowAddSlot(false);
    }
  };

  const handleDeleteSlot = (slotId: string) => {
    if (confirm("Are you sure you want to delete this slot?")) {
      setSlots(slots.filter((s) => s.id !== slotId));
    }
  };

  const handleDayToggle = (day: string) => {
    setNewSlot((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Time Slots</h3>
        <button
          type="button"
          onClick={() => setShowAddSlot(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Slot
        </button>
      </div>

      {/* Existing Slots */}
      <div className="space-y-3 mb-4">
        {slots.map((slot) => (
          <div key={slot.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">
                  {slot.startTime} - {slot.endTime}
                </div>
                <div className="text-sm text-gray-600">₹{slot.price}/hour</div>
                <div className="text-sm text-gray-600">
                  Days:{" "}
                  {slot.days
                    .map((d: any) => d.charAt(0).toUpperCase() + d.slice(1))
                    .join(", ")}
                </div>
                <div className="text-sm">
                  Status: {slot.isAvailable ? "Available" : "Unavailable"}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleEditSlot(slot.id)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Slot Form */}
      {showAddSlot && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="font-semibold mb-3">
            {editingSlot ? "Edit Slot" : "Add New Slot"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={newSlot.startTime}
                onChange={(e) =>
                  setNewSlot((prev) => ({ ...prev, startTime: e.target.value }))
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                value={newSlot.endTime}
                onChange={(e) =>
                  setNewSlot((prev) => ({ ...prev, endTime: e.target.value }))
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Price (₹/hour)
              </label>
              <input
                type="number"
                value={newSlot.price}
                onChange={(e) =>
                  setNewSlot((prev) => ({
                    ...prev,
                    price: parseFloat(e.target.value),
                  }))
                }
                className="w-full p-2 border rounded"
                min="0"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Available Days
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {days.map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newSlot.days.includes(day)}
                    onChange={() => handleDayToggle(day)}
                    className="rounded"
                  />
                  <span className="text-sm capitalize">{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={newSlot.isAvailable}
              onChange={(e) =>
                setNewSlot((prev) => ({
                  ...prev,
                  isAvailable: e.target.checked,
                }))
              }
              className="rounded"
            />
            <label className="text-sm">Available for booking</label>
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={editingSlot ? handleUpdateSlot : handleAddSlot}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingSlot ? "Update Slot" : "Add Slot"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddSlot(false);
                setEditingSlot(null);
                setNewSlot({
                  startTime: "",
                  endTime: "",
                  price: basePrice,
                  isAvailable: true,
                  days: [],
                });
              }}
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
