// ===============================================================
// Lookup Services
// ===============================================================

export class LookupServices {

    public static async getLookup(params:
        'agency-group' |
        'asset-declaration-status' |
        'award-category' |
        'award' | 'city' |
        'country' |
        "employment-status" |
        'ethnicity' |
        'gender' |
        'highest-education-level' |
        'institution' |
        'major-minor' |
        'marital-status' |
        'nationality' |
        'race' |
        'relationship' |
        'religion' |
        'scheme-of-service' |
        'service-class' |
        'sponsorship' |
        'state' |
        'title' |
        'role' |
        'service-group' |
        'service-type' |
        'grade' |
        'position' |
        'section' |
        'unit' |
        'division' |
        'district' |
        'department' |
        'placement'
    ) {
        switch (params) {
            case "agency-group":
                alert("hello");
                break;
        
            default:
                break;
        }
    }
}