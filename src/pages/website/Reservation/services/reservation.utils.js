export function buildReservationPayload(form) {
  return {
    serviceType: form.serviceType,
    pickupDate: form.pickupDate,
    pickupTime: form.pickupTime,
    pickupLocation: form.pickupLocation,

    dropoffLocation:
      form.serviceType === "Hourly / As Directed" ? "" : form.dropoffLocation,

    durationHours:
      form.serviceType === "Hourly / As Directed" ? form.durationHours : "",

    returnTrip: !!form.returnTrip,
    returnDate: form.returnTrip ? form.returnDate : "",
    returnTime: form.returnTrip ? form.returnTime : "",

    passengers: Number(form.passengers || 1),
    luggage: Number(form.luggage || 0),

    vehicleType: form.vehicleType,

    meetGreet: !!form.meetGreet,
    childSeat: !!form.childSeat,
    boosterSeat: !!form.boosterSeat,

    isAirport: !!form.isAirport,
    airline: form.isAirport ? form.airline : "",
    flightNumber: form.isAirport ? form.flightNumber : "",
    arrivalTime: form.isAirport ? form.arrivalTime : "",

    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phone: form.phone,

    notes: form.notes || "",
  };
}
