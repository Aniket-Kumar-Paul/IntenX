"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types/nearContractTypes";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";

const ProfileUpdateModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { contract, userProfile, fetchUserProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Sync state with userProfile when modal opens
  useEffect(() => {
    if (isOpen && userProfile) {
      setProfile(userProfile);
    }
  }, [isOpen, userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    if (!profile) return;
    setProfile({ ...profile, automatic_rebalance: !profile.automatic_rebalance });
  };

  const handleUpdate = async () => {
    if (!contract || !profile) return;
    await contract.upsertProfile({
      ...profile,
      rebalance_frequency: Number(profile.rebalance_frequency) * 60, // Convert minutes to seconds
    });
    await fetchUserProfile();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Profile">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          value={profile?.username || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-900 text-white rounded-md border border-gray-700"
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={profile?.email || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-900 text-white rounded-md border border-gray-700"
          placeholder="Email"
        />
        <select
          name="risk_level"
          value={profile?.risk_level || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-900 text-white rounded-md border border-gray-700"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="number"
          name="rebalance_frequency"
          value={profile?.rebalance_frequency || ""}
          onChange={handleChange}
          className="w-full p-2 bg-gray-900 text-white rounded-md border border-gray-700"
          placeholder="Rebalance Frequency (minutes)"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={profile?.automatic_rebalance || false}
            onChange={handleToggle}
            className="w-5 h-5"
          />
          <span className="text-white">Enable Auto Rebalance</span>
        </div>
        <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-md" onClick={handleUpdate}>
          Update Profile
        </Button>
      </div>
    </Modal>
  );
};

export default ProfileUpdateModal;
