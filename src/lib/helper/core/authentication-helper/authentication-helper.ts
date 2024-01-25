// ===============================================================
// Authentication Helper Functions
// ===============================================================

import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key-constant";
import type { AuthenticationResponseViewModel } from "$lib/view-models/core/auth/auth-response.view-model";

export class AuthenticationHelper {

    // store login result in local storage
    static storeLoginResult(loginResponse: AuthenticationResponseViewModel){
        localStorage.setItem(LocalStorageKeyConstant.accessToken, loginResponse.data.token);
    }

    // clear local storage
    static clearLocalStorage(){
        localStorage.clear();
    }
}