import i18n from "../main";
import store from "../store";

function getDateTextFormatted(date, isFull) {
  const fechaHoy = new Date();

  if (date) {
    date = new Date(date);

    if (fechaHoy.toDateString() === date.toDateString()) {
      let horaYMinutos = `${i18n.global.t('general.today')} `;
      if (isFull) {
        horaYMinutos += `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      }
      return horaYMinutos;
    } else {
      const fechaAyer = new Date(fechaHoy);
      fechaAyer.setDate(fechaHoy.getDate() - 1);

      if (fechaAyer.toDateString() === date.toDateString()) {
        let dateToReturn = `${i18n.global.t('general.yesterday')}`;
        if (isFull) {
          dateToReturn += ` ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }
        return dateToReturn;
      } else {
        const startOfWeek = new Date(fechaHoy);
        startOfWeek.setDate(fechaHoy.getDate() - fechaHoy.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        if (date >= startOfWeek && date <= endOfWeek) {
          let dayName = date.toLocaleDateString(store.getters.getLanguage, { weekday: 'long' });
          let dateToReturn = dayName.charAt(0).toUpperCase() + dayName.slice(1);
          if (isFull) {
            dateToReturn += ` ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          }
          return dateToReturn;
        } else {
          let dateToReturn = date.toLocaleDateString(store.getters.getLanguage);
          if (isFull) {
            dateToReturn += ` ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          }
          return dateToReturn;
        }
      }
    }
  }
}

export const getDateText = (date, isFull) => getDateTextFormatted(date, isFull);
