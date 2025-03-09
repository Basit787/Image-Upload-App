import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeleteAccount from "./profileTabs/deleteAccount";
import Password from "./profileTabs/password";
import Profile from "./profileTabs/profile";

const primarytabs = [
  {
    tabstrigger: "Profile",
    value: "profile",
    data: <Profile />,
  },
  {
    tabstrigger: "Password",
    value: "password",
    data: <Password />,
  },
  {
    tabstrigger: "Delete Account",
    value: "deleteAccount",
    data: <DeleteAccount />,
  },
];

const ProfileDetails = () => {
  return (
    <div className="md:px-10 lg:px-20">
      <h1 className="text-center font-bold text-2xl md:text-4xl pt-3 pb-8">
        Profile Details
      </h1>

      <Card className="md:p-6 p-2 border-none relative">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full flex flex-wrap md:flex-nowrap justify-start items-start border-b rounded-none h-auto p-0 bg-transparent">
            {primarytabs.map((item, index) => (
              <TabsTrigger
                value={item.value}
                key={index}
                className="md:w-auto text-center md:text-left relative rounded-none border-transparent data-[state=active]:border-primary/75 data-[state=active]:text-primary/75 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 md:px-6 pb-4 md:pb-4 font-medium text-lg md:text-xl data-[state=active]:after:w-full data-[state=active] after:scale-x-100 data-[state=active]:after:transition-all data-[state=active]:after:duration-300 data-[state=active]:after:origin-center after:content-[''] after:absolute after:bottom-0 after:h-[0.140rem] after:w-0 after:bg-primary/75 after:transition-transform after:duration-300 after:origin-center"
              >
                {item.tabstrigger}
              </TabsTrigger>
            ))}
          </TabsList>

          {primarytabs.map((item, index) => (
            <TabsContent value={item.value} className="p-2" key={index}>
              {item.data}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};

export default ProfileDetails;
