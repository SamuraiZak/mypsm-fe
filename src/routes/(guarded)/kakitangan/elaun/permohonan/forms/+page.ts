import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { getPromiseToast, getErrorToast } from '$lib/toast/toast-service';
import { error, fail } from '@sveltejs/kit';

//=======================================================================
//======================== Schema =======================================
//=======================================================================

//==================================================
//=========== Bantuan Pakaian Istiadat =============
//==================================================

const pakaianIstiadatTextShema = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
export const _stepperBantuanPakaianIstiadat = z.object({
    tujuanPermohonan: pakaianIstiadatTextShema,
    sendiri: pakaianIstiadatTextShema,
    pasangan: pakaianIstiadatTextShema,
});


//=======================================================================
//====================== Load Data ======================================
//=======================================================================

//=====================================================
//======= Stepper Butiran Pemohonan Elaun =============
//=====================================================

export const load = async () => {
    // const id = parseInt(params.id);
    const stepperBantuanPakaianIstiadat = await superValidate(
        _stepperBantuanPakaianIstiadat,
    );

    return {

        stepperBantuanPakaianIstiadat,
    };

};


//=======================================================================
//====================== Function =======================================
//=======================================================================

//==================================================
//=========== Bantuan Pakaian Istiadat =============
//==================================================
export const _submitFormStepperBantuanPakaianIstiadat = async (formData: Object) => {
    const stepperBantuanPakaianIstiadat = await superValidate(formData, _stepperBantuanPakaianIstiadat);

    if (!stepperBantuanPakaianIstiadat.valid) {
        getErrorToast();
        return fail(400, stepperBantuanPakaianIstiadat);
    }


    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(stepperBantuanPakaianIstiadat),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)

    return { stepperBantuanPakaianIstiadat };
};
