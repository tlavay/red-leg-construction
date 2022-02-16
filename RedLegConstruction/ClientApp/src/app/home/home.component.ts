import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public currentTab: string = 'home';
  public classMap: Map<string, string> = new Map<string, string>();
  public baseClass: string = 'nav-link text-dark';
  public closeResult = '';
  public loading: boolean = false;

  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.classMap.set('home', 'nav-link active bg-light bg-opacity-50');
    this.classMap.set('about', this.baseClass);
    this.classMap.set('services', this.baseClass);
  }

  sendRequest(name: string, email: string, phoneNumber: string): void {
    this.loading = true;
    this.http.post('/api/email', { "name": name, "email": email, "phoneNumber": phoneNumber })
      .subscribe(response => {
      this.modalService.dismissAll();
      this.loading = false;
    });
  }

  openContactModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.loading = false;
    });
  }

  public hidden(tabName: string): boolean {
    return tabName !== this.currentTab;
  }

  public getTabClass(tabName: string): string {
    const classValue = this.classMap.get(tabName);
    return classValue === undefined ? 'nav-item' : classValue;
  }

  public setTab(tabName: string): void {
    this.currentTab = tabName;
    this.classMap.forEach((value, key) => {
      let classValue = '';
      if (tabName === key) {
        classValue = 'nav-link active bg-light bg-opacity-50';
      } else {
        classValue = 'nav-link text-dark';
      }
      this.classMap.set(key, classValue);
    });
  }
}
