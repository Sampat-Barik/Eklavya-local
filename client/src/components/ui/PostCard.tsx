import React from 'react';
import type { StoryPost } from '../../types/ngo';
import { Clock, ArrowRight, User } from 'lucide-react';

interface PostCardProps {
  story: StoryPost;
  onReadMore: (story: StoryPost) => void;
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ story, onReadMore, className = '' }) => {
  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-xl border border-emerald-100 md:border-slate-200 bg-white/90 backdrop-blur-md shadow-md active:scale-[0.98] md:active:scale-100 md:hover:border-emerald-500/40 md:hover:shadow-lg md:hover:-translate-y-1 transition-all duration-300 ease-out group ${className}`}
    >
      {/* Post Thumbnail */}
      <div className="relative h-44 md:h-48 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onReadMore(story)}>
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-105"
        />
        {/* Top Gradient Overlay for Contrast Protection */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Contrast-Protected Floating Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-emerald-800 shadow-sm">
            {story.category}
          </span>
        </div>

        <div className="absolute bottom-2.5 right-3 z-10 flex items-center gap-1 text-[10px] font-mono text-slate-800 bg-white/95 backdrop-blur-md border border-slate-200 px-2 py-0.5 rounded shadow-sm">
          <Clock size={10} className="text-blue-600" />
          <span>{story.readTime}</span>
        </div>
      </div>

      {/* Post Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5 cursor-pointer" onClick={() => onReadMore(story)}>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 md:group-hover:text-blue-600 transition-colors leading-snug">
            {story.title}
          </h3>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
            {story.excerpt}
          </p>
        </div>

        {/* Author info & Read More trigger */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-xs">
              <User size={12} />
            </div>
            <div className="leading-tight">
              <span className="text-xs font-semibold text-slate-800 block truncate max-w-[120px]">
                {story.author.name}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {story.publishedAt}
              </span>
            </div>
          </div>

          <button
            onClick={() => onReadMore(story)}
            className="text-xs font-semibold text-blue-700 md:hover:text-blue-900 flex items-center gap-1 group/link transition-colors cursor-pointer"
          >
            <span>Read Dispatch</span>
            <ArrowRight size={12} className="md:group-hover/link:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
