const FileLoader = function (options) {
    this.selectors = document.querySelectorAll(options.selectors);
    this.init();
    this.uploadImage();
    this.removeImage();
}

FileLoader.prototype.isValidFileSize = function (fileSize, $el) {
    const size = 1024 * 1024 * 2;
    if (size < fileSize) {
        $el.querySelector('.error').innerText = 'Make sure your total file size for upload is not over 2MB.'
        return false;
    } else {
        $el.querySelector('.error').innerText = '';
        return true;
    }
}

FileLoader.prototype.isValidMimetype = function (ext, $el) {
    const mimetypes = ['image/jpeg', 'image/png', 'image/gif', 'image/pjpeg', 'image/svg+xml', 'image/webp', 'image/tiff'];
    if (!mimetypes.includes(ext)) {
        $el.querySelector('.error').innerText = 'You tried to upload not supported format. Available formats: jpg, png, jpeg, gif, svg, webp. Bad format.!'
        return false;
    } else {
        $el.querySelector('.error').innerText = '';
        return true;
    }
}

FileLoader.prototype.init = function () {
    for (let i in this.selectors) {
        if (this.selectors.hasOwnProperty(i)) {
            let $dropArea = this.selectors[i];
            $dropArea.addEventListener('drop', FileLoader.prototype.drop.bind($dropArea));
            $dropArea.addEventListener('dragover', FileLoader.prototype.dragover.bind($dropArea));
            $dropArea.addEventListener('dragleave', FileLoader.prototype.dragleave.bind($dropArea));
        }
    }
}

FileLoader.prototype.drop = function (e) {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    this.style.borderColor = '#ced4da';
    if (FileLoader.prototype.isValidFileSize(file.size, this.closest('.file-uploader'))) {
        return false;
    }
    if (!FileLoader.prototype.isValidMimetype(file.type, this.closest('.file-uploader'))) {
        return false;
    }
    this.innerText = file.type + ' - ' + file.size / 1000 + ' KB';
    let $image = this.closest('.file-uploader').querySelector('.image');
    let reader = new FileReader();
    reader.onloadend = function() {
        $image.style.backgroundImage = 'url(' + reader.result + ')';
    }
    reader.readAsDataURL(file);
}

FileLoader.prototype.dragover = function (e) {
    e.preventDefault();
    this.style.borderColor = 'orange';
}

FileLoader.prototype.dragleave = function (e) {
    e.preventDefault();
    this.style.borderColor = '#ced4da';
}

