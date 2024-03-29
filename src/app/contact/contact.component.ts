import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  submitted = false;
  showFixedNavBar: boolean = false;
  activeSection: string;
  routpath: boolean = true;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    public themeService: ThemeService,
    private route: ActivatedRoute
  ) {
    this.activeSection = 'home';
  }

  Forme: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  });

  ngOnInit(): void {
    this.Forme = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(3)],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required, Validators.minLength(3)],
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showFixedNavBar = this.shouldShowFixedNavBar(event.url);
      }
    });
    this.route.url.subscribe(([url]) => {
      const path = url == undefined ? 'home' : url.path;
      this.routpath = path == 'home' ? true : false;
      this.activeSection = path;
    });
  }
  shouldShowFixedNavBar(url: string): boolean {
    return url.includes('/contact');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.Forme.controls;
  }

  showSuccess(title: string, subtitle: string) {
    this.toastr.success(title, subtitle),
      {
        timeOut: 3000,
      };
  }
  showError(title: string, subtitle: string) {
    this.toastr.error(title, subtitle),
      {
        timeOut: 3000,
      };
  }

  public sendEmail(e: Event) {
    this.submitted = true;

    if (this.Forme.invalid) {
      return;
    }
    e.preventDefault();
    emailjs
      .sendForm(
        'service_6y3o10a',
        'template_qu7gmif',
        e.target as HTMLFormElement,
        'UOnDJ0Tt7O1iwHU1B'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
          this.showSuccess('Email Sended', 'Successfully!');
          this.Forme.reset();
        },
        (error) => {
          console.log(error.text);
          this.showError(error.text, 'Erreur!');
        }
      );
  }
}
