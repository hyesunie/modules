const CONTENT_BOX_SELECTOR = "content-box"

export default class Join {
    idContainer = document.querySelector(".id-content")
    idInput = this.idContainer.querySelector("input")
    passwordContainer = document.querySelector(".password-content")
    passwordInput1 = this.passwordContainer.querySelector(".password1")
    passwordInput2 = this.passwordContainer.querySelector(".password2")
    password = ""
    birthContainer = document.querySelector(".user-info__birth")
    birthYearInput = this.birthContainer.querySelector(".year")
    //생년 월일 하기!1
    emailContainer = document.querySelector(".email-content")
    emailInput = this.emailContainer.querySelector(".email")
    phoneContainer = document.querySelector(".phone-content")
    phoneInput = this.phoneContainer.querySelector(".phone")
    interestContainer = document.querySelector(".interest-content")
    interestInput = this.interestContainer.querySelector(".interest")
    interestId = 1;
    agreementContainer = document.querySelector(".agreement-content")
    agreementAnchor = this.agreementContainer.querySelector("span label a")
    agreementButton = this.agreementContainer.querySelector("span input");
    detailAgreementContainer = document.querySelector(".detail-agreement-content")
    closeAgreementButton = this.detailAgreementContainer.querySelector(".close")
    checkAgreementButton = this.detailAgreementContainer.querySelector(".check")

    constructor() {
        this.subscribeInput()
    }

    _focusIn(e) {
        e.target.parentNode.classList.add('green-line')
    }

    _focusOut(e) {
        e.target.parentNode.classList.remove('green-line')
    }

    subscribeInput() {
        const form = document.querySelector('form.join');

        form.addEventListener('focusin', (e) => {
            console.log(e.target.tagName)

            if (e.target.tagName !== 'INPUT') {
                return;
            }

            e.target.parentNode.classList.add('green-line');

        })

        form.addEventListener('focusout', (e) => {
            console.log(e.target.tagName)

            if (e.target.tagName !== 'INPUT') {
                return;
            }

            e.target.parentNode.classList.remove('green-line');
        })

        // const contentBoxes = document.querySelectorAll(`.${CONTENT_BOX_SELECTOR} > inpput`);

        // Array.from(contentBoxes).forEach((contentBox) => {
        // contentBox.addEventListener('focusin', (e) => { this._focusIn(e) })
        // contentBox.addEventListener('focusout', (e) => { this._focusOut(e) })
        // })







        this.idInput.addEventListener('click', (e) => {
            console.log(e.target.value)
            //테두리 색깔 변경
        })

        this.idInput.addEventListener('input', (e) => {
            const idMessage = this.createMessageElement('check-id', this.idInput.parentNode)
            idMessage.innerHTML = this.checkIdFormat(e.target.value) ? "멋진 아이디네요!" : "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
        })


        this.passwordInput1.addEventListener('input', (e) => {
            const passwordMessage = this.createMessageElement('check-password1', this.passwordInput1.parentNode)
            const checkMessage = {
                length: "8자 이상 16자 이하로 입력해주세요.",
                upper: "영문 대문자를 최소 1자 이상 포함해주세요.",
                lower: "영문 소문자를 최소 1자 이상 포함해주세요.",
                number: "숫자를 최소 1자 이상 포함해주세요.",
                char: "특수문자를 최소 1자 이상 포함해주세요.",
                correct: "안전한 비밀번호 입니다."
            }

            const status = this.checkPasswordFormat(e.target.value);
            passwordMessage.innerHTML = checkMessage[status]

            if (status === 'correct') {
                this.password = e.target.value
            }
        })

        this.passwordInput2.addEventListener('input', (e) => {
            const passwordMessage = this.createMessageElement('check-password2', this.passwordInput2.parentNode)
            passwordMessage.innerHTML = e.target.value === this.password ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."
        })

        this.birthYearInput.addEventListener('input', (e) => {
        })

        // 생년월일!! 다시 하기

        this.emailInput.addEventListener('input', (e) => {
            const isTrue = this.checkEmailFormat(e.target.value)

            if (isTrue) {
                const el = document.querySelector('.check-email');
                el ? el.remove() : el
            } else {
                const emailMessage = this.createMessageElement('check-email', this.emailInput.parentNode)
                emailMessage.innerHTML = "이메일 주소를 다시 확인해주세요."
            }
        })

        this.phoneInput.addEventListener('input', (e) => {
            const isTrue = this.checkPhoneFormat(e.target.value)

            if (isTrue) {
                const el = document.querySelector('.check-phone');
                el ? el.remove() : el
            } else {
                const emailMessage = this.createMessageElement('check-phone', this.phoneInput.parentNode)
                emailMessage.innerHTML = "형식에 맞지 않는 번호입니다."
            }
        })

        this.interestInput.addEventListener('input', (e) => {
            // const count = e.target.parentNode.childElementCount;
            // console.log(count)
            if (e.target.value.includes(",")) {
                const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-z]+(?=\,)/g
                const answer = e.target.value.match(reg) || []
                answer.forEach(el => {
                    this.addInterestChildNode(el)
                });
                e.target.value = ""
            }
            const count = e.target.parentNode.childElementCount - 1;

            if (count >= 3) {
                const el = document.querySelector('.check-interest');
                el ? el.remove() : el
            } else {
                const interestMessage = this.createMessageElement('check-interest', this.interestInput.parentNode)
                interestMessage.innerHTML = "3개 이상의 관심사를 입력하세요."
            }
        })

