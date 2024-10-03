"use client";

import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const ContractReadVariables = () => {
  const { data: totalCounter, isLoading: isLoadingTotalCounter } = useScaffoldReadContract({
    contractName: "EIP5792_Example",
    functionName: "totalCounter",
  });

  const { data: currentGretting, isLoading: isLodingCurrentGreeeting } = useScaffoldReadContract({
    contractName: "EIP5792_Example",
    functionName: "greeting",
  });

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">Total Counter</div>
        <div className="stat-value flex items-center justify-center">
          {isLoadingTotalCounter ? (
            <span className="loading loading-spinner loading-md mt-2"></span>
          ) : (
            <p className="my-0 text-center">{totalCounter ? totalCounter?.toString() : 0}</p>
          )}
        </div>
      </div>
      <div className="stat">
        <div className="stat-title">Current greeting</div>
        <div className="stat-value flex items-center justify-center">
          {isLodingCurrentGreeeting ? (
            <span className="loading loading-spinner loading-md mt-2"></span>
          ) : (
            <p className="my-0 text-center">{currentGretting ? currentGretting : ""}</p>
          )}
        </div>
      </div>
    </div>
  );
};
