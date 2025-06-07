"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchGrounds, deleteGround } from "@/store/slices/adminGroundSlice";
import { Ground } from "@/types/ground";
import GroundForm from "./GroundForm";

export default function GroundsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { grounds, isLoading } = useSelector(
    (state: RootState) => state.adminGrounds
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [editingGround, setEditingGround] = useState<Ground | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(fetchGrounds(user.id));
    }
  }, [dispatch, user]);

  const handleEdit = (ground: Ground) => {
    setEditingGround(ground);
    setShowForm(true);
  };

  const handleDelete = async (groundId: string) => {
    if (confirm("Are you sure you want to delete this ground?")) {
      try {
        await dispatch(deleteGround(groundId)).unwrap();
      } catch (error) {
        console.error("Failed to delete ground:", error);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingGround(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingGround(null);
    if (user) {
      dispatch(fetchGrounds(user.id));
    }
  };

  const filteredGrounds = grounds.filter((ground) => {
    const matchesSearch =
      ground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ground.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || ground.groundType === filterType;
    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Grounds</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New Ground
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Search grounds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All Ground Types</option>
            <option value="box-cricket">Box Cricket</option>
            <option value="pickle-ball">Pickle Ball</option>
            <option value="football">Football</option>
            <option value="badminton">Badminton</option>
            <option value="tennis">Tennis</option>
            <option value="basketball">Basketball</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Grounds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrounds.map((ground) => (
          <div
            key={ground.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Ground Image */}
            <div className="h-48 bg-gray-200">
              {ground.images.length > 0 ? (
                <img
                  src={ground.images[0]}
                  alt={ground.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Ground Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{ground.name}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    ground.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {ground.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-2">
                {ground.groundType.charAt(0).toUpperCase() +
                  ground.groundType.slice(1).replace("-", " ")}
              </p>

              <p className="text-gray-600 text-sm mb-2">
                {ground.location.city}, {ground.location.state}
              </p>

              <p className="text-green-600 font-semibold mb-2">
                ₹{ground.basePrice}/hour
              </p>

              <div className="text-sm text-gray-600 mb-3">
                <div>Slots: {ground.slots.length}</div>
                <div>Offers: {ground.offers.length}</div>
                <div>Images: {ground.images.length}/5</div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(ground)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ground.id)}
                  className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredGrounds.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchTerm || filterType
              ? "No grounds match your criteria"
              : "No grounds found"}
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Your First Ground
          </button>
        </div>
      )}

      {/* Ground Form Modal */}
      {showForm && (
        <GroundForm
          ground={editingGround ?? undefined}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
