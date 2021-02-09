import { Component, OnInit } from '@angular/core';
import Peer from 'peerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ScreenShare-WebRTC';
  startButtonDisabled: boolean;

  constructor() {
    this.startButtonDisabled = false;
  }

  ngOnInit() {
    //if (adapter.browserDetails.browser == 'firefox') {
    //  // @ts-ignore
    //  adapter.browserShim.shimGetDisplayMedia(window, 'screen');
    //}


    if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
      this.startButtonDisabled = false;
    } else {
      console.log('getDisplayMedia is not supported');
    }

  }

  handleSuccess(stream: any) {
    this.startButtonDisabled = true;
    this.streamRemoteVideo(stream);

    // demonstrates how to detect that the user has stopped
    // sharing the screen via the browser UI.
    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.onended = () => {
      console.log('The user has ended sharing the screen');
      this.startButtonDisabled = false;
    };
  }

  private streamRemoteVideo(stream: any) {
    const video = document.querySelector('video');
    if (video != null && video != undefined) {
      video.classList.add('video');
      video.srcObject = stream;
      video.play();
    }
  }

  handleError(error: any) {
    console.log(`getDisplayMedia error: ${error.name}`, error);
  }

  errorMsg(msg: string, error: any) {
    var errorElement = document.getElementById('errorMsg');
    if (errorElement != null) {
      errorElement.innerHTML += `<p>${msg}</p>`;
    }
    if (error !== undefined) {
      console.error(error);
    }
  }

  shareScreen() {
    // @ts-ignore
    navigator.mediaDevices.getDisplayMedia({ video: true }).then(stream => { this.handleSuccess(stream); }).catch(error => { this.handleError(error); });
  }


}
