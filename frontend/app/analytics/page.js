"use client";
import { GraphCard } from "../_components/PieCard";
import { BarCard } from "../_components/BarCard";
import { LineCard } from "../_components/LineCard";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Analysis() {
  return (
    <div className="">
      <p className="text-7xl font-bold mb-8 text-center text-white pt-11">
        Journal and Analysis
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-10 px-6">
        <div className="lg:col-span-3 lg:px-10">
          <Card className="dark border-2 border-[#3a158e]">
            <CardContent className="py-10">
              <p className="text-[#d1d5db]">
                Card Content ajncdoiancolwmc kendcpanc odsncown wnecow boncw
                ownecwhj0wpc ownciwjcwo wnco adjknciuach wenco wjnclowi
                wncpowicw wknceownckw.Card Content ajncdoiancolwmc kendcpanc
                odsncown wnecow boncw ownecwhj0wpc ownciwjcwo wnco adjknciuach
                wenco wjnclowi wncpowicw wknceownckw.Card Content
                ajncdoiancolwmc kendcpanc odsncown wnecow boncw ownecwhj0wpc
                ownciwjcwo wnco adjknciuach wenco wjnclowi wncpowicw
                wknceownckw.Card Content ajncdoiancolwmc kendcpanc odsncown
                wnecow boncw ownecwhj0wpc ownciwjcwo wnco adjknciuach wenco
                wjnclowi wncpowicw wknceownckw.Card Content ajncdoiancolwmc
                kendcpanc odsncown wnecow boncw ownecwhj0wpc ownciwjcwo wnco
                adjknciuach wenco wjnclowi wncpowicw wknceownckw.Card Content
                ajncdoiancolwmc kendcpanc odsncown wnecow boncw ownecwhj0wpc
                ownciwjcwo wnco adjknciuach wenco wjnclowi wncpowicw
                wknceownckw.Card Content ajncdoiancolwmc kendcpanc odsncown
                wnecow boncw ownecwhj0wpc ownciwjcwo wnco adjknciuach wenco
                wjnclowi wncpowicw wknceownckw.Card Content ajncdoiancolwmc
                kendcpanc odsncown wnecow boncw ownecwhj0wpc ownciwjcwo wnco
                adjknciuach wenco wjnclowi wncpowicw wknceownckw.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="max-w-[500px] w-full mx-auto h-[500px]">
          <GraphCard />
        </div>
        <div className="max-w-[500px] w-full mx-auto max-h-[500px]">
          <BarCard />
        </div>
        <div className="max-w-[500px] w-full mx-auto max-h-[500px]">
          <LineCard />
        </div>
      </div>
    </div>
  );
}

export default Analysis;
