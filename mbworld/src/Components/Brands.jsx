import React from "react";

import 'flowbite/dist/flowbite.css';
import { Avatar } from "flowbite-react";

export function Brands() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Avatar className="w-44 h-44" img="https://i.pinimg.com/564x/79/84/3a/79843a31a008c371a8417ad73cad3ee5.jpg" alt="avatar of Jese" rounded />
      <Avatar className="w-44 h-44" img="https://i.pinimg.com/236x/7d/f9/8e/7df98ed3ac236af0313892e9c901638e.jpg" />
      <Avatar className="w-44 h-44" img="https://i.pinimg.com/736x/dc/36/c1/dc36c1d02dfe2ec192b7ec6d2289cb2d.jpg" />
      <Avatar className="w-44 h-44" img="https://i.pinimg.com/564x/00/46/ee/0046eee61dd2f2dd75e82bf453a2fa22.jpg" alt="avatar of Jese" rounded />
      <Avatar className="w-44 h-44" img="https://i.pinimg.com/564x/6b/f6/e0/6bf6e00e13f766739431eed54aa31fe9.jpg" />
      <Avatar className="w-44 h-44" img="https://i.pinimg.com/564x/ec/e7/15/ece715b334afb80a7f172f3ab6b68229.jpg" />
    </div>
   
     
  )
}