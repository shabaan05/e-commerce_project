const AdminDashboard = () => {
  return (
    <div className="p-6">
      <div>
        <p>side   bar also include</p>
      </div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="border p-4 rounded">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
