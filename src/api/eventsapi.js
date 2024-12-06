const API_URL = "https://app-tq3o5pftgq-uc.a.run.app";

// Función para obtener eventos
export const getEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/api/events`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; // Re-lanza el error para que se pueda manejar en el lugar de la llamada
  }
};

// Función para crear un nuevo evento
export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_URL}/api/new-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error; // Re-lanza el error
  }
};
