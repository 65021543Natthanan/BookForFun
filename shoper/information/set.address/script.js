function saveDataAndDisplay() {
    // ดึงค่าจากฟอร์ม
    var storeName = document.getElementById('storeName').value;
    var storeDescription = document.getElementById('storeDescription').value;
    var storePhoneNumber = document.getElementById('storePhoneNumber').value;
    var storeEmail = document.getElementById('storeEmail').value;
    var profileImageInput = document.getElementById('profileImage');

    // สร้างตัวแปรเพื่อเก็บข้อมูล
    var data = {
        storeName: storeName,
        storeDescription: storeDescription,
        storePhoneNumber: storePhoneNumber,
        storeEmail: storeEmail,
        profileImageSrc: profileImageInput.files.length > 0 ? URL.createObjectURL(profileImageInput.files[0]) : null
    };

    // แสดงข้อมูลที่บันทึกในคอนเทนเนอร์
    saveImageToLocalStorage(data.profileImageSrc);

    // บันทึกข้อมูลใน localStorage
    localStorage.setItem('storedData', JSON.stringify(data));


    // แสดงข้อมูลที่บันทึกในคอนเทนเนอร์
    displayData(data);
}

function saveImageToLocalStorage(imageSrc) {
    localStorage.setItem('uploadedImageSrc', imageSrc);
}



function displayData(data) {
    // แสดงข้อมูลที่บันทึกในคอนเทนเนอร์
    document.getElementById('resultStoreName').innerHTML = '<strong>ชื่อร้านค้า:</strong> ' + data.storeName;
    document.getElementById('resultStoreDescription').innerHTML = '<strong>รายละเอียดร้านค้า:</strong> ' + data.storeDescription;
    document.getElementById('resultStorePhoneNumber').innerHTML = '<strong>เบอร์โทรศัพท์ร้านค้า:</strong> ' + data.storePhoneNumber;
    document.getElementById('resultStoreEmail').innerHTML = '<strong>อีเมลร้านค้า:</strong> ' + data.storeEmail;

    // แสดงรูปภาพในคอนเทนเนอร์ (ถ้ามี)
    var resultProfileImageContainer = document.getElementById('resultProfileImageContainer');
    var resultProfileImage = document.getElementById('resultProfileImage');
    
    if (data.profileImageSrc) {
        resultProfileImage.src = data.profileImageSrc;
        resultProfileImageContainer.style.display = 'block';
    } else {
        resultProfileImageContainer.style.display = 'none';
    }
}

// โหลดและแสดงข้อมูลจาก localStorage เมื่อโหลดหน้าเว็บ
window.onload = function () {
    var storedData = JSON.parse(localStorage.getItem('storedData'));
    var storedImageSrc = localStorage.getItem('uploadedImageSrc');
    if (storedData) {
        displayData(storedData);
    }

    if (storedImageSrc) {
        // แสดงรูปภาพที่ถูกบันทึกใน Local Storage
        document.getElementById('resultProfileImage').src = storedImageSrc;
        document.getElementById('resultProfileImageContainer').style.display = 'block';
    }
}





// โหลดและแสดงข้อมูลที่อยู่จาก localStorage เมื่อโหลดหน้าเว็บ
window.onload = function () {
    var storedAddressData = JSON.parse(localStorage.getItem('storedAddressData'));
    if (storedAddressData) {
        displayAddressData(storedAddressData);
    }
};

function saveDataAndDisplay() {
    // ดึงค่าจากฟอร์ม
    var storeAddress = document.getElementById('storeAddress').value;
    var storeRoad = document.getElementById('storeRoad').value;
    var storeAlley = document.getElementById('storeAlley').value;
    var storeVillage = document.getElementById('storeVillage').value;
    var storeDistrict = document.getElementById('storeDistrict').value;
    var storeCountry = document.getElementById('storeCountry').value;
    var storeProvince = document.getElementById('storeProvince').value;
    var storePostal = document.getElementById('storePostal').value;

    // สร้างตัวแปรเพื่อเก็บข้อมูลที่อยู่
    var addressData = {
        storeAddress: storeAddress,
        storeRoad: storeRoad,
        storeAlley: storeAlley,
        storeVillage: storeVillage,
        storeDistrict: storeDistrict,
        storeCountry: storeCountry,
        storeProvince: storeProvince,
        storePostal: storePostal
    };

    // บันทึกข้อมูลที่อยู่ใน localStorage
    localStorage.setItem('storedAddressData', JSON.stringify(addressData));

    // แสดงข้อมูลที่อยู่ในคอนเทนเนอร์
    displayAddressData(addressData);
}

function displayAddressData(data) {
    // แสดงข้อมูลที่อยู่ในคอนเทนเนอร์
    document.getElementById('resultStoreAddress').innerHTML = '<strong>ที่อยู่:</strong> ' + data.storeAddress;
    document.getElementById('resultStoreRoad').innerHTML = '<strong>ถนน:</strong> ' + data.storeRoad;
    document.getElementById('resultStoreAlley').innerHTML = '<strong>ซอย:</strong> ' + data.storeAlley;
    document.getElementById('resultStoreVillage').innerHTML = '<strong>หมู่บ้าน:</strong> ' + data.storeVillage;
    document.getElementById('resultStoreDistrict').innerHTML = '<strong>อำเภอ/แขวง:</strong> ' + data.storeDistrict;
    document.getElementById('resultStoreCounty').innerHTML = '<strong>ตำบล/เขต:</strong> ' + data.storeCountry;
    document.getElementById('resultStoreProvince').innerHTML = '<strong>จังหวัด:</strong> ' + data.storeProvince;
    document.getElementById('resultStorePostal').innerHTML = '<strong>เลขไปรษณีย์:</strong> ' + data.storePostal;
}
