import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from '../environments/environment';

import { AlertController } from '@ionic/angular';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(public alert: AlertController) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        
        const token = localStorage.getItem('token');
        if (token !== null){
          req = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + token
            },
          });
        } else
        if (req.url.includes('/Medias/'))
          req = req.clone({
            setHeaders: {
              Accept: 'image/*'
            },
          });
        else
        if (req.url.includes('/token'))
          req = req.clone({
            setHeaders: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          });
        
          this.log(req, '[Request] ' + req.url);
        

        // return next.handle(req).pipe(
        //     tap(evt => {
        //         if (evt instanceof HttpResponse) {
        //             console.log(evt,'[Response] ' + req.url);
        //         }
        //     }),
        //     catchError((err: any) => {
        //         if(err instanceof HttpErrorResponse) {
        //             console.error(err, '[Response] Error '  + req.url);
        //             // this.presentAlert('Tejadi kesalahan pada pengambilan data di server. eror teknis: ' + err.message);
        //         }
        //         return of(err);
        //     }));

        return next.handle(req).pipe(
              tap(evt => {
                  if (evt instanceof HttpResponse) {
                      this.log(evt,'[Response] ' + req.url);
                  }
              })
        );
      }

      async presentAlert(message) {
        const alert = await this.alert.create({
          header: 'ePPID',
          subHeader: 'Silahkan ulangi sekali lagi',
          message: message,
          buttons: ['OK']
        });
    
        await alert.present();
      }

      log(message, title) {
        if (environment.interceptorDebug) {
          console.log(title, message);
        }
      }
      
}