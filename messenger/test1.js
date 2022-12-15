var recoveredBlob = 'https://dc65vg.csb.app/6f042663-c410-4a10-86b8-e6d3944c2f7b';

var reader = new FileReader();
let temp;
reader.onload = function () {
    var blobAsDataUrl = reader.result;
    temp = blobAsDataUrl;
};

reader.readAsDataURL(recoveredBlob);
console.log(temp);
