import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Iuser } from '../../model/user';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm !: FormGroup
  isinEditMode: boolean = false
  edituser ?: Iuser
  UserId !: string

  constructor(private userservice: UserService,
    private snackbar: SnackbarService,
    private router: Router,
    private Routes: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.createuserform()
    this.isPermenanatAddHandler()
    this.isAddSameHandler()
    this.addskillscontrol()
    this.patchvalueinForm()
  }


  isPermenanatAddHandler() {
    this.formcontrols['address'].get('current')?.valueChanges
      .subscribe(val => {
        if (this.formcontrols['address'].get('current')?.valid) {
          this.formcontrols['isAddSame'].enable()
        } else {
          this.formcontrols['isAddSame'].reset()
          this.formcontrols['isAddSame'].disable()
        }
      })
  }

  isAddSameHandler() {
    this.formcontrols['isAddSame'].valueChanges
      .subscribe(val => {
        if (val) {

          let CurrentAdd = this.formcontrols['address'].get('current')?.value;
          this.formcontrols['address'].get('permanent')?.patchValue(CurrentAdd)
          this.formcontrols['address'].get('permanent')?.disable()
        } else if (this.isinEditMode && !val) {
          this.formcontrols['address'].get('permanent')?.patchValue(this.edituser?.address.permanent)
          this.formcontrols['address'].get('permanent')?.enable()
        }
        else {
          this.formcontrols['address'].get('permanent')?.reset()
          this.formcontrols['address'].get('permanent')?.enable()

        }
      })
  }



  createuserform() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl('Candidate'),
      profileDescription: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }),
      skills: new FormArray([]),

      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        }),
        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        })
      })
    })

  }

  addskillscontrol() {
    let skillcontrol = new FormControl(null, [Validators.required])
    this.skillsArr.push(skillcontrol)
  }

  get formcontrols() {
    return this.userForm.controls
  }
  get skillsArr() {
    return this.formcontrols['skills'] as FormArray
  }

  usersubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      let UserDetails = { ...this.userForm.getRawValue(), userId: Date.now().toString() }
      this.userservice.onadduser(UserDetails)
        .subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            console.log(err);

          }
        })
    }

  }

  patchvalueinForm() {
    this.UserId = this.Routes.snapshot.paramMap.get('userId')!
    if (this.UserId) {
      this.userservice.fetchuserById(this.UserId).subscribe({
        next: res => {
          this.edituser = res
          this.isinEditMode = true
          this.userForm.patchValue(this.edituser)
          if (res.userRole === 'Candidate') {
            this.userForm.disable()
          }
          this.skillsArr.clear()
          this.edituser.skills.forEach(ele => {
            let control = new FormControl({
              value: ele,
              disabled: res.userRole === 'Candidate'
            })
            this.skillsArr.push(control)
          })
        }
      })
    }
  }

  onUpdate() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      let updatedobj = { ...this.userForm.getRawValue(), userId: this.UserId }
      this.userservice.onupdateuser(updatedobj)
        .subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.userservice.fetchusers().subscribe({})
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            console.log(err);

          }
        })
    }

  }

  onremoveskills(i: number) {
    this.skillsArr.removeAt(i)
  }

  canDeactivate(): boolean {
    if (this.userForm.dirty && this.isinEditMode) {
      return confirm(`Are You Sure You Want To Discard The Changes !!`)
    }
    return true

  }

}
