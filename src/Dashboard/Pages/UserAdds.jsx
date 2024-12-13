"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Badge } from "@/Components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

function UserAdds({ selectedUserUid, usersData, onSave }) {
  const [userAdds, setUserAdds] = useState([]);

  useEffect(() => {
    const user = usersData.find((user) => user.Uid === selectedUserUid);
    setUserAdds(user?.ads || []);
  }, [selectedUserUid, usersData]);

  return (
    <Card className="w-full max-w-4xl mt-10 mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="text-3xl font-bold text-center">
          مشاركات المستخدم
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[70vh] pr-4">
          {userAdds.length > 0 ? (
            <div className="space-y-6">
              {userAdds.map((ad, id) => (
                <Card
                  key={id}
                  className="overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                      {ad.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                      {ad.description}
                    </p>
                    {ad.links &&
                      Object.values(ad.links).some((link) => link) && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {ad.links.fb && (
                            <SocialLink
                              href={ad.links.fb}
                              icon={FaFacebook}
                              label="فيسبوك"
                            />
                          )}
                          {ad.links.in && (
                            <SocialLink
                              href={ad.links.in}
                              icon={FaInstagram}
                              label="انستجرام"
                            />
                          )}
                          {ad.links.sh && (
                            <SocialLink
                              href={ad.links.sh}
                              icon={FaSnapchat}
                              label="سناب شات"
                            />
                          )}
                          {ad.links.tk && (
                            <SocialLink
                              href={ad.links.tk}
                              icon={FaTiktok}
                              label="تيك توك"
                            />
                          )}
                          {ad.links.x && (
                            <SocialLink
                              href={ad.links.x}
                              icon={FaXTwitter}
                              label="اكس"
                            />
                          )}
                          {ad.links.you && (
                            <SocialLink
                              href={ad.links.you}
                              icon={FaYoutube}
                              label="يوتيوب"
                            />
                          )}
                        </div>
                      )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              <h3 className="text-2xl font-semibold">لا يوجد مشاركات</h3>
              <p className="mt-2">سيتم عرض المشاركات هنا عند إضافتها.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {label}
            </span>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p dir="ltr">{href}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default UserAdds;
