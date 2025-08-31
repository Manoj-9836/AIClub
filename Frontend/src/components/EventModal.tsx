import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  type: "event" | "workshop";
}

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  const navigate = useNavigate();

  if (!event) return null;

  const handleRegisterClick = () => {
    navigate(`/register/${event.type}/${encodeURIComponent(event.title)}`);
    onClose();
  };

  const spotsAvailable = event.capacity - event.registered;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient mb-2">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {event.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Date</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Time</p>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">Capacity</p>
                <p className="text-sm text-muted-foreground">
                  {event.registered}/{event.capacity} registered
                </p>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About This {event.type === 'event' ? 'Event' : 'Workshop'}</h3>
            <p className="text-muted-foreground leading-relaxed">{event.fullDescription}</p>
          </div>

          {/* Registration Section */}
          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-lg">Ready to join us?</p>
                <p className="text-sm text-muted-foreground">
                  {spotsAvailable > 0
                    ? `${spotsAvailable} spots remaining`
                    : "This event is full"
                  }
                </p>
              </div>
              <Button
                onClick={handleRegisterClick}
                disabled={spotsAvailable <= 0}
                variant="hero"
                size="lg"
                className="w-full sm:w-auto"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {spotsAvailable > 0 ? "Register Now" : "Join Waitlist"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;