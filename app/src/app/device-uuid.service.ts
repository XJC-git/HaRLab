import {Injectable} from '@angular/core';
import * as uuid from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class DeviceUUIDService {

  constructor() { }

  getDeviceId() {
    let deviceId = localStorage.getItem('deviceId')
    if(!deviceId) {
      deviceId = this.generateUUIDV4()
      localStorage.setItem('deviceId', deviceId)
    }
    return deviceId
  }

  generateUUIDV4(): string {
    return uuid.v4();
  }
}
