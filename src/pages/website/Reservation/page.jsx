'use client'
import ReservationDisplay from "./components/reservation_display"
import ParentTransitions from './components/parent_transitions';

export default function ReservationPage() {
  return (
    <div className="py-8">
        <ReservationDisplay/>
        <ParentTransitions/>
    </div>
  )
}