FileLoader.prototype.removeImage = function () {
    for (let i in this.selectors) {
        if (this.selectors.hasOwnProperty(i)) {
            let $wrap = this.selectors[i].closest('.file-uploader');
            let $removeButton = $wrap.querySelector('.remove-image');
            $removeButton.addEventListener('click', function () {
                $wrap.querySelector('.error').innerText = '';
                $wrap.querySelector('.button').innerText = 'Select image';
                $wrap.querySelector('.image').style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTI1NiAyMDUuNzczYy04LjM5NiAwLTE2LjMxMSAyLjA4MS0yMy4yNzQgNS43MzlsNjcuNzYyIDY3Ljc2MmMzLjY1OC02Ljk2MyA1LjczOS0xNC44NzggNS43MzktMjMuMjc0IDAtMjcuNjk1LTIyLjUzMi01MC4yMjctNTAuMjI3LTUwLjIyN3oiLz48cGF0aCBkPSJtMTczLjgzOCAxNTIuNjI1aDExLjYwOGwyMC4xMjUtMzIuMTI1aDEwMC44NTdsMjAuMTI1IDMyLjEyNWg5NS4wNzF2MjI1LjgxMmgtMjEuOTc0bDQ3LjY1OSA0Ny42NTljNDEuODE3LTQ2LjkwOSA2NC42OTEtMTA2Ljc0MSA2NC42OTEtMTcwLjA5NiAwLTY4LjM4LTI2LjYyOS0xMzIuNjY3LTc0Ljk4LTE4MS4wMi00OC4zNTMtNDguMzUxLTExMi42NC03NC45OC0xODEuMDItNzQuOTgtNjMuMzU1IDAtMTIzLjE4NyAyMi44NzQtMTcwLjA5NyA2NC42OXoiLz48cGF0aCBkPSJtMjU2IDMwNi4yMjdjOC4zOTYgMCAxNi4zMTEtMi4wODEgMjMuMjc0LTUuNzM5bC02Ny43NjItNjcuNzYyYy0zLjY1OCA2Ljk2My01LjczOSAxNC44NzgtNS43MzkgMjMuMjc0IDAgMjcuNjk1IDIyLjUzMiA1MC4yMjcgNTAuMjI3IDUwLjIyN3oiLz48cGF0aCBkPSJtMTIwLjM3NSAzNDguNDM4aDIwNi44NWwtMjYuMTI2LTI2LjEyNmMtMTIuODYxIDguNzc1LTI4LjM4OSAxMy45MTUtNDUuMDk4IDEzLjkxNS00NC4yMzcgMC04MC4yMjctMzUuOTktODAuMjI3LTgwLjIyNyAwLTE2LjcwOSA1LjE0MS0zMi4yMzggMTMuOTE1LTQ1LjA5OGwtMjguMjc3LTI4LjI3N2gtNDEuMDM3eiIvPjxwYXRoIGQ9Im0zNTcuMjI1IDM3OC40MzhoLTI2Ni44NXYtMjI1LjgxM2g0MS4wMzdsLTY2LjcyMi02Ni43MjJjLTQxLjgxNiA0Ni45MS02NC42OSAxMDYuNzQyLTY0LjY5IDE3MC4wOTcgMCA2OC4zOCAyNi42MjkgMTMyLjY2NyA3NC45OCAxODEuMDIgNDguMzUzIDQ4LjM1MSAxMTIuNjQgNzQuOTggMTgxLjAyIDc0Ljk4IDYzLjM1NSAwIDEyMy4xODctMjIuODc0IDE3MC4wOTctNjQuNjl6Ii8+PHBhdGggZD0ibTM5MS42MjUgMTgyLjYyNWgtODEuNjc5bC0yMC4xMjUtMzIuMTI1aC02Ny42NDNsLTE5LjQzOCAzMS4wMjggOC4xNjEgOC4xNjFjMTIuODYxLTguNzc1IDI4LjM4OS0xMy45MTUgNDUuMDk4LTEzLjkxNSA0NC4yMzcgMCA4MC4yMjcgMzUuOTkgODAuMjI3IDgwLjIyNyAwIDE2LjcwOS01LjE0MSAzMi4yMzgtMTMuOTE1IDQ1LjA5OGw0Ny4zMzkgNDcuMzM5aDIxLjk3NXoiLz48L2c+PC9zdmc+)';
                $wrap.querySelector('input').value = '';
            });
        }
    }
}

FileLoader.prototype.uploadImage = function () {
    for (let i in this.selectors) {
        if (this.selectors.hasOwnProperty(i)) {
            let $button = this.selectors[i];
            let $wrap = $button.closest('.file-uploader');
            let $image = $wrap.querySelector('.image');
            let $input = $wrap.querySelector('input');
            $input.addEventListener('change', function () {
                let file = this.files[0];
                if (!FileLoader.prototype.isValidFileSize(file.size, $wrap)) {
                    return false;
                }
                if (!FileLoader.prototype.isValidMimetype(file.type, $wrap)) {
                    return false;
                }
                $button.innerText = file.type + ' - ' + file.size / 1000 + ' KB';
                let reader = new FileReader();
                reader.onloadend = function() {
                    $image.style.backgroundImage = 'url(' + reader.result + ')';
                }
                reader.readAsDataURL(file);
            });
        }
    }
}

new FileLoader({
    selectors: '.file-uploader .button'
});
