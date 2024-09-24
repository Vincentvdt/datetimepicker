const defaultOptions = {
    en: {
        locale: "en-GB",
        months: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
        ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        dayOfWeek: [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
        dayOfWeekShort: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
    },
    fr: {
        locale: "fr-FR",
        months: [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
        ],
        monthsShort: [ "Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc" ],
        dayOfWeek: [ "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche" ],
        dayOfWeekShort: [ "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim" ],
    },
};

export default defaultOptions;