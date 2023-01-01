// import React, { useState } from "react";

// export default function toast() {
//   const [isPasswordVisible, setPasswordVisibility] = useState(false);

//   return (
//     <div className="flex justify-between items-center">
//       <div className="flex items-center px-10 bg-red-100 w-full space-x-3">
//         <p className=" font-bold text-green-400">
//           Your password has been generated:{" "}
//         </p>
//         <p className="text-center font-bold px-3 my-2 text-red-800 py-1 bg-slate-100 rounded-lg">
//           {passwordHash.substring(0, 2) +
//             hideString(passwordHash.substring(2), isPasswordVisible)}
//         </p>
//         {isPasswordVisible ? (
//           <Eye
//             onClick={() => {
//               setPasswordVisibility(false);
//             }}
//             className="h-6 w-6 cursor-pointer"
//           />
//         ) : (
//           <EyeSlash
//             onClick={() => {
//               setPasswordVisibility(true);
//             }}
//             className="h-6 w-6 cursor-pointer"
//           />
//         )}
//       </div>
//       <button onClick={handleCopyPassword} className="px-3 py-3 bg-white">
//         <Copy className="h-6 w-6" />
//       </button>
//     </div>
//   );
// }
