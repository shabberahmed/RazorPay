import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  referenceNum!: string;

  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.referenceNum = params['reference'];
    });
    this.redirectToHome()
  }
  redirectToHome(){
    setTimeout(() => {
      this.router.navigate([''])
    }, 3000);
  }
}
