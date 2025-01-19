export const validateDate = (date: Date): boolean => {
    const parsedDate = new Date(date);

    // Checking if the date yatanzwe iri valid
    if (isNaN(parsedDate.getTime())) {
        return false;
    }
    return true;
};
