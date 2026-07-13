const CardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">

    <div className="flex justify-between items-center">

      <div>

        <div className="h-4 w-24 bg-gray-300 rounded mb-4"></div>

        <div className="h-8 w-20 bg-gray-300 rounded mb-4"></div>

        <div className="h-3 w-16 bg-gray-200 rounded"></div>

      </div>

      <div className="w-14 h-14 rounded-full bg-gray-300"></div>

    </div>

  </div>
);

const ChartSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">

    <div className="h-6 w-52 bg-gray-300 rounded mb-6"></div>

    <div className="h-80 bg-gray-200 rounded-lg"></div>

  </div>
);

const TableSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">

    <div className="h-6 w-48 bg-gray-300 rounded mb-6"></div>

    {[1,2,3,4,5].map((item)=>(
      <div
        key={item}
        className="flex justify-between items-center border-b py-4"
      >

        <div className="h-4 w-40 bg-gray-300 rounded"></div>

        <div className="h-4 w-20 bg-gray-300 rounded"></div>

        <div className="h-4 w-24 bg-gray-300 rounded"></div>

      </div>
    ))}

  </div>
);

const DashboardSkeleton = () => {

  return (

    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Heading */}

      <div className="mb-8">

        <div className="h-10 w-64 bg-gray-300 rounded animate-pulse mb-3"></div>

        <div className="h-5 w-96 bg-gray-200 rounded animate-pulse"></div>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {[1,2,3,4].map((item)=>(
          <CardSkeleton key={item}/>
        ))}

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2">
          <ChartSkeleton/>
        </div>

        <ChartSkeleton/>

      </div>

      {/* Bar Chart */}

      <div className="mt-8">

        <ChartSkeleton/>

      </div>

      {/* Tables */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <TableSkeleton/>

        <TableSkeleton/>

      </div>

      {/* Bottom */}

      <div className="mt-8">

        <TableSkeleton/>

      </div>

    </div>
  );
};

export default DashboardSkeleton;