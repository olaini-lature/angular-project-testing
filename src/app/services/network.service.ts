import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  status = new BehaviorSubject<any>('ONLINE');
  statusNetwork = 'ONLINE';

  constructor(
    private connectionService: ConnectionService
  ) {
    this.connectionService.monitor().subscribe((isConnected) => {
      console.log('isConnected: ', isConnected);

      if (isConnected) {
        this.statusNetwork = 'ONLINE';
        this.status.next('ONLINE');
      } else {
        this.statusNetwork = 'OFFLINE';
        this.status.next('OFFLINE');
      }
    });
  }

  isInternetConnectionAvailable(): any {
    return new Promise<any>((resolve, reject) => {
      if (this.statusNetwork === 'ONLINE') {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
