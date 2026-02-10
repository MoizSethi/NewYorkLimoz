const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://localhost:3000";

export async function submitReservation(payload) {
  const res = await fetch(`${API_BASE}/api/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // backend returns { ok, message, errors? }
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data?.message || "Failed to submit reservation.");
    err.status = res.status;
    err.errors = data?.errors || null; // field-level errors from backend
    throw err;
  }

  return data;
}
