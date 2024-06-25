    // method to set retirement year
    export const setRetirementYear = (retirementAge: number, dateOfBirth: string): string => {
        const inputAge: number = retirementAge;

        const birthdate: string = dateOfBirth;
        const outputDate = new Date(birthdate);

        // Adds by input age
        outputDate.setFullYear(outputDate.getFullYear() + inputAge);

        // Set the new Date string
        const day = ('0' + outputDate.getDate()).slice(-2);
        const month = ('0' + (outputDate.getMonth() + 1)).slice(-2);
        const year = String(outputDate.getFullYear());

        const endDate: string = `${year}-${month}-${day}`;

        return endDate;
    };