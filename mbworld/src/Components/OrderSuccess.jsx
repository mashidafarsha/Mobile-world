import React from "react";

function OrderSuccess() {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-150px)] p-5">
     
          <div className="flex flex-wrap gap-2"> <span className="text-5xl text-green-900 mb-5">✔</span></div>
         
        <h2 className="text-2xl mb-2">Your order has been placed successfully.</h2>
        <p className="text-lg text-gray-500 max-w-lg">
          Lorem ipsum dolor sit amet consectetur. Explain all the bad lectures updates please.
        </p>
      </div>
      
    );
}
export default OrderSuccess;
