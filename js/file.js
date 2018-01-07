/*read file uri with callback*/
function readURL(input, onCallBack) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = onCallBack;
        reader.readAsDataURL(input.files[0]);
    }
}