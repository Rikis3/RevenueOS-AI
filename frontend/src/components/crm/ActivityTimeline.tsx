import { Activity, Clock } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  type?: 'stage_change' | 'activity' | 'creation';
}

export function ActivityTimeline({ events }: { events: TimelineEvent[] }) {
  if (!events || events.length === 0) {
    return <div className="text-sm text-[#444444] p-4">No recent activities.</div>;
  }

  return (
    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-[#dddbda]">
      {events.map((event, i) => (
        <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-[#0176d3] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
            {event.type === 'stage_change' ? <Activity className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
          </div>
          
          <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-white p-3 rounded-[0.25rem] border border-[#dddbda] shadow-sm">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <div className="font-bold text-[#0176d3] text-[0.85rem]">{event.title}</div>
              <time className="text-[0.7rem] text-[#706e6b]">{new Date(event.date).toLocaleDateString()}</time>
            </div>
            {event.description && <div className="text-[#080707] text-sm mt-1">{event.description}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
