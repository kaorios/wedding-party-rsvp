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
  const scheduleEvents = [
    {
      time: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_1_TIME || '',
      title: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_1_TITLE || '',
      color: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_1_COLOR || '',
      description: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_1_DESC || '',
    },
    {
      time: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_2_TIME || '',
      title: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_2_TITLE || '',
      color: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_2_COLOR || '',
      description: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_2_DESC || '',
    },
    {
      time: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_3_TIME || '',
      title: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_3_TITLE || '',
      color: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_3_COLOR || '',
      description: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_3_DESC || '',
    },
    {
      time: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_4_TIME || '',
      title: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_4_TITLE || '',
      color: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_4_COLOR || '',
      description: process.env.NEXT_PUBLIC_SCHEDULE_EVENT_4_DESC || '',
    },
  ];

  return (
    <div className="relative max-w-sm mx-auto px-4">
      {/* Timeline Line */}
      <div className="absolute left-7 transform -translate-x-1/2 w-1 h-full bg-warm-coral rounded-full"></div>

      {/* Timeline Items */}
      <div className="space-y-16 relative">
        {scheduleEvents.map((event, index) => (
          <TimelineItem
            key={index}
            time={event.time}
            title={event.title}
            color={event.color}
            description={event.description}
          />
        ))}
      </div>
    </div>
  );
}
