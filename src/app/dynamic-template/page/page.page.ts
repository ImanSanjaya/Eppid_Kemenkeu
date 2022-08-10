import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PpidCmsService } from '../../ppid-cms.service';

import { environment} from '../../../environments/environment';

@Component({
  selector: 'app-page',
  templateUrl: './page.page.html',
  styleUrls: ['./page.page.scss'],
})
export class PagePage implements OnInit {

  title: string;
  page: string;
  loading = true;
  dataPage: any;
  dataPageListPost: any;
  imageToShow: any;
  
  constructor(
    private route: ActivatedRoute,
    private ppidService: PpidCmsService
  ) {
  }

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

  dynamicLink(title:string, link:string){
    return "/post/"  + title + "/" + link;
  }

  loadHtmlContent(){
    this.loading = true;
    console.log('dataPageaaa==>'+this.page);

    //Pengambilan Content Page
    this.ppidService.getContentPage(this.page).subscribe(res => {
      console.log('dataPageaaa==>'+JSON.stringify(res));
      // console.log(res.Content,'Content html');
      this.dataPage = res;

      //Pengambilan Content List Post
      this.ppidService.getContentListPost(this.dataPage.PageId).subscribe(res => {
        console.log('dataaaa list post==>'+JSON.stringify(res));
        this.dataPageListPost = res['Data'];

        // // Replace Content
        // this.dataPageListPost.Content = this.dataPageListPost.Content.replace(/"\/api/g, '"' + environment.apiCmsNew);

        // if(res.ImageHeader !== null){
        //   this.ppidService.getMedia(res.ImageHeader.MediaId).subscribe(res => {
        //     const reader = new FileReader();
        //     reader.onloadend = (e) => {
        //         this.imageToShow = reader.result;
        //     };
        //     reader.readAsDataURL(res);
        //   },
        //   err =>{
        //     console.log(err);
        //   });
        // }
      });    

      // Replace Content
      this.dataPage.PageContent = this.dataPage.PageContent.replace(/"\/api/g, '"' + environment.apiCmsNew);

      if(res.ImageHeader !== null){
        this.ppidService.getMedia(res.ImageHeader.MediaId).subscribe(res => {
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
