import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  //store the values
  async store(storeKey : string, value : any){
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await Storage.set({
      key : storeKey,
      value : encryptedValue
    })
  }

  async removeStorageItem(storageKey : string){
    await Storage.remove({key : storageKey})
  }

   async clear(){
     await Storage.clear();
   }
}
