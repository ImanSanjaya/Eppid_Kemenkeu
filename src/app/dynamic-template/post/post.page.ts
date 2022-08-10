import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PpidCmsService } from '../../ppid-cms.service';

import { environment} from '../../../environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  title: string;
  page: string;
  loading = true;
  data: any;
  imageToShow: any;

  constructor(
    private route: ActivatedRoute,
    private ppidService: PpidCmsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.page = params.page;
      this.title = params.title;
    });
    this.loadHtmlContent();
    if(this.isLogin()){
      this.ppidService.CekSession();
    }
  }

  isLogin() {
    return this.ppidService.isLogin();
  }

  loadHtmlContent(){
    this.loading = true;

    this.ppidService.getContentPost(this.page).subscribe(res => {
      // console.log(res);
      // console.log(res.Content,'Content html');
      this.data = res;

      // Replace Content
      this.data.Content = this.data.Content.replace(/"\/api/g, '"' + environment.apiCms);

      if(res.Image !== null){
        this.ppidService.getMedia(res.ImageData.MediaId).subscribe(res => {
          const reader = new FileReader();
          reader.onloadend = (e) => {
              this.imageToShow = reader.result;
          };
          reader.readAsDataURL(res);
        },
        err =>{
          console.log(err);
        });
      }

      this.loading = false;
    });    
  }
}
