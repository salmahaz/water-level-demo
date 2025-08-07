"use server"
import User from "@/models/User";
import connectMongodb from "@/utils/dbConnection";

const FIREBASE_BASE_URL = process.env.FIREBASE_BASE_URL;

export async function getPartners() {
  await connectMongodb();
  const partners = await User.aggregate([
    { $match: { isPartner: true } },
    {
      $lookup: {
        from: "serviceproviders",
        localField: "_id",
        foreignField: "userId",
        as: "provider",
      },
    },
    {
      $unwind: { path: "$provider", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        selfieUrl: "$provider.selfieUrl",
      },
    },
  ]);

  function normalizeUrl(pathOrUrl?: string) {
    if (!pathOrUrl) return undefined;
    return pathOrUrl.startsWith("http")
      ? pathOrUrl
      : `${FIREBASE_BASE_URL}${pathOrUrl}`;
  }

  // Map to your output format
  return partners.map((partner) => ({
    _id: partner._id.toString(),
    name: partner.name,
    imageUrl: normalizeUrl(partner.selfieUrl),
  }));
}
