const SkeletonHabitCard = () => {
  return (
    <div className="card bg-base-100 shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-t-xl"></div>
      <div className="card-body space-y-3">
        <div className="h-5 bg-gray-300 rounded w-2/3"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default SkeletonHabitCard;
