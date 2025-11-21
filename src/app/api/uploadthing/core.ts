import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const f = createUploadthing();

export const ourFileRouter = {
  avatarUploader: f({
    image: { 
      maxFileSize: "4MB",
      maxFileCount: 1
    }
  })
    .middleware(async () => {
      // 检查用户是否已认证
      const session = await getServerSession(authOptions);
      
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }
      
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { 
        uploadedBy: metadata.userId,
        url: file.url 
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;