        this.interestInput.addEventListener("keyup", (e) => {
            if (e.key === "Backspace" && e.target.selectionStart === 0 && e.target.parentNode.childElementCount > 1) {
                const nodes = e.target.parentNode.childNodes
                const span = nodes[e.target.parentNode.childElementCount - 1]
                const value = `${span.innerText}`

                span.remove();
                e.target.value = value
            }
        })

        this.agreementAnchor.addEventListener('click', (e) => {
            e.preventDefault();
            this.detailAgreementContainer.classList.remove('_hide');
            this.detailAgreementContainer.classList.add('_visible');
        })

        this.agreementButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.detailAgreementContainer.classList.remove('_hide');
            this.detailAgreementContainer.classList.add('_visible');
        })

        this.closeAgreementButton.addEventListener("click", (e) => {
            this.detailAgreementContainer.classList.remove('_visible');
            this.detailAgreementContainer.classList.add('_hide')
        })

        this.checkAgreementButton.addEventListener("click", (e) => {
            this.agreementButton.checked = true;
            this.detailAgreementContainer.classList.remove('_visible');
            this.detailAgreementContainer.classList.add('_hide')
        })


    }

    createMessageElement(className, parentNode) {
        if (document.querySelector(`.${className}`) === null) {
            const span = document.createElement('span')
            span.classList.add(className)
            parentNode.after(span)
            return span
        } else {
            return document.querySelector(`.${className}`)
        }
    }

    checkIdFormat(id) {
        const reg = /[^a-z^\_^\-^\d]/g

        if (id.length > 4 && id.length < 21 && !reg.test(id)) {
            console.log(id.length, id)
            return true;
        }

        return false;

    }

    checkPasswordFormat(password) {
        const upperReg = /[A-Z]/g
        const lowerReg = /[a-z]/g
        const numberReg = /\d/g
        const charReg = /[~!@#$%^&*()_+{}\[\]|;:'",./<>?`\-=\\]/g
        const lengthCheck = password.length > 7 && password.length < 17


        if (!lengthCheck) {
            return 'length';
        } else if (!upperReg.test(password)) {
            return 'upper';
        } else if (!lowerReg.test(password)) {
            return 'lower';
        } else if (!numberReg.test(password)) {
            return 'number';
        } else if (!charReg.test(password)) {
            return 'char';
        } else {
            return 'correct';
        }
    }

    checkBirthYearFormat(year) {

    }

    checkEmailFormat(email) {
        const reg = /[\w\d]+@[\w]+\.[\w]+/g

        if (reg.test(email)) {
            return true;
        }
        return false
    }

    checkPhoneFormat(phone) {
        const reg1 = /^010/g
        const reg2 = /\D/g
        const isCorrectFormat = phone.length > 9 && phone.length < 12 && reg1.test(phone) && !reg2.test(phone);

        if (isCorrectFormat) {
            return true;
        }
        return false
    }

    addInterestChildNode(data) {
        const span = document.createElement('span')
        const button = document.createElement('button');

        span.classList.add(`tag${this.interestId}`)
        button.classList.add(`delete${this.interestId}`);

        this.interestId++;

        button.innerHTML = 'x';
        span.innerHTML = `${data}`

        button.addEventListener("click", (e) => {
            e.preventDefault();
            e.target.parentNode.remove();
        })

        span.appendChild(button)
        this.interestInput.before(span)
    }
}