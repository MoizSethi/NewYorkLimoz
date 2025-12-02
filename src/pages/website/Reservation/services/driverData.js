export async function getDriverData(username) {
  try {
    const res = await fetch(`http://localhost:5000/api/vehicle/all/${username}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch driver data: ${res.status}`);
    }

    const data = await res.json();
    

    if (!data.success) {
      return null;
    }

    const driver = data.driver;
    console.log('driver', driver);
    const vehicles = data.vehicles || [];
    console.log('vehicles', vehicles);
    const mainVehicle = vehicles.length > 0 ? vehicles[0] : null;
    console.log('mainVehicle', mainVehicle);

    return {
      username,
      name: driver.name || 'N/A',
      profilePicture: driver.profilePicture || '/images/default-profile.png',
      email: driver.email || 'N/A',
      isApproved: driver.isApproved ?? false,

      // Vehicle details
      vehicleBrand: mainVehicle?.vehicleBrand || 'N/A',
      vehicleModel: mainVehicle?.vehicleModel || 'N/A',
      vehicleColor: mainVehicle?.vehicleColor || 'N/A',
      productionYear: mainVehicle?.productionYear || 'N/A',
      numberPlate: mainVehicle?.numberPlate || 'N/A',
      luggage: mainVehicle?.luggage || 0,
      passengers: mainVehicle?.passengers || 0,
      flat_rate: mainVehicle?.flat_rate || 0,
      pricePerKm: mainVehicle?.pricePerKm || 0,
      images: mainVehicle?.images || [],

      // Keep all vehicles
      vehicles,
    };
  } catch (error) {
    console.error('❌ Error fetching driver data:', error);
    return null;
  }
}
