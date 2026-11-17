import React from "react";
import { getStories } from "../../services/api";
import { useApiData } from "../../hooks/useApiData";
import { StoryViewerModal } from "../../components/community/StoryViewerModal";
import { useNavigate, useSearchParams } from "react-router-dom";

export const StoriesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get("id");
  const { data: stories = [] } = useApiData("stories", getStories);
  const targetStory =
    (storyId ? stories.find((s) => s.id === storyId) : null) || stories[0];

  return (
    <StoryViewerModal story={targetStory} onClose={() => navigate("/feed")} />
  );
};
