const $form = document.querySelector('#form')
const $modal = document.querySelector('#modal')

const $id = $form.querySelector('#id')
const $password = $form.querySelector('#pw')
const $passwordCheck = $form.querySelector('#pw-check')
const $submitButton = $form.querySelector('#submit')

const $idMessage = $form.querySelector('#id-msg')
const $passwordMessage = $form.querySelector('#pw-msg')
const $passwordCheckMessage = $form.querySelector('#pw-check-msg')

const isBoolean = (o) => typeof o === 'boolean'
const isTrue = (v) => v === true

const validation = {
    id: false,
    pw: false,
    'pw-check': false,
    isAllValidated: function () {
        return Object.values(this).filter(isBoolean).every(isTrue)
    },
}

const ErrorMessage = {
    required: '필수 사항입니다.',
    id: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    pw: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    'pw-check': '비밀번호가 일치하지 않습니다.',
}

const regexId = new RegExp('^[a-z0-9-_]{5,20}$')
const regexPassword = new RegExp(
    '^[a-zA-Z0-9\\{\\}\\[\\]\\/?.,;:|\\)*~`!^\\-_+<>@\\#$%&\\\\=\\(\\"]{8,16}$'
)

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

const checkRegex = (target) => {
    const { id, value } = target
    switch (id) {
        case 'id':
            return regexId.test(value)
        case 'pw':
            return regexPassword.test(value)
        case 'pw-check':
            return $password.value === value
    }
}

const checkValidation = (target, targetMessage) => {
    if (target.value.length === 0) {
        return (targetMessage.innerText = ErrorMessage.required)
    }
    if (checkRegex(target)) {
        validation[target.id] = true
        targetMessage.innerText = ''
        return
    }
    validation[target.id] = false
    targetMessage.innerText = ErrorMessage[target.id]
}

const onFocusOutHandler = (target, targetMessage) => {
    checkValidation(target, targetMessage)
    if (validation.isAllValidated()) return ($submitButton.disabled = false)
    return ($submitButton.disabled = true)
}

$id.addEventListener('focusout', () => {
    onFocusOutHandler($id, $idMessage)
})
$password.addEventListener('focusout', () => {
    onFocusOutHandler($password, $passwordMessage)
})
$passwordCheck.addEventListener('focusout', () => {
    onFocusOutHandler($passwordCheck, $passwordCheckMessage)
})
$submitButton.addEventListener('click', onSubmitHandler)

window.addEventListener('load', () => {
    $id.focus()
    $submitButton.disabled = true
})
