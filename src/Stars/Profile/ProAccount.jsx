import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProAccount = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-indigo-900">PRO Account</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-gray-600">
          Upgrade to a PRO account to access premium features and services.
        </p>
        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-900 mb-4">PRO Account Benefits</h3>
            <ul className="list-disc list-inside space-y-2 text-indigo-800">
              <li>Unlimited access to all features</li>
              <li>Priority customer support</li>
              <li>Advanced analytics and reporting</li>
              <li>Customizable profile and branding</li>
              <li>Early access to new features</li>
            </ul>
          </div>
          <div className="text-center">
            <Button size="lg" className="w-full sm:w-auto">
              Upgrade to PRO
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProAccount;

