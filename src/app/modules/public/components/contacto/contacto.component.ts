import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Loader } from '@googlemaps/js-api-loader';
import { mapStyles } from 'src/app/code/consts/map-styles.const';
import { environment } from '../../../../../environments/environment.prod';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subject, takeUntil } from 'rxjs';
import { MailService } from 'src/app/code/services/mail.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  loading = false; //debo crear un loading
  contactForm: FormGroup = new FormGroup({});
  private map!: google.maps.Map;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
    private mail: MailService,
    // private formfire: FormfireService //agregamos el servicio de Firebase
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required, Validators.email],
      asunto: [null, Validators.required],
      message: [null, Validators.required],
    });

    let loader = new Loader({
      apiKey: environment.firebaseConfig.apiKey,
    });

    loader.load().then(() => {
      const location = { lat: 40.712776, lng: -74.005974 }
      const mapElement = document.getElementById("map");
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, {
          center: location,
          zoom: 6,
          styles: mapStyles
        })

        const marker = new google.maps.Marker({
          position: location,
          map: this.map,
        });
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  sendForm() {
    console.log("Formulario enviado");
    this.recaptchaV3Service.execute('send-contact')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((token) => {
        const clte = this.contactForm.value;
        /* this.mail.sendText("PROBISA: Solicitud de Contacto",
          `Nombre del Cliente: ${clte.name}
Nombre del Cliente: ${clte.name}
Email: ${clte.email}
Asunto: ${clte.asunto}
Mensaje: ${clte.message}
          `
        )*/
        console.log("ENVIANDO", clte);
      });
  }

}
