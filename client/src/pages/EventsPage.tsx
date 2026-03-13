import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { eventService } from '../services/eventService';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '../utils/helpers';

const EVENT_TYPES = ['All', 'Conference', 'Training', 'Regional', 'National', 'International'];

export default function EventsPage() {
  const [activeType, setActiveType] = useState('All');

  const { data, isLoading } = useQuery({
    queryKey: ['events', activeType],
    queryFn: () => eventService.getEvents({ eventType: activeType === 'All' ? undefined : activeType.toLowerCase(), limit: 20 }),
  });

  return (
    <>
      <Helmet>
        <title>BNI Events | Upcoming Conferences & Training</title>
        <meta name="description" content="Browse upcoming BNI events — conferences, training days, regional meetings, and international summits." />
      </Helmet>

      <section className="bg-dark py-16">
        <Container>
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Events</span>
          <h1 className="text-4xl font-black text-white lg:text-5xl">Upcoming BNI Events</h1>
          <p className="mt-4 max-w-xl text-gray-300">Conferences, training sessions, and networking events to fuel your business growth.</p>
        </Container>
      </section>

      {/* Filters */}
      <section className="bg-white border-b py-4">
        <Container>
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeType === type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-light-bg">
        <Container>
          {isLoading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : !data?.data?.length ? (
            <div className="py-20 text-center">
              <p className="text-gray-500">No events found for this filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.data.map((event) => (
                <div key={event._id} className="card flex flex-col">
                  <div className="mb-3 flex items-start justify-between">
                    <Badge variant="red">{event.eventType}</Badge>
                    <Badge variant="gray">{event.format}</Badge>
                  </div>
                  <h3 className="mb-3 font-bold text-dark">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 flex-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary shrink-0" />
                      {formatDate(event.startDate)}
                    </div>
                    {event.venue?.city && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        {event.venue.city}{event.venue.country ? `, ${event.venue.country}` : ''}
                      </div>
                    )}
                    {event.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary shrink-0" />
                        {event.registeredCount ?? 0}/{event.capacity} registered
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold text-primary">
                      {event.price?.isFree ? 'Free' : event.price?.amount ? `$${event.price.amount}` : 'Contact'}
                    </span>
                    <Link to={`/events/${event.slug ?? event._id}`} className="btn-secondary text-sm px-4 py-2">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
