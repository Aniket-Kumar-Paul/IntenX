"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { RiskLevel, UserProfile } from "@/types/nearContractTypes";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";

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
    if (!contract) return;
    await contract.upsertProfile({
      ...profile,
      rebalance_frequency: profile.rebalance_frequency * 60, // Convert minutes to seconds
    });
    fetchUserProfile();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Profile">
      <div className="flex flex-col gap-6">
        {/* Username Input */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm">Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:border-violet-500 outline-none"
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:border-violet-500 outline-none"
          />
        </div>

        {/* Risk Level Dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm">Risk Level</label>
          <select
            name="risk_level"
            value={profile.risk_level}
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:border-violet-500 outline-none"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Rebalance Frequency */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm">Rebalance Frequency (minutes)</label>
          <input
            type="number"
            name="rebalance_frequency"
            value={profile.rebalance_frequency}
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:border-violet-500 outline-none"
          />
        </div>

        {/* Toggle Switch for Auto Rebalance */}
        <div className="flex items-center justify-between">
          <span className="text-white text-sm">Enable Auto Rebalance</span>
          <button
            className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
              profile.automatic_rebalance ? "bg-violet-600" : "bg-gray-600"
            }`}
            onClick={handleToggle}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full transition ${
                profile.automatic_rebalance ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Save Button */}
        <Button
          className="w-full bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-md text-lg font-medium"
          onClick={handleUpdate}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default ProfileUpdateModal;
