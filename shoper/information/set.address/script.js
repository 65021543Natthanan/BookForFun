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
