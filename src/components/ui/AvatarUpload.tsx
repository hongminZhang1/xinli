"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { UploadButton } from "@/lib/uploadthing";
import Avatar from "@/components/ui/Avatar";

interface AvatarUploadProps {
  currentAvatar?: string | null;
  username?: string;
  onAvatarUpdate: (avatarUrl: string | null) => void;
}

export default function AvatarUpload({ 
  currentAvatar, 
  username, 
  onAvatarUpdate 
}: AvatarUploadProps) {
  const { data: session, update: updateSession } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAvatarUpload = async (uploadedFiles: any[]) => {
    if (uploadedFiles.length === 0) {
      setIsUploading(false);
      return;
    }
    
    try {
      const file = uploadedFiles[0];
      
      // 更新数据库中的用户头像
      const response = await fetch("/api/users/avatar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatarUrl: file.url }),
      });

      if (!response.ok) {
        throw new Error("Failed to update avatar");
      }

      const data = await response.json();
      
      // 立即更新本地状态
      onAvatarUpdate(file.url);
      
      // 更新session
      if (session) {
        await updateSession();
      }

    } catch (error) {
      console.error("Avatar upload error:", error);
      alert("头像上传失败，请重试");
    } finally {
      // 延迟一点点再重置状态，确保UI更新完成
      setTimeout(() => {
        setIsUploading(false);
      }, 500);
    }
  };

  const handleDeleteAvatar = async () => {
    setIsDeleting(true);
    
    try {
      const response = await fetch("/api/users/avatar", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete avatar");
      }

      const data = await response.json();

      // 立即更新本地状态
      onAvatarUpdate(null);
      
      // 更新session
      if (session) {
        await updateSession();
      }

    } catch (error) {
      console.error("Avatar delete error:", error);
      alert("删除头像失败，请重试");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0">
        <Avatar 
          username={username} 
          avatar={currentAvatar}
          size="large"
          className="ring-4 ring-white shadow-lg"
        />
      </div>
      
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">头像</h3>
          <p className="text-sm text-gray-500">
            选择一张代表你的图片。建议使用正方形图片，支持JPG、PNG、ICO格式
          </p>
        </div>
        
        <div className="flex flex-col">
          <div className="flex gap-3">
            <div className="avatar-upload-container">
            <UploadButton
              endpoint="avatarUploader"
              onClientUploadComplete={handleAvatarUpload}
              onUploadError={(error: Error) => {
                setIsUploading(false);
                alert(`上传失败: ${error.message}`);
              }}
              onUploadBegin={(name: string) => {
                setIsUploading(true);
              }}
              appearance={{
                button: {
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "10px 10px",
                  border: "1px solid #d1d5db",
                  cursor: isUploading ? "not-allowed" : "pointer",
                  opacity: isUploading ? "0.7" : "1",
                },
                allowedContent: {
                  display: "none",
                },
              }}
              content={{
                button: isUploading ? "上传中..." : "最大4MB",
              }}
            />
            </div>
            
            {(currentAvatar || session?.user?.avatar) ? (
              <button
                type="button"
                onClick={handleDeleteAvatar}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isDeleting ? "删除中..." : "使用默认头像"}
              </button>
            ) : (
              <button
                type="button"
                disabled={true}
                className="px-2 border border-gray-400 rounded-lg bg-gray-50 cursor-not-allowed"
              >
                已为默认头像
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}