"use client";

import { useState } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isWithinInterval
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Hackathon } from "./HackathonCard";

export default function HackathonCalendar({ hackathons }: { hackathons: Hackathon[] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    // Get events for specific day
    const getEventsForDay = (date: Date) => {
        return hackathons.filter(h =>
            isWithinInterval(date, {
                start: new Date(h.startDate),
                end: new Date(h.endDate)
            })
        );
    };

    const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-[#030303]/80 backdrop-blur-xl border border-white/5 rounded-3xl relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Calendar Section (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <CalendarIcon className="w-6 h-6 text-indigo-400" />
                            Event Calendar
                        </h2>
                        <p className="text-neutral-400 text-sm mt-1">
                            Track upcoming hackathons and deadlines
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-neutral-900/50 p-1 rounded-lg border border-white/5">
                        <button
                            onClick={prevMonth}
                            className="p-2 hover:bg-white/10 rounded-md text-neutral-400 hover:text-white transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="w-32 text-center font-medium text-white">
                            {format(currentDate, "MMMM yyyy")}
                        </span>
                        <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-white/10 rounded-md text-neutral-400 hover:text-white transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
                    {/* Weekday Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="bg-[#0a0a0a] py-3 text-center text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}

                    {/* Days */}
                    {calendarDays.map((day, dayIdx) => {
                        const dayEvents = getEventsForDay(day);
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        const isCurrentMonth = isSameMonth(day, currentDate);
                        const isToday = isSameDay(day, new Date());

                        return (
                            <button
                                key={day.toString()}
                                onClick={() => setSelectedDate(day)}
                                className={cn(
                                    "min-h-[100px] p-2 bg-[#0a0a0a] flex flex-col items-start justify-between hover:bg-white/5 transition-colors relative group",
                                    !isCurrentMonth && "opacity-30 bg-[#050505]",
                                    isSelected && "bg-white/5 ring-1 ring-inset ring-indigo-500/50"
                                )}
                            >
                                <span className={cn(
                                    "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1",
                                    isToday
                                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                                        : "text-neutral-400 group-hover:text-white"
                                )}>
                                    {format(day, "d")}
                                </span>

                                {/* Event Indicators */}
                                <div className="w-full space-y-1">
                                    {dayEvents.slice(0, 3).map((event) => (
                                        <div
                                            key={event.id}
                                            className={cn(
                                                "w-full h-1.5 rounded-full",
                                                event.status === 'Open' ? "bg-emerald-500/70" :
                                                    event.status === 'Live' ? "bg-rose-500/70" :
                                                        "bg-indigo-500/70"
                                            )}
                                        />
                                    ))}
                                    {dayEvents.length > 3 && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mx-auto" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Side Panel: Selected Date Details */}
            <div className="bg-[#0a0a0a]/50 rounded-2xl p-6 border border-white/5 flex flex-col h-full">
                <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">
                    {selectedDate ? format(selectedDate, "EEEE, MMMM do") : "Select a date"}
                </h3>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {selectedDayEvents.length > 0 ? (
                        selectedDayEvents.map(event => (
                            <div
                                key={event.id}
                                className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={cn(
                                        "text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wide font-medium",
                                        event.status === 'Open' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                            event.status === 'Live' ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                                                "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                    )}>
                                        {event.status}
                                    </span>
                                </div>
                                <h4 className="font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                                    {event.name}
                                </h4>
                                <p className="text-xs text-neutral-400 mb-3 line-clamp-2">
                                    by {event.organizer}
                                </p>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-neutral-300">
                                        <CalendarIcon className="w-3 h-3" />
                                        <span>{format(new Date(event.startDate), "MMM d")} - {format(new Date(event.endDate), "MMM d")}</span>
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center gap-2 text-xs text-neutral-300">
                                            <MapPin className="w-3 h-3" />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                </div>

                                <a
                                    href={event.website || '#'}
                                    target="_blank"
                                    className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-indigo-500/20 text-xs font-medium text-neutral-300 hover:text-indigo-300 rounded-lg transition-colors"
                                >
                                    Visit Website
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-neutral-500">
                            <CalendarIcon className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-sm">No events on this day</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
