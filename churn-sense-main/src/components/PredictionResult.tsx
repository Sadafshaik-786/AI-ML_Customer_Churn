import React from "react";

interface PredictionResultProps {
  churn: boolean;
  probability: number;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ churn, probability }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-900 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-purple-400 mb-4">
        Prediction Result
      </h2>
      <p className="text-lg text-white">
        {churn ? (
          <span className="text-red-400 font-semibold">
            ⚠️ Customer is likely to churn
          </span>
        ) : (
          <span className="text-green-400 font-semibold">
            ✅ Customer is not likely to churn
          </span>
        )}
      </p>
      <p className="mt-2 text-purple-300">
        Probability: {(probability * 100).toFixed(2)}%
      </p>
    </div>
  );
};

export default PredictionResult;

