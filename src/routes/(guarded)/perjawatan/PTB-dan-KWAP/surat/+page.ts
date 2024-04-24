export async function load({ params }) {
    let agreementLetter = getAgreementLetter()


return {
    agreementLetter,

}
}


const getAgreementLetter = () => {
    const url = "http://localhost:3333/employment/pension_detail/employee/forms/download"
    
    return url
}

