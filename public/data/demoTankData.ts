export const demoTank = {
  _id: "demo123",
  name: "Demo Tank",
  userId: "demo-user-id",
  serialNumber: "demo:00:00",
  distance: 120,
  size: 1500,
  height: 200,
  location: {
    long: "35.5134",
    lat: "33.8938",
  },
  threshold: 50,
  sensorState: true,
  isShortageNotifyOn: true,
  isLevelNotifyOn: true,
  isLeakNotifyOn: false,
  tankType: "water",
  connectionType: "ethernet",
  createdAt: new Date(),
  updatedAt: new Date(),
  userType: "owner",
};


export const demoViewers = [
  {
    _id: "viewer1",
    name: "Ali Khalil",
    email: "ali@example.com",
    tankId: "demo123",
    userId: "user-ali",
    userType: "viewer",
  },
  {
    _id: "viewer2",
    name: "Rana Nassar",
    email: "rana@example.com",
    tankId: "demo123",
    userId: "user-rana",
    userType: "viewer",
  },
];