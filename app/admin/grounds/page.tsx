// "use client";

// import GroundsList from "@/components/admin/GroundsList";
// import React, { useState, useEffect } from "react";

// interface Ground {
//   id: string;
//   name: string;
//   location: string;
//   price: number;
//   amenities: string[];
//   offers: string;
//   images: string[];
//   slots: Slot[];
// }

// interface Slot {
//   id: string;
//   startTime: string;
//   endTime: string;
//   price: number;
// }

// const AdminGroundsPage = () => {
//   const [grounds, setGrounds] = useState<Ground[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Placeholder for fetching grounds from backend API
//   useEffect(() => {
//     setLoading(true);
//     // TODO: Fetch grounds from backend API
//     setTimeout(() => {
//       setGrounds([]);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Handlers for add/edit/delete grounds and slots will be added here

//   return (
//     <>
//       <GroundsList />
//     </>
//   );
// };

// export default AdminGroundsPage;
