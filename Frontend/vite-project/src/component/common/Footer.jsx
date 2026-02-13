import React from 'react'

function Footer() {
  return (
  <footer className="bg-white border-t border-gray-200 mt-20">

    <div className="max-w-7xl mx-auto px-6 py-12">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            MyStore
          </h2>
          <p className="text-sm text-gray-500">
            Premium products with seamless shopping experience.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Shop
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="/shop" className="hover:text-blue-600 transition">
                All Products
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-blue-600 transition">
                Cart
              </a>
            </li>
            <li>
              <a href="/orders" className="hover:text-blue-600 transition">
                Orders
              </a>
            </li>
          </ul>
        </div>

        {/* Account Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Account
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="/profile" className="hover:text-blue-600 transition">
                Profile
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-blue-600 transition">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-blue-600 transition">
                Register
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Contact
          </h3>
          <p className="text-sm text-gray-600">
            support@mystore.com
          </p>
          <p className="text-sm text-gray-600">
            +91 98765 43210
          </p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>

    </div>

  </footer>
);

}

export default Footer