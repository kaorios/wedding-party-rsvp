interface TimelineItemProps {
  time: string;
  title: string;
  color: string;
  description?: string;
}

function TimelineItem({ time, title, color, description }: TimelineItemProps) {
  return (
    <div className="flex items-start gap-4">
      {/* Timeline Dot - Left */}
      <div className="flex justify-center">
        <div
          className={`w-6 h-6 ${color} rounded-full border-4 border-warm-cream shadow-lg relative z-10`}
        ></div>
      </div>

      {/* Content - Right */}
      <div className="flex flex-col gap-1">
        {/* Time and Title - Top row */}
        <div className="flex items-start gap-4">
          <div
            className="text-2xl font-heading font-extrabold whitespace-nowrap"
            style={{ letterSpacing: '2px' }}
          >
            {time}
          </div>
          <h3 className="text-xl tracking-wide">{title}</h3>
        </div>

        {/* Description - Bottom */}
        {description && <p className="text-base mt-1">{description}</p>}
      </div>
    </div>
  );
}

export default function Schedule() {
  return (
    <div className="relative max-w-sm mx-auto px-4">
      {/* Timeline Line */}
      <div className="absolute left-7 transform -translate-x-1/2 w-1 h-full bg-warm-coral rounded-full"></div>

      {/* Timeline Items */}
      <div className="space-y-16 relative">
        <TimelineItem
          time="14:00"
          title="受付"
          color="bg-warm-yellow"
          description="受付開始。ゲストの皆様をお迎えします。"
        />
        <TimelineItem time="14:30" title="挙式" color="bg-warm-sage" />
        <TimelineItem
          time="15:30"
          title="写真撮影"
          color="bg-soft-peach-dark"
        />
        <TimelineItem time="17:00" title="披露宴" color="bg-warm-coral" />
        <TimelineItem time="19:30" title="お見送り" color="bg-warm-brown" />
      </div>
    </div>
  );
}
