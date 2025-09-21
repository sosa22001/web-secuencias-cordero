import { Calendar, Clock, Music, Users, Zap } from 'lucide-react';
import { WeeklyEvent } from '@/types/music';
import { Button } from '@/components/ui/button';

interface ScheduleSectionProps {
  events: WeeklyEvent[];
  onEventSelect: (event: WeeklyEvent) => void;
}

const eventTypeIcons = {
  sequence: Music,
  live: Zap,
  workshop: Users,
};

const eventTypeColors = {
  sequence: 'bg-primary/10 text-primary border-primary/20',
  live: 'bg-red-500/10 text-red-500 border-red-500/20',
  workshop: 'bg-accent/10 text-accent-foreground border-accent/20',
};

export const ScheduleSection = ({ events, onEventSelect }: ScheduleSectionProps) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getEventsForDay = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="p-4 space-y-6 pb-32">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Programa Semanal
        </h1>
        <p className="text-muted-foreground">
          Descubre los eventos y secuencias programadas
        </p>
      </div>

      {/* Week Overview */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, index) => {
          const dayEvents = getEventsForDay(date);
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <div
              key={index}
              className={`p-3 rounded-xl text-center space-y-2 ${
                isToday 
                  ? 'bg-gradient-primary text-white shadow-medium' 
                  : 'bg-card hover:bg-muted transition-colors'
              }`}
            >
              <div className="text-xs font-medium opacity-70">
                {dayNames[index]}
              </div>
              <div className="text-lg font-bold">
                {date.getDate()}
              </div>
              {dayEvents.length > 0 && (
                <div className={`w-2 h-2 rounded-full mx-auto ${
                  isToday ? 'bg-white' : 'bg-primary'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Today's Events */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Hoy</h2>
        </div>

        {getEventsForDay(new Date()).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No hay eventos programados para hoy</p>
          </div>
        ) : (
          <div className="space-y-3">
            {getEventsForDay(new Date()).map((event) => {
              const IconComponent = eventTypeIcons[event.type];
              return (
                <div
                  key={event.id}
                  className="music-card cursor-pointer group"
                  onClick={() => onEventSelect(event)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg border ${eventTypeColors[event.type]}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{event.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(event.time)}</span>
                        </div>
                        <span>•</span>
                        <span>{formatDuration(event.duration)}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Próximos Eventos</h2>
        
        <div className="space-y-3">
          {events
            .filter(event => event.date > new Date())
            .slice(0, 5)
            .map((event) => {
              const IconComponent = eventTypeIcons[event.type];
              return (
                <div
                  key={event.id}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-card/50 hover:bg-card transition-colors cursor-pointer group"
                  onClick={() => onEventSelect(event)}
                >
                  <div className={`p-2 rounded-lg border ${eventTypeColors[event.type]}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{event.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{event.date.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{formatTime(event.time)}</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Calendar className="h-3 w-3" />
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};