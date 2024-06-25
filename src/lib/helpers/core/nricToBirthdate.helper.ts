export function nricToBirthdate(nric: string): string {
    const birthdatePart = nric.substring(0, 6); // extract the "YYMMDD" part
    let year = birthdatePart.substring(0, 2);

    if (parseInt(year) < 50) {
        year = `20${year}`; // years 2000 and above
    } else {
        year = `19${year}`; // years 1900-1999
    }

    const month = birthdatePart.substring(2, 4);
    const day = birthdatePart.substring(4, 6);

    return `${year}-${month}-${day}`;
}
