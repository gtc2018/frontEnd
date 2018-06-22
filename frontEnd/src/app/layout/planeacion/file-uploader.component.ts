import {Component} from '@angular/core';

@Component({
    selector: 'file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.css'],
    // 1. Valores recibidos
    inputs:['activeColor','baseColor','overlayColor']
})
export class FileUploaderComponent {
    iconColor: string;
    borderColor: string;
    // 2. Propiedades
    activeColor: string = 'green';
    baseColor: string = '#ccc';
    overlayColor: string = 'rgba(255,255,255,0.5)';

    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    imageSrc: string = 'assets/images/avatar.png';

    constructor(){
        console.log(this);
    }

    // 3. Funcionalidad Drag & Drop
    handleDragEnter() {
        this.dragging = true;
    }

    handleDragLeave() {
        this.dragging = false;
    }

    handleDrop(e) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }

    // 4. Carga de imagen
    handleImageLoad() {
        console.log("Carga");
        this.imageLoaded = true;
        this.iconColor = this.overlayColor;
    }

    // 5. Vista Previa
    handleInputChange(e) {
        console.log(e);
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        console.log(file);

        var pattern = /image-*/;
        var reader = new FileReader();
        console.log(reader);

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.loaded = false;

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    // if (event.target.files && event.target.files[0]) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]); // read file as data url

    //     reader.onload = (event) => { // called once readAsDataURL is completed
    //       console.log(event.target.result);
    //       this.imageSrc = event.target.result;
    //     }
    //   }

    _handleReaderLoaded(e) {
        var reader = e.target;
        this.imageSrc = reader.result;
        console.log(this.imageSrc);
        this.loaded = true;
    }

    _setActive() {
        this.borderColor = this.activeColor;
        if (this.imageSrc.length === 0) {
            this.iconColor = this.activeColor;
        }
    }

    _setInactive() {
        this.borderColor = this.baseColor;
        if (this.imageSrc.length === 0) {
            this.iconColor = this.baseColor;
        }
    }

}
