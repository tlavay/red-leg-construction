import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public navClass: string = '';
  public closeResult = '';
  public loading: boolean = false;

  constructor(private modalService: NgbModal, private http: HttpClient) { }

  sendRequest(name: string, email: string, phoneNumber: string): void {
    this.loading = true;
    this.http.post('/api/email', { "name": name, "email": email, "phoneNumber": phoneNumber }).subscribe(response => {
      this.modalService.dismissAll();
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.navClass = this.getNavClass(true);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  openContactModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getNavClass(displayBackground: boolean) {
    if (displayBackground) {
      return "navbar-brand fixed-top text-white bg-light bg-opacity-50";
    }

    return "navbar-brand fixed-top text-white bg-light";
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    const verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    if (verticalOffset > 250) {
      this.navClass = this.getNavClass(false);
    } else {
      this.navClass = this.getNavClass(true);
    }
  }
}
