async function registerUser() {
    try {
        // Fetch data from your registration form
        const userData = {
            userUserName: document.getElementById('userUserName').value,
            userName: document.getElementById('userName').value,
            userLastName: document.getElementById('userLastName').value,
            genderOptions: document.querySelector('input[name="genderOptions"]:checked') ? 
                document.querySelector('input[name="genderOptions"]:checked').value : '',
            smokeOptions: document.querySelector('input[name="smokeOptions"]:checked') ? 
                document.querySelector('input[name="smokeOptions"]:checked').value : '',
            userEmail: document.getElementById('userEmail').value,
            userPhoneNumber: document.getElementById('userPhoneNumber').value,
            storePassword: document.getElementById('storePassword').value,
        };

        // Validation: Check if required fields are not empty
        const requiredFields = ['userUserName', 'userName', 'userLastName', 'genderOptions', 
                                'smokeOptions', 'userEmail', 'userPhoneNumber', 'storePassword'];
        
        for (const field of requiredFields) {
            if (!userData[field]) {
                alert(`กรุณากรอกข้อมูลในช่อง ${field}`);
                return;
            }
        }

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (result.success) {
            // Registration successful, show a success message or redirect to a success page
            alert('ลงทะเบียนสำเร็จ โปรดตรวจสอบอีเมลของท่าน');
            window.location.reload(); // Reload the page or redirect as needed
        } else {
            // Handle registration failure (display an error message, etc.)
            alert(result.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดระหว่างการสมัคร: ', error);
        alert('เกิดข้อผิดพลาดในการสมัครสมาชิก โปรดลองอีกครั้ง');
    }
}
