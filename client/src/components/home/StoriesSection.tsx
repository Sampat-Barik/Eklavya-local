import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { PostCard } from '../ui/PostCard';
import { StoryModal } from '../ui/StoryModal';
import type { StoryPost } from '../../types/ngo';
import { ngoService } from '../../services/ngoService';

export const StoriesSection: React.FC = () => {
  const [stories, setStories] = useState<StoryPost[]>([]);
  const [selectedStory, setSelectedStory] = useState<StoryPost | null>(null);

  useEffect(() => {
    const loadStories = async () => {
      const data = await ngoService.getStories();
      setStories(data);
    };
    loadStories();
  }, []);

  return (
    <section id="stories" className="space-y-10 py-6 sm:py-10">
      {/* Header - Right Aligned Asymmetric */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="text-xs text-slate-700 max-w-sm order-2 sm:order-1 font-normal leading-relaxed">
          <span className="font-bold text-blue-700 block mb-1">Authentic Field Dispatches</span>
          Direct dispatches written by HIT student coordinators, village teachers & veterinary first-responders.
        </div>

        <SectionTitle
          badge="VOICES FROM THE FIELD"
          badgeVariant="green"
          title="Stories of Transformed Lives"
          highlightWord="Transformed Lives"
          subtitle="Real accounts of village children excelling in school, stray animals rehabilitated from critical injuries, and the students behind the missions."
          align="right"
          className="order-1 sm:order-2"
        />
      </div>

      {/* Asymmetric 5:7 Stories Grid */}
      {stories.length >= 2 ? (
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 px-4 pb-4 md:grid md:grid-cols-1 lg:grid-cols-12 md:gap-6 sm:gap-8 md:px-0 md:pb-0 items-stretch">
          {/* Featured Story Spotlight (Left Column 5 cols) */}
          <div className="w-[80vw] shrink-0 snap-center md:w-auto md:shrink lg:col-span-5 flex flex-col">
            <PostCard
              story={stories[0]}
              onReadMore={(st) => setSelectedStory(st)}
              className="h-full border-emerald-100 md:border-slate-700/80 shadow-md md:shadow-xl"
            />
          </div>

          {/* Secondary Field Dispatches (Right Column 7 cols) */}
          <div className="contents md:grid lg:col-span-7 grid-cols-1 sm:grid-cols-2 md:gap-6 sm:gap-8 items-stretch">
            {stories.slice(1).map((story) => (
              <div key={story._id} className="w-[80vw] shrink-0 snap-center md:w-auto md:shrink flex flex-col">
                <PostCard
                  story={story}
                  onReadMore={(st) => setSelectedStory(st)}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 px-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 sm:gap-8 md:px-0 md:pb-0 items-stretch">
          {stories.map((story) => (
            <div key={story._id} className="w-[80vw] shrink-0 snap-center md:w-auto md:shrink flex flex-col">
              <PostCard
                story={story}
                onReadMore={(st) => setSelectedStory(st)}
                className="h-full"
              />
            </div>
          ))}
        </div>
      )}

      {/* Full Story Reader Modal */}
      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </section>
  );
};
