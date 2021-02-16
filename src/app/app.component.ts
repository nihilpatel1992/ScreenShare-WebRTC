import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import Peer from 'peerjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ScreenShare-WebRTC';
  ngUnsubscribe = new Subject<void>();
  canvas: any;
  ctx: any;
  draggableDiv: any;
  myTimer: any;

 
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.startButtonDisabled = false;

  }

  ngOnInit(): void {
    this.dataService.screenShareEventData.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data && data) {
          this.continuesStreamToCanvas();
        }
      });

    //if (adapter.browserDetails.browser == 'firefox') {
    //  // @ts-ignore
    //  adapter.browserShim.shimGetDisplayMedia(window, 'screen');
    //}

    if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
      this.dataService.startButtonDisabled = false;
    } else {
      console.log('getDisplayMedia is not supported');
    }

  }
  ngAfterViewInit() {
    this.canvas = document.getElementById('cropCvs');
    this.ctx = this.canvas.getContext('2d');
  }

  continuesStreamToCanvas() {
    this.myTimer = setInterval(() => {
      this.videoLoop();
    }, 1000 / 30);
  }

  videoLoop() {
    if (this.dataService.localVideo.readyState >= 2) {

      //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
      this.ctx.drawImage(this.dataService.localVideo, this.dataService.sourceoffset.x, this.dataService.sourceoffset.y, 300, 200, 0, 0, 300, 200); //320, 0, 320, 180, 0, 0, 640, 360

      //var lstream = this.canvas.captureStream(30);
    }
  }

  shareScreen() {
    this.router.navigateByUrl('/sharedscreen');
    //this.router.navigate([]).then(result => { window.open("/sharedscreen", '_blank'); });
  }
}
