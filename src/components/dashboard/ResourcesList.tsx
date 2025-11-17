import React from "react";
import Card from "@/components/ui/Card";

const resources = [
  { title: "呼吸练习 - 简单 4-4-4", href: "#" },
  { title: "情绪调节小贴士", href: "#" },
  { title: "自助资源：音频冥想", href: "#" },
];

export default function ResourcesList() {
  return (
    <Card>
      <h3 className="text-lg font-semibold">疗愈资源</h3>
      <ul className="mt-3 space-y-2">
        {resources.map((r) => (
          <li key={r.title}>
            <a className="text-primary hover:underline" href={r.href}>
              {r.title}
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}
