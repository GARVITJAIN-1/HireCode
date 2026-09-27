import { requireAuth, clerkClient } from "@clerk/express";
import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized - invalid token" });
      }

      let user = await User.findOne({ clerkId });

      if (!user) {
        try {
          const clerkUser = await clerkClient.users.getUser(clerkId);
          const email =
            clerkUser.emailAddresses?.[0]?.emailAddress || `${clerkId}@example.com`;
          const name =
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
            clerkUser.username ||
            "User";
          const profileImage = clerkUser.imageUrl || "";

          user = await User.create({
            clerkId,
            name,
            email,
            profileImage,
          });

          await upsertStreamUser({
            id: clerkId,
            name: user.name,
            image: user.profileImage,
          });
        } catch (syncError) {
          console.error("Error auto-syncing user from Clerk:", syncError.message);
          return res.status(404).json({ message: "User not found in database" });
        }
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protect route middleware", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];