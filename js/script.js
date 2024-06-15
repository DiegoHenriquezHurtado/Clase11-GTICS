$(document).ready(function() {
    let userCount = 0;

    function validateName(name) {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(name);
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validatePassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
        return regex.test(password);
    }

    function showValidationMessage(element, isValid) {
        if (isValid) {
            element.text('✔️').css('color', 'green');
        } else {
            element.text('❌').css('color', 'red');
        }
    }

    $('#openAccountButton').click(function() {
        let isValid = true;

        // Validate Name
        const name = $('#nombre').val();
        const apellido = $('#apellido').val();
        if (!validateName(name)) {
            showValidationMessage($('#nombreValidation'), false);
            isValid = false;
        } else {
            showValidationMessage($('#nombreValidation'), true);
        }

        if (!validateName(apellido)) {
            showValidationMessage($('#nombreValidation'), false);
            isValid = false;
        } else {
            showValidationMessage($('#nombreValidation'), true);
        }

        // Validate Email
        const email = $('#email').val();
        if (!validateEmail(email)) {
            showValidationMessage($('#emailValidation'), false);
            isValid = false;
        } else {
            showValidationMessage($('#emailValidation'), true);
        }

        // Validate Confirm Email
        const confirmEmail = $('#confirmEmail').val();
        if (email !== confirmEmail || !validateEmail(confirmEmail)) {
            showValidationMessage($('#confirmEmailValidation'), false);
            isValid = false;
        } else {
            showValidationMessage($('#confirmEmailValidation'), true);
        }

        // Validate Password
        const password = $('#password').val();
        if (!validatePassword(password)) {
            showValidationMessage($('#passwordValidation'), false);
            isValid = false;
        } else {
            showValidationMessage($('#passwordValidation'), true);
        }

        // Validate DOB
        const dob = $('#dob').val();
        if (dob === "") {
            showValidationMessage($('#dobValidation'), false);
            isValid = false;
        } else {
            showValidationMessage($('#dobValidation'), true);
        }

        if (isValid) {
            addUser(name, apellido, email, dob);
        } else {
            alert("Campo faltante");
        }
    });

    function addUser(name, apellido, email, dob) {
        const userRow = `
            <tr>
                <td>${name} ${apellido}</td>
                <td>${email}</td>
                <td>${dob}</td>
                <td><button class="removeUserButton">Quitar</button></td>
            </tr>
        `;

        $('#userTable tbody').append(userRow);
        userCount++;
        updateUserCount();

        // Add event listener for remove button
        $('.removeUserButton').last().click(function() {
            $(this).closest('tr').remove();
            userCount--;
            updateUserCount();
        });
    }

    function updateUserCount() {
        $('#userCount').text(userCount);
    }
});