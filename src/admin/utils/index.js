import { set } from '@vueuse/core'
import { sliceNumber } from './persianNumber';
import { digitsEnToFa } from '@persian-tools/persian-tools';
 
export function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
}

export function reactiveUpdate(target, current){


    for(const prop in target){
        set(target, prop, current[prop])
    }



}

export function objectRemoveNull(myObject){
    Object.keys(myObject).forEach(key => {
        if (myObject[key] === null) {
            delete myObject[key];
        }
    });

    return myObject
}

export function ToPersianMoney(price){

    
    return digitsEnToFa(sliceNumber(price))


}