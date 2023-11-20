export  const validateAge = (value) => {
    const inputDate = new Date(value);
    const currentDate = new Date();
    const minDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate()
    );

    return inputDate <= minDate || "Debe tener al menos 18 años";
} 