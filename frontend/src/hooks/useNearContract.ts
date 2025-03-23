import { useAuth } from "@/context/AuthContext";

export const useNearContract = () => {
  const { contract } = useAuth();

  if (!contract) {
    throw new Error("Contract is not initialized. Ensure user is logged in.");
  }

  return contract;
};
