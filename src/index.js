// TODO: 이 곳에 정답 코드를 작성해주세요.
const $body = document.querySelector('body')
const $form = document.querySelector('#form')
const $modal = document.querySelector('#modal')
const $FontControlBox = document.querySelector('#font-control-box')

const $id = $form.querySelector('#id')
const $password = $form.querySelector('#pw')
const $passwordCheck = $form.querySelector('#pw-check')
const $submitButton = $form.querySelector('#submit')

const $idMessage = $form.querySelector('#id-msg')
const $passwordMessage = $form.querySelector('#pw-msg')
const $passwordCheckMessage = $form.querySelector('#pw-check-msg')

const $increaseFontButton = $FontControlBox.querySelector('#increase-font-btn')
const $decreaseFontButton = $FontControlBox.querySelector('#decrease-font-btn')

const idMessage =
    '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'
const passwordMessage = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'
const passwordCheckMessage = '비밀번호가 일치하지 않습니다.'

const regexId = /^[a-z0-9-_]{5,20}$/
const regexPassword =
    /^[a-zA-Z0-9\\{\\}\\[\]\\/?.,;:|\\)*~`!^\-_+<>@\\#$%&\\\\=\\(\\'\\"]{8,16}$/

const validation = {
    id: false,
    password: false,
    passwordCheck: false,
    isAllValidated: function () {
        return this.id && this.password, this.passwordCheck
    },
}

$id.focus()
$submitButton.disabled = true

const onSubmitHandler = (e) => {
    e.preventDefault()
    if (validation.isAllValidated()) {
        $modal.showModal()
        const $confirm = $modal.querySelector('#confirm-id')
        const $confirmPw = $modal.querySelector('#confirm-pw')
        $confirm.innerHTML = $id.value
        $confirmPw.innerHTML = $password.value
        const $cancelBtn = $modal.querySelector('#cancel-btn')
        const $approveBtn = $modal.querySelector('#approve-btn')
        $cancelBtn.addEventListener('click', () => {
            $modal.close()
        })
        $approveBtn.addEventListener('click', () => {
            alert('가입되었습니다 🥳')
        })
    }
    return
}
const validationCheck = (type) => {
    if (type === 'id') {
        const id = $id.value
        if (regexId.test(id)) {
            validation.id = true
            $idMessage.innerHTML = ''
            return
        }
        validation.id = false
        $idMessage.innerHTML = idMessage
    }
    if (type === 'pw') {
        const password = $password.value
        if (regexPassword.test(password)) {
            validation.password = true
            $passwordMessage.innerHTML = ''
            return
        }
        validation.password = false
        $passwordMessage.innerHTML = passwordMessage
    }
    if (type === 'pw-check') {
        const passwordCheck = $passwordCheck.value
        if ($password.value === passwordCheck) {
            validation.passwordCheck = true
            $passwordCheckMessage.innerHTML = ''
            return
        }
        validation.passwordCheck = false
        $passwordCheckMessage.innerHTML = passwordCheckMessage
    }
    return
}

const onFocusOutHandler = (e) => {
    const type = e.target.id
    validationCheck(type)
    if (validation.isAllValidated()) return ($submitButton.disabled = false)
    return ($submitButton.disabled = true)
}

const getCurrentFontSize = () =>
    Number(
        window
            .getComputedStyle($body, null)
            .getPropertyValue('font-size')
            .split('px')[0]
    )
const onClickControlFontSizeBtn = (type) => {
    const currentFontSize = getCurrentFontSize()
    if (type === 'plus') {
        if (currentFontSize >= 20) {
            return
        }
        return ($body.style.fontSize = currentFontSize + 1 + 'px')
    }
    if (type === 'minus') {
        if (currentFontSize <= 12) {
            return
        }
        return ($body.style.fontSize = currentFontSize - 1 + 'px')
    }
    return
}

$id.addEventListener('focusout', onFocusOutHandler)
$password.addEventListener('focusout', onFocusOutHandler)
$passwordCheck.addEventListener('focusout', onFocusOutHandler)
$submitButton.addEventListener('click', onSubmitHandler)

$increaseFontButton.addEventListener('click', () => {
    onClickControlFontSizeBtn('plus')
})
$decreaseFontButton.addEventListener('click', () => {
    onClickControlFontSizeBtn('minus')
})
