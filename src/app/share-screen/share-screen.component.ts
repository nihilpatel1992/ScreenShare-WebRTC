import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-screen',
  templateUrl: './share-screen.component.html',
  styleUrls: ['./share-screen.component.scss']
})
export class ShareScreenComponent implements OnInit {
  constructor(public dataService: DataService, private router: Router) {
    this.dataService.sourceoffset = { x: 0, y: 0 };
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataService.localVideo = document.querySelector("#localVideo");
    this.remoteScreenShare();
  }

  moveDraggableMoved(event: any) {
    this.dataService.sourceoffset = event._position;
  }

  remoteScreenShare() {
    const gdmOptions = {
      video: {
        cursor: 'always'
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    }

    // @ts-ignore
    navigator.mediaDevices.getDisplayMedia(gdmOptions).then(stream => { this.dataService.showSharedScreen = true; this.handleSuccess(stream); }).catch(error => { this.handleError(error); });
  }

  handleSuccess(stream: any) {
    //this.dataService.localVideo = document.querySelector("#localVideo");
    this.dataService.startButtonDisabled = true;

    const videoTrack = stream.getVideoTracks()[0];
    let newstream = new MediaStream();

    const constraints = {
      width: { min: 800, exact: 1360 },
      height: { min: 600, exact: 650 },
      advanced: [
        //  { width: 1920, height: 1280 },
        { aspectRatio: 1.333 }
      ]
    };
    videoTrack.applyConstraints(constraints)
    newstream.addTrack(videoTrack);

    this.streamRemoteVideo(newstream);

    // demonstrates how to detect that the user has stopped
    // sharing the screen via the browser UI.

    videoTrack.onended = () => {
      console.log('The user has ended sharing the screen');
      this.dataService.startButtonDisabled = false;
    };
  }

  handleError(error: any) {
    console.log(`getDisplayMedia error: ${error.name}`, error);
  }

  private streamRemoteVideo(stream: any) {
    this.dataService.localVideo = document.querySelector('#localVideo');
    this.dataService.localVideo.srcObject = stream;
    this.dataService.invokeRemoteScreenShare(true);
  }

  //errorMsg(msg: string, error: any) {
  //  var errorElement = document.getElementById('errorMsg');
  //  if (errorElement != null) {
  //    errorElement.innerHTML += `<p>${msg}</p>`;
  //  }
  //  if (error !== undefined) {
  //    console.error(error);
  //  }
  //}

}
