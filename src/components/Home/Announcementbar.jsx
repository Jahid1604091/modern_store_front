import React, { useState } from "react";
import toast from "react-hot-toast";
import { useGetFeaturedCouponQuery } from "../../slices/couponApiSlice";
import "./css/Announcementbar.css";

/**
 * Announcementbar
 * Shows the company's currently featured coupon (set in the admin dashboard
 * under Coupons → "Feature in homepage banner"). Renders nothing if no
 * coupon is featured/active right now.
 */
const Announcementbar = () => {
  const [dismissed, setDismissed] = useState(false);
  const { data, isLoading } = useGetFeaturedCouponQuery();
  const coupon = data?.data;

  if (isLoading || dismissed || !coupon) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(coupon.code);
    toast.success("Coupon code copied!");
  };

  const discountText = coupon.discount_type === "percent"
    ? `${coupon.discount_value}% Discount`
    : `${coupon.discount_value} BDT Off`;

  return (
    <div className="announcement-bar">
      🎉 {coupon.description || (
        <>Get <strong>{discountText}</strong> on your order</>
      )} — use code{" "}
      <span className="promo-code" onClick={handleCopy} title="Click to copy">
        {coupon.code}
      </span>{" "}
      at checkout

      <button
        className="announce-close"
        onClick={() => setDismissed(true)}
        aria-label="Close announcement"
      >
        ✕
      </button>
    </div>
  );
};

export default Announcementbar;
