import React from "react";
import type { Tag } from "@/data/jobs";

interface TagBadgeProps {
  tag: Tag;
  pill?: boolean;
}

const TagBadge = ({ tag, pill = false }: TagBadgeProps) => (
  <span className={`job-tag job-tag--${tag.color}${pill ? " job-tag--pill" : ""}`}>
    {tag.label}
  </span>
);

export default TagBadge;
