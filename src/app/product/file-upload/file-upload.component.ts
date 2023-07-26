import { Component, EventEmitter, Input, Output } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  fileName: string = '';
  localImageString: string = '';
  @Output() imageMetaData: EventEmitter<{
    imageId: string;
    imageString: string;
  }> = new EventEmitter<{ imageId: string; imageString: string }>();
  @Input() baseUri: string = '';
  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const extension: string | undefined = file.name
        .split('?')[0]
        .split('.')
        .pop();
      this.fileName = file.name;
      const uploadImage = new FormData();
      uploadImage.append('image', file, `${uuid()}.${extension}`);
      const uploadedImage = this.http.post<{ name: string }>(
        `${this.baseUri}/images/upload`,
        uploadImage
      );
      uploadedImage.subscribe((image) => {
        this.imageMetaData.emit({
          imageId: image.name,
          imageString: `${this.baseUri}/images/${image.name}`,
        });
      });
    }
    event.target.reset;
  }
}
