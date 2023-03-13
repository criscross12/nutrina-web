import * as React from "react";

function Cart({ fill = "#FFFFFF", ...rest }) {
  return (
    <svg class="h-8 w-8 text-gray-400"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
  );
}

export default Cart;