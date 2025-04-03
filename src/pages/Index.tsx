
import React from "react";
import LeadTracker from "@/components/LeadTracker";

const Index = () => {
  return (
    <div className="container mx-auto py-6 px-4 h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-8">Lead Lane Tracker</h1>
      <div className="flex-1 overflow-hidden">
        <LeadTracker />
      </div>
    </div>
  );
};

export default Index;
