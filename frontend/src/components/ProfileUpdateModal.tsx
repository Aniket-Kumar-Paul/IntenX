"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { RiskLevel, UserProfile } from "@/types/nearContractTypes";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { showToast } from "./ui/ToastNotifier";
import { Loader2 } from "lucide-react"; 

const ProfileUpdateModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { contract, userProfile, fetchUserProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    username: "",
    email: "",
    risk_level: RiskLevel.Low,
    rebalance_frequency: 0,
    automatic_rebalance: false,
  });
  const [loading, setLoading] = useState(false); // State for loading spinner

  // Update profile state when userProfile is available
  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Toggle Switch
  const handleToggle = () => {
    setProfile((prev) => ({
      ...prev,
      automatic_rebalance: !prev.automatic_rebalance,
    }));
  };

  // Handle Profile Update
  const handleUpdate = async () => {
    if (!contract || !profile) return;
    
    setLoading(true); // Show spinner
    
    try {
      await contract.upsertProfile({
        ...profile,
        rebalance_frequency: profile.rebalance_frequency * 60, // Convert minutes to seconds
      });
      await fetchUserProfile();
      showToast("success", "Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Profile update failed:", error);
      showToast("error", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false); // Hide spinner after operation
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profile">
      <div className="flex flex-col gap-4">
        {/* Username Input */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-xs">Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full p-2 px-4 bg-gray-900 text-white rounded-full border border-gray-700 focus:border-violet-500 outline-none text-sm"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-xs">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-2 px-4 bg-gray-900 text-white rounded-full border border-gray-700 focus:border-violet-500 outline-none text-sm"
          />
        </div>

        {/* Risk Level Dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-xs">Risk Level</label>
          <select
            name="risk_level"
            value={profile.risk_level}
            onChange={handleChange}
            className="w-full p-2 px-4 bg-gray-900 text-white rounded-full border border-gray-700 focus:border-violet-500 outline-none text-sm"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Rebalance Frequency */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-xs">Rebalance Frequency (minutes)</label>
          <input
            type="number"
            name="rebalance_frequency"
            value={profile.rebalance_frequency}
            onChange={handleChange}
            className="w-full p-2 px-4 bg-gray-900 text-white rounded-full border border-gray-700 focus:border-violet-500 outline-none text-sm"
          />
        </div>

        {/* Toggle Switch for Auto Rebalance */}
        <div className="flex items-center justify-between">
          <span className="text-white text-xs">Enable Auto Rebalance</span>
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              profile.automatic_rebalance ? "bg-violet-600" : "bg-gray-600"
            }`}
            onClick={handleToggle}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition ${
                profile.automatic_rebalance ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Save Button with Spinner */}
        <Button
          className="w-full bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-full text-sm flex items-center justify-center"
          onClick={handleUpdate}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <Loader2 className="animate-spin"/> // Show spinner
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default ProfileUpdateModal;