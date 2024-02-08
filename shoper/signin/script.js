// script.js

function validateForm(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // เพิ่มตรวจสอบความถูกต้องของข้อมูลที่ป้อน
    if (!username || !email || !password || !confirmPassword) {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        return;
    }

    if (password !== confirmPassword) {
        alert('รหัสผ่านไม่ตรงกัน');
        return;
    }

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือจัดการตามความต้องการ
    alert('การสมัครสมาชิกสำเร็จ!');
    document.getElementById('registerForm').reset();
}
