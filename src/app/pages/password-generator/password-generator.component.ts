import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss']
})
export class PasswordGeneratorComponent {
  // Alternative for checkboxes
  checkboxes = [
    {
      "id": "lowercase",
      "label": "a-z",
      "library": "abcdefghijklmnopqrstuvwxyz",
      "checked": true
    }, {
      "id": "uppercase",
      "label": "A-Z",
      "library": "ABCDEFGHIJKLMNOPWRSTUVWXYZ",
      "checked": true
    }, {
      "id": "numbers",
      "label": "0-9",
      "library": "0123456789",
      "checked": false
    }, {
      "id": "symbols",
      "label": "!-?",
      "library": "!@#$%^&*-_=+\\|:;',.\<>/?~",
      "checked": false
    }
  ]

  // Declarations

  dictionary!: Array<String>;

  lowercase: Boolean = this.checkboxes[0].checked;
  uppercase: Boolean = this.checkboxes[1].checked;
  numbers: Boolean = this.checkboxes[2].checked;
  symbols: Boolean = this.checkboxes[3].checked;

  passwordLenght: number = 4;
  buttonLabel: string = "Generate";
  newPassword: string = "securePassbyShahil"

  // Password length
  updatePasswordLength(event: any) {
    this.passwordLenght = event.target.value;
    this.generatePassword()
  }

  // Checkbox value
  updateCheckboxValue(event: any) {
    console.log(event.target.id)
    if (event.target.id == "lowercase")
      this.lowercase = event.target.checked;

    if (event.target.id == "uppercase")
      this.uppercase = event.target.checked;

    if (event.target.id == "numbers")
      this.numbers = event.target.checked;

    if (event.target.id == "symbols")
      this.symbols = event.target.checked;
  }

  // Copy password to clipboard
  @ViewChild('passwordOutput') password!: ElementRef;

  // Generate password
  generatePassword() {
    if (this.lowercase === false && this.uppercase === false && this.numbers === false && this.symbols === false) {
      return this.newPassword = "...";
    }

    // Create array from chosen checkboxes
    this.dictionary = []
    if (this.lowercase) {
      this.dictionary = this.dictionary.concat(this.checkboxes[0].library.split(""));
    }
    if (this.uppercase) {
      this.dictionary = this.dictionary.concat(this.checkboxes[1].library.split(""));
    }
    if (this.numbers) {
      this.dictionary = this.dictionary.concat(this.checkboxes[2].library.split(""));
    }
    if (this.symbols) {
      this.dictionary = this.dictionary.concat(this.checkboxes[3].library.split(""));
    }

    // Generate random password from array
    var newPassword = "";
    for (var i = 0; i < this.passwordLenght; i++) {
      newPassword += this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    }
    this.newPassword = newPassword;

    return this.newPassword
  }

  copyPass() {
    navigator.clipboard.writeText(this.newPassword)
    console.log(this.newPassword)
  }
}
