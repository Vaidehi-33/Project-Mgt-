import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectApiService } from '../../service/project-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MultiLingualService } from 'src/service/multi-lingual.service';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() userArr: any = {};
  @Input() searchText: string = '';
  language: string = '';
  translations : any;
  constructor(
    private obj: ProjectApiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private multiLingualService :MultiLingualService
  ) { this.language = '';}

  deleteUser(id: any) {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.obj
          .deleteUser(id)
          .then((response) => {
            console.log('User deleted successfully');
            Swal.fire('Success!', 'User deleted successfully!', 'success');
            this.cdr.detectChanges();
            // this.updateUserArr(id);
            this.obj.navigateOnSuccess();
            this.childMethod();
          })
          .catch((e) => {
            console.error('Error deleting User', e);
            Swal.fire('Error', 'Failed to delete the User', 'error');
          });
      }
    });
  }

  @Output() testEvent = new EventEmitter();

  childMethod() {
    this.testEvent.emit();
  }

  // private updateUserArr(deletedUserId: any) {
  //   const deletedIndex = this.userArr.findIndex((user: any) => user.id === deletedUserId);

  //   if (deletedIndex !== -1) {
  //     this.userArr.splice(deletedIndex, 1);
  //   }
  // }
  // deleteUser(id:any){
  //   console.log(id);

  //     Swal.fire({
  //       title: 'Confirm Deletion',
  //       text: 'Are you sure you want to delete this user?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#d33',
  //       cancelButtonColor: '#3085d6',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result:any) => {
  //       if (result.isConfirmed) {
  //         this.obj.deleteUser(id).subscribe(
  //           (response) => {
  //             console.log('User deleted successfully');
  //             Swal.fire('Success!', 'User deleted successfully!', 'success');
  //             this.childMethod()
  //           },
  //           (error: any) => {
  //             console.error('Error deleting User', error);
  //             Swal.fire('Error', 'Failed to delete the User', 'error');
  //           }
  //         );
  //       }
  //     });
  // }

  updateUserData(details: any) {
    let body = {
      id: this.id,
      userDetails: {
        uname: details.uname,
        uemail: details.uemail,
        urole: details.urole,
        uphone: details.uphone,
        uaddress: details.uaddress,
        imageUrl: this.image,
        imageName: this.imname,
      },
    };
    console.log('body is', body);
    this.obj.saveuser(body).then((result) => {
      console.log(result);
      console.log('body is', body);
      this.retrieveUsers();
    });

    this.closeform();
  }
  error = null;
  retrieveUsers() {
    this.obj
      .getUserData()
      .then(
        // retrieveUser(){
        //   this.proj.getUserData().subscribe(
        (details: any) => {
          this.userArr = details.Items;
          console.log(details);
          console.log('array is', this.userArr);
        }
      )
      .catch((e) => {
        console.log(e);
        this.error = e.message;
      });
  }
  closeform() {
    const myFormElement = document.getElementById('uform');
    console.log('Close form button clicked!');
    if (myFormElement) {
      myFormElement.style.display = 'none';
    }
  }
  uname: string = '';
  uemail: string = '';
  urole: string = '';
  uphone: string = '';
  uaddress: string = '';
  id: string = '';
  selectedItem: any = null;
  image: string = '';
  imname: string = '';

  editUser(user: any) {
    // this.selectedItem = this.selectedItem === user.userDetails ? null : user.userDetails;
    // if (this.selectedItem) {
    //   this.selectedItem.style.display = "block";
    // }
    console.log('id is :', user.id);
    this.id = user.id;
    this.uaddress = user.userDetails.uaddress;
    this.uname = user.userDetails.uname;
    this.urole = user.userDetails.urole;
    this.uphone = user.userDetails.uphone;
    this.uemail = user.userDetails.uemail;
    this.image = user.userDetails.imageUrl;
    this.imname = user.userDetails.imageName;

    const myFormElement = document.getElementById('uform');
    if (myFormElement) {
      myFormElement.style.display = 'block';
    }
  }
  ngOnInit() {
    this.retrieveUsers();
    console.log(localStorage.getItem('selectedLanguage'),"language");
    this.multiLingualService.getTranslations(localStorage.getItem('selectedLanguage')).subscribe(translations => {
      this.translations = translations; // Make sure translations are correctly stored here
      console.log(this.translations); // Check if translations are fetched correctly
      // this.multiLingualService.multilingual=this.translations;
    });
  }
}
