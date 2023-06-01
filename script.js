document.addEventListener('DOMContentLoaded', function() {
  // Obtener el elemento contenedor de los tramos horarios
  const schedule = document.getElementById('schedule');
  // Generar los tramos horarios
  const timeSlots = generateTimeSlots();

  // Recorrer cada tramo horario
  timeSlots.forEach(timeSlot => {
    // Crear un elemento div para representar el tramo horario
    const div = document.createElement('div');
    div.className = 'time-slot';
    div.innerText = timeSlot.time;

    // Añadir la clase correspondiente según la disponibilidad del tramo horario
    if (timeSlot.available) {
      div.classList.add('available');
    } else {
      div.classList.add('unavailable');
    }

    // Añadir un controlador de eventos 'click' al tramo horario
    div.addEventListener('click', function() {
      // Si el tramo horario está disponible
      if (div.classList.contains('available')) {
        // Marcar como no disponible y decrementar el contador de motociclistas
        div.classList.remove('available');
        div.classList.add('unavailable');
        timeSlot.available = false;
        timeSlot.count--;

        // Si no quedan motociclistas disponibles, eliminar el controlador de eventos 'click'
        if (timeSlot.count === 0) {
          div.removeEventListener('click', handleClick);
        }
      }
      // Si el tramo horario no está disponible
      else if (div.classList.contains('unavailable')) {
        // Marcar como disponible y aumentar el contador de motociclistas
        div.classList.remove('unavailable');
        div.classList.add('available');
        timeSlot.available = true;
        timeSlot.count++;
      }
    });

    // Agregar el tramo horario al contenedor
    schedule.appendChild(div);
  });
});

// Genera los tramos horarios
function generateTimeSlots() {
  const startTime = new Date();
  startTime.setHours(8, 0, 0, 0);

  const endTime = new Date();
  endTime.setHours(20, 0, 0, 0);

  const timeSlots = [];

  // Generar tramos horarios en intervalos de 30 minutos
  while (startTime < endTime) {
    const timeSlot = {
      time: formatTime(startTime),
      available: true,
      count: 8
    };

    timeSlots.push(timeSlot);

    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  return timeSlots;
}

// Formatea la hora en formato "HH:MM"
function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